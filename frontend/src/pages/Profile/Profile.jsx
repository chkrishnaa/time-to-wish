import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Mail, Phone, Bell, MapPin, Clock, Palette, Shield, Calendar, User } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import moment from "moment";

const Profile = () => {
  const { darkMode } = useTheme();
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.USER.GET_PROFILE);
      setProfile(res.data);
      // Update auth context with latest profile data
      updateUser(res.data);
    } catch (error) {
      toast.error("Failed to load profile");
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="profile">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout activeMenu="profile">
        <div className="text-center py-12">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Profile not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              My Profile
            </h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              View and manage your profile information
            </p>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div
          className={`rounded-xl border p-6 ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } shadow-sm`}
        >
          {/* Profile Picture and Basic Info */}
          <div className="flex items-start gap-6 mb-8">
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
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {profile.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <Mail className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {profile.email}
                </span>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.accountStatus || "Active")}`}>
                {profile.accountStatus || "Active"}
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profile.phoneNumber || "Not provided"}
              </p>
            </div>

            {/* Location */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <MapPin className="w-4 h-4 inline mr-2" />
                Location / City
              </label>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profile.location || "Not provided"}
              </p>
            </div>

            {/* Notification Preferences */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Bell className="w-4 h-4 inline mr-2" />
                Notification Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.notificationPreferences && profile.notificationPreferences.length > 0 ? (
                  profile.notificationPreferences.map((pref, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs ${
                        darkMode ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {pref}
                    </span>
                  ))
                ) : (
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Not set
                  </span>
                )}
              </div>
            </div>

            {/* Remind Me Time Preference */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Clock className="w-4 h-4 inline mr-2" />
                Remind Me Time
              </label>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profile.remindMeTimePreference || "09:00"}
              </p>
            </div>

            {/* Theme Preference */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Palette className="w-4 h-4 inline mr-2" />
                Theme Preference
              </label>
              <p className={`text-sm capitalize ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profile.themePreference || "system"}
              </p>
            </div>

            {/* Account Created Date */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Calendar className="w-4 h-4 inline mr-2" />
                Account Created
              </label>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {moment(profile.createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>

          {/* About / Bio */}
          {profile.about && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                About / Bio
              </label>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {profile.about}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

