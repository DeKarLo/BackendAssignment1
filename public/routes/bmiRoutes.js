const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const historyFilePath = path.join(__dirname, "..", "data", "history.json");

router
    .route("/")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "..", "views", "bmiCalculator.html"));
    })
    .post((req, res) => {
        const height = parseFloat(req.body.height);
        const weight = parseFloat(req.body.weight);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            res.redirect("/bmicalculator?res=Incorrect data entered");
            return;
        }

        const bmi = calculateBMI(height, weight);

        const timestamp = new Date().toLocaleString();
        const historyEntry = { timestamp, bmi };

        try {
            try {
                existingData = fs.readFileSync(historyFilePath, "utf8");
                existingData = JSON.parse(existingData);
            } catch (error) {
                existingData = [];
            }
            existingData.push({ time: timestamp, bmi: bmi });
            fs.writeFileSync(
                historyFilePath,
                JSON.stringify(existingData, null, 2),
                "utf8"
            );

            res.redirect(`/bmicalculator?res=${bmi}`);
        } catch (error) {
            console.error("Error saving BMI calculation to history:", error);
            res.status(500).send("Internal Server Error");
        }
    });

function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    return Math.round((weight / (heightInMeters * heightInMeters)) * 100) / 100;
}

module.exports = router;
