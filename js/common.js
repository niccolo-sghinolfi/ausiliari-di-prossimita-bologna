/**
 * Navbar e footer condivisi - Ausiliari di Prossimità Bologna
 *
 * Navbar e footer sono uguali su tutte le pagine, quindi vivono qui:
 * una modifica in questo file si applica automaticamente ovunque.
 *
 * Ogni pagina deve avere questi due segnaposto vuoti...
 *
 *   <nav id="site-navbar"></nav>          (subito dopo <body>)
 *   <footer id="site-footer"></footer>    (in fondo alla pagina)
 *
 * ...e includere questo script prima della chiusura di </body>:
 *
 *   <script defer src="../js/common.js"></script>
 *
 * Per aggiungere o rinominare una voce di menu basta modificare
 * l'array PAGINE qui sotto: la voce compare su tutte le pagine e
 * l'evidenziazione della pagina corrente funziona da sola.
 */

const PAGINE = [
    { file: 'homepage.html', etichetta: 'Home' },
    { file: 'associazioni.html', etichetta: 'Associazioni' },
    { file: 'servizi.html', etichetta: 'Servizi' },
    { file: 'galleria.html', etichetta: 'Galleria' },
    { file: 'contatti.html', etichetta: 'Contatti', icona: 'fa-solid fa-phone' }
];

/**
 * Ricava il nome del file aperto dall'URL, es. "/html/servizi.html"
 * restituisce "servizi.html". Se l'URL finisce con "/" (il server sta
 * servendo l'indice della cartella) consideriamo di essere in homepage.
 */
function paginaCorrente() {
    const file = window.location.pathname.split('/').pop();
    return (file || 'homepage.html').toLowerCase();
}

function renderNavbar() {
    const navbarEl = document.getElementById('site-navbar');

    if (!navbarEl) {
        console.error('Elemento #site-navbar non trovato nella pagina.');
        return;
    }

    const corrente = paginaCorrente();

    navbarEl.className = 'navbar navbar-expand-lg navbar-dark bg-bologna-dark fixed-top';

    const voci = PAGINE.map((pagina) => {
        const attiva = pagina.file === corrente;

        // Sulla pagina attiva il link punta all'inizio della pagina stessa,
        // così non si ricarica tutto per tornare in cima.
        const href = attiva ? '#top' : pagina.file;

        const icona = pagina.icona ? `<i class="${pagina.icona}"></i> ` : '';

        return `
            <li class="nav-item">
                <a class="nav-link ${attiva ? 'active' : ''}"
                   ${attiva ? 'aria-current="page"' : ''}
                   href="${href}">${icona}${pagina.etichetta}</a>
            </li>
        `;
    }).join('');

    navbarEl.innerHTML = `
        <div class="container">
            <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="homepage.html">
                <img src="../immagini/logo-volontari-no-sfondo.png" alt="Logo" class="navbar-logo">
                <span class="navbar-brand-text">AUSILIARI DI PROSSIMITÀ</span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Apri il menu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    ${voci}
                </ul>
            </div>
        </div>
    `;
}

function renderFooter() {
    const footerEl = document.getElementById('site-footer');

    if (!footerEl) {
        console.error('Elemento #site-footer non trovato nella pagina.');
        return;
    }

    footerEl.className = 'py-5 mt-5 footer-custom';

    footerEl.innerHTML = `
        <div class="container">
            <div class="row text-center g-4">
                <div class="col-md-4">
                    <img
                        src="../immagini/logo-volontari-no-sfondo.png"
                        alt="Logo Ausiliari di Prossimità Bologna"
                        class="footer-logo"
                    />
                    <p class="mb-0 small">Ausiliari di Prossimità Bologna</p>
                </div>

                <div class="col-md-4 footer-col">
                    <h6 class="fw-bold mb-2">Contattaci</h6>
                    <p class="mb-1">📧 ausiliaridiprossimitabo@gmail.com</p>
                    <p class="mb-0">📞 +39 333 1544030</p>
                </div>

                <div class="col-md-4 footer-col">
                    <h6 class="fw-bold mb-2">La nostra sede</h6>
                    <p class="mb-1">📍 Viale Lincoln n. 66 – Bologna</p>
                    <p class="mb-0">🕒 Lun - Ven: 15:00 - 18:00</p>
                </div>
            </div>

            <hr class="my-4 footer-divider" />

            <div class="text-center">
                <p class="mb-0">© ${new Date().getFullYear()} Ausiliari di Prossimità Bologna</p>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
});
