import express from "express";
import {
  analyzeGithubProfile,
  getAnalysis,
  getAllUsers,
} from "../controllers/githubController.js";

const router = express.Router();

router.post("/analyze/:username", analyzeGithubProfile);

router.get("/analysis/:username", getAnalysis);

router.get("/users", getAllUsers);

export default router;
