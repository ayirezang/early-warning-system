const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const riskRoutes = require("./src/routes/riskRoutes");
//middleware
app.use(express.json());
app.use("/api", riskRoutes);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
