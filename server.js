import express from "express";
import cors from "cors";
import "dotenv/config";

import githubRoutes from "./routes/githubRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", githubRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
