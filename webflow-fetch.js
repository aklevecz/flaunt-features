require("dotenv").config();
const fs = require("fs");
const Webflow = require("webflow-api");
const API_KEY = process.env.API_KEY;

const SITE_ID = "62eded8b0db7160f4a2e6a28";
const FEATURES_ID = "62feb8f1a4984e828b8c5fff";

const api = new Webflow({ token: API_KEY });

(async () => {
  const { items } = await api.items({ collectionId: FEATURES_ID });
  fs.writeFileSync("./src/data.json", JSON.stringify(items));
})();
