import React, { useState } from "react";
import { Clock } from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { Popover } from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "../../context/ThemeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CustomTimePicker = ({ value, onChange, disabled, placeholder = "Select time" }) => {
  const { darkMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Convert time string (HH:mm) to dayjs object
  const getTimeFromString = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":");
    return dayjs().hour(parseInt(hours, 10)).minute(parseInt(minutes, 10)).second(0);
  };

  // Convert dayjs object to time string (HH:mm)
  const getStringFromTime = (date) => {
    if (!date) return "";
    return date.format("HH:mm");
  };

  const handleClick = (event) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Create MUI theme based on app theme
  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2563eb", // blue-600
      },
    },
  });

  const selectedTime = getTimeFromString(value);
  const displayValue = value ? dayjs(`2000-01-01 ${value}`).format("hh:mm A") : "";

  return (
    <div className="relative group">
      <Clock
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-all duration-300 z-10 ${
          darkMode ? "text-blue-400 group-hover:text-blue-300 group-hover:scale-110" : "text-blue-600 group-hover:text-blue-700 group-hover:scale-110"
        }`}
      />
      <input
        type="text"
        readOnly
        onClick={handleClick}
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        className={`time-picker-custom w-full pl-11 pr-11 py-3 rounded-lg border font-medium transition-all duration-300 cursor-pointer ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600 hover:border-blue-500 focus:border-blue-500"
            : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 focus:border-blue-500"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      <Clock
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-all duration-300 z-10 ${
          darkMode ? "text-blue-400 group-hover:text-blue-300 group-hover:scale-110" : "text-blue-600 group-hover:text-blue-700 group-hover:scale-110"
        }`}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            borderRadius: "0.75rem",
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <ThemeProvider theme={muiTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
              value={selectedTime}
              onChange={(newValue) => {
                if (newValue) {
                  const timeString = getStringFromTime(newValue);
                  onChange(timeString);
                  handleClose();
                }
              }}
              slotProps={{
                actionBar: {
                  actions: ["cancel", "accept"],
                },
              }}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </Popover>
    </div>
  );
};

export default CustomTimePicker;
