import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { useTheme } from "../../context/ThemeContext";
import InputType from "../../components/Input/InputType";
import AuthCommonConponent from "../../components/Input/AuthCommonComponent";

const SignUp = () => {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    avatarPreview: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: !formData.email ? "Enter email" : "",
      password: !formData.password ? "Enter password" : "",
    };

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFormState((prev) => ({
      ...prev,
      errors,
    }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      let avatarUrl = "";

      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || imgUploadRes.imgUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        avatar: avatarUrl,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      const { token } = response.data;
      if (token) {
        login(response.data, token);
        navigate("/birthdays", { replace: true });
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Registration failed. Please, enter valid credentials.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
          darkMode
            ? "from-blue-900 via-black to-blue-950"
            : "from-blue-100 via-white to-blue-200"
        } px-4`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            darkMode
              ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
              : "bg-white shadow-lg"
          } p-8 rounded-xl w-full max-w-md text-center`}
        >
          <CheckCircle
            className={`w-16 h-16 ${
              darkMode ? "text-green-600" : "text-green-500"
            } mx-auto mb-4`}
          />
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-300" : "text-gray-900"
            } mb-2`}
          >
            Account Created!
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
            Welcome! Your account has been successfully created.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } mt-2`}
          >
            Redirecting to your dashboard ...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
        darkMode
          ? "from-blue-900 via-black to-blue-950"
          : "from-blue-100 via-white to-blue-200"
      } px-2 sm:px-4 py-[100px]`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${
          darkMode
            ? "bg-gray-900 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
            : "bg-white shadow-lg"
        } p-5 sm:p-8 rounded-xl w-full max-w-md`}
      >
        <div className="text-center mb-8">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-300" : "text-gray-900"
            } mb-2`}
          >
            Create an Account
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Sign up to track and celebrate birthdays with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <InputType
            label="Full Name"
            type="text"
            name="fullName"
            icon={User}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={formState.errors.fullName}
            required
          />

          {/* Email */}
          <InputType
            label="Email Address"
            type="email"
            name="email"
            icon={Mail}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={formState.errors.email}
            required
          />

          {/* Password */}
          <InputType
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={formState.errors.password}
            required
          />

          {/* Avatar Upload */}
          <div className="">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } flex items-center justify-center overflow-hidden`}
              >
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    className={`w-8 h-8 ${
                      darkMode ? "text-gray-300" : "text-gray-400"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className={`cursor-pointer border ${
                    darkMode
                      ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700"
                      : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                  } rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </label>
              </div>
            </div>
            {formState.errors.avatar && (
              <p
                className={`${
                  darkMode ? "text-red-400" : "text-red-500"
                } text-sm mt-1 flex items-center`}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.avatar}
              </p>
            )}
          </div>

          <AuthCommonConponent
            darkMode={darkMode}
            formState={formState}
            message={formState.errors.submit}
            submitLabel="Create Account"
            loadingLabel="Creating Account ..."
            dividerLabel="or Create with"
            bottomText="Already have an account?"
            bottomLinkText="Sign In"
            bottomLinkHref="/login"
            showTerms={true}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
