import path from "path";
import createFolderIfNeeded from "./create-folder-if-needed.js";

const __dirname = path.resolve();

export default async function screenPage(page,imageName) {
  const dateNow = Date.now();

  createFolderIfNeeded("./screenshots");

  const screenshotPath = path.join(
    __dirname,
    `./screenshots/screen_${imageName}_${dateNow}.png`
  );

  await page.screenshot({
    path: screenshotPath,
  });
}
