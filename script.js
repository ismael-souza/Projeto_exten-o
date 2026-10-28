/* ==========================================================================
   Zoo Sonoro - JavaScript Engine (Mobile Optimized)
   ========================================================================== */

// Lista de Animais (Apontando para a pasta /audio e /images)
const animais = [
  {
    nome: "Cavalo",
    imagem: "images/Cavalo.jpeg",
    som: "audio/cavalo.mp3",
    cor: "#8B5E3C",
    corBg: "#F8F1EB"
  },
  {
    nome: "Vaca",
    imagem: "images/vaca.jpg",
    som: "audio/vaca.mp3",
    cor: "#10AC84",
    corBg: "#ECFDF5"
  },
  {
    nome: "Galinha",
    imagem: "images/galinha.jpg",
    som: "audio/galinha.mp3",
    cor: "#FECA57",
    corBg: "#FFFBEB"
  },
  {
    nome: "Ovelha",
    imagem: "images/ovelha.jpg",
    som: "audio/ovelha.mp3",
    cor: "#A55EEA",
    corBg: "#F3E8FF"
  },
  {
    nome: "Porco",
    imagem: "images/porco.jpg",
    som: "audio/porco.mp3",
    cor: "#FF7878",
    corBg: "#FFF0F0"
  },
  {
    nome: "Cachorro",
    imagem: "images/cachorro.jpg",
    som: "audio/cachorro.mp3",
    cor: "#EE5253",
    corBg: "#FEF2F2"
  },
  {
    nome: "Pintinho",
    imagem: "images/pintinho.jpg",
    som: "audio/pintinho.mp3",
    cor: "#FF9F43",
    corBg: "#FFF7ED"
  },
  {
    nome: "Gato",
    imagem: "images/gato.jpg",
    som: "audio/gato miando.mp3",
    cor: "#FF9FF3",
    corBg: "#FDF2F8"
  }
];

// Estado global de áudio
let audioAtual = null;
let cardAtivoAtual = null;
let timerAnimacao = null;

// Elementos do DOM
const gridContainer = document.getElementById("animal-grid");
const positionLabel = document.getElementById("animal-position");
let animalIndex = 0;

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCards();
  document.getElementById("previous-animal").addEventListener("click", () => navegarAnimal(-1));
  document.getElementById("next-animal").addEventListener("click", () => navegarAnimal(1));
});

function navegarAnimal(direction) {
  const novoIndex = animalIndex + direction;
  if (novoIndex < 0 || novoIndex >= animais.length) return;

  interromperAudioAnterior();
  animalIndex = novoIndex;
  renderizarCards();
}

// Função para renderizar os cards na tela
function renderizarCards() {
  const fragment = document.createDocumentFragment();

  const animal = animais[animalIndex];
    const card = document.createElement("div");
    card.className = "animal-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ouvir som do ${animal.nome}`);
    
    // Cores personalizadas por card
    card.style.setProperty("--theme-color", animal.cor);
    card.style.setProperty("--theme-bg", animal.corBg);

    card.innerHTML = `
      <div class="sound-wave-container" aria-hidden="true">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      
      <div class="card-image-wrapper">
        <img 
          src="${animal.imagem}" 
          alt="Foto do ${animal.nome}" 
          class="card-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <h2 class="card-name">${animal.nome}</h2>
    `;

    // Eventos de toque com performance otimizada
    card.addEventListener("click", (e) => tocarSomAnimal(animal, card, e));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tocarSomAnimal(animal, card, e);
      }
    });

    fragment.appendChild(card);

  gridContainer.innerHTML = "";
  gridContainer.appendChild(fragment);
  positionLabel.textContent = `${animalIndex + 1} de ${animais.length}`;
  document.getElementById("previous-animal").disabled = animalIndex === 0;
  document.getElementById("next-animal").disabled = animalIndex === animais.length - 1;
}

// Função de reprodução de áudio e animação de clique
function tocarSomAnimal(animal, cardElement, event) {
  // Parar qualquer áudio tocando anteriormente
  interromperAudioAnterior();

  // Marcar card ativo e iniciar animações
  cardAtivoAtual = cardElement;
  cardElement.classList.add("playing");

  // Efeito leve de partículas
  criarEfeitoParticulas(cardElement, event);

  // Reproduzir arquivo de som (.mp3 da pasta /audio)
  const audio = new Audio(animal.som);
  audioAtual = audio;

  audio.play()
    .then(() => {
      audio.onended = () => resetarEstadoCard(cardElement);
    })
    .catch((err) => {
      console.log(`[Zoo Sonoro] Não foi possível reproduzir o áudio para "${animal.nome}":`, err);

      timerAnimacao = setTimeout(() => {
        resetarEstadoCard(cardElement);
      }, 1000);
    });
}

// Interrompe o áudio anterior e reseta animações
function interromperAudioAnterior() {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
    audioAtual = null;
  }
  if (timerAnimacao) {
    clearTimeout(timerAnimacao);
    timerAnimacao = null;
  }
  if (cardAtivoAtual) {
    cardAtivoAtual.classList.remove("playing");
    cardAtivoAtual = null;
  }
}

// Restaura o estado normal do card
function resetarEstadoCard(cardElement) {
  if (cardElement) {
    cardElement.classList.remove("playing");
  }
  if (cardAtivoAtual === cardElement) {
    cardAtivoAtual = null;
  }
}

// Efeito de Partículas Leves (Aceleradas por Hardware)
function criarEfeitoParticulas(cardElement, event) {
  const rect = cardElement.getBoundingClientRect();
  const simbolos = ["⭐", "✨", "🎵"];

  for (let i = 0; i < 3; i++) {
    const particle = document.createElement("span");
    particle.className = "sparkle-particle";
    particle.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    
    const dx = (Math.random() - 0.5) * 80 + "px";
    const dy = (Math.random() - 0.7) * 100 + "px";

    particle.style.setProperty("--dx", dx);
    particle.style.setProperty("--dy", dy);
    particle.style.left = (rect.width / 2) + "px";
    particle.style.top = (rect.height / 3) + "px";

    cardElement.appendChild(particle);

    setTimeout(() => particle.remove(), 600);
  }
}
