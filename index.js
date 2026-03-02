import { fetchCountries } from "./src/api/fetchCountries.js";
import { writeCSVFile } from "./src/services/fileWriter.js";
import { processCountryData } from "./src/services/processCountryData.js";

// AI generated
async function main() {
  const outputPath = "./output/european_countries.csv";
  try {
    const rawCountries = await fetchCountries();
    const processed = processCountryData(rawCountries);
    console.log(processed.slice(0, 5));

    await writeCSVFile(processed, outputPath);

    //exit when done (TODO ADD SUMMARY OF RESULTS)
    console.log("Done processing country data.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
