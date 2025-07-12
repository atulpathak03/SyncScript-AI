import express from "express";
import { getCodeSuggestion } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/suggest", getCodeSuggestion);

export default router;
