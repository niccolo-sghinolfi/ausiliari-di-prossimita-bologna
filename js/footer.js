/**
 * Footer condiviso - Ausiliari di Prossimità Bologna
 *
 * Per modificare il footer su TUTTE le pagine del sito, basta
 * cambiare il template qui sotto: la modifica si applica
 * automaticamente ovunque questo script sia incluso.
 *
 * Ogni pagina deve avere un tag così, dove vuole mostrare il footer:
 *   <footer id="site-footer" class="py-5 mt-5 footer-custom"></footer>
 *
 * e includere questo script prima della chiusura di </body>:
 *   <script defer src="../js/footer.js"></script>
 */

document.addEventListener('DOMContentLoaded', () => {
    const footerEl = document.getElementById('site-footer');

    if (!footerEl) {
        console.error('Elemento #site-footer non trovato nella pagina.');
        return;
    }

    footerEl.innerHTML = `
        <div class="container">
            <div class="row text-center g-4">
                <div class="col-md-4">
                    <img
                        src="../immagini/logo volontari no bgrnd.png"
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
                <p class="mb-0">© Ausiliari di Prossimità Bologna</p>
            </div>
        </div>
    `;
});
