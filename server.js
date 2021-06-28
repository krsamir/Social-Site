import express from "express";
import { config } from "dotenv";
config();
import path from "path";
import { fileURLToPath } from "url";
import LoginRoutes from "./app/Routes/LoginRoutes.js";
import AppRoutes from "./app/Routes/AppRoutes.js";

const app = express();
app.use(express.json());

LoginRoutes(app);
AppRoutes(app);
// to refer build pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Backend Running on PORT ${process.env.PORT}`)
);
