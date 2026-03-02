import { fetchCountries } from "./src/api/fetchCountries.js";
import { writeCSVFile } from "./src/services/csv/csvWriter.js";
import { writeHTMLFile } from "./src/services/html/htmlWriter.js";
import { processCountryData } from "./src/services/processCountryData.js";
import { checkAnyFilesExist, askOverwrite } from "./src/utils/filePrompts.js";

// AI generated
async function main() {
  const csvOutputPath = "./output/european_countries.csv";
  const htmlOutputPath = "./output/countries.html";

  try {
    const rawCountries = await fetchCountries();
    const processed = processCountryData(rawCountries);

    // Check if any output files exist and ask once
    const outputPaths = [csvOutputPath, htmlOutputPath];
    const shouldOverwrite = checkAnyFilesExist(outputPaths)
      ? await askOverwrite("output files")
      : true;

    if (!shouldOverwrite) {
      console.log("File generation cancelled.");
      process.exit(0);
    }

    await writeCSVFile(processed, csvOutputPath, { overwrite: true });
    await writeHTMLFile(
      processed,
      htmlOutputPath,
      "European Countries Report",
      { overwrite: true },
    );

    // Print completion summary
    console.log(`Fetched ${rawCountries.length} countries`);
    console.log(`Files written to ${csvOutputPath} and ${htmlOutputPath}`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
