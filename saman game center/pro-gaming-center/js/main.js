<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

// This file contains the JavaScript functionality for managing the gaming center's TV systems, handling user interactions, and implementing payment calculations.

document.addEventListener('DOMContentLoaded', () => {
    const tvsGrid = document.querySelector('.tvs-grid');
    const games = [
        "FIFA 2020-2025",
        "PES 2020-2025",
        "Call of Duty: Warzone",
        "Call of Duty: Cold War"
    ];

    // Dynamically render 12 TV cards
    for (let i = 1; i <= 12; i++) {
        const tvCard = document.createElement('div');
        tvCard.className = 'tv-card';
        tvCard.innerHTML = `
            <img class="tv-img" src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80" alt="TV ${i}">
            <div class="tv-info">
                <div class="tv-title">TV System #${i}</div>
                <div class="tv-games">${games.join(', ')}</div>
                <div class="tv-status"><i class='bx bx-check-circle'></i> Available</div>
                <button class="pay-btn" onclick="bookTV(${i})">Book & Pay</button>
            </div>
        `;
        tvsGrid.appendChild(tvCard);
    }

    // Payment System
    document.getElementById('payForm').onsubmit = function(e) {
        e.preventDefault();
        const game = document.getElementById('game').value;
        const minutes = parseInt(document.getElementById('minutes').value, 10);
        let total = 0;
        let details = "";

        // Game payment logic
        if (game === "FIFA" || game === "PES") {
            if (minutes < 5 || minutes > 25) {
                alert("You can play FIFA/PES from 5 to 25 minutes only.");
                return;
            }
            const pricePerMinute = 1000 / 8;
            total += Math.round(minutes * pricePerMinute);
            details += `${game} for ${minutes} min: <b>${Math.round(minutes * pricePerMinute)} IQD</b><br>`;
        } else if (game === "Warzone" || game === "Cold War") {
            total += 2000;
            details += `${game} session: <b>2000 IQD</b><br>`;
        }

        // Cake
        const cake = document.getElementById('cake').value;
        if (cake === "Chocolate Cake") { total += 2000; details += `Chocolate Cake: <b>2000 IQD</b><br>`; }
        if (cake === "Red Velvet Cake") { total += 2500; details += `Red Velvet Cake: <b>2500 IQD</b><br>`; }

        // Drink
        const drink = document.getElementById('drink').value;
        if (drink === "Cappuccino") { total += 1500; details += `Cappuccino: <b>1500 IQD</b><br>`; }
        if (drink === "Espresso") { total += 1200; details += `Espresso: <b>1200 IQD</b><br>`; }
        if (drink === "Soft Drink") { total += 1000; details += `Soft Drink: <b>1000 IQD</b><br>`; }
        if (drink === "Water") { total += 500; details += `Water: <b>500 IQD</b><br>`; }

        document.getElementById('paymentSummary').style.display = 'block';
        document.getElementById('paymentSummary').innerHTML = `
            <div style="margin-bottom:10px;">${details}</div>
            <div style="font-size:1.2em;color:var(--accent);">Total: <b>${total} IQD</b></div>
            <div style="margin-top:10px;font-size:0.97em;color:var(--secondary);">Thank you for your payment! Enjoy your game and snacks.</div>
        `;
    };
});

// Function to book a TV
function bookTV(tvNumber) {
    document.getElementById('tvNum').value = tvNumber;
    window.scrollTo({ top: document.getElementById('payment').offsetTop - 40, behavior: 'smooth' });
}