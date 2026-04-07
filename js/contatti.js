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

        statusBox.textContent = 'Invio in corso...';
        statusBox.className = 'form-status text-muted';
        submitButton.disabled = true;

        try {
            const response = await fetch('../api/contatti.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
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