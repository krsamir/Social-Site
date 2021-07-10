import express from "express";
import multer from "multer";
import { config } from "dotenv";
config();
import path from "path";
import { fileURLToPath } from "url";
import LoginRoutes from "./app/Routes/LoginRoutes.js";
import AppRoutes from "./app/Routes/AppRoutes.js";
import auth from "./app/Authentication/Auth.js";

const app = express();
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./Uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage });
app.post(
  "/api/uploadMedia",
  upload.array("myFile[]", 10),
  auth,
  (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      res.send({ status: "failed", error });
      // return next(error);
    } else {
      res.send({ status: "uploaded" });
    }
  }
);

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
