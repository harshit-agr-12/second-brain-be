import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import contentRouter from "./modules/content/content.routes";
// import brainRouter from "./modules/brain/brain.routes";

export const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Brainly Backend is running");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
// app.use("/api/v1/brain", brainRouter);