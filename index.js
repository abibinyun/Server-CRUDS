import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
const host = process.env.HOST;

const app = express();
mongoose.connect(host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));
app.use((req, res, next) => {
  console.log("url:", req.originalUrl);
  console.log("method:", req.method);
  next();
});
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log("Server up and running...."));
