import { fetchCountries } from "./src/api/fetchCountries.js";
import { processCountryData } from "./src/services/processCountryData.js";
import { writeAllFiles } from "./src/services/fileWriteServices.js";

async function main() {
  try {
    const rawCountries = await fetchCountries();
    const processed = processCountryData(rawCountries);
    const result = await writeAllFiles(processed);

    if (result) {
      console.log(`Fetched ${rawCountries.length} countries`);
      console.log(`Files written to ${result.csvPath} and ${result.htmlPath}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
