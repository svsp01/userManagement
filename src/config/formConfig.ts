export const formConfig = {
    isEditable: true,
    name: {
      minLength: 2,
      maxLength: 50,
    },
    email: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    linkedinUrl: {
      pattern: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
    },
    pin: {
      pattern: /^\d{6}$/,
    },
  };