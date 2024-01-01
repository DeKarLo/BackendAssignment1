const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const historyFilePath = path.join(__dirname, "..", "data", "history.json");

router
    .route("/")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "..", "views", "bmiCalculator.html"));
    })
    .post((req, res) => {
        const height = parseFloat(req.body.height);
        const weight = parseFloat(req.body.weight);
        const age = parseInt(req.body.age);
        const gender = req.body.gender;
        const units = req.body.units;

        bmi = calculateBMI(height, weight, units);

        const bmiRes = bmi.toString() + " " + getBMIState(bmi, age, gender);
        const timestamp = new Date().toLocaleString();

        try {
            try {
                existingData = fs.readFileSync(historyFilePath, "utf8");
                existingData = JSON.parse(existingData);
            } catch (error) {
                existingData = [];
            }
            existingData.push({ time: timestamp, bmi: bmiRes });
            fs.writeFileSync(
                historyFilePath,
                JSON.stringify(existingData, null, 2),
                "utf8"
            );

            res.redirect(`/bmicalculator?res=${bmiRes}`);
        } catch (error) {
            console.error(
                chalk.red("Error saving BMI calculation to history:"),
                error
            );
            res.status(500).send("Internal Server Error");
        }
    });

function calculateBMI(height, weight, units) {
    console.log(units);
    let heightModifier = 0.01;
    let weightModifier = 1;

    if (units === "imperial") {
        heightModifier = 0.0254; // Convert height to meters
        weightModifier = 0.453592; // Convert weight to kilograms
    }

    const heightInMeters = height * heightModifier;
    const weightInKilograms = weight * weightModifier;

    let bmi;

    bmi =
        Math.round(
            (weightInKilograms / (heightInMeters * heightInMeters)) * 100
        ) / 100;

    return bmi;
}

function getBMIState(bmi, age, gender) {
    if (age <= 18) {
        if (gender === "male") {
            return bmi < 13.5
                ? "Underweight"
                : bmi >= 13.5 && bmi < 24.9
                ? "Normal weight"
                : "Overweight";
        } else if (gender === "female") {
            return bmi < 13
                ? "Underweight"
                : bmi >= 13 && bmi < 24.9
                ? "Normal weight"
                : "Overweight";
        } else {
            return "Unknown gender";
        }
    } else {
        if (gender === "male") {
            return bmi < 18.5
                ? "Underweight"
                : bmi >= 18.5 && bmi < 24.9
                ? "Normal weight"
                : "Overweight";
        } else if (gender === "female") {
            return bmi < 18.5
                ? "Underweight"
                : bmi >= 18.5 && bmi < 24.9
                ? "Normal weight"
                : "Overweight";
        } else {
            return "Unknown gender";
        }
    }
}

module.exports = router;
