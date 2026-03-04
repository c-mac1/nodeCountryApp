import { fetchCountries } from "./src/api/fetchCountries.js";
import { processCountryData } from "./src/services/processCountryData.js";
import { writeAllFiles } from "./src/services/fileWriteServices.js";
import { logger } from "./src/utils/logger.js";
import { getSubregionFromArgs } from "./src/utils/cliParser.js";

async function main() {
  try {
    const subregion = getSubregionFromArgs();
    const rawCountries = await fetchCountries(subregion);

    if (rawCountries.length === 0) {
      logger.warn("No countries found with the specified criteria.");
      process.exit(0);
    }

    const processed = processCountryData(rawCountries);
    const result = await writeAllFiles(processed, subregion);

    if (result) {
      const regionText = subregion ? ` from ${subregion}` : "";
      logger.info(`Fetched ${rawCountries.length} countries${regionText}`);
      logger.info(`Files written to: ${result.csvPath} and ${result.htmlPath}`);
    }

    process.exit(0);
  } catch (error) {
    // Handle subregion validation errors
    if (error.message.includes("Invalid subregion")) {
      logger.error(error.message);
      logger.info("Use --help for usage information");
      process.exit(1);
    }

    logger.error("Application failed:", error.message);
    logger.debug("Full error stack:", error.stack);
    process.exit(1);
  }
}

main();
