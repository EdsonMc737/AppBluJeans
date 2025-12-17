// Pega os dados do HTML
const app = document.getElementById("app");
const modelos = JSON.parse(app.dataset.modelos);

const gallery = document.querySelector(".gallery");
const modal = document.getElementById("modalEnsaio");
const modalImg = document.getElementById("imgModal");
const closeBtn = modal.querySelector(".modal-close");
const prevBtn = modal.querySelector(".modal-prev");
const nextBtn = modal.querySelector(".modal-next");
const thumbnailsContainer = document.getElementById("thumbnailsContainer");

const modalSelecao = document.getElementById("modalSelecao");
const listaEnsaios = document.getElementById("listaEnsaios");

let fotos = [];
let indiceAtual = 0;

// ===== Cria os cards dinamicamente =====
modelos.forEach(modelo => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = modelo.thumb;
    img.alt = modelo.nome;
    card.appendChild(img);

    const info = document.createElement("div");
    info.className = "info";

    const h2 = document.createElement("h2");
    h2.textContent = modelo.nome;
    info.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = modelo.descricao;
    info.appendChild(p);

    const btn = document.createElement("button");
    btn.className = "ver";
    btn.textContent = "Ver Ensaios →";
    btn.addEventListener("click", () => abrirSelecaoEnsaio(modelo.id));
    info.appendChild(btn);

    card.appendChild(info);
    gallery.appendChild(card);
});

// ===== Modal de seleção de ensaios =====
function abrirSelecaoEnsaio(idModelo) {
    const modelo = modelos.find(m => m.id === idModelo);
    if (!modelo) return;

    listaEnsaios.innerHTML = "";

    modelo.ensaios.forEach((ensaio, i) => {
        const btn = document.createElement("button");
        btn.textContent = ensaio.titulo;
        btn.addEventListener("click", () => abrirModalEnsaios(idModelo, i));
        listaEnsaios.appendChild(btn);
    });

    modalSelecao.style.display = "flex";
}

function fecharSelecao() {
    modalSelecao.style.display = "none";
}

// ===== Modal principal de fotos =====
function abrirModalEnsaios(idModelo, indiceEnsaio) {
    const modelo = modelos.find(m => m.id === idModelo);
    if (!modelo) return;

    const ensaio = modelo.ensaios[indiceEnsaio];
    fotos = ensaio.fotos.map(f => f.replace("../../../", "/")); // ajusta caminho se necessário
    indiceAtual = 0;
    modal.style.display = "flex";
    mostrarImagem(indiceAtual);
    renderizarMiniaturas();
    fecharSelecao();
}

function mostrarImagem(indice) {
    indiceAtual = indice;
    modalImg.src = fotos[indiceAtual];

    // Destaca miniatura ativa
    const thumbs = thumbnailsContainer.querySelectorAll("img");
    thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === indiceAtual));
}

function mostrarProximo() {
    mostrarImagem((indiceAtual + 1) % fotos.length);
}

function mostrarAnterior() {
    mostrarImagem((indiceAtual - 1 + fotos.length) % fotos.length);
}

function renderizarMiniaturas() {
    thumbnailsContainer.innerHTML = "";
    fotos.forEach((foto, i) => {
        const img = document.createElement("img");
        img.src = foto;
        img.classList.add("thumbnail");
        if (i === indiceAtual) img.classList.add("active");

        img.addEventListener("click", e => {
            e.stopPropagation();
            mostrarImagem(i);
        });

        thumbnailsContainer.appendChild(img);
    });
}

// ===== Eventos do modal principal =====
nextBtn.addEventListener("click", e => { e.stopPropagation(); mostrarProximo(); });
prevBtn.addEventListener("click", e => { e.stopPropagation(); mostrarAnterior(); });
closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", () => modal.style.display = "none");
modalImg.addEventListener("click", e => e.stopPropagation());

// ===== Navegação por teclado =====
document.addEventListener("keydown", e => {
    if(modal.style.display === "flex") {
        if(e.key === "ArrowRight") mostrarProximo();
        if(e.key === "ArrowLeft") mostrarAnterior();
        if(e.key === "Escape") modal.style.display = "none";
    }
    if(modalSelecao.style.display === "flex" && e.key === "Escape") {
        fecharSelecao();
    }
});
