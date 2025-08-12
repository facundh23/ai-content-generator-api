import { Router } from "express";
import { ContentController } from "../controllers/ContentController";

const router = Router();
const contentController = new ContentController();

router.post("/generate", (req, res) => {
  contentController.generateContent(req, res);
});

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Content API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
