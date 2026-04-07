document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('associazioniContainer');

    if (!container || typeof associazioni === 'undefined') {
        console.error('Container o dati associazioni non trovati');
        return;
    }

    container.innerHTML = '';

    associazioni.forEach((ass) => {
        const col = document.createElement('div');
        col.className = 'col-lg-6';

        col.innerHTML = `
            <div class="card association-card h-100">

                <div class="association-logo-box">
                    <img src="${ass.immagine}" alt="${ass.nome}">
                </div>

                <div class="card-body p-4 association-info">
                    <h3 class="h4 fw-bold mb-3">${ass.nome}</h3>

                    <p><strong>Presidente:</strong> ${ass.presidente || "-"}</p>
                    <p><strong>Sede:</strong> ${ass.sede || "-"}</p>
                    <p><strong>Telefono:</strong> ${ass.contatti || "-"}</p>
                    <p><strong>Email:</strong> ${ass.email || "-"}</p>

                    <p class="mt-3">
                        ${ass.descrizione || "Descrizione non disponibile."}
                    </p>
                </div>

            </div>
        `;

        container.appendChild(col);
    });
});