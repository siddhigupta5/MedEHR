import dotenv from "dotenv";
import recordRoutes from "./routes/recordRoutes.js";
dotenv.config();

import app from "./app.js";
import cors from "cors";

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

