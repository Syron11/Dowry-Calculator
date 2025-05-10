document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('dowryForm');
    const submitBtn = document.getElementById('submit');
    const resultDiv = document.getElementById('result');

    // Real-time form validation
    form.addEventListener('change', function () {
        const education = document.getElementById('education').value;
        const networth = document.getElementById('networth').value;
        const caste = document.getElementById('caste').value;
        const ageSelected = document.querySelector('input[name="age"]:checked');

        submitBtn.disabled = !(education && networth && caste && ageSelected);
    });

    // Dowry calculation
    submitBtn.addEventListener('click', function () {
        const basePrice = 100;
        let finalPrice = basePrice;

        // Education multiplier
        const education = parseFloat(document.getElementById('education').value);
        finalPrice *= education;

        // Family net worth multiplier
        const networth = parseFloat(document.getElementById('networth').value);
        finalPrice *= networth;

        // Caste bonus/penalty
        const caste = parseInt(document.getElementById('caste').value);
        finalPrice += caste;

        // Skills bonus
        let skillsBonus = 0;
        if (document.getElementById('music').checked) skillsBonus += 10;
        if (document.getElementById('cook').checked) skillsBonus += 20;
        if (document.getElementById('character').checked) skillsBonus += 15;
        if (document.getElementById('sing').checked) skillsBonus += 10;
        finalPrice += skillsBonus;

        // Age multiplier
        const age = parseFloat(document.querySelector('input[name="age"]:checked').value);
        finalPrice *= age;

        // Reputation multiplier
        let reputationMultiplier = 1;
        if (document.getElementById('parentsGossip').checked) reputationMultiplier *= 0.85;
        if (document.getElementById('characterGossip').checked) reputationMultiplier *= 0.9;
        finalPrice *= reputationMultiplier;

        // General gossip penalty
        if (document.getElementById('generalGossip').checked) finalPrice -= 20;

        // Ensure non-negative result and round to 2 decimals
        finalPrice = Math.max(0, finalPrice).toFixed(2);

        // Display result
        resultDiv.textContent = `Final Dowry Price: $${finalPrice}`;
        resultDiv.className = 'mt-3 p-3 text-center';

        // Color coding based on price
        if (finalPrice > 500) {
            resultDiv.classList.add('price-high');
        } else if (finalPrice > 200) {
            resultDiv.classList.add('price-medium');
        } else {
            resultDiv.classList.add('price-low');
        }
    });
});