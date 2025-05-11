import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT || 5002;

const app = express();

app.use(express.json())

app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
  console.log("Server start");
  connectDB();
});
