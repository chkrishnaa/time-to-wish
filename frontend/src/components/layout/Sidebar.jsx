import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Folder, X, LayoutGrid } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({
  collections,
  selectedCollection,
  onSelectCollection,
  onCreateCollection,
  onDeleteCollection,
  isCreating,
  newCollectionName,
  setNewCollectionName,
  newCollectionDescription,
  setNewCollectionDescription,
  showCreateForm,
  setShowCreateForm,
}) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`h-full border-r ${
        darkMode
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white"
      } rounded-lg`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            My Collections
          </h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`p-2 rounded-lg ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            } transition-colors`}
            title="Create Collection"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showCreateForm && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg text-sm mb-2 ${
                darkMode
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={newCollectionDescription || ""}
              onChange={(e) => setNewCollectionDescription?.(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg text-sm resize-none ${
                darkMode
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={onCreateCollection}
                disabled={!newCollectionName.trim() || isCreating}
                className={`flex-1 px-3 py-1.5 text-sm rounded-lg ${
                  !newCollectionName.trim() || isCreating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors`}
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCollectionName("");
                  setNewCollectionDescription?.("");
                }}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } transition-colors`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1 flex-1 overflow-y-auto">
          {collections.length === 0 ? (
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } text-center py-4`}
            >
              No collections yet. Create one!
            </p>
          ) : (
            collections.map((collection) => (
              <div
                key={collection._id}
                className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedCollection?._id === collection._id
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-900"
                    : darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  onSelectCollection(collection);
                  navigate(`/birthdays?collection=${collection._id}`);
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Folder className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {collection.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        `Are you sure you want to delete "${collection.name}"? This will also delete all birthdays in this collection.`
                      )
                    ) {
                      onDeleteCollection(collection._id);
                    }
                  }}
                  className={`opacity-0 group-hover:opacity-100 p-1 rounded ${
                    selectedCollection?._id === collection._id
                      ? "hover:bg-blue-700 text-white"
                      : darkMode
                      ? "hover:bg-gray-600 text-gray-400"
                      : "hover:bg-gray-200 text-gray-500"
                  } transition-opacity`}
                  title="Delete collection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

