import React, { useState, useEffect } from "react";
import { Bell, Clock, Palette, Sun, Moon, Monitor } from "lucide-react";
import CustomTimePicker from "../../../components/Input/TimePicker";
import { useTheme } from "../../../context/ThemeContext";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const SettingsTab = ({ profile, darkMode, onUpdate }) => {
  const { themePreference, setThemePreference } = useTheme();
  const { updateUser } = useAuth();
  const [notificationPreferences, setNotificationPreferences] = useState(
    profile.notificationPreferences || ["Email"]
  );
  const [remindMeTime, setRemindMeTime] = useState(
    profile.remindMeTimePreference || "09:00"
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotificationPreferences(profile.notificationPreferences || ["Email"]);
    setRemindMeTime(profile.remindMeTimePreference || "09:00");
  }, [profile]);

  const handleNotificationChange = (value) => {
    if (value === "All") {
      setNotificationPreferences(
        notificationPreferences.includes("All") ? [] : ["All"]
      );
    } else {
      const filtered = notificationPreferences.filter((item) => item !== "All");
      if (filtered.includes(value)) {
        setNotificationPreferences(filtered.filter((item) => item !== value));
      } else {
        setNotificationPreferences([...filtered, value]);
      }
    }
  };

  const handleThemeChange = async (preference) => {
    setThemePreference(preference);
    try {
      setSaving(true);
      const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        themePreference: preference,
      });
      updateUser(res.data);
      toast.success("Theme preference updated");
    } catch (error) {
      toast.error("Failed to update theme preference");
      console.error("Theme update error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReminderChange = async (time) => {
    setRemindMeTime(time);
    try {
      setSaving(true);
      const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        remindMeTimePreference: time,
      });
      updateUser(res.data);
      toast.success("Reminder time updated");
    } catch (error) {
      toast.error("Failed to update reminder time");
      console.error("Reminder update error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationSave = async () => {
    try {
      setSaving(true);
      const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        notificationPreferences,
      });
      updateUser(res.data);
      toast.success("Notification preferences updated");
      if (onUpdate) onUpdate(res.data);
    } catch (error) {
      toast.error("Failed to update notification preferences");
      console.error("Notification update error:", error);
    } finally {
      setSaving(false);
    }
  };

  const ThemePreview = ({ theme, label, icon: Icon }) => {
    const isSelected = themePreference === theme;
    const isSystem = theme === "system";
    const previewDarkMode = theme === "dark" || (isSystem && darkMode);

    return (
      <button
        onClick={() => handleThemeChange(theme)}
        disabled={saving}
        className={`relative p-4 rounded-xl border-2 transition-all duration-300 card-animate ${
          isSelected
            ? darkMode
              ? "border-blue-500 bg-blue-900/20 shadow-lg"
              : "border-blue-500 bg-blue-50 shadow-lg"
            : darkMode
            ? "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <Icon
            className={`w-5 h-5 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <span
            className={`font-medium ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {label}
          </span>
          {isSelected && (
            <div
              className={`ml-auto w-2 h-2 rounded-full ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              }`}
            />
          )}
        </div>
        {/* Preview Window */}
        <div
          className={`rounded-lg p-3 border ${
            previewDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div
            className={`text-xs font-medium mb-2 ${
              previewDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Preview
          </div>
          <div
            className={`rounded p-2 ${
              previewDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border`}
          >
            <div
              className={`text-xs ${
                previewDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sample content
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div className="fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell
            className={`w-5 h-5 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          />
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Notification Preferences
          </h3>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-4">
          {["Email", "SMS", "Push", "All"].map((option, index) => (
            <label
              key={option}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 fade-in-up ${
                darkMode
                  ? "hover:bg-gray-700/50"
                  : "hover:bg-gray-100"
              }`}
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              <input
                type="checkbox"
                checked={notificationPreferences.includes(option)}
                onChange={() => handleNotificationChange(option)}
                className={`w-4 h-4 rounded focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-blue-500"
                    : "bg-white border-gray-300 text-blue-600"
                }`}
              />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={handleNotificationSave}
          disabled={saving}
          className={`mt-4 px-4 py-2 rounded-lg font-medium btn-animate ${
            saving
              ? "bg-gray-400 cursor-not-allowed text-white"
              : darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      {/* Reminder Settings */}
      <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Clock
            className={`w-5 h-5 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          />
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Set Reminder
          </h3>
        </div>
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          darkMode
            ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
            : "bg-gray-50/50 border-gray-200 hover:border-gray-300"
        }`}>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <CustomTimePicker
                value={remindMeTime}
                onChange={handleReminderChange}
                disabled={saving}
                placeholder="Select reminder time"
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Daily reminder time
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                You'll receive notifications at this time every day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility - Theme */}
      <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Palette
            className={`w-5 h-5 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          />
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Accessibility (Theme)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ThemePreview theme="light" label="Light Theme" icon={Sun} />
          <ThemePreview theme="dark" label="Dark Theme" icon={Moon} />
          <ThemePreview theme="system" label="System Default" icon={Monitor} />
        </div>
        <p
          className={`mt-3 text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          System Default follows your device's theme preference
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;

