import { fetchCountries } from "./src/api/fetchCountries.js";
import { processCountryData } from "./src/services/processCountryData.js";
import { writeAllFiles } from "./src/services/fileWriteServices.js";
import { logger } from "./src/utils/logger.js";

async function main() {
  try {
    const rawCountries = await fetchCountries();
    const processed = processCountryData(rawCountries);
    const result = await writeAllFiles(processed);

    if (result) {
      logger.info(`Fetched ${rawCountries.length} countries`);
      logger.info(`Files written to: ${result.csvPath} and ${result.htmlPath}`);
    }

    process.exit(0);
  } catch (error) {
    logger.error("Application failed:", error.message);
    logger.debug("Full error stack:", error.stack);
    process.exit(1);
  }
}

main();
