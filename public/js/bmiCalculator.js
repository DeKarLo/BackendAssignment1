function updateResult(result) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h4>BMI Result: ${result}</h4>`;
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get("res");
}

window.addEventListener("DOMContentLoaded", () => {
    const resultParam = getQueryParams();
    if (resultParam) {
        updateResult(resultParam);
    }
});
