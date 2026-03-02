import fs from "fs";
import path from "path";
import readline from "readline";
import { toCSV } from "./toCSV.js";

function askOverwrite(filePath) {
  // AI generated
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `File "${filePath}" already exists. Overwrite? (y/n): `,
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase().startsWith("y"));
      },
    );
  });
}

export async function writeCSVFile(data, outputPath, options = {}) {
  console.log("Writing CSV file...");
  try {
    // Check if file exists and ask user
    if (fs.existsSync(outputPath) && !options.overwrite) {
      const shouldOverwrite = await askOverwrite(outputPath);
      if (!shouldOverwrite) {
        console.log("File write cancelled.");
        return;
      }
    }

    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directory created or already exists: ${dir}`);

    //write file
    const csvData = toCSV(data, ['flag']);
    fs.writeFileSync(outputPath, csvData, "utf8");
    console.log(`CSV written to: ${outputPath}`);
  } catch (error) {
    throw new Error(`Failed to write CSV file: ${error.message}`);
  }
}
