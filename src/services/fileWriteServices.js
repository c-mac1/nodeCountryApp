import { writeCSVFile } from "./csv/csvWriter.js";
import { writeHTMLFile } from "./html/htmlWriter.js";
import { checkAnyFilesExist, askOverwrite } from "../utils/filePrompts.js";

export async function writeAllFiles(data, subregion = null, options = {}) {
  // Generate filenames based on sub-region
  const filePrefix = subregion
    ? subregion.toLowerCase().replace(/\s+/g, "_")
    : "european";

  const {
    csvPath = `./output/${filePrefix}_countries.csv`,
    htmlPath = `./output/${filePrefix}_countries.html`,
    htmlTitle = subregion
      ? `${subregion} Countries Report`
      : "European Countries Report",
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
