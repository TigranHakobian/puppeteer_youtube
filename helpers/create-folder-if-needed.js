import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export default function createFolderIfNeeded(folderName) {
  if (!fs.existsSync(path.resolve(__dirname, folderName))) {
    fs.mkdirSync(path.resolve(__dirname, folderName));
  }
}
