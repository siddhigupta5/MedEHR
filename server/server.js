import dotenv from "dotenv";
import recordRoutes from "./routes/recordRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

import app from "./app.js";
import cors from "cors";

//app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

