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
        const pA = parseFloat(document.getElementById('pA').value);
        const pBA = parseFloat(document.getElementById('pBA').value);
        const pBnotA = parseFloat(document.getElementById('pBnotA').value);

       if (isNaN(pA) || isNaN(pBA) || isNaN(pBnotA)) {
        alert("Please enter valid probabilities.");
        return;
    }

    if (pA < 0 || pA > 1 || pBA < 0 || pBA > 1 || pBnotA < 0 || pBnotA > 1) {
        alert("Probabilities should be between 0 and 1.");
        return;
    }

    const pAComplement = 1 - pA;
    const pB = (pBA * pA) + (pBnotA * pAComplement);

    if (pB === 0) {
        alert("P(B) is zero, division by zero is not allowed.");
        return;
    }

        const pAB = (pA * pBA) / pB;

    const pAPercent = (pA * 100).toFixed(2);
    const pBAPercent = (pBA * 100).toFixed(2);
    const pBnotAPercent = (pBnotA * 100).toFixed(2);
    const pAComplementPercent = ((1 - pA) * 100).toFixed(2);
    const pBPercent = (pB * 100).toFixed(2);
    const pABPercent = (pAB * 100).toFixed(2);

    const resultText = `Result: P(A|B) = ${pABPercent}%`;
    document.getElementById('result').innerText = resultText;

    const analysisText = `Step by step process:\n
    1. Calculate P(A'): 1 - P(A) = ${pAComplementPercent}%\n
    2. Calculate P(B): (P(B|A) * P(A)) + (P(B|A') * P(A')) = ${pBPercent}%\n
    3. Calculate P(A|B): (P(A) * P(B|A)) / P(B) = ${pABPercent}%\n\n
    Conclusion: The probability of event A occurring given that event B has occurred is ${pABPercent}%.`;
    
    document.getElementById('analysis-text').innerText = analysisText;
}
    switchCategory('weather');
});
