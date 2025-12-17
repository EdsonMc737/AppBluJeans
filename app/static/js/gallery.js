
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modalFoto");
    const modalImg = document.getElementById("imgModal");
    const closeBtn = modal.querySelector(".modal-close");
    const prevBtn = modal.querySelector(".modal-prev");
    const nextBtn = modal.querySelector(".modal-next");
    const thumbnailsContainer = document.getElementById("thumbnailsContainer");

    let fotos = [];
    let indiceAtual = 0;

    // Carregar apenas fotos do ensaio clicado
    const ensaiosDiv = document.querySelectorAll(".ensaio");
    ensaiosDiv.forEach(ensaioDiv => {
        const imgs = ensaioDiv.querySelectorAll("img");
        imgs.forEach((img, idx) => {
            img.addEventListener("click", (e) => {
                e.stopPropagation();
                fotos = Array.from(imgs).map(i => i.src);
                indiceAtual = idx;
                mostrarImagem(indiceAtual);
                modal.style.display = "flex";
                renderizarMiniaturas();
            });
        });
    });

    function mostrarImagem(indice) {
        indiceAtual = indice;
        modalImg.src = fotos[indiceAtual];

        // Atualiza destaque das miniaturas
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
            img.addEventListener("click", () => mostrarImagem(i));
            if (i === indiceAtual) img.classList.add("active");
            thumbnailsContainer.appendChild(img);
        });
    }

    // Eventos do modal
    nextBtn.addEventListener("click", e => { e.stopPropagation(); mostrarProximo(); });
    prevBtn.addEventListener("click", e => { e.stopPropagation(); mostrarAnterior(); });
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", () => modal.style.display = "none");
    modalImg.addEventListener("click", e => e.stopPropagation());

    document.addEventListener("keydown", (e) => {
        if(modal.style.display === "flex") {
            if(e.key === "ArrowRight") mostrarProximo();
            if(e.key === "ArrowLeft") mostrarAnterior();
            if(e.key === "Escape") modal.style.display = "none";
        }
    });
});
