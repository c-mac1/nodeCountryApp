import { writeCSVFile } from "./csv/csvWriter.js";
import { writeHTMLFile } from "./html/htmlWriter.js";
import { checkAnyFilesExist, askOverwrite } from "../utils/filePrompts.js";

export async function writeAllFiles(data, options = {}) {
  const {
    csvPath = "./output/european_countries.csv",
    htmlPath = "./output/countries.html",
    htmlTitle = "European Countries Report",
  } = options;

  // Check for existing files and ask user once
  const outputPaths = [csvPath, htmlPath];
  if (checkAnyFilesExist(outputPaths)) {
    const shouldOverwrite = await askOverwrite("output files");
    if (!shouldOverwrite) {
      console.log("File generation cancelled.");
      return false;
    }
  }

  // Write both files
  await writeCSVFile(data, csvPath);
  await writeHTMLFile(data, htmlPath, htmlTitle);

  return { csvPath, htmlPath, count: data.length };
}
