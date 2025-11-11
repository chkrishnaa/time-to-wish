import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import { parsePhoneNumber, formatPhoneNumber } from "../../utils/phoneFormatter";
import { getCountryCode, getCountryNames } from "../../utils/countryCodes";

const EditProfile = () => {
  const { darkMode } = useTheme();
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    notificationPreferences: [],
    about: "",
    location: "",
    city: "",
    state: "",
    country: "",
    countryCode: "",
    remindMeTimePreference: "09:00",
    themePreference: "system",
    avatar: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    checkForChanges();
  }, [formData, originalData]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.USER.GET_PROFILE);
      const profile = res.data;
      
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        notificationPreferences: profile.notificationPreferences || ["Email"],
        about: profile.about || "",
        location: profile.location || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        countryCode: profile.countryCode || "",
        remindMeTimePreference: profile.remindMeTimePreference || "09:00",
        themePreference: profile.themePreference || "system",
        avatar: profile.avatar || "",
      });

      setOriginalData({
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        notificationPreferences: profile.notificationPreferences || ["Email"],
        about: profile.about || "",
        location: profile.location || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        countryCode: profile.countryCode || "",
        remindMeTimePreference: profile.remindMeTimePreference || "09:00",
        themePreference: profile.themePreference || "system",
        avatar: profile.avatar || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkForChanges = () => {
    if (!originalData) return;
    
    const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(changed);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto-set country code when country is selected
      if (name === "country" && value) {
        const code = getCountryCode(value);
        if (code) {
          newData.countryCode = code;
        }
      }
      
      return newData;
    });
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const current = prev.notificationPreferences || [];
      if (value === "All") {
        return {
          ...prev,
          notificationPreferences: current.includes("All") ? [] : ["All"],
        };
      }
      
      const filtered = current.filter((item) => item !== "All");
      if (filtered.includes(value)) {
        return {
          ...prev,
          notificationPreferences: filtered.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          notificationPreferences: [...filtered, value],
        };
      }
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        avatar: response.imageUrl || response.url,
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to upload image");
      console.error("Image upload error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    try {
      setLoading(true);
      const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, formData);
      updateUser(res.data);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
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

  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
            </button>
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Edit Profile
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Update your profile information
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className={`rounded-xl border p-6 bg-gradient-to-br ${
              darkMode ? "from-gray-800 to-gray-950 border-gray-700" : "from-gray-100 to-blue-200 border-blue-300"
            } space-y-6`}
          >
            {/* Profile Picture */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {formData.avatar ? (
                    <div className="relative">
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center border-2 border-blue-500">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="avatar-upload"
                    className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer inline-block ${
                      uploadingImage
                        ? "bg-gray-400 cursor-not-allowed"
                        : darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700/50 text-gray-400 border-gray-600 cursor-not-allowed"
                    : "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+91 - 12345 67890"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formData.phoneNumber && (
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Formatted: {formatPhoneNumber(formData.phoneNumber)}
                </p>
              )}
            </div>

            {/* Notification Preferences */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Notification Preferences
              </label>
              <div className="space-y-2">
                {["Email", "SMS", "Push", "All"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 cursor-pointer ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.notificationPreferences.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  City (Optional)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* State */}
              <div>
                <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  State (Optional)
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Country */}
              <div>
                <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Country (Optional)
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Country</option>
                  {getCountryNames().map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {formData.country && formData.countryCode && (
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Country Code: {formData.countryCode}
                  </p>
                )}
              </div>
            </div>

            {/* Remind Me Time Preference */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Remind Me Time Preference
              </label>
              <input
                type="time"
                name="remindMeTimePreference"
                value={formData.remindMeTimePreference}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Theme Preference */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Theme Preference
              </label>
              <select
                name="themePreference"
                value={formData.themePreference}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* About / Bio */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                About / Bio / Description (Optional)
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className={`w-full px-4 py-2 rounded-lg border resize-none ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasChanges || loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  !hasChanges || loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;

