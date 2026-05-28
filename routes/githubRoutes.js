import express from "express";
import {
  analyzeGithubProfile,
  getAnalysis,
  getAllUsers,
} from "../controllers/githubController.js";
import { cache } from "../middleware/cache.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GitHub
 *   description: GitHub profile analysis endpoints
 */

/**
 * @swagger
 * /api/analyze/{username}:
 *   post:
 *     summary: Analyze and store a GitHub profile
 *     tags: [GitHub]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile analyzed successfully
 *       500:
 *         description: Server error
 */
router.post("/analyze/:username", analyzeGithubProfile);

/**
 * @swagger
 * /api/analysis/{username}:
 *   get:
 *     summary: Get the latest stored analysis for a user
 *     tags: [GitHub]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest analysis found
 *       404:
 *         description: No analysis found
 */
router.get("/analysis/:username", cache(300), getAnalysis);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all analyzed GitHub users
 *     tags: [GitHub]
 *     responses:
 *       200:
 *         description: List of analyzed users
 */
router.get("/users", cache(300), getAllUsers);

export default router;
