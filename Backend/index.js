const path = require("path");
require("dotenv").config();

const express = require("express");

const app = express();

//Serve the built React project
app.use(express.static(path.join(__dirname, "../build")));

app.listen(process.env.PORT, () =>
  console.log("Listening on port " + process.env.PORT)
);
