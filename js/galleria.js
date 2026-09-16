/**
 * Pagina Galleria.
 *
 * Le foto arrivano da dati-galleria.js, che a sua volta è generato
 * leggendo le sottocartelle di immagini/ (una per tipologia). Qui ci
 * si occupa solo di filtrare per tipologia e di far funzionare la
 * finestra di ingrandimento con le frecce avanti/indietro.
 */

let filteredItems = [];
let currentModalIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    filteredItems = typeof galleriaFoto !== "undefined" ? galleriaFoto : [];

    initFilters();
    initFiltersToggle();
    initModal();

    renderGallery();
});

function initFilters() {
    populateTypeFilter();

    document.getElementById("typeFilterSelect")?.addEventListener("change", applyFilters);
    document.getElementById("resetFilters")?.addEventListener("click", resetFilters);
}

function populateTypeFilter() {
    const select = document.getElementById("typeFilterSelect");
    if (!select || typeof galleriaFoto === "undefined") return;

    const tipologie = [...new Set(
        galleriaFoto.map(item => item.tipologia).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, "it"));

    tipologie.forEach((tipologia) => {
        const option = document.createElement("option");
        option.value = tipologia;
        option.textContent = tipologia;
        select.appendChild(option);
    });
}

function initFiltersToggle() {
    const toggleBtn = document.getElementById("filtersToggle");
    const panel = document.getElementById("filtersPanel");
    const box = document.querySelector(".gallery-filters-box");

    if (!toggleBtn || !panel || !box) return;

    toggleBtn.addEventListener("click", () => {
        const isOpen = panel.classList.contains("open");

        panel.classList.toggle("open", !isOpen);
        box.classList.toggle("open", !isOpen);
        toggleBtn.setAttribute("aria-expanded", String(!isOpen));
    });
}

function applyFilters() {
    const selectedType = document.getElementById("typeFilterSelect")?.value || "";

    filteredItems = (typeof galleriaFoto !== "undefined" ? galleriaFoto : [])
        .filter(item => !selectedType || item.tipologia === selectedType);

    renderGallery();
}

function resetFilters() {
    const typeFilter = document.getElementById("typeFilterSelect");
    if (typeFilter) typeFilter.value = "";

    applyFilters();
}

function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    if (filteredItems.length === 0) {
        grid.innerHTML = `
            <div class="gallery-empty">
                <h3 class="h5 mb-2">Nessun risultato</h3>
                <p class="mb-0">Prova a modificare o resettare i filtri.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredItems.map((item, index) => `
        <article class="gallery-card" onclick="openGalleryModal(${index})">
            <div class="gallery-image-wrap">
                <img src="${item.immagine}" class="gallery-image" alt="${item.tipologia}" loading="lazy">
            </div>

            <div class="gallery-meta">
                <div class="gallery-meta-top">
                    <span class="gallery-badge">${item.tipologia}</span>
                </div>
            </div>
        </article>
    `).join("");
}

function initModal() {
    const modalEl = document.getElementById("galleryModal");
    if (!modalEl) return;

    window.galleryModalInstance = new bootstrap.Modal(modalEl);

    document.addEventListener("keydown", (event) => {
        if (!modalEl.classList.contains("show")) return;

        if (event.key === "ArrowLeft") {
            showPrevImage();
        } else if (event.key === "ArrowRight") {
            showNextImage();
        }
    });
}

function openGalleryModal(index) {
    currentModalIndex = index;
    updateModalContent();

    if (window.galleryModalInstance) {
        window.galleryModalInstance.show();
    }
}

function updateModalContent() {
    const item = filteredItems[currentModalIndex];
    if (!item) return;

    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalMeta = document.getElementById("modalMeta");

    if (!modalImg || !modalTitle || !modalMeta) return;

    modalImg.src = item.immagine;
    modalImg.alt = item.tipologia;
    modalTitle.textContent = item.tipologia;
    modalMeta.textContent = "";

    renderModalNavigation();
}

function renderModalNavigation() {
    const modalBody = document.querySelector(".gallery-modal-body");
    if (!modalBody) return;

    const oldNav = document.getElementById("galleryModalNav");
    if (oldNav) oldNav.remove();

    if (filteredItems.length <= 1) return;

    const nav = document.createElement("div");
    nav.id = "galleryModalNav";
    nav.className = "gallery-modal-nav";

    nav.innerHTML = `
        <button type="button" class="gallery-nav-btn gallery-nav-prev" aria-label="Immagine precedente">
            &#10094;
        </button>
        <button type="button" class="gallery-nav-btn gallery-nav-next" aria-label="Immagine successiva">
            &#10095;
        </button>
    `;

    modalBody.appendChild(nav);

    nav.querySelector(".gallery-nav-prev").addEventListener("click", showPrevImage);
    nav.querySelector(".gallery-nav-next").addEventListener("click", showNextImage);
}

function showPrevImage() {
    if (filteredItems.length === 0) return;
    currentModalIndex = (currentModalIndex - 1 + filteredItems.length) % filteredItems.length;
    updateModalContent();
}

function showNextImage() {
    if (filteredItems.length === 0) return;
    currentModalIndex = (currentModalIndex + 1) % filteredItems.length;
    updateModalContent();
}
