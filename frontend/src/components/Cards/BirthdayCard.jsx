import React from "react";
import { User, Calendar, Trash2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { calculateDetailedAge, formatBirthDate } from "../../utils/helper";

const BirthdayCard = ({ birthday, onDelete }) => {
  const { darkMode } = useTheme();
  const ageDetails = calculateDetailedAge(birthday.date);
  const formattedBirthDate = formatBirthDate(birthday.date);

  return (
    <div
      className={`rounded-2xl p-5 border ${
        darkMode
          ? "border-gray-700 bg-gray-800/50"
          : "border-blue-200 bg-blue-50/50"
      } shadow-sm hover:shadow-md transition-shadow relative`}
    >
      {/* Delete Icon - Top Right */}
      <button
        onClick={() => onDelete(birthday._id)}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
          darkMode
            ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
            : "hover:bg-blue-100 text-gray-600 hover:text-red-600"
        }`}
        title="Delete birthday"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Header Section */}
      <div className="flex items-start gap-4 mb-4 pr-8">
        {/* Avatar with Cake Icon */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
            darkMode ? "bg-blue-700" : "bg-blue-600"
          }`}
        >
          <User className="w-7 h-7 text-white" />
        </div>

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
            {ageDetails.years} years, {ageDetails.months} months, {ageDetails.days}{" "}
            days
          </p>
        </div>
      </div>

      {/* Birth Date Section */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar
          className={`w-4 h-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
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
          {birthday.remainingTime} days until birthday
        </span>
      </div>
    </div>
  );
};

export default BirthdayCard;


