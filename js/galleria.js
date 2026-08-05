let galleryItems = [];
let filteredItems = [];
let currentModalIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    buildGalleryItems();
    initFilters();
    initFiltersToggle();
    applyFilters();
    initModal();
});

/**
 * Servizi e foto volontari hanno la stessa forma, quindi una sola funzione
 * li converte entrambi in card di galleria: una card per ogni immagine.
 * Il prefisso serve solo a non far collidere gli id (servizio 1 e volontario 1).
 */
function toGalleryItems(records, prefisso) {
    return records
        .filter((record) => record.mostraInGalleria !== false)
        .flatMap((record) => {
            const immagini = Array.isArray(record.immagini) ? record.immagini : [];

            return immagini.map((img, imageIndex) => ({
                id: `${prefisso}-${record.id}-${imageIndex}`,
                immagine: img,
                titolo: record.titolo || "",
                tipologia: record.tipologia || "",
                data: record.data || "",
                anno: getYear(record.data),
                mese: getMonth(record.data),
                quartiere: Array.isArray(record.quartiere) ? record.quartiere : [],
                luogo: record.luogo || ""
            }));
        });
}

function buildGalleryItems() {
    const serviziItems = toGalleryItems(
        typeof servizi !== "undefined" ? servizi : [],
        "servizio"
    );

    const volontariItems = toGalleryItems(
        typeof volontari !== "undefined" ? volontari : [],
        "volontario"
    );

    // Le date sono in formato YYYY-MM-DD: il confronto tra stringhe è già
    // cronologico e non passa da new Date(), che su stringa vuota darebbe
    // Invalid Date. Gli item senza data finiscono in fondo.
    galleryItems = [...serviziItems, ...volontariItems].sort((a, b) => {
        if (!a.data) return 1;
        if (!b.data) return -1;
        return b.data.localeCompare(a.data);
    });
}

function initFilters() {
    populateTypeFilter();
    populateYearFilter();

    document.getElementById("typeFilterSelect")?.addEventListener("change", applyFilters);
    document.getElementById("filterYear")?.addEventListener("change", handleYearChange);
    document.getElementById("filterMonth")?.addEventListener("change", applyFilters);
    document.getElementById("resetFilters")?.addEventListener("click", resetFilters);
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

function populateTypeFilter() {
    const select = document.getElementById("typeFilterSelect");
    if (!select) return;

    const tipologie = [...new Set(
        galleryItems.map(item => item.tipologia).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, "it"));

    select.innerHTML = `<option value="">Tutte</option>`;

    tipologie.forEach((tipologia) => {
        const option = document.createElement("option");
        option.value = tipologia;
        option.textContent = tipologia;
        select.appendChild(option);
    });
}

function populateYearFilter() {
    const select = document.getElementById("filterYear");
    if (!select) return;

    const anni = [...new Set(
        galleryItems.map(item => item.anno).filter(Boolean)
    )].sort((a, b) => b - a);

    select.innerHTML = `<option value="">Tutti</option>`;

    anni.forEach((anno) => {
        const option = document.createElement("option");
        option.value = anno;
        option.textContent = anno;
        select.appendChild(option);
    });
}

// Il menu dei mesi mostra solo i mesi che esistono davvero nell'anno scelto.
function handleYearChange() {
    const year = document.getElementById("filterYear")?.value || "";
    const monthSelect = document.getElementById("filterMonth");

    if (!monthSelect) return;

    monthSelect.innerHTML = `<option value="">Tutti</option>`;
    monthSelect.value = "";

    if (!year) {
        monthSelect.disabled = true;
        applyFilters();
        return;
    }

    const mesi = [...new Set(
        galleryItems
            .filter(item => String(item.anno) === String(year))
            .map(item => item.mese)
            .filter(Boolean)
    )].sort((a, b) => a - b);

    mesi.forEach((mese) => {
        const option = document.createElement("option");
        option.value = mese;
        option.textContent = getMonthName(mese);
        monthSelect.appendChild(option);
    });

    monthSelect.disabled = false;

    applyFilters();
}

function applyFilters() {
    const selectedType = document.getElementById("typeFilterSelect")?.value || "";
    const selectedYear = document.getElementById("filterYear")?.value || "";
    const selectedMonth = document.getElementById("filterMonth")?.value || "";

    filteredItems = galleryItems.filter((item) => {
        const typeMatch = !selectedType || item.tipologia === selectedType;
        const yearMatch = !selectedYear || String(item.anno) === String(selectedYear);
        const monthMatch = !selectedMonth || String(item.mese) === String(selectedMonth);

        return typeMatch && yearMatch && monthMatch;
    });

    renderGallery();
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

    grid.innerHTML = filteredItems.map((item, index) => {
        const metaDate = formatDate(item.data);

        return `
            <article class="gallery-card" onclick="openGalleryModal(${index})">
                <div class="gallery-image-wrap">
                    <img src="${item.immagine}" class="gallery-image" alt="${item.titolo}">
                </div>

                <div class="gallery-meta">
                    <div class="gallery-date">${metaDate}</div>
                    <div class="gallery-meta-top">
                        <span class="gallery-badge">${item.tipologia}</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");
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
    modalImg.alt = item.titolo;
    modalTitle.textContent = item.titolo;
    modalMeta.textContent = buildModalMeta(item);

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

function buildModalMeta(item) {
    const parts = [];

    if (item.data) parts.push(formatDate(item.data));
    if (item.tipologia) parts.push(item.tipologia);
    if (item.quartiere.length > 0) parts.push(item.quartiere.join(", "));
    if (item.luogo) parts.push(item.luogo);

    return parts.join(" • ");
}

function resetFilters() {
    const typeFilter = document.getElementById("typeFilterSelect");
    const yearFilter = document.getElementById("filterYear");
    const monthFilter = document.getElementById("filterMonth");

    if (typeFilter) typeFilter.value = "";
    if (yearFilter) yearFilter.value = "";

    if (monthFilter) {
        monthFilter.innerHTML = `<option value="">Tutti</option>`;
        monthFilter.disabled = true;
        monthFilter.value = "";
    }

    applyFilters();
}

function getYear(dateString) {
    if (!dateString) return "";
    return Number(dateString.split("-")[0]);
}

function getMonth(dateString) {
    if (!dateString) return "";
    return Number(dateString.split("-")[1]);
}

function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

function getMonthName(monthNumber) {
    const mesi = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    return mesi[monthNumber - 1] || monthNumber;
}