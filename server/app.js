import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/records", recordRoutes);

export default app;