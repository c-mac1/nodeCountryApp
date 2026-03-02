const API_URL = "https://restcountries.com/v3.1/";
const ENDPOINT = "region/europe";

//AI generated
export async function fetchCountries() {
  const url = API_URL + ENDPOINT;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Re-throw so caller can handle it
  }
}
