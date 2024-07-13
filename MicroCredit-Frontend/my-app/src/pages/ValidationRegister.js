// ValidationUtils.js

export const validateFullName = (fullName) => {
    return fullName.trim().length > 0;
  };
  
  export const validateEmail = (email) => {
    // Basic email validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    // Validate 10-digit phone number
    return /^\d{10}$/.test(phoneNumber);
  };
  
  export const validatePassword = (password) => {
    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateDateOfBirth = (dob) => {
    // Validate age (18 years or older)
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && monthDiff >= 0);
  };
  
  export const validateAddress = (address) => {
    // Basic validation for non-empty address
    return address.trim().length > 0;
  };
  
  export const validateCity = (city) => {
    return city.trim().length > 0;
  };
  
  export const validateState = (state) => {
    return state.trim().length > 0;
  };
  
  export const validatePincode = (pincode) => {
    // Validate 6-digit pincode
    return /^\d{6}$/.test(pincode);
  };
  

  export const validatePanNumber = (panNumber) => {
    // Validate PAN number format (example)
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber);
  };
  