const VALID_SUBREGIONS = [
  "Northern Europe",
  "Southern Europe",
  "Eastern Europe",
  "Western Europe",
];

//Ai generated
export function getSubregionFromArgs() {
  const args = process.argv.slice(2);

  // Show help if requested
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`Usage: node index.js [subregion]
    
Available subregions: ${VALID_SUBREGIONS.join(", ")}
    
Examples:
  node index.js                    # All European countries
  node index.js "Northern Europe"  # Only Northern European countries`);
    process.exit(0);
  }

  // Get first argument as subregion
  const subregion = args[0];

  if (!subregion) {
    return null; // No filter
  }

  // Simple case-insensitive matching
  const normalized = subregion
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!VALID_SUBREGIONS.includes(normalized)) {
    throw new Error(
      `Invalid subregion: "${subregion}". Valid options: ${VALID_SUBREGIONS.join(", ")}`,
    );
  }

  return normalized;
}
