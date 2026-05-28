import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

import githubRoutes from "./routes/githubRoutes.js";
import swaggerSpec from "./config/swagger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", githubRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
