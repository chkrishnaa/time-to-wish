import React, { useState } from "react";
import { Edit, Mail, Phone, MapPin, Calendar, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/phoneFormatter";
import moment from "moment";

const ProfileTab = ({ profile, darkMode }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return darkMode
          ? "bg-green-900/50 text-green-300"
          : "bg-green-100 text-green-800";
      case "Inactive":
        return darkMode
          ? "bg-yellow-900/50 text-yellow-300"
          : "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return darkMode
          ? "bg-red-900/50 text-red-300"
          : "bg-red-100 text-red-800";
      default:
        return darkMode
          ? "bg-gray-700 text-gray-200"
          : "bg-gray-100 text-gray-800";
    }
  };

  const getLocationDisplay = () => {
    const parts = [];
    if (profile.city) parts.push(profile.city);
    if (profile.state) parts.push(profile.state);
    if (profile.country) parts.push(profile.country);
    if (parts.length > 0) return parts.join(", ");
    if (profile.location) return profile.location;
    return "Not provided";
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture and Basic Info */}
      <div className="flex items-start gap-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center border-2 border-blue-500">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {profile.name}
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <Mail
              className={`w-4 h-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {profile.email}
            </span>
          </div>
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              profile.accountStatus || "Active"
            )}`}
          >
            {profile.accountStatus || "Active"}
          </div>
        </div>
        <button
          onClick={() => navigate("/profile/edit")}
          className={`px-4 py-2 rounded-lg font-medium btn-animate flex items-center gap-2 ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* About / Bio */}
      {profile.about && (
        <div
          className={`pt-6 border-t fade-in-up ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <label
            className={`text-sm font-medium mb-2 block ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            About / Bio
          </label>
          <p
            className={`text-sm leading-relaxed ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {profile.about}
          </p>
        </div>
      )}

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
        {/* Phone Number */}
        <div>
          <label
            className={`text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone Number
          </label>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {profile.phoneNumber
              ? formatPhoneNumber(profile.phoneNumber)
              : "Not provided"}
          </p>
        </div>

        {/* Location */}
        <div>
          <label
            className={`text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {getLocationDisplay()}
            {profile.countryCode && ` (${profile.countryCode})`}
          </p>
        </div>

        {/* Account Created Date */}
        <div>
          <label
            className={`text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Account Created
          </label>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {moment(profile.createdAt).format("MMMM D, YYYY")}
          </p>
        </div>

        {/* Last Login */}
        <div>
          <label
            className={`text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <Clock className="w-4 h-4" />
            Last Login
          </label>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {profile.lastLogin
              ? moment(profile.lastLogin).format("MMMM D, YYYY [at] h:mm A")
              : "Never"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

