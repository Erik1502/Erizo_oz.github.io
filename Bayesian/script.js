document.addEventListener("DOMContentLoaded", function() {
    function switchCategory(category) {
        document.querySelectorAll("#categories button").forEach(button => {
            button.classList.remove("active-category");
        });
        document.querySelector(`#categories button[onclick="switchCategory('${category}')"]`).classList.add("active-category");
        
        document.querySelectorAll("#content > div").forEach(section => {
            section.style.display = "none";
        });

        document.getElementById(`${category}-section`).style.display = "block";
    }

    window.switchCategory = switchCategory;

    window.calculate = function calculate() {
        const pW = parseFloat(document.getElementById('pW').value);
        const pNW = parseFloat(document.getElementById('pNW').value);
        const pNWnot = parseFloat(document.getElementById('pNWnot').value);

        if (isNaN(pW) || isNaN(pNW) || isNaN(pNWnot)) {
            alert("Please enter valid probabilities.");
            return;
        }

        const pWComplement = 1 - pW;
        const pN = (pNW * pW) + (pNWnot * pWComplement);

        if (pN === 0) {
            alert("P(N) is zero, division by zero is not allowed.");
            return;
        }

        const pWN = (pW * pNW) / pN;

        const resultText = `Result: P(W|N) = ${pWN.toFixed(4)}`;
        document.getElementById('result').innerText = resultText;

        document.getElementById('analysis-text').innerText = `Step by step process:\n
        1. Calculate P(W'): 1 - P(W) = ${pWComplement.toFixed(4)}\n
        2. Calculate P(N): (P(N|W) * P(W)) + (P(N|W') * P(W')) = ${pN.toFixed(4)}\n
        3. Calculate P(W|N): (P(W) * P(N|W)) / P(N) = ${pWN.toFixed(4)}`;
    }

    switchCategory('weather');
});
