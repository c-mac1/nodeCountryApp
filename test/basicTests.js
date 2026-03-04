import assert from "assert";
import { getSubregionFromArgs } from "../src/utils/cliParser.js";
import { processCountryData } from "../src/services/processCountryData.js";
import { fetchCountries } from "../src/api/fetchCountries.js";

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function runAsyncTest(name, testFn) {
  try {
    await testFn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

function testNoArguments() {
  const originalArgv = process.argv;
  process.argv = ["node", "index.js"];
  const result = getSubregionFromArgs();
  assert.strictEqual(result, null);
  process.argv = originalArgv;
}

function testValidSubregion() {
  const originalArgv = process.argv;
  process.argv = ["node", "index.js", "northern europe"]; // lowercase
  const result = getSubregionFromArgs();
  assert.strictEqual(result, "Northern Europe");
  process.argv = originalArgv;
}

function testInvalidSubregion() {
  const originalArgv = process.argv;
  process.argv = ["node", "index.js", "invalid region"];
  assert.throws(() => {
    getSubregionFromArgs();
  }, /Invalid subregion/);

  process.argv = originalArgv;
}

function testProcessValidData() {
  const mockData = [
    {
      name: { common: "Norway" },
      capital: ["Oslo"],
      population: 5421241,
      languages: { nor: "Norwegian" },
      currencies: { NOK: { name: "Norwegian krone", symbol: "kr" } },
      flags: { png: "https://example.com/norway.png" },
    },
  ];

  const result = processCountryData(mockData);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].name, "Norway");
  assert.strictEqual(result[0].capital, "Oslo");
  assert.strictEqual(result[0].population, "5,421,241");
}

function testProcessInvalidData() {
  assert.throws(() => {
    processCountryData("not an array");
  }, /must be an array/);
  const result = processCountryData([]);
  assert.strictEqual(result.length, 0);
}

async function testFetchFromAPI() {
  const countries = await fetchCountries();
  assert(Array.isArray(countries), "Should return an array");
  assert(countries.length > 0, "Should return some countries");
  assert(countries[0].name, "Countries should have name property");
  assert(countries[0].subregion, "Countries should have subregion property");
}

async function runAllTests() {
  runTest("No arguments returns null", testNoArguments);
  runTest("Valid subregion gets normalized", testValidSubregion);
  runTest("Invalid subregion throws error", testInvalidSubregion);
  runTest("Process valid country data", testProcessValidData);
  runTest("Process invalid data throws error", testProcessInvalidData);
  await runAsyncTest("Fetch data from API", testFetchFromAPI);
}

runAllTests();
