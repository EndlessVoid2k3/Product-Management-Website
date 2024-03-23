const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const bookRoutes = require("./routes/bookFunctions.js");
const figureRoutes = require("./routes/figureFunctions.js");
const otherRoutes = require("./routes/otherFunctions.js");
const authRoutes = require("./routes/authFunctions.js");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:4999"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
//routes
app.use("/", authRoutes);
app.use("/book", bookRoutes);
app.use("/figure", figureRoutes);
app.use("/other", otherRoutes);
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
