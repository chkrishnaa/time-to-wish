export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  return "";
};

export const validateAvatar = (file) => {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or PNG file";
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Avatar must be less than 5MB";
  }
  return "";
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Calculate age in years, months, and days
export const calculateDetailedAge = (birthDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const birth = new Date(birthDate);
  birth.setHours(0, 0, 0, 0); // Reset time to start of day
  
  // If birth date is in the future, return 0 age
  if (birth > today) {
    return { years: 0, months: 0, days: 0 };
  }
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Ensure no negative values
  if (years < 0) years = 0;
  if (months < 0) months = 0;
  if (days < 0) days = 0;
  
  return { years, months, days };
};

// Format date as "Month Day, Year" (e.g., "October 13, 2004")
export const formatBirthDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};