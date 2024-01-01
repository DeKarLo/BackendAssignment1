const express = require("express");
const bodyParser = require("body-parser");
const bmiRoutes = require("./public/routes/bmiRoutes");
const chalk = require("chalk");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/history", (req, res) => {
    res.sendFile(__dirname + "/public/views/history.html");
});

app.use("/bmicalculator", bmiRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});
