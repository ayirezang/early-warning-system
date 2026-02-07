const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
//middleware
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
