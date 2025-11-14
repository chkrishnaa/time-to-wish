import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Popover } from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "../../context/ThemeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CustomDatePicker = ({ value, onChange, maxDate, required, placeholder = "Select date" }) => {
  const { darkMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Convert date string (YYYY-MM-DD) to dayjs object
  const getDateFromString = (dateString) => {
    if (!dateString) return null;
    return dayjs(dateString);
  };

  // Convert maxDate string to dayjs object
  const getMaxDate = () => {
    if (maxDate) {
      if (typeof maxDate === "string") {
        return dayjs(maxDate);
      }
      return dayjs(maxDate);
    }
    return dayjs();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  const selectedDate = getDateFromString(value);

  return (
    <div className="relative group">
      <Calendar
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none transition-all duration-300 z-10 ${
          darkMode ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
        }`}
      />
      <input
        type="text"
        readOnly
        onClick={handleClick}
        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
        placeholder={placeholder}
        required={required}
        className={`date-picker-custom w-full rounded-lg pl-10 pr-10 py-2.5 transition-all duration-300 cursor-pointer ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600 hover:border-blue-500 focus:border-blue-500"
            : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 focus:border-blue-500"
        } border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md`}
      />
      <Calendar
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none transition-all duration-300 z-10 ${
          darkMode ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-700"
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
            <StaticDatePicker
              orientation="landscape"
              value={selectedDate}
              onChange={(newValue) => {
                if (newValue) {
                  const formattedDate = newValue.format("YYYY-MM-DD");
                  const maxDateStr = getMaxDate().format("YYYY-MM-DD");
                  // Only allow dates up to maxDate
                  if (formattedDate <= maxDateStr) {
                    onChange(formattedDate);
                    handleClose();
                  }
                }
              }}
              maxDate={getMaxDate()}
              slotProps={{
                actionBar: {
                  actions: ["today", "cancel", "accept"],
                },
              }}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </Popover>
    </div>
  );
};

export default CustomDatePicker;
