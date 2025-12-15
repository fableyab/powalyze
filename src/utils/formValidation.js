
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  
  if (password.length < minLength) return { valid: false, error: "Password too short" };
  if (!hasUpperCase) return { valid: false, error: "Needs uppercase letter" };
  if (!hasLowerCase) return { valid: false, error: "Needs lowercase letter" };
  if (!hasNumbers) return { valid: false, error: "Needs a number" };
  if (!hasNonalphas) return { valid: false, error: "Needs a special character" };
  
  return { valid: true };
};

export const validatePhone = (phone) => {
  // Basic validation for Swiss/International formats
  const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
  return re.test(phone) || phone.length > 9;
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (!password) return 0;
  if (password.length > 8) score += 1;
  if (password.length > 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 5); // 0-5 scale
};
