import fs from "fs";
import path from "path";
import { toHTML } from "./toHTML.js";
import { logger } from "../../utils/logger.js";

export async function writeHTMLFile(
  data,
  outputPath,
  title = "Countries Report",
) {
  try {
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });

    // Generate and write HTML
    const htmlData = toHTML(data, title);
    fs.writeFileSync(outputPath, htmlData, "utf8");
  } catch (error) {
    logger.error("Failed to write HTML file:", error.message);
    throw new Error(`Failed to write HTML file: ${error.message}`);
  }
}
