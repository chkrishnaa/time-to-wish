import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown, ArrowUpAZ, ArrowDownAZ, Clock, ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const BirthdaySearchSort = ({ 
  birthdays, 
  onFilteredBirthdaysChange, 
  itemsPerPage,
  onItemsPerPageChange 
}) => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name' or 'createdAt'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  useEffect(() => {
    let filtered = [...birthdays];

    // Apply name search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((birthday) =>
        birthday.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    // Apply date search filter
    if (searchDate) {
      filtered = filtered.filter((birthday) => {
        // Extract year-month-day from birthday date
        const birthdayDate = new Date(birthday.date);
        const searchDateObj = new Date(searchDate);
        
        // Compare only year, month, and day (ignore time)
        return (
          birthdayDate.getFullYear() === searchDateObj.getFullYear() &&
          birthdayDate.getMonth() === searchDateObj.getMonth() &&
          birthdayDate.getDate() === searchDateObj.getDate()
        );
      });
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

    onFilteredBirthdaysChange(filtered);
  }, [birthdays, searchQuery, searchDate, sortBy, sortOrder, onFilteredBirthdaysChange]);

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
    <div className="space-y-3 mb-6">
      {/* Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Name Search */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm border ${
              darkMode
                ? "bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-500"
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Date Search */}
        <div className="relative">
          <Calendar
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="date"
            placeholder="Search by date..."
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm border ${
              darkMode
                ? "bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-500"
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      {/* Sort Options and Items Per Page */}
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
            <span>{sortBy === "name" ? (sortOrder === "asc" ? "A-Z" : "Z-A") : "A-Z"}</span>
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

        {/* Items Per Page Selector */}
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Birthdays Per page :
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className={`px-3 py-2 rounded-lg text-sm border ${
                darkMode
                  ? "bg-gray-800 text-gray-200 border-gray-600"
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
        )}
      </div>
    </div>
  );
};

export default BirthdaySearchSort;

