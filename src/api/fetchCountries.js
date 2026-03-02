import { logger } from "../utils/logger.js";

const API_URL = "https://restcountries.com/v3.1/";
const ENDPOINT = "region/europe";
const REQUEST_TIMEOUT = 10000; // 10 seconds

export async function fetchCountries() {
  const url = API_URL + ENDPOINT;
  logger.info("Fetching countries from:", url);

  try {
    // Create AbortController for timeout handling -  Ai generated
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "European-Countries-Report-Generator/1.0",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutError = new Error(
        `Request timeout after ${REQUEST_TIMEOUT}ms`,
      );
      logger.error("API request timed out");
      throw timeoutError;
    }

    if (error.message.includes("fetch")) {
      logger.error("Network error during API request:", error.message);
    } else {
      logger.error("API request failed:", error.message);
    }

    throw error;
  }
}
