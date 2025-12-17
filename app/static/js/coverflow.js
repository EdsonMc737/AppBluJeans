
const container = document.querySelector('.carrossel-container');
const cards = Array.from(document.querySelectorAll('.modelo-card'));
const btnEsquerda = document.querySelector('.seta-esquerda');
const btnDireita = document.querySelector('.seta-direita');

const totalCards = cards.length;
let centerIndex = Math.floor(totalCards / 2);

// Número de cards visíveis (central + 2 para cada lado)
const visibleCardsCount = 5;
const maxOffset = Math.floor(visibleCardsCount / 2);

function updateCarousel() {
  cards.forEach((card, i) => {
    // Calcula offset relativo ao centro, com wrap-around circular
    let offset = i - centerIndex;

    // Ajusta offset para circular
    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;

    // Só mostra os cards dentro do intervalo visível
    if (Math.abs(offset) > maxOffset) {
      card.style.opacity = 0;
      card.style.pointerEvents = 'none';
      card.style.transform = `translate(-50%, -50%) translateX(0) scale(0)`;
      return;
    }

    card.style.opacity = 1;
    card.style.pointerEvents = 'auto';

    // Calcula posição X (espaçamento menor para cards próximos)
    const spacing = 160; // distância base entre cards
    const x = offset * spacing;

    // Escala para dar destaque ao central
    const scale = 1 - Math.abs(offset) * 0.2;

    // Z-index para sobreposição correta
    const zIndex = visibleCardsCount - Math.abs(offset);

    // Transforma: centraliza, move no eixo X e escala
    card.style.transform = `translate(-50%, -50%) translateX(${x}px) scale(${scale})`;
    card.style.zIndex = zIndex;
  });
}

// Eventos das setas
btnEsquerda.addEventListener('click', () => {
  centerIndex = (centerIndex - 1 + totalCards) % totalCards;
  updateCarousel();
});

btnDireita.addEventListener('click', () => {
  centerIndex = (centerIndex + 1) % totalCards;
  updateCarousel();
});

// Inicializa
updateCarousel();

// Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.onclick = () => {
    navLinks.classList.toggle("open");
}
