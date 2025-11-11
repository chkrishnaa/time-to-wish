import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  Folder,
  ChevronsLeft,
  ChevronsRight,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import CollectionSearchSort from "../Utility/CollectionSearchSort";

const Sidebar = ({
  collections,
  selectedCollection,
  onSelectCollection,
  onCreateCollection,
  onDeleteCollection,
  onEditCollection,
  editingCollection,
  isCreating,
  newCollectionName,
  setNewCollectionName,
  newCollectionDescription,
  setNewCollectionDescription,
  showCreateForm,
  setShowCreateForm,
  onCollapseChange,
}) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Start collapsed by default on all screen sizes
    return true;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState(collections);

  // Check if mobile view and sync with parent
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640; // sm breakpoint
      setIsMobile(mobile);
      // On mobile, always keep collapsed
      if (mobile) {
        setIsCollapsed(true);
        if (onCollapseChange) {
          onCollapseChange(true);
        }
      } else {
        // On desktop, sync with parent's initial state
        if (onCollapseChange) {
          onCollapseChange(isCollapsed);
        }
      }
    };

    // Initial sync with parent on mount
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [onCollapseChange, isCollapsed]);

  const handleToggleCollapse = () => {
    if (isMobile) {
      // On mobile, show modal instead
      setShowMobileModal(true);
    } else {
      // On desktop, toggle collapse
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      if (onCollapseChange) {
        onCollapseChange(newCollapsedState);
      }
    }
  };

  const handleCollectionClick = (collection) => {
    onSelectCollection(collection);
    navigate(`/birthdays?collection=${collection._id}`);
    // Close modal on mobile after selection
    if (isMobile) {
      setShowMobileModal(false);
    }
  };

  // Update filtered collections when collections prop changes
  useEffect(() => {
    setFilteredCollections(collections);
  }, [collections]);

  // Collapsed view (narrow bar)
  if (isCollapsed) {
    return (
      <>
        <div
          onClick={() => {
            if (isMobile) {
              setShowMobileModal(true);
            } else {
              // Expand sidebar on desktop
              setIsCollapsed(false);
              if (onCollapseChange) {
                onCollapseChange(false);
              }
            }
          }}
          className={`h-full w-12 flex flex-col items-center justify-center cursor-pointer border-r sm:border bg-gradient-to-br ${
            darkMode
              ? "border-gray-700 from-gray-800 to-gray-950 hover:from-gray-750 hover:to-gray-900"
              : "border-gray-200 from-white to-gray-200 hover:from-gray-50 hover:to-gray-100"
          } rounded-none sm:rounded-lg transition-all duration-300`}
        >
          <div
            className={`writing-vertical text-sm font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            My Collections
          </div>
        </div>

        {/* Mobile Modal - Rendered via Portal */}
        {showMobileModal &&
          isMobile &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex"
              onClick={() => setShowMobileModal(false)}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

              {/* Modal Content */}
              <div
                className={`relative w-80 h-full shadow-xl overflow-y-auto ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
                onClick={(e) => e.stopPropagation()}
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
                      onClick={() => setShowMobileModal(false)}
                      className={`p-2 rounded-lg ${
                        darkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-600"
                      } transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {showCreateForm && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <h4
                        className={`text-sm font-semibold mb-2 ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {editingCollection
                          ? "Edit Collection"
                          : "Create Collection"}
                      </h4>
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
                        onChange={(e) =>
                          setNewCollectionDescription?.(e.target.value)
                        }
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
                          {isCreating
                            ? "Saving..."
                            : editingCollection
                            ? "Update"
                            : "Create"}
                        </button>
                        <button
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewCollectionName("");
                            setNewCollectionDescription?.("");
                            if (onEditCollection) {
                              onEditCollection(null); // Clear editing state
                            }
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
                    {filteredCollections.length === 0 ? (
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        } text-center py-4`}
                      >
                        {collections.length === 0
                          ? "No collections yet. Create one!"
                          : "No collections found."}
                      </p>
                    ) : (
                      filteredCollections.map((collection) => (
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
                          onClick={() => handleCollectionClick(collection)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Folder className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium truncate">
                              {collection.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {onEditCollection && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditCollection(collection);
                                  setShowMobileModal(false);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded ${
                                  selectedCollection?._id === collection._id
                                    ? "hover:bg-blue-700 text-white"
                                    : darkMode
                                    ? "hover:bg-gray-600 text-gray-400"
                                    : "hover:bg-gray-200 text-gray-500"
                                } transition-opacity`}
                                title="Edit collection"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
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
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Search and Sort Component - Mobile Modal */}
                  {collections.length > 0 && (
                    <CollectionSearchSort
                      collections={collections}
                      onFilteredCollectionsChange={setFilteredCollections}
                    />
                  )}

                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    } transition-colors`}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Collection</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }

  // Expanded view (full sidebar)
  return (
    <div
      className={`h-full border-r sm:border bg-gradient-to-br ${
        darkMode
          ? "border-gray-700 from-gray-800 to-gray-950"
          : "border-gray-200 from-white to-gray-200"
      } rounded-none sm:rounded-lg transition-all duration-300`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Collapse Button - Full Width */}
        {!isMobile && (
          <button
            onClick={() => {
              setIsCollapsed(true);
              if (onCollapseChange) {
                onCollapseChange(true);
              }
            }}
            className={`w-full mb-4 py-2 px-3 rounded-lg flex items-center justify-center ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            } transition-colors`}
            title="Collapse sidebar"
          >
            <ChevronsLeft className="w-5 h-5" /> ⎯
            <ChevronsRight className="w-5 h-5" />
          </button>
        )}

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
            <h4
              className={`text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {editingCollection ? "Edit Collection" : "Create Collection"}
            </h4>
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
                {isCreating
                  ? "Saving..."
                  : editingCollection
                  ? "Update"
                  : "Create"}
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCollectionName("");
                  setNewCollectionDescription?.("");
                  if (onEditCollection) {
                    onEditCollection(null); // Clear editing state
                  }
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
          {filteredCollections.length === 0 ? (
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } text-center py-4`}
            >
              {collections.length === 0
                ? "No collections yet. Create one!"
                : "No collections found."}
            </p>
          ) : (
            filteredCollections.map((collection) => (
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
                onClick={() => handleCollectionClick(collection)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Folder className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {collection.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {onEditCollection && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCollection(collection);
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded ${
                        selectedCollection?._id === collection._id
                          ? "hover:bg-blue-700 text-white"
                          : darkMode
                          ? "hover:bg-gray-600 text-gray-400"
                          : "hover:bg-gray-200 text-gray-500"
                      } transition-opacity`}
                      title="Edit collection"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
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
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search and Sort Component - Bottom of Sidebar */}
        {!isCollapsed && collections.length > 0 && (
          <CollectionSearchSort
            collections={collections}
            onFilteredCollectionsChange={setFilteredCollections}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
