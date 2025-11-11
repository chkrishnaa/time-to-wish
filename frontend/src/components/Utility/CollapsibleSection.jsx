import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CollapsibleSection = ({ title, children, defaultOpen = false, onToggle }) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Sync with defaultOpen prop changes
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={`mb-4 rounded-lg border overflow-hidden ${
      darkMode
        ? "border-gray-700 bg-gray-800/50"
        : "border-gray-200 bg-gray-50/50"
    }`}>
      {/* Header Bar */}
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
          darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-100"
        }`}
      >
        <span
          className={`font-semibold text-sm ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronUp
            className={`w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
        ) : (
          <ChevronDown
            className={`w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className={`px-4 py-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;

