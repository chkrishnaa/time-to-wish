import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown, ArrowUpAZ, ArrowDownAZ, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CollectionSearchSort = ({ 
  collections, 
  onFilteredCollectionsChange, 
  isDashboard = false
}) => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name' or 'createdAt'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  useEffect(() => {
    let filtered = [...collections];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else if (sortBy === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (sortOrder === "asc") {
          return dateA - dateB; // Oldest first
        } else {
          return dateB - dateA; // Newest first
        }
      }
      return 0;
    });

    onFilteredCollectionsChange(filtered);
  }, [collections, searchQuery, sortBy, sortOrder, onFilteredCollectionsChange]);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same sort type
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort type with default ascending
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <div className={`space-y-3 ${!isDashboard ? `${darkMode ? "border-gray-700" : "border-gray-200"} border-t pt-3` : ""}`}>
      {/* Search Input */}
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm border ${
            darkMode
              ? "bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-500"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {/* Sort Options */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSortChange("name")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "name"
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            title={sortBy === "name" && sortOrder === "asc" ? "A-Z" : "Z-A"}
          >
            {sortBy === "name" && sortOrder === "asc" ? (
              <ArrowUpAZ className="w-4 h-4" />
            ) : sortBy === "name" && sortOrder === "desc" ? (
              <ArrowDownAZ className="w-4 h-4" />
            ) : (
              <ArrowUpDown className="w-4 h-4" />
            )}
            <span>{sortBy === "name" ? (sortOrder === "asc" ? "Z-A" : "A-Z") : "A-Z"}</span>
          </button>

          <button
            onClick={() => handleSortChange("createdAt")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "createdAt"
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            title={
              sortBy === "createdAt" && sortOrder === "desc"
                ? "Newest First"
                : "Oldest First"
            }
          >
            {sortBy === "createdAt" && sortOrder === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : sortBy === "createdAt" && sortOrder === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <span>
              {sortBy === "createdAt" 
                ? (sortOrder === "desc" ? "Newest" : "Oldest") 
                : "Date"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionSearchSort;

