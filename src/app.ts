import express from "express";
import cors from "cors";
import contentRoutes from "./presentation/routes/contentRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//* Middleware
app.use(cors());
app.use(express.json());

//* Routes
app.use("/api/content", contentRoutes);

//* Health check
app.get("/health", (req, res) => {
  res.json({ message: "AI Content Generator API is running!" });
});

export default app;
