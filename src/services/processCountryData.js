import { logger } from "../utils/logger.js";

export function processCountryData(countries) {
  logger.info("Processing country data for", countries.length, "countries");

  if (!Array.isArray(countries)) {
    logger.error("Invalid input: countries must be an array");
    throw new Error("Invalid input: countries must be an array");
  }

  return countries
    .map((country, index) => {
      try {
        const name = country.name?.common || "N/A";
        const capital = country.capital?.[0] || "N/A";
        const population = country.population?.toLocaleString() || "N/A";

        const languages = country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A";

        let currency = "N/A";
        if (country.currencies) {
          const currencyKey = Object.keys(country.currencies)[0];
          if (currencyKey) {
            const curr = country.currencies[currencyKey];
            currency = curr.symbol
              ? `${curr.name} (${curr.symbol})`
              : curr.name || "Unknown";
          }
        }

        return {
          name,
          capital,
          population,
          languages,
          currency,
          flag: country.flags?.png || "",
        };
      } catch (error) {
        logger.warn(
          `Error processing country at index ${index}:`,
          error.message,
        );
        logger.debug("Problematic country data:", country);

        // Return safe fallback for problematic records
        return {
          name: country.name?.common || `Unknown Country ${index}`,
          capital: "N/A",
          population: "N/A",
          languages: "N/A",
          currency: "N/A",
          flag: "",
        };
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
