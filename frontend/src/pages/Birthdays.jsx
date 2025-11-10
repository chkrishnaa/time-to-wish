import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BirthdayCard from "../components/Cards/BirthdayCard";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import { useTheme } from "../context/ThemeContext";

const Birthdays = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [birthdays, setBirthdays] = useState([]);
  const [form, setForm] = useState({ name: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
    navigate(`/birthdays?collection=${collection._id}`);
  };

  const fetchCollections = async () => {
    try {
      setLoadingCollections(true);
      const res = await axiosInstance.get(API_PATHS.COLLECTIONS.GET_ALL);
      setCollections(res.data || []);
      
      // Check if collection ID is in URL params
      const collectionIdFromUrl = searchParams.get("collection");
      if (collectionIdFromUrl && res.data?.length > 0) {
        const collection = res.data.find((c) => c._id === collectionIdFromUrl);
        if (collection) {
          setSelectedCollection(collection);
          return;
        }
      }
      
      // Auto-select first collection if available and no collection from URL
      if (res.data?.length > 0 && !collectionIdFromUrl) {
        setSelectedCollection((prev) => {
          // Only set if not already set
          if (!prev) {
            return res.data[0];
          }
          return prev;
        });
      }
    } catch (e) {
      toast.error("Failed to load collections");
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchBirthdays = async (collectionId = null) => {
    try {
      const url = collectionId
        ? `${API_PATHS.BIRTHDAYS.GET_ALL}?collectionId=${collectionId}`
        : API_PATHS.BIRTHDAYS.GET_ALL;
      const res = await axiosInstance.get(url);
      setBirthdays(res.data || []);
    } catch (e) {
      toast.error("Failed to load birthdays");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [searchParams]);

  useEffect(() => {
    if (selectedCollection) {
      fetchBirthdays(selectedCollection._id);
    } else {
      setBirthdays([]);
    }
  }, [selectedCollection]);

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    setCreatingCollection(true);
    try {
      const res = await axiosInstance.post(API_PATHS.COLLECTIONS.CREATE, {
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim() || "",
      });
      toast.success("Collection created!");
      setNewCollectionName("");
      setNewCollectionDescription("");
      setShowCreateForm(false);
      await fetchCollections();
      setSelectedCollection(res.data.data);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create collection");
      console.error("Collection creation error:", e);
    } finally {
      setCreatingCollection(false);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await axiosInstance.delete(API_PATHS.COLLECTIONS.DELETE(collectionId));
      toast.success("Collection deleted");
      
      // If deleted collection was selected, clear selection
      if (selectedCollection?._id === collectionId) {
        setSelectedCollection(null);
        setBirthdays([]);
      }
      
      await fetchCollections();
    } catch (e) {
      toast.error("Failed to delete collection");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date) {
      return toast.error("Please fill all fields");
    }
    
    if (!selectedCollection) {
      return toast.error("Please select a collection first");
    }

    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.BIRTHDAYS.ADD, {
        ...form,
        collectionId: selectedCollection._id,
      });
      toast.success("Birthday added");
      setForm({ name: "", date: "" });
      fetchBirthdays(selectedCollection._id);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to add");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.BIRTHDAYS.DELETE(id));
      toast.success("Deleted");
      if (selectedCollection) {
        fetchBirthdays(selectedCollection._id);
      }
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <DashboardLayout activeMenu="birthdays">
      <div className="flex gap-6 h-full min-h-0">
        {/* Collections Sidebar */}
        <div className="w-64 flex-shrink-0 h-full overflow-y-auto">
          <Sidebar
            collections={collections}
            selectedCollection={selectedCollection}
            onSelectCollection={handleSelectCollection}
            onCreateCollection={handleCreateCollection}
            onDeleteCollection={handleDeleteCollection}
            isCreating={creatingCollection}
            newCollectionName={newCollectionName}
            setNewCollectionName={setNewCollectionName}
            newCollectionDescription={newCollectionDescription}
            setNewCollectionDescription={setNewCollectionDescription}
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="container mx-auto px-4 pt-6 pb-10 max-w-4xl">
            {!selectedCollection ? (
              <div className="text-center py-12">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Welcome to TimeToWish! 🎉
                </h2>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Create a collection to start adding birthdays
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Create Your First Collection
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1
                    className={`text-2xl font-bold mb-2 ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {selectedCollection.name}
                  </h1>
                  {selectedCollection.description && (
                    <p
                      className={`text-sm text-justify ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {selectedCollection.description}
                    </p>
                  )}
                </div>

                <form
                  onSubmit={handleAdd}
                  className={`mb-8 p-4 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-gray-50"
                  } grid grid-cols-1 sm:grid-cols-3 gap-3`}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className={`rounded-lg px-3 py-2 ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className={`rounded-lg px-3 py-2 ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={form.date}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const today = new Date().toISOString().split("T")[0];
                      // Only allow dates up to today
                      if (selectedDate <= today) {
                        setForm({ ...form, date: selectedDate });
                      }
                    }}
                    placeholder="dd/mm/yyyy"
                  />
                  <button
                    disabled={loading}
                    className={`rounded-lg px-4 py-2 text-white font-medium transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    type="submit"
                  >
                    {loading ? "Adding..." : "Add Birthday"}
                  </button>
                </form>

                <div className="space-y-3">
                  {birthdays.length === 0 && (
                    <div
                      className={`text-center py-8 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No birthdays in this collection yet. Add one above!
                    </div>
                  )}
                  {birthdays.map((b) => (
                    <BirthdayCard
                      key={b._id}
                      birthday={b}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Birthdays;
