import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import tagsRouter from "./routes/tagsRouter.js";
import projectsRouter from "./routes/projectsRouter.js";
import reposRouter from "./routes/reposRouter.js";
import materialsRouter from "./routes/materialsRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", express.static("./backend/views"));
app.use("/storage", express.static("./backend/storage"));
app.use("/api/tags", tagsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/repos", reposRouter);
app.use("/api/materials", materialsRouter);

const indexViewPath = path.resolve("./backend/views/index.html");

app.get("*", (req, res) => {
  res.sendFile(indexViewPath);
});

export const start = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongo DB");

      app.listen(PORT, () => {
        console.log("App running on port " + PORT);
      });
    })
    .catch(() =>
      console.log("Failed to start app (Mongo DB conenction failed!)")
    );
};

start();
