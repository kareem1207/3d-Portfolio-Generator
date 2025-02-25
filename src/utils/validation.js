export const validatePortfolioData = (data) => {
  const errors = [];

  if (!data?.userData?.name) {
    errors.push("Name is required");
  }

  if (!data?.userData?.title) {
    errors.push("Professional title is required");
  }

  if (!data?.templateSettings) {
    errors.push("Template settings are required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
