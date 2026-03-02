import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import mongoose from "mongoose";
//import routes
import riskRoutes from "./src/routes/riskRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
//use routes
app.use("/api", riskRoutes);
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
