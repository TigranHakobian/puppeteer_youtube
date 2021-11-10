import express from "express";
import initGetBrowserPage from "./helpers/get-page.js";
import screenPage from "./helpers/screen-page.js";
import {
  fillInput,
  keyPress,
  waitForTime,
   getElementTextContent,
} from "./helpers/puppeteer-tools.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const PORT = process.env.PORT ?? 3001;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home", {});
});

app.post("/subscription", async function (req, res) {
  const getBrowserPage = initGetBrowserPage();
  const browser = (await getBrowserPage).browser;
  const page = (await getBrowserPage).page;

  try {


    const searchValue =  "Messi";


    await page.goto("https://www.youtube.com/user/YouTube/videos?app=desktop", {
      waitUntil: "networkidle2",
    });

    await waitForTime(page, 2000);

    await fillInput(page, '[name="search_query"]', searchValue);
    await waitForTime(page, 1000);


    await keyPress(page, "Enter");
    await waitForTime(page, 6000);

    for (let i = 0; i < 5; i++) {
      await keyPress(page, "Tab");
      await waitForTime(page, 1000);
    }

    await waitForTime(page, 2000);
    await keyPress(page, "Enter");
    await waitForTime(page, 6000);

    const selectorOfView = '[class="view-count style-scope ytd-video-view-count-renderer"]'

    const count = await getElementTextContent(page, selectorOfView)

    await waitForTime(page, 500);
    await screenPage(page, searchValue);
    await waitForTime(page, 6000);

    res.json({
      status: 200,
      count,
    });
  } catch (error) {
    await screenPage(page, "error");

    res.json({
      status: 403,
      msg: error,
    });
  }
  await browser.close();
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
