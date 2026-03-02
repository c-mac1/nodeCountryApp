export function toCSV(data, excludeFields = []) {
  validateData(data);

  //Ai generated (ish)
  const allHeaders = Object.keys(data[0]);
  const colHeaders = allHeaders.filter(
    (header) => !excludeFields.includes(header),
  );
  const rows = data.map((row) => {
    return colHeaders
      .map((header) => {
        const cell = row[header] !== undefined ? String(row[header]) : "";
        return cell.includes(",") ||
          cell.includes('"') ||
          cell.includes("\n") ||
          cell.includes("\r")
          ? `"${cell.replace(/"/g, '""')}"`
          : cell;
      })
      .join(",");
  });

  return [colHeaders.join(","), ...rows].join("\n");
}

function validateData(data) {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array of objects.");
  }

  if (!data || data.length === 0) {
    throw new Error("No data provided to convert to CSV.");
  }
}
