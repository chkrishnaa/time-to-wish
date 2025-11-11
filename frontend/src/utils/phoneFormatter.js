// Format phone number as +91 - 12345 67890
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, "");
  
  if (digits.length === 0) return "";
  
  // If starts with country code (assuming 2-3 digits)
  if (digits.length > 10) {
    // Extract country code (first 2-3 digits) and number
    const countryCode = digits.slice(0, digits.length - 10);
    const number = digits.slice(digits.length - 10);
    
    // Format number as 12345 67890
    const formattedNumber = `${number.slice(0, 5)} ${number.slice(5)}`;
    
    return `+${countryCode} - ${formattedNumber}`;
  } else {
    // Format as 12345 67890
    const formattedNumber = `${digits.slice(0, 5)} ${digits.slice(5)}`;
    return formattedNumber;
  }
};

// Parse formatted phone number back to digits
export const parsePhoneNumber = (formattedPhone) => {
  if (!formattedPhone) return "";
  return formattedPhone.replace(/\D/g, "");
};

