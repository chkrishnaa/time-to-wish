import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useTheme } from "../context/ThemeContext";
import { Folder, Plus, ArrowLeft, Trash2, Calendar } from "lucide-react";
import moment from "moment";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.COLLECTIONS.GET_ALL);
      setCollections(res.data || []);
    } catch (e) {
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    setCreatingCollection(true);
    try {
      await axiosInstance.post(API_PATHS.COLLECTIONS.CREATE, {
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim() || "",
      });
      toast.success("Collection created!");
      setNewCollectionName("");
      setNewCollectionDescription("");
      setShowCreateForm(false);
      await fetchCollections();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create collection");
    } finally {
      setCreatingCollection(false);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    const collection = collections.find((c) => c._id === collectionId);
    const collectionName = collection?.name || "this collection";
    
    if (
      !window.confirm(
        `Are you sure you want to delete "${collectionName}"? This will also delete all birthdays in this collection.`
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(API_PATHS.COLLECTIONS.DELETE(collectionId));
      toast.success("Collection deleted");
      await fetchCollections();
    } catch (e) {
      toast.error("Failed to delete collection");
    }
  };

  const handleCollectionClick = (collectionId) => {
    navigate(`/birthdays?collection=${collectionId}`);
  };

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
    navigate(`/birthdays?collection=${collection._id}`);
  };

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                My Collections
              </h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Organize your birthdays into collections
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Plus className="w-5 h-5" />
              Create Collection
            </button>
          </div>

          {/* Create Collection Form */}
          {showCreateForm && (
            <div
              className={`mb-8 p-6 rounded-xl border bg-gradient-to-br ${
                darkMode
                  ? "from-gray-800 to-gray-950 border-gray-700"
                  : "from-white to-gray-200 border-gray-200"
              } shadow-sm`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Create New Collection
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Collection Name <span className={`${darkMode ? "text-red-400" : "text-red-500"}`}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Family, Friends, Colleagues"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    placeholder="Add a description for this collection..."
                    value={newCollectionDescription}
                    onChange={(e) => setNewCollectionDescription(e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateCollection}
                    disabled={!newCollectionName.trim() || creatingCollection}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      !newCollectionName.trim() || creatingCollection
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {creatingCollection ? "Creating..." : "Create"}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewCollectionName("");
                      setNewCollectionDescription("");
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Collections Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p
                className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Loading collections...
              </p>
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-12">
              <Folder
                className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                No collections yet
              </h2>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Create your first collection to start organizing birthdays
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Your First Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <div
                  key={collection._id}
                  className={`group relative rounded-xl p-6 border cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br ${
                    darkMode
                      ? "from-gray-800 to-gray-950 border-gray-700 hover:border-blue-600"
                      : "from-white to-gray-200 border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => handleCollectionClick(collection._id)}
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCollection(collection._id, collection.name);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                        : "hover:bg-gray-100 text-gray-500 hover:text-red-600"
                    }`}
                    title="Delete collection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Collection Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${
                      darkMode ? "from-blue-700 to-blue-900" : "from-blue-100 to-blue-300"
                    }`}
                  >
                    <Folder
                      className={`w-6 h-6 ${
                        darkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    />
                  </div>

                  {/* Collection Name */}
                  <h3
                    className={`text-xl font-bold mb-2 pr-8 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {collection.name}
                  </h3>

                  {/* Description */}
                  {collection.description && (
                    <p
                      className={`text-sm mb-4 text-justify line-clamp-4 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {collection.description}
                    </p>
                  )}

                  {/* Created Date */}
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar
                      className={`w-4 h-4 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }
                    >
                      Created {moment(collection.createdAt).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

