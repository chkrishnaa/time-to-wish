import React, { useState, useEffect } from "react";
import { User, Calendar, Trash2, Edit2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { calculateDetailedAge, formatBirthDate, calculateDaysUntilBirthday } from "../../utils/helper";

const BirthdayCard = ({ birthday, onDelete, onEdit, style }) => {
  const { darkMode } = useTheme();
  const ageDetails = calculateDetailedAge(birthday.date);
  const formattedBirthDate = formatBirthDate(birthday.date);
  
  // Force re-render periodically to update days remaining
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Update every minute to ensure days remaining stays current
  // Also update immediately on mount, when birthday date changes, and when page becomes visible
  useEffect(() => {
    // Update immediately on mount
    setRefreshKey(prev => prev + 1);
    
    // Update every minute to keep countdown current
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 60 * 1000); // Update every minute

    // Update when page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setRefreshKey(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [birthday.date]); // Re-run if birthday date changes

  // Calculate days remaining - this runs on every render with fresh Date()
  // Since we update refreshKey every minute, this will recalculate automatically
  const daysRemaining = calculateDaysUntilBirthday(birthday.date);

  return (
    <div
      className={`rounded-2xl p-5 border card-animate fade-in-up ${
        darkMode
          ? "border-gray-700 bg-gray-800/50"
          : "border-blue-200 bg-blue-50/50"
      } shadow-sm hover:shadow-md relative`}
      style={style}
    >
      {/* Edit and Delete Icons - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(birthday)}
            className={`p-2 rounded-lg btn-animate ${
              darkMode
                ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                : "hover:bg-blue-100 text-gray-600 hover:text-blue-600"
            }`}
            title="Edit birthday"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onDelete(birthday._id)}
          className={`p-2 rounded-lg btn-animate ${
            darkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
              : "hover:bg-blue-100 text-gray-600 hover:text-red-600"
          }`}
          title="Delete birthday"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Header Section */}
      <div className="flex items-start gap-4 mb-4 pr-20">
        {/* Avatar with Profile Photo or User Icon */}
        {birthday.avatar ? (
          <img
            src={birthday.avatar}
            alt={birthday.name}
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-blue-500"
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? "bg-blue-700" : "bg-blue-600"
            }`}
          >
            <User className="w-7 h-7 text-white" />
          </div>
        )}

        {/* Name and Age */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg mb-1 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {birthday.name}
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {ageDetails.years} years, {ageDetails.months} months,{" "}
            {ageDetails.days} days
          </p>
        </div>
      </div>

      {/* Birth Date Section */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar
          className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Born: {formattedBirthDate}
        </span>
      </div>

      {/* Countdown Bar */}
      <div
        className={`rounded-lg px-4 py-3 text-center ${
          darkMode ? "bg-blue-900/50" : "bg-blue-200"
        }`}
      >
        <span
          className={`font-semibold ${
            darkMode ? "text-blue-300" : "text-blue-700"
          }`}
        >
          {daysRemaining === 0 
            ? "🎉 Today is their birthday!" 
            : daysRemaining === 1
            ? "1 day until birthday"
            : `${daysRemaining} days until birthday`}
        </span>
      </div>
    </div>
  );
};

export default BirthdayCard;


