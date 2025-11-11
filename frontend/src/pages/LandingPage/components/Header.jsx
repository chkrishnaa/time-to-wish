import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cake } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ToggleMode from "./Toggle/ToggleMode";
import { useTheme } from "../../../context/ThemeContext";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-blue-800"
                  : "from-blue-600 to-blue-700"
              } rounded-lg flex items-center justify-center`}
            >
              <Cake
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-200" : "text-white"
                }`}
              />
            </div>
            <span
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              } hidden sm:inline`}
            >
              TimeToWish
            </span>
          </div>


          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } hidden sm:inline`}
                >
                  Continue to
                </span>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-md bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-700 to-blue-800 text-white hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900"
                      : "from-blue-600 to-blue-700 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800"
                  } transition-colors font-medium shadow-sm hover:shadow-md`}
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className={`${
                    darkMode
                      ? "text-gray-200 hover:text-gray-50 hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  } transition-colors font-medium px-4 py-2 rounded-lg`}
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className={`bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-gray-100"
                      : "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  } px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md mr-3 whitespace-nowrap`}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          <ToggleMode className="scale-75" />
        </div>
      </div>
    </motion.header>
  );
}
