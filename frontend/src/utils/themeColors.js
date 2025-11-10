/**
 * Blue Theme Color Constants
 * Centralized color system for the entire application
 * All blue colors used throughout the app are defined here
 */

// Blue Theme Colors (Active)
export const blueTheme = {
  // Base Blue Colors
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb', // Primary
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

// Primary color (most commonly used)
export const primaryColor = blueTheme[600];
export const primaryHover = blueTheme[700];
export const primaryDark = blueTheme[800];

// Purple Theme Colors (Commented - Keep for reference)
/* export const purpleTheme = {
  // Base Purple Colors
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea', // Primary
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
}; */

// Purple Primary colors (Commented - Keep for reference)
/* export const primaryColor = purpleTheme[600];
export const primaryHover = purpleTheme[700];
export const primaryDark = purpleTheme[800]; */

// Gradient combinations (Blue Theme)
export const gradients = {
  light: {
    from: blueTheme[600],
    to: blueTheme[700],
  },
  dark: {
    from: blueTheme[700],
    to: blueTheme[800],
  },
  subtle: {
    from: blueTheme[100],
    to: blueTheme[200],
  },
  accent: {
    from: blueTheme[200],
    to: blueTheme[400],
  },
};

// Focus ring colors (Blue Theme)
export const focusColors = {
  ring: blueTheme[500],
  ringLight: blueTheme[400],
};

// Background colors for different states (Blue Theme)
export const backgrounds = {
  light: blueTheme[100],
  medium: blueTheme[200],
  dark: blueTheme[700],
  darkHover: blueTheme[800],
};

// Text colors (Blue Theme)
export const textColors = {
  light: blueTheme[600],
  medium: blueTheme[700],
  dark: blueTheme[800],
  onLight: blueTheme[900],
};

// Border colors (Blue Theme)
export const borderColors = {
  light: blueTheme[300],
  medium: blueTheme[500],
  dark: blueTheme[600],
};

// Purple Theme Gradients (Commented - Keep for reference)
/* export const gradients = {
  light: {
    from: purpleTheme[600],
    to: purpleTheme[700],
  },
  dark: {
    from: purpleTheme[700],
    to: purpleTheme[800],
  },
  subtle: {
    from: purpleTheme[100],
    to: purpleTheme[200],
  },
  accent: {
    from: purpleTheme[200],
    to: purpleTheme[400],
  },
}; */

// Purple Focus ring colors (Commented - Keep for reference)
/* export const focusColors = {
  ring: purpleTheme[500],
  ringLight: purpleTheme[400],
}; */

// Purple Background colors (Commented - Keep for reference)
/* export const backgrounds = {
  light: purpleTheme[100],
  medium: purpleTheme[200],
  dark: purpleTheme[700],
  darkHover: purpleTheme[800],
}; */

// Purple Text colors (Commented - Keep for reference)
/* export const textColors = {
  light: purpleTheme[600],
  medium: purpleTheme[700],
  dark: purpleTheme[800],
  onLight: purpleTheme[900],
}; */

// Purple Border colors (Commented - Keep for reference)
/* export const borderColors = {
  light: purpleTheme[300],
  medium: purpleTheme[500],
  dark: purpleTheme[600],
}; */

// Tailwind class helpers (Blue Theme)
export const tailwindClasses = {
  // Buttons
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    primaryDark: 'bg-blue-700 hover:bg-blue-800 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-100',
  },
  
  // Gradients
  gradient: {
    light: 'from-blue-600 to-blue-700',
    dark: 'from-blue-700 to-blue-800',
    hoverLight: 'hover:from-blue-700 hover:to-blue-800',
    hoverDark: 'hover:from-blue-800 hover:to-blue-900',
  },
  
  // Focus states
  focus: {
    ring: 'focus:ring-2 focus:ring-blue-500',
    border: 'focus:border-blue-500',
  },
  
  // Backgrounds
  bg: {
    light: 'bg-blue-100',
    medium: 'bg-blue-200',
    dark: 'bg-blue-600',
    darkHover: 'hover:bg-blue-700',
  },
  
  // Text
  text: {
    light: 'text-blue-600',
    medium: 'text-blue-700',
    dark: 'text-blue-800',
    onLight: 'text-blue-900',
  },
  
  // Borders
  border: {
    light: 'border-blue-300',
    medium: 'border-blue-500',
    dark: 'border-blue-600',
  },
};

// Purple Tailwind class helpers (Commented - Keep for reference)
/* export const tailwindClasses = {
  // Buttons
  button: {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    primaryDark: 'bg-purple-700 hover:bg-purple-800 text-white',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-100',
  },
  
  // Gradients
  gradient: {
    light: 'from-purple-600 to-purple-700',
    dark: 'from-purple-700 to-purple-800',
    hoverLight: 'hover:from-purple-700 hover:to-purple-800',
    hoverDark: 'hover:from-purple-800 hover:to-purple-900',
  },
  
  // Focus states
  focus: {
    ring: 'focus:ring-2 focus:ring-purple-500',
    border: 'focus:border-purple-500',
  },
  
  // Backgrounds
  bg: {
    light: 'bg-purple-100',
    medium: 'bg-purple-200',
    dark: 'bg-purple-600',
    darkHover: 'hover:bg-purple-700',
  },
  
  // Text
  text: {
    light: 'text-purple-600',
    medium: 'text-purple-700',
    dark: 'text-purple-800',
    onLight: 'text-purple-900',
  },
  
  // Borders
  border: {
    light: 'border-purple-300',
    medium: 'border-purple-500',
    dark: 'border-purple-600',
  },
}; */

// Helper function to get gradient classes based on dark mode
export const getGradientClasses = (darkMode = false) => {
  if (darkMode) {
    return {
      base: tailwindClasses.gradient.dark,
      hover: tailwindClasses.gradient.hoverDark,
    };
  }
  return {
    base: tailwindClasses.gradient.light,
    hover: tailwindClasses.gradient.hoverLight,
  };
};

// Helper function to get button classes
export const getButtonClasses = (variant = 'primary', darkMode = false) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg';
  
  if (variant === 'primary') {
    return `${baseClasses} ${darkMode ? tailwindClasses.button.primaryDark : tailwindClasses.button.primary}`;
  }
  
  if (variant === 'outline') {
    return `${baseClasses} ${tailwindClasses.button.outline}`;
  }
  
  return baseClasses;
};

export default {
  blueTheme, // Changed from purpleTheme
  // purpleTheme, // Commented - Keep for reference
  primaryColor,
  primaryHover,
  primaryDark,
  gradients,
  focusColors,
  backgrounds,
  textColors,
  borderColors,
  tailwindClasses,
  getGradientClasses,
  getButtonClasses,
};

