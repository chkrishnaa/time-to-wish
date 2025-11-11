import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get theme preference from localStorage or default to "system"
  const getStoredTheme = () => {
    return localStorage.getItem("themePreference") || "system";
  };

  // Get actual dark mode state based on theme preference
  const getDarkModeFromPreference = (preference) => {
    if (preference === "dark") return true;
    if (preference === "light") return false;
    // "system" - use system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [themePreference, setThemePreference] = useState(getStoredTheme);
  const [darkMode, setDarkMode] = useState(() =>
    getDarkModeFromPreference(getStoredTheme())
  );

  // Update dark mode when theme preference changes
  useEffect(() => {
    const newDarkMode = getDarkModeFromPreference(themePreference);
    setDarkMode(newDarkMode);
  }, [themePreference]);

  // Listen to system theme changes when preference is "system"
  useEffect(() => {
    if (themePreference !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themePreference]);

  // Apply dark mode class to document
  useEffect(() => {
    const cls = document.documentElement.classList;
    if (darkMode) {
      cls.add("dark");
    } else {
      cls.remove("dark");
    }
  }, [darkMode]);

  const setTheme = (preference) => {
    setThemePreference(preference);
    localStorage.setItem("themePreference", preference);
  };

  const toggleDarkMode = () => {
    const newPreference = darkMode ? "light" : "dark";
    setTheme(newPreference);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        themePreference,
        setThemePreference: setTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
