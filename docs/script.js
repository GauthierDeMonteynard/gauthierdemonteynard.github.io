// ================= CONFIG =================

// 👉 Solution du problème d'échecs
const solutionPiece = "Cavalier";
const solutionSquare = "h3";

// 🎁 Cadeaux du MEILLEUR → PIRE
const gifts = [
    "✈️ Un week-end romantique surprise",
    "🍽️ Un resto gastronomique",
    "🎶 Un concert",
    "💍 Un bijou",
    "💆‍♀️ Un massage",
    "🍰 Un dessert maison",
    "💐 Un bouquet de fleurs",
    "💋 Un gros bisou"
];

// ================= PERSISTANCE =================
const STORAGE_KEY = "st_valentin_game";
let giftIndex = 0;
let startTime = Date.now();
let seconds = 0;

// Sauvegarde l'état dans localStorage
function saveGame() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        startTime: startTime,
        giftIndex: giftIndex
    }));
}

// Charge l'état depuis localStorage
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        const data = JSON.parse(saved);
        startTime = data.startTime;
        giftIndex = data.giftIndex;
    } else {
        saveGame();
    }

    // Temps écoulé
    seconds = Math.floor((Date.now() - startTime) / 1000);

    document.getElementById("time").innerText = seconds;
    document.getElementById("gift").innerText =
        "🎁 Cadeau en jeu : " + gifts[giftIndex];
});

// ================= CHRONO =================
setInterval(() => {
    seconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("time").innerText = seconds;

    // calcule combien de downgrades devraient déjà avoir eu lieu
    const expectedIndex = Math.min(
        Math.floor(seconds / 30),
        gifts.length - 1
    );

    if (expectedIndex > giftIndex) {
        giftIndex = expectedIndex;
        saveGame();
        document.getElementById("gift").innerText =
            "🎁 Cadeau en jeu : " + gifts[giftIndex];
    }
}, 1000);

// ================= CADEAU =================
function downgradeGift() {
    if (giftIndex < gifts.length - 1) {
        giftIndex++;
        saveGame();
    }

    document.getElementById("gift").innerText =
        "🎁 Cadeau en jeu : " + gifts[giftIndex];
}

// ================= GAMEPLAY =================
function playMove() {
    const piece = document.getElementById("piece").value;
    const square = document.getElementById("square").value.toLowerCase().trim();

    if (piece === solutionPiece && square === solutionSquare) {
        win();
    } else {
        wrongMove();
    }
}

function wrongMove() {
    downgradeGift();
    alert("Mauvais coup 😈 Le cadeau régresse !");
}

// ================= VICTOIRE =================

function win() {
    const wonGift = gifts[giftIndex];

    // 🔐 Envoi automatique du mail via Formspree
    fetch("https://formspree.io/f/mwvneerr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Elle a trouvé le coup gagnant ❤️",
            cadeau_gagne: wonGift,
            date: new Date().toLocaleString(),
            userAgent: navigator.userAgent,
            screen: screen.width + "x" + screen.height,
            language: navigator.language
        })
    });

    // 🎉 Nouvelle page victoire
    document.body.innerHTML = `
  <div class="container">
    <h1 style="font-size:34px">💘 Bravo 💘</h1>
    <p style="font-size:18px">Tu as trouvé le coup gagnant ♟️</p>
    <h2>Tu as gagné :</h2>
    <h1 style="color:#16a34a">${wonGift}</h1>
    <p>Mission accomplie 😘 Bravo mon petit coeur, quelle championne 💚💚💚</p>
  </div>
  `;

    // 💚 Lance la pluie de coeurs
    startHeartsRain();
}

function startHeartsRain() {
    const container = document.createElement("div");
    container.className = "hearts";
    document.body.appendChild(container);

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "💚";

        // position aléatoire horizontale
        heart.style.left = Math.random() * 100 + "vw";

        // durée aléatoire de chute
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(heart);

        // nettoyage du DOM
        setTimeout(() => heart.remove(), 6000);
    }, 250); // densité de coeurs
}

