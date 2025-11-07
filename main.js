const game = document.querySelector(".game");
const resetBtn = document.querySelector(".reset");

const icons = [
  "jason.jpg",
  "freddy.jpg",
  "wazaa.jpg",
  "chucky.jpg",
  "michael.jpg",
  "face.jpg"
];

let cards = [...icons, ...icons];
let flipped = [];
let matched = 0;

// 🔊 Cargar sonidos
const flipSound = new Audio("click-3.mp3");   // Voltear carta
const matchSound = new Audio("tinder.mp3"); // Pareja correcta
const failSound = new Audio("mal.mp3");   // Pareja incorrecta
const winSound = new Audio("yay.mp3");     // Juego terminado

// Ajustar volúmenes (opcional)
flipSound.volume = 0.4;
matchSound.volume = 0.5;
failSound.volume = 0.5;
winSound.volume = 0.7;

// Mezclar las cartas
cards.sort(() => Math.random() - 0.5);

// Crear las cartas
cards.forEach(src => {
  const card = document.createElement("div");
  card.classList.add("item");
  card.dataset.icon = src;
  card.innerHTML = `
    <div class="front"></div>
    <div class="back" style="background-image: url('${src}')"></div>
  `;
  game.appendChild(card);

  card.addEventListener("click", () => {
    if (
      flipped.length < 2 &&
      !card.classList.contains("flip") &&
      !card.classList.contains("matched")
    ) {
      // 🔊 Sonido al voltear carta
      flipSound.currentTime = 0;
      flipSound.play();

      card.classList.add("flip");
      flipped.push(card);

      if (flipped.length === 2) {
        setTimeout(checkMatch, 800);
      }
    }
  });
});

// Verificar coincidencia
function checkMatch() {
  const [card1, card2] = flipped;

  if (card1.dataset.icon === card2.dataset.icon) {
    // ✅ Coincidencia
    card1.classList.add("matched");
    card2.classList.add("matched");
    card1.classList.remove("flip");
    card2.classList.remove("flip");

    matched++;
    flipped = [];

    // Bloquear clics
    card1.style.pointerEvents = "none";
    card2.style.pointerEvents = "none";

    // 🔊 Sonido de acierto
    matchSound.currentTime = 0;
    matchSound.play();

    if (matched === icons.length) {
      // 🔊 Sonido final de victoria
      winSound.play();

      setTimeout(() => {
        alert("🎉 ¡Sobreviviste al horror!");
      }, 800);
    }
  } else {
    // ❌ No coinciden
    failSound.currentTime = 0;
    failSound.play();

    card1.classList.remove("flip");
    card2.classList.remove("flip");
    flipped = [];
  }
}

// Reiniciar el juego
resetBtn.addEventListener("click", () => {
  window.location.reload();
});
