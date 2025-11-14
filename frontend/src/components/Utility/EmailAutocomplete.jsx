import React, { useState, useEffect, useRef } from "react";
import { Mail, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const EmailAutocomplete = ({ value, onChange, placeholder = "@", onUserSelect }) => {
  const { darkMode } = useTheme();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchEmails = async () => {
      if (!value || value.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.USER.SEARCH}?query=${encodeURIComponent(value.trim())}`
        );
        setSuggestions(response.data || []);
        setShowSuggestions(response.data && response.data.length > 0);
      } catch (error) {
        console.error("Error searching emails:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchEmails, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleSelect = (user) => {
    // Pass both email and full user data to onChange
    onChange(user.email, user);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClear = () => {
    onChange(""); // Pass empty string when clearing
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <Mail
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          ref={inputRef}
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const emailValue = e.target.value;
            onChange(emailValue); // Pass just email string when typing
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
            darkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
              darkMode
                ? "hover:bg-gray-600 text-gray-400"
                : "hover:bg-gray-100 text-gray-500"
            } transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg border shadow-lg max-h-60 overflow-y-auto ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {suggestions.map((user, index) => (
            <div
              key={index}
              onClick={() => handleSelect(user)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-50"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === suggestions.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || user.email}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <Mail className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {user.name || user.email}
                </p>
                <p
                  className={`text-xs truncate ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg border p-3 text-center ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-400"
              : "bg-white border-gray-200 text-gray-500"
          }`}
        >
          <p className="text-sm">Searching...</p>
        </div>
      )}
    </div>
  );
};

export default EmailAutocomplete;

