const path = require("path");

const express = require("express");

const app = express();

//Serve the built React project
app.use(express.static(path.join(__dirname, "../build")));

app.listen(5050, () => console.log("Listening on port 5050"));
