document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initCarosello();
    initAssociazioni();
    initVolontariFilmstrip();
});

// Fade-in foto dopo caricamento
window.addEventListener('load', () => {
    document.body.classList.add('hero-loaded');
});

// Contatori hero
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent, 10);
        const addPlus = !counter.classList.contains('no-plus');
        let count = 0;
        const increment = target / 100;

        const update = () => {
            count += increment;

            if (count < target) {
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.textContent = addPlus ? `${target}+` : `${target}`;
            }
        };

        update();
    });
}

// Carosello dinamico ultimi servizi
function initCarosello() {
    const inner = document.getElementById('carouselInner');
    const indicators = document.getElementById('carouselIndicators');

    if (!inner || !indicators || typeof servizi === 'undefined') {
        return;
    }

    const ultimiServizi = servizi.slice(0, 5);

    indicators.innerHTML = '';
    inner.innerHTML = '';

    ultimiServizi.forEach((servizio, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#serviziCarousel';
        indicator.dataset.bsSlideTo = index;
        indicator.className = index === 0 ? 'active' : '';
        indicator.ariaLabel = `Slide ${index + 1}`;

        if (index === 0) {
            indicator.ariaCurrent = 'true';
        }

        indicators.appendChild(indicator);

        const cover = Array.isArray(servizio.immagini) && servizio.immagini.length > 0
            ? servizio.immagini[0]
            : '../immagini/placeholder-servizio.jpg';

        const quartieri = Array.isArray(servizio.quartiere)
            ? servizio.quartiere.join(', ')
            : '';

        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        item.innerHTML = `
            <a href="servizi.html" class="text-decoration-none">
                <img src="${cover}" class="d-block w-100" alt="${servizio.titolo}" style="height: 400px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${servizio.titolo}</h5>
                    <p class="mb-1">${servizio.descrizioneBreve || ''}</p>
                    <small>${servizio.data || ''}${quartieri ? ` • ${quartieri}` : ''}</small>
                </div>
            </a>
        `;

        inner.appendChild(item);
    });
}

// Carosello associazioni (2 per slide desktop, 1 mobile)
function initAssociazioni() {
    const inner = document.getElementById('associazioniInner');
    const indicators = document.getElementById('associazioniIndicators');

    if (!inner || !indicators || typeof associazioni === 'undefined') {
        return;
    }

    inner.innerHTML = '';
    indicators.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const itemsPerSlide = isMobile ? 1 : 2;

    const gruppi = [];
    for (let i = 0; i < associazioni.length; i += itemsPerSlide) {
        gruppi.push(associazioni.slice(i, i + itemsPerSlide));
    }

    gruppi.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#associazioniCarousel';
        indicator.dataset.bsSlideTo = index;
        indicator.className = index === 0 ? 'active' : '';
        indicator.ariaLabel = `Slide ${index + 1}`;

        if (index === 0) {
            indicator.ariaCurrent = 'true';
        }

        indicators.appendChild(indicator);
    });

    gruppi.forEach((gruppo, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        const row = document.createElement('div');
        row.className = 'row g-4 justify-content-center';

        gruppo.forEach(ass => {
            const col = document.createElement('div');
            col.className = isMobile ? 'col-12' : 'col-md-6';

            col.innerHTML = `
                <div class="card text-center h-100">
                    <img src="${ass.immagine}" class="card-img-top assoc-card-logo" alt="${ass.nome}">
                    <div class="card-body">
                        <h5 class="mb-1">${ass.nome}</h5>
                        <p class="mb-0 text-muted">${ass.sede || ''}</p>
                    </div>
                </div>
            `;

            row.appendChild(col);
        });

        item.appendChild(row);
        inner.appendChild(item);
    });
}

let resizeTimeout;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initAssociazioni();
    }, 200);
});

// Pellicola volontari a scorrimento continuo
function initVolontariFilmstrip() {
    const container = document.getElementById('volontariFilmstrip');

    if (!container || typeof volontari === 'undefined') {
        return;
    }

    container.innerHTML = '';

    const volontariLoop = [...volontari, ...volontari];

    volontariLoop.forEach((volontario) => {
        const immagine = Array.isArray(volontario.immagini) && volontario.immagini.length > 0
            ? volontario.immagini[0]
            : '../immagini/placeholder-volontario.jpg';

        const titolo = volontario.titolo || 'Volontario';

        const frame = document.createElement('div');
        frame.className = 'film-frame';

        frame.innerHTML = `
            <div class="film-frame-inner">
                <img src="${immagine}" alt="${titolo}">
            </div>
        `;

        container.appendChild(frame);
    });
}