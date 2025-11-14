import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomDatePicker from "../components/Input/DatePicker";
import BirthdayCard from "../components/Cards/BirthdayCard";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import { useTheme } from "../context/ThemeContext";
import EmailAutocomplete from "../components/Utility/EmailAutocomplete";
import BirthdaySearchSort from "../components/Utility/BirthdaySearchSort";
import Pagination from "../components/Utility/Pagination";
import CollapsibleSection from "../components/Utility/CollapsibleSection";

const Birthdays = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [birthdays, setBirthdays] = useState([]);
  const [filteredBirthdays, setFilteredBirthdays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [form, setForm] = useState({ name: "", date: "", email: "" });
  const [originalForm, setOriginalForm] = useState({ name: "", date: "", email: "" });
  const [editingBirthday, setEditingBirthday] = useState(null);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isAddBirthdayOpen, setIsAddBirthdayOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Initialize based on screen size - start collapsed on all screen sizes
    if (typeof window !== "undefined") {
      return true; // Start collapsed by default to give full width to content
    }
    return true;
  });

  // Sync sidebar collapsed state on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      setFilteredBirthdays([]);
    }
  }, [selectedCollection]);

  // Update filtered birthdays when birthdays change
  useEffect(() => {
    setFilteredBirthdays(birthdays);
  }, [birthdays]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBirthdays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBirthdays = filteredBirthdays.slice(startIndex, endIndex);

  // Reset to page 1 when filtered birthdays change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredBirthdays.length, itemsPerPage]);

  const handleEditCollection = (collection) => {
    if (!collection) {
      // Clear editing state
      setEditingCollection(null);
      setNewCollectionName("");
      setNewCollectionDescription("");
      return;
    }
    setEditingCollection(collection);
    setNewCollectionName(collection.name);
    setNewCollectionDescription(collection.description || "");
    setShowCreateForm(true);
  };

  const handleUpdateCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    if (!editingCollection) return;

    setCreatingCollection(true);
    try {
      await axiosInstance.put(
        API_PATHS.COLLECTIONS.UPDATE(editingCollection._id),
        {
          name: newCollectionName.trim(),
          description: newCollectionDescription.trim() || "",
        }
      );
      toast.success("Collection updated!");
      setNewCollectionName("");
      setNewCollectionDescription("");
      setShowCreateForm(false);
      setEditingCollection(null);
      await fetchCollections();
      // Update selected collection if it was the one being edited
      if (selectedCollection?._id === editingCollection._id) {
        const updated = await axiosInstance.get(
          API_PATHS.COLLECTIONS.GET_BY_ID(editingCollection._id)
        );
        setSelectedCollection(updated.data);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update collection");
    } finally {
      setCreatingCollection(false);
    }
  };

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
      setEditingCollection(null);
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

  const handleEditBirthday = (birthday) => {
    setEditingBirthday(birthday);
    // Format date for date input (YYYY-MM-DD)
    const formattedDate = birthday.date 
      ? new Date(birthday.date).toISOString().split('T')[0]
      : "";
    const formData = {
      name: birthday.name || "",
      date: formattedDate,
      email: birthday.email || "",
    };
    setForm(formData);
    setOriginalForm(formData); // Store original values for change detection
    setIsAddBirthdayOpen(true); // Open the form when editing
  };

  // Check if form has changes
  const hasChanges = editingBirthday ? (
    form.name !== originalForm.name ||
    form.date !== originalForm.date ||
    form.email !== originalForm.email
  ) : (form.name.trim() && form.date.trim());

  const handleUpdateBirthday = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date) {
      return toast.error("Name and Date of Birth are required");
    }

    if (!editingBirthday) return;
    
    // Check if there are any changes
    if (!hasChanges) {
      return toast.error("No changes to update");
    }

    setLoading(true);
    try {
      await axiosInstance.put(API_PATHS.BIRTHDAYS.UPDATE(editingBirthday._id), {
        name: form.name,
        date: form.date,
        email: form.email || "",
      });
      toast.success("Birthday updated!");
      setForm({ name: "", date: "", email: "" });
      setOriginalForm({ name: "", date: "", email: "" });
      setEditingBirthday(null);
      setIsAddBirthdayOpen(false);
      if (selectedCollection) {
        fetchBirthdays(selectedCollection._id);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
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
      setForm({ name: "", date: "", email: "" });
      setOriginalForm({ name: "", date: "", email: "" });
      setEditingBirthday(null);
      setIsAddBirthdayOpen(false);
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
      <div className="flex h-full min-h-0">
        {/* Collections Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-12" : "w-64"
          } flex-shrink-0 h-full overflow-y-auto transition-all duration-300`}
        >
          <Sidebar
            collections={collections}
            selectedCollection={selectedCollection}
            onSelectCollection={handleSelectCollection}
            onCreateCollection={
              editingCollection
                ? handleUpdateCollection
                : handleCreateCollection
            }
            onDeleteCollection={handleDeleteCollection}
            onEditCollection={handleEditCollection}
            editingCollection={editingCollection}
            isCreating={creatingCollection}
            newCollectionName={newCollectionName}
            setNewCollectionName={setNewCollectionName}
            newCollectionDescription={newCollectionDescription}
            setNewCollectionDescription={setNewCollectionDescription}
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
            onCollapseChange={setSidebarCollapsed}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="container mx-auto px-4 py-4 sm:py-0 max-w-4xl">
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
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium btn-animate shadow-md hover:shadow-lg"
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

                {/* Add Birthday Form - Collapsible */}
                <CollapsibleSection
                  title={editingBirthday ? "Edit Birthday" : "Add Birthday"}
                  defaultOpen={isAddBirthdayOpen}
                  onToggle={(open) => setIsAddBirthdayOpen(open)}
                >
                  <form
                    onSubmit={
                      editingBirthday ? handleUpdateBirthday : handleAdd
                    }
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <div className="sm:col-span-3">
                    
                    </div>
                    <div className="sm:col-span-2">
                      <label className={`block text-xs font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        required
                        className={`w-full rounded-lg px-3 py-2 ${
                          darkMode
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <CustomDatePicker
                        value={form.date}
                        onChange={(date) => {
                          const today = new Date().toISOString().split("T")[0];
                          // Only allow dates up to today
                          if (date <= today) {
                            setForm({ ...form, date });
                          }
                        }}
                        maxDate={new Date().toISOString().split("T")[0]}
                        required
                        placeholder="Select date of birth"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className={`block text-xs font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Email (Optional)
                      </label>
                      <EmailAutocomplete
                        value={form.email}
                        onChange={(email, userData) => {
                          // If userData is provided (from autocomplete selection), auto-fill name
                          if (userData && userData.name) {
                            setForm(prev => ({ 
                              ...prev, 
                              email, 
                              name: prev.name.trim() ? prev.name : userData.name // Only auto-fill if name is empty
                            }));
                          } else {
                            // Just update email when typing
                            setForm(prev => ({ ...prev, email }));
                          }
                        }}
                        placeholder="@"
                      />
                    </div>
                    <div className="flex gap-2 sm:col-span-3">
                      <button
                        disabled={loading || (editingBirthday && !hasChanges) || !form.name.trim() || !form.date}
                        className={`flex-1 rounded-lg px-4 py-2 text-white font-medium btn-animate ${
                          loading || (editingBirthday && !hasChanges) || !form.name.trim() || !form.date
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        type="submit"
                      >
                        {loading
                          ? editingBirthday
                            ? "Updating..."
                            : "Adding..."
                          : editingBirthday
                          ? "Update"
                          : "Add Birthday"}
                      </button>
                      {editingBirthday && (
                        <button
                          type="button"
                          onClick={() => {
                            setForm({ name: "", date: "", email: "" });
                            setOriginalForm({ name: "", date: "", email: "" });
                            setEditingBirthday(null);
                            setIsAddBirthdayOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium btn-animate ${
                            darkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </CollapsibleSection>

                {/* Filter Items - Collapsible */}
                {birthdays.length > 0 && (
                  <CollapsibleSection title="Filter Items">
                    <BirthdaySearchSort
                      birthdays={birthdays}
                      onFilteredBirthdaysChange={setFilteredBirthdays}
                    />
                  </CollapsibleSection>
                )}

                {/* Items Per Page Selector - Outside Filter */}
                {birthdays.length > 0 && (
                  <div
                    className={`mb-5 p-3 rounded-lg border ${
                      darkMode
                        ? "border-gray-700 bg-gray-800/50"
                        : "border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <label
                        className={`text-sm font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Items Per page :
                      </label>
                      <select
                        value={itemsPerPage}
                        onChange={(e) =>
                          setItemsPerPage(Number(e.target.value))
                        }
                        className={`px-3 py-2 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-gray-700 text-gray-200 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Birthday Cards */}
                {filteredBirthdays.length === 0 ? (
                  <div
                    className={`text-center py-8 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {birthdays.length === 0
                      ? "No birthdays in this collection yet. Add one above!"
                      : "No birthdays found matching your search."}
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                      {paginatedBirthdays.map((b, index) => (
                        <BirthdayCard
                          key={b._id}
                          birthday={b}
                          onDelete={handleDelete}
                          onEdit={handleEditBirthday}
                          style={{ animationDelay: `${(index % 6) * 0.1}s` }}
                        />
                      ))}
                    </div>

                    {/* Pagination - Always show when there are items */}
                    {filteredBirthdays.length > 0 && (
                      <Pagination
                        darkMode={darkMode}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredBirthdays.length}
                        setCurrentPage={setCurrentPage}
                        color="purple"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Birthdays;
