import fs from "fs";
import path from "path";
import { toCSV } from "./toCSV.js";

export async function writeCSVFile(data, outputPath) {
  try {
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });
    // Generate and write CSV (exclude flag field)
    const csvData = toCSV(data, ["flag"]);
    fs.writeFileSync(outputPath, csvData, "utf8");
  } catch (error) {
    throw new Error(`Failed to write CSV file: ${error.message}`);
  }
}
