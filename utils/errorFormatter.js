
const errorFormatter = (error) => {
  error=error.message;
  let errors = {};
  const allErrors = error
    .substring(error.indexOf(":") + 1)
    .trim()
    .split(",");
  allErrors.forEach((err) => err.trim);
  allErrors.forEach((error) => {
    const [key, value] = error.split(":").map((item) => item.trim());
    errors[key] = value;
  });
  return errors;
};

module.exports = errorFormatter;