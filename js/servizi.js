document.addEventListener("DOMContentLoaded", () => {
    renderServizi();
});

function renderServizi() {
    const container = document.getElementById("serviziContainer");

    if (!container || typeof servizi === "undefined") return;

    container.innerHTML = "";

    const row = document.createElement("div");
    row.className = "row g-4";
    row.id = "serviziRow";

    servizi.forEach((servizio, index) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";
        col.dataset.index = index;

        const cover = Array.isArray(servizio.immagini) && servizio.immagini.length > 0
            ? servizio.immagini[0]
            : "../immagini/placeholder-servizio.jpg";

        const quartieri = Array.isArray(servizio.quartiere)
            ? servizio.quartiere.join(", ")
            : "";

        const associazioni = Array.isArray(servizio.associazione)
            ? servizio.associazione.join(", ")
            : "";

        col.innerHTML = `
            <div class="servizio-card p-3 h-100">
                <img src="${cover}" class="servizio-cover mb-3" alt="${servizio.titolo}">

                <div class="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                    <h4 class="mb-0 servizio-card-title">${servizio.titolo}</h4>
                    <span class="servizio-badge">${servizio.tipologia || ""}</span>
                </div>

                <div class="servizio-meta mb-2">
                    ${servizio.data || ""}
                    ${quartieri ? ` • ${quartieri}` : ""}
                </div>

                <div class="servizio-meta mb-3">
                    ${associazioni}
                </div>

                <p class="mb-3">${servizio.descrizioneBreve || ""}</p>

                <div class="mt-auto">
                    <button class="btn btn-primary btn-sm" onclick="toggleDettagli(${index})">
                        Scopri di più
                    </button>
                </div>
            </div>
        `;

        row.appendChild(col);
    });

    container.appendChild(row);
}

function toggleDettagli(index) {
    const row = document.getElementById("serviziRow");
    const servizio = servizi[index];
    if (!row || !servizio) return;

    const existingExpandedCol = document.getElementById("expanded-row-col");
    const existingOpenIndex = existingExpandedCol ? Number(existingExpandedCol.dataset.openIndex) : null;

    // se clicco sullo stesso servizio aperto, chiudo
    if (existingExpandedCol && existingOpenIndex === index) {
        existingExpandedCol.remove();
        return;
    }

    // se c'è già un dettaglio aperto, lo rimuovo
    if (existingExpandedCol) {
        existingExpandedCol.remove();
    }

    const cardCols = Array.from(row.querySelectorAll('[data-index]'));
    const currentCol = cardCols.find(col => Number(col.dataset.index) === index);
    if (!currentCol) return;

    const currentPosition = cardCols.indexOf(currentCol);
    const itemsPerRow = getItemsPerRow();
    const rowEndIndex = Math.min(
        Math.floor(currentPosition / itemsPerRow) * itemsPerRow + (itemsPerRow - 1),
        cardCols.length - 1
    );

    const insertAfterCol = cardCols[rowEndIndex];

    const expandedCol = document.createElement("div");
    expandedCol.className = "col-12";
    expandedCol.id = "expanded-row-col";
    expandedCol.dataset.openIndex = index;

    expandedCol.innerHTML = buildExpandedMarkup(servizio, index);

    insertAfterCol.insertAdjacentElement("afterend", expandedCol);

    setTimeout(() => {
        const expanded = expandedCol.querySelector(".servizio-expanded");
        if (expanded) expanded.classList.add("show");
    }, 10);

    expandedCol.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function buildExpandedMarkup(servizio, index) {
    const immagini = Array.isArray(servizio.immagini) ? servizio.immagini : [];
    const associazioni = Array.isArray(servizio.associazione)
        ? servizio.associazione.join(", ")
        : "";

    const quartieri = Array.isArray(servizio.quartiere)
        ? servizio.quartiere.join(", ")
        : "";

    const descrizione = servizio.descrizioneCompleta || servizio.descrizioneBreve || "";

    let mediaMarkup = "";

    if (immagini.length > 1) {
        const carouselId = `servizioCarousel-${index}`;

        const indicators = immagini.map((_, i) => `
            <button
                type="button"
                data-bs-target="#${carouselId}"
                data-bs-slide-to="${i}"
                class="${i === 0 ? "active" : ""}"
                ${i === 0 ? 'aria-current="true"' : ""}
                aria-label="Slide ${i + 1}">
            </button>
        `).join("");

        const slides = immagini.map((img, i) => `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${img}" class="d-block w-100 servizio-carousel-image" alt="${servizio.titolo}">
            </div>
        `).join("");

        mediaMarkup = `
            <div id="${carouselId}" class="carousel slide servizio-carousel mb-4" data-bs-ride="false">
                <div class="carousel-indicators">
                    ${indicators}
                </div>

                <div class="carousel-inner rounded-4 overflow-hidden">
                    ${slides}
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                    <span class="visually-hidden">Precedente</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                    <span class="visually-hidden">Successiva</span>
                </button>
            </div>
        `;
    } else {
        const mainImage = immagini[0] || "../immagini/placeholder-servizio.jpg";

        mediaMarkup = `
            <img src="${mainImage}" class="servizio-expanded-main mb-4" alt="${servizio.titolo}">
        `;
    }

    return `
        <div class="servizio-expanded p-4 p-lg-5 mt-2">
            ${mediaMarkup}

            <div class="row g-4 align-items-start">
                <div class="col-lg-8">
                    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                        <h3 class="mb-0">${servizio.titolo}</h3>
                        <span class="servizio-badge">${servizio.tipologia || ""}</span>
                    </div>

                    <p class="mb-0">${descrizione}</p>
                </div>

                <div class="col-lg-4">
                    <div class="servizio-detail-box">
                        <div class="mb-2"><strong>Data:</strong> ${servizio.data || ""}</div>
                        ${quartieri ? `<div class="mb-2"><strong>Quartiere:</strong> ${quartieri}</div>` : ""}
                        ${servizio.luogo ? `<div class="mb-2"><strong>Luogo:</strong> ${servizio.luogo}</div>` : ""}
                        ${servizio.orario ? `<div class="mb-2"><strong>Orario:</strong> ${servizio.orario}</div>` : ""}
                        ${servizio.volontari !== null && servizio.volontari !== undefined && servizio.volontari !== ""
                            ? `<div class="mb-2"><strong>Volontari:</strong> ${servizio.volontari}</div>`
                            : ""
                        }
                        ${associazioni ? `<div class="mb-0"><strong>Associazioni:</strong> ${associazioni}</div>` : ""}
                    </div>
                </div>
            </div>

            <div class="text-end mt-4">
                <button class="btn btn-outline-secondary servizio-close" onclick="toggleDettagli(${index})">
                    Chiudi
                </button>
            </div>
        </div>
    `;
}

function getItemsPerRow() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

window.addEventListener("resize", () => {
    const existingExpandedCol = document.getElementById("expanded-row-col");
    if (!existingExpandedCol) return;

    const openIndex = Number(existingExpandedCol.dataset.openIndex);
    existingExpandedCol.remove();
    toggleDettagli(openIndex);
});