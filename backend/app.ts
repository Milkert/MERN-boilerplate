import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userApi from "./routes/userApi.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", userApi);

const mongoUri: string | undefined = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

// After the check, mongoUri is guaranteed to be a string
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log("Server listening on port http://localhost:${PORT}");
});
