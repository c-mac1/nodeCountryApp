export function validateData(data) {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array of objects.");
  }

  if (!data || data.length === 0) {
    throw new Error("No data provided to convert to CSV.");
  }
}
