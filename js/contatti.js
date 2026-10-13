/**
 * Invio del form contatti - Ausiliari di Prossimità Bologna
 *
 * ATTUALMENTE in modalità temporanea: il form invia a FormSubmit.co
 * (servizio gratuito di terze parti) invece che a api/contatti.php,
 * perché il sito è ospitato su un hosting gratuito senza supporto PHP.
 * La prima volta che qualcuno invia il form, FormSubmit manda
 * un'email di conferma all'indirizzo di destinazione: va aperta e
 * confermata una volta sola, altrimenti i messaggi successivi non
 * arrivano.
 *
 * Quando il sito passerà a un hosting con PHP, per tornare a usare
 * api/contatti.php con PHPMailer: cambia solo l'URL qui sotto da
 * "https://formsubmit.co/ajax/..." a "../api/contatti.php" (e togli
 * action/method dal tag <form> in contatti.html).
 */

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/ausiliaridiprossimitabo@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusBox = document.getElementById('formStatus');

    if (!form || !statusBox) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);

        // Honeypot anti-spam: se il campo nascosto è valorizzato è un bot.
        // Mostriamo "inviato" senza davvero contattare FormSubmit, così il
        // bot non capisce di essere stato bloccato.
        const honeypot = (formData.get('sito_web') || '').toString().trim();
        if (honeypot !== '') {
            statusBox.textContent = 'Messaggio inviato correttamente.';
            statusBox.className = 'form-status text-success';
            form.reset();
            return;
        }

        statusBox.textContent = 'Invio in corso...';
        statusBox.className = 'form-status text-muted';
        submitButton.disabled = true;

        try {
            const response = await fetch(FORMSUBMIT_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData
            });

            const result = await response.json().catch(() => ({}));
            const inviataConSuccesso = response.ok && (result.success === true || result.success === 'true');

            if (!inviataConSuccesso) {
                throw new Error(result.message || 'Errore durante l’invio.');
            }

            statusBox.textContent = 'Messaggio inviato correttamente.';
            statusBox.className = 'form-status text-success';
            form.reset();
        } catch (error) {
            statusBox.textContent = error.message || 'Invio non riuscito.';
            statusBox.className = 'form-status text-danger';
        } finally {
            submitButton.disabled = false;
        }
    });
});
