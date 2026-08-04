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

function buildGalleryItems() {
    // Un servizio entra nella Galleria solo se non è stato esplicitamente
    // escluso (mostraInGalleria: false). Se non ha immagini semplicemente
    // non produce nessuna card in galleria, ma resta comunque visibile
    // come tessera nella pagina Servizi.
    const serviziItems = (typeof servizi !== "undefined" ? servizi : [])
        .filter((servizio) => servizio.mostraInGalleria !== false)
        .flatMap((servizio) => {
        const immagini = Array.isArray(servizio.immagini) ? servizio.immagini : [];

        return immagini.map((img, imageIndex) => ({
            id: `servizio-${servizio.id}-${imageIndex}`,
            origine: "servizio",
            recordId: servizio.id,
            immagine: img,
            titolo: servizio.titolo || "Servizio",
            tipologia: servizio.tipologia || "Servizio",
            associazione: Array.isArray(servizio.associazione) ? servizio.associazione : [],
            data: servizio.data || "",
            anno: getYear(servizio.data),
            mese: getMonth(servizio.data),
            giorno: getDay(servizio.data),
            descrizione: servizio.descrizioneBreve || "",
            quartiere: Array.isArray(servizio.quartiere) ? servizio.quartiere : [],
            luogo: servizio.luogo || "",
            orario: servizio.orario || "",
            volontari: servizio.volontari ?? null
        }));
    });

    const volontariItems = (typeof volontari !== "undefined" ? volontari : []).flatMap((volontario) => {
        const immagini = Array.isArray(volontario.immagini) ? volontario.immagini : [];

        return immagini.map((img, imageIndex) => ({
            id: `volontario-${volontario.id}-${imageIndex}`,
            origine: "volontario",
            recordId: volontario.id,
            immagine: img,
            titolo: volontario.titolo || "Volontario",
            tipologia: volontario.tipologia || "Foto Volontari",
            associazione: Array.isArray(volontario.associazione) ? volontario.associazione : [],
            data: volontario.data || "",
            anno: getYear(volontario.data),
            mese: getMonth(volontario.data),
            giorno: getDay(volontario.data),
            descrizione: volontario.descrizioneBreve || "",
            quartiere: Array.isArray(volontario.quartiere) ? volontario.quartiere : [],
            luogo: volontario.luogo || "",
            orario: volontario.orario || "",
            volontari: volontario.volontari ?? null
        }));
    });

    galleryItems = [...serviziItems, ...volontariItems].sort((a, b) => {
        return new Date(b.data || 0) - new Date(a.data || 0);
    });
}

function initFilters() {
    populateAssociationFilters();
    populateTypeFilter();
    populateYearFilter();

    document.getElementById("associationFilters")?.addEventListener("change", applyFilters);
    document.getElementById("typeFilterSelect")?.addEventListener("change", applyFilters);
    document.getElementById("filterYear")?.addEventListener("change", handleYearChange);
    document.getElementById("filterMonth")?.addEventListener("change", handleMonthChange);
    document.getElementById("filterDay")?.addEventListener("change", applyFilters);
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

function populateAssociationFilters() {
    const container = document.getElementById("associationFilters");
    if (!container) return;

    const associazioni = [...new Set(
        galleryItems.flatMap(item => item.associazione).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, "it"));

    container.innerHTML = "";

    associazioni.forEach((nome, index) => {
        const id = `assoc-${index}`;

        const label = document.createElement("label");
        label.className = "filter-check";
        label.setAttribute("for", id);

        label.innerHTML = `
            <input type="checkbox" id="${id}" value="${nome}">
            <span>${nome}</span>
        `;

        container.appendChild(label);
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

function handleYearChange() {
    const year = document.getElementById("filterYear")?.value || "";
    const monthSelect = document.getElementById("filterMonth");
    const daySelect = document.getElementById("filterDay");

    if (!monthSelect || !daySelect) return;

    daySelect.innerHTML = `<option value="">Tutti</option>`;
    daySelect.disabled = true;
    daySelect.value = "";

    if (!year) {
        monthSelect.innerHTML = `<option value="">Tutti</option>`;
        monthSelect.disabled = true;
        monthSelect.value = "";
        applyFilters();
        return;
    }

    const mesi = [...new Set(
        galleryItems
            .filter(item => String(item.anno) === String(year))
            .map(item => item.mese)
            .filter(Boolean)
    )].sort((a, b) => a - b);

    monthSelect.innerHTML = `<option value="">Tutti</option>`;
    mesi.forEach((mese) => {
        const option = document.createElement("option");
        option.value = mese;
        option.textContent = getMonthName(mese);
        monthSelect.appendChild(option);
    });

    monthSelect.disabled = false;
    monthSelect.value = "";

    applyFilters();
}

function handleMonthChange() {
    const year = document.getElementById("filterYear")?.value || "";
    const month = document.getElementById("filterMonth")?.value || "";
    const daySelect = document.getElementById("filterDay");

    if (!daySelect) return;

    if (!year || !month) {
        daySelect.innerHTML = `<option value="">Tutti</option>`;
        daySelect.disabled = true;
        daySelect.value = "";
        applyFilters();
        return;
    }

    const giorni = [...new Set(
        galleryItems
            .filter(item =>
                String(item.anno) === String(year) &&
                String(item.mese) === String(month)
            )
            .map(item => item.giorno)
            .filter(Boolean)
    )].sort((a, b) => a - b);

    daySelect.innerHTML = `<option value="">Tutti</option>`;
    giorni.forEach((giorno) => {
        const option = document.createElement("option");
        option.value = giorno;
        option.textContent = String(giorno).padStart(2, "0");
        daySelect.appendChild(option);
    });

    daySelect.disabled = false;
    daySelect.value = "";

    applyFilters();
}

function applyFilters() {
    const selectedAssociations = Array.from(
        document.querySelectorAll('#associationFilters input[type="checkbox"]:checked')
    ).map(input => input.value);

    const selectedType = document.getElementById("typeFilterSelect")?.value || "";
    const selectedYear = document.getElementById("filterYear")?.value || "";
    const selectedMonth = document.getElementById("filterMonth")?.value || "";
    const selectedDay = document.getElementById("filterDay")?.value || "";

    filteredItems = galleryItems.filter((item) => {
        const associationMatch = selectedAssociations.length === 0 ||
            item.associazione.some(nome => selectedAssociations.includes(nome));

        const typeMatch = !selectedType || item.tipologia === selectedType;
        const yearMatch = !selectedYear || String(item.anno) === String(selectedYear);
        const monthMatch = !selectedMonth || String(item.mese) === String(selectedMonth);
        const dayMatch = !selectedDay || String(item.giorno) === String(selectedDay);

        return associationMatch && typeMatch && yearMatch && monthMatch && dayMatch;
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
        const associazioni = item.associazione.join(", ");

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
                    <div class="gallery-association">${associazioni}</div>
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
    if (item.associazione.length > 0) parts.push(item.associazione.join(", "));
    if (item.quartiere.length > 0) parts.push(item.quartiere.join(", "));
    if (item.luogo) parts.push(item.luogo);
    if (item.orario) parts.push(item.orario);

    return parts.join(" • ");
}

function resetFilters() {
    document.querySelectorAll('#associationFilters input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    const typeFilter = document.getElementById("typeFilterSelect");
    const yearFilter = document.getElementById("filterYear");
    const monthFilter = document.getElementById("filterMonth");
    const dayFilter = document.getElementById("filterDay");

    if (typeFilter) typeFilter.value = "";
    if (yearFilter) yearFilter.value = "";

    if (monthFilter) {
        monthFilter.innerHTML = `<option value="">Tutti</option>`;
        monthFilter.disabled = true;
        monthFilter.value = "";
    }

    if (dayFilter) {
        dayFilter.innerHTML = `<option value="">Tutti</option>`;
        dayFilter.disabled = true;
        dayFilter.value = "";
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

function getDay(dateString) {
    if (!dateString) return "";
    return Number(dateString.split("-")[2]);
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