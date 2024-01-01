document.addEventListener("DOMContentLoaded", function () {
    fetch("../data/history.json")
        .then((response) => response.json())
        .then((historyData) => {
            const tbody = document.querySelector("tbody");

            historyData.forEach((entry) => {
                const row = document.createElement("tr");

                const timestampCell = document.createElement("td");
                timestampCell.textContent = entry.time;
                row.appendChild(timestampCell);

                const bmiCell = document.createElement("td");
                bmiCell.textContent = entry.bmi;
                row.appendChild(bmiCell);

                tbody.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching history data:", error));
});
