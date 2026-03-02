import readline from "readline";
import fs from "fs";

export function askOverwrite(filePath) {
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

export function checkAnyFilesExist(filePaths) {
  return filePaths.some((path) => fs.existsSync(path));
}

export function getExistingFiles(filePaths) {
  return filePaths.filter((path) => fs.existsSync(path));
}
