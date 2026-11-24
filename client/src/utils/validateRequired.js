
function validateRequired(value) {
  if (value === null || value === undefined) {
    return false;
  }

  return String(value).trim().length > 0;
}

export default validateRequired;
