export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/user/profile",
  },

  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },

  BIRTHDAYS: {
    GET_ALL: "/api/birthdays/all",
    ADD: "/api/birthdays/add",
    GET_BY_ID: (id) => `/api/birthdays/${id}`,
    UPDATE: (id) => `/api/birthdays/${id}`,
    DELETE: (id) => `/api/birthdays/${id}`,
  },

  COLLECTIONS: {
    GET_ALL: "/api/collections",
    CREATE: "/api/collections",
    GET_BY_ID: (id) => `/api/collections/${id}`,
    UPDATE: (id) => `/api/collections/${id}`,
    DELETE: (id) => `/api/collections/${id}`,
  },

  // JOBS: {
  //   GET_ALL_JOBS: "/api/jobs",
  //   GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,
  //   POST_JOB: "/api/jobs",
  //   GET_JOBS_EMPLOYER: "/api/jobs/get-jobs-employer",
  //   GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,
  //   UPDATE_JOB: (id) => `/api/jobs/${id}`,
  //   TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
  //   DELETE_JOB: (id) => `/api/jobs/${id}`,
  //   DELETE_JOB: (id) => `/api/jobs/${id}`,

  //   SAVE_JOB: (id) => `/api/saved-jobs/${id}`,
  //   UNSAVE_JOB: (id) => `/api/saved-jobs/${id}`,
  //   GET_SAVED_JOBS: "/api/saved-jobs/my",
  // },

  // APPLICATIONS: {
  //   APPLY_TO_JOB: (id) => `/api/applications/${id}`,
  //   GET_ALL_APPLICATIONS: (id) => `/api/applications/job/${id}`,
  //   UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
  // },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
    UPLOAD_IMAGE_BASE64: "/api/auth/upload-image-base64",
  },

  USER: {
    GET_PROFILE: "/api/user/profile",
    UPDATE_PROFILE: "/api/user/profile",
    SEARCH: "/api/user/search",
  },
};
