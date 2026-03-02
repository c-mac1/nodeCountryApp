import { logger } from "../../utils/logger.js";
import { validateData } from "../../utils/validateData.js";

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

  logger.success("CSV document generated successfully");

  return [colHeaders.join(","), ...rows].join("\n");
}
