import React, { useEffect, useState } from "react";
import { User, Settings } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ProfileTab from "./components/ProfileTab";
import SettingsTab from "./components/SettingsTab";

const Profile = () => {
  const { darkMode } = useTheme();
  const { user: authUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.USER.GET_PROFILE);
      if (res.data) {
        setProfile(res.data);
        // Update auth context with latest profile data
        updateUser(res.data);
      } else {
        toast.error("Profile data not available");
        setProfile(null);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load profile";
      toast.error(errorMessage);
      // Don't set profile to null on error, keep loading state
      // This allows retry or shows error message
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="profile">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Loading profile...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!loading && !profile) {
    return (
      <DashboardLayout activeMenu="profile">
        <div className="text-center py-12">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Profile not found
          </p>
          <button
            onClick={fetchProfile}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-4xl mx-auto page-transition">
        {/* Header */}
        <div className="mb-8 fade-in-down">
          <h1
            className={`text-3xl font-bold mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            My Profile
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            View and manage your profile information and settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div
            className={`flex gap-2 p-1 rounded-lg bg-gradient-to-br transition-all duration-300 ${
              darkMode ? "from-gray-800 to-gray-950" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 btn-animate ${
                activeTab === "profile"
                  ? darkMode
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-blue-600 text-white shadow-lg"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 btn-animate ${
                activeTab === "settings"
                  ? darkMode
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-blue-600 text-white shadow-lg"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div
          className={`rounded-xl border p-6 bg-gradient-to-br transition-all duration-300 fade-in-up card-animate ${
            darkMode
              ? "from-gray-800 to-gray-950 border-gray-700"
              : "from-gray-100 to-blue-200 border-blue-300"
          } shadow-sm`}
          style={{ animationDelay: "0.2s" }}
        >
          {activeTab === "profile" ? (
            <ProfileTab profile={profile} darkMode={darkMode} />
          ) : (
            <SettingsTab
              profile={profile}
              darkMode={darkMode}
              onUpdate={handleProfileUpdate}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

