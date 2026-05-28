
import db from "../config/db.js";
import { getGithubUser, getGithubRepos } from "../services/githubServices.js";
import analyzeProfile from "../utils/analyzeProfile.js";

import { clearCache } from "../middleware/cache.js";

const analyzeGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getGithubUser(username);
    const repos = await getGithubRepos(username);

    const analysis = analyzeProfile(user, repos);

    const userQuery = `
      INSERT INTO github_users 
      (username, name, bio, followers, following_count, public_repos, profile_url, avatar_url, created_at_github)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      followers = VALUES(followers),
      following_count = VALUES(following_count),
      public_repos = VALUES(public_repos),
      profile_url = VALUES(profile_url),
      avatar_url = VALUES(avatar_url),
      created_at_github = VALUES(created_at_github),
      analyzed_at = CURRENT_TIMESTAMP
    `;

    await db.promise().query(userQuery, [
      user.login,
      user.name,
      user.bio,
      user.followers,
      user.following,
      user.public_repos,
      user.html_url,
      user.avatar_url,
      user.created_at.replace("T", " ").replace("Z", ""),
    ]);

    const analysisQuery = `
      INSERT INTO github_analysis
      (username, total_stars, total_forks, top_language, languages_used, top_repo, developer_type, profile_score, recent_repos_count, recent_activity_score, last_pushed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.promise().query(analysisQuery, [
      user.login,
      analysis.totalStars,
      analysis.totalForks,
      analysis.topLanguage,
      analysis.languagesUsed,
      analysis.topRepo,
      analysis.developerType,
      analysis.profileScore,
      analysis.recentActivity.recentReposCount,
      analysis.recentActivity.recentActivityScore,
      analysis.recentActivity.lastPushedAt === "Not Available"
        ? null
        : analysis.recentActivity.lastPushedAt.replace("T", " ").replace("Z", ""),
    ]);

    clearCache();

    res.status(200).json({
      message: "GitHub profile analyzed successfully",
      user: {
        username: user.login,
        name: user.name,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        profileUrl: user.html_url,
      },
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

const getAnalysis = (req, res, next) => {
  const { username } = req.params;

  const query = `
    SELECT * FROM github_analysis 
    WHERE username = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      return next(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No analysis found for this user",
      });
    }

    res.status(200).json(result[0]);
  });
};

const getAllUsers = (req, res, next) => {
  const query = "SELECT * FROM github_users ORDER BY analyzed_at DESC";

  db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(result);
  });
};

export { analyzeGithubProfile, getAnalysis, getAllUsers };
