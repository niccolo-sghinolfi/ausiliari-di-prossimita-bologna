<?php
/**
 * Endpoint del modulo di contatto - Ausiliari di Prossimità Bologna
 * Invio email via SMTP tramite PHPMailer.
 *
 * ============================================================
 * INSTALLAZIONE (una tantum, prima di usare questo file)
 * ============================================================
 * Questo file richiede la libreria PHPMailer. Dalla cartella che
 * contiene questo file (o dalla root del progetto), da terminale:
 *
 *   composer require phpmailer/phpmailer
 *
 * Questo crea una cartella vendor/ con dentro autoload.php.
 * Se il composer.json/vendor/ finiscono in un punto diverso da
 * questa cartella "php/", aggiorna il path nel require_once qui
 * sotto di conseguenza.
 *
 * Se non avete Composer sul server: scaricate PHPMailer da
 * https://github.com/PHPMailer/PHPMailer (cartella "src") e
 * includete manualmente Exception.php, PHPMailer.php, SMTP.php
 * al posto della riga require_once 'vendor/autoload.php'.
 * ============================================================
 * CONFIGURAZIONE SMTP (da compilare prima di andare online)
 * ============================================================
 * Chiedete questi dati al vostro provider email/hosting:
 * - host SMTP (es. smtp.provider.it)
 * - porta (in genere 587 con STARTTLS, o 465 con SSL)
 * - username e password della casella email da cui inviare
 * ============================================================
 */

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json; charset=utf-8');

// ---- CONFIGURAZIONE (da personalizzare) --------------------
$smtpHost = 'INSERIRE-HOST-SMTP';           // es. smtp.aruba.it, smtp.gmail.com, smtp.brevo.com...
$smtpPort = 587;                             // 587 (STARTTLS) o 465 (SSL)
$smtpEncryption = PHPMailer::ENCRYPTION_STARTTLS; // oppure PHPMailer::ENCRYPTION_SMTPS per porta 465
$smtpUsername = 'INSERIRE-USERNAME-SMTP';    // spesso coincide con l'email mittente
$smtpPassword = 'INSERIRE-PASSWORD-SMTP';

$mittenteEmail = 'INSERIRE-EMAIL-MITTENTE@vostro-dominio.it'; // deve appartenere al vostro dominio/account SMTP
$mittenteNome = 'Sito Ausiliari di Prossimità Bologna';
$destinatario = 'INSERIRE-EMAIL-SEGRETERIA@esempio.it';       // dove arrivano le richieste
// --------------------------------------------------------------

function rispondi(int $httpCode, bool $success, string $message): void
{
    http_response_code($httpCode);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Rimuove ritorni a capo per evitare header/email injection nei campi
// che finiscono nell'header (nome, cognome, email, oggetto).
function pulisciPerHeader(string $valore): string
{
    return trim(str_replace(["\r", "\n"], '', $valore));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    rispondi(405, false, 'Metodo non consentito.');
}

// Honeypot anti-spam: campo nascosto che un utente reale non compila.
// Se arriva valorizzato, è quasi certamente un bot: rispondiamo "ok"
// senza inviare nulla, per non far capire al bot che è stato bloccato.
$honeypot = trim((string) ($_POST['sito_web'] ?? ''));
if ($honeypot !== '') {
    rispondi(200, true, 'Messaggio inviato correttamente.');
}

$nome = pulisciPerHeader((string) ($_POST['nome'] ?? ''));
$cognome = pulisciPerHeader((string) ($_POST['cognome'] ?? ''));
$emailMittente = pulisciPerHeader((string) ($_POST['email'] ?? ''));
$oggetto = pulisciPerHeader((string) ($_POST['oggetto'] ?? ''));
$messaggio = trim((string) ($_POST['messaggio'] ?? ''));

// Validazione presenza campi
if ($nome === '' || $cognome === '' || $emailMittente === '' || $oggetto === '' || $messaggio === '') {
    rispondi(400, false, 'Compila tutti i campi obbligatori.');
}

// Validazione formato email
if (!filter_var($emailMittente, FILTER_VALIDATE_EMAIL)) {
    rispondi(400, false, 'Email non valida.');
}

// Limiti di lunghezza ragionevoli (protezione base da abusi)
if (mb_strlen($nome) > 100 || mb_strlen($cognome) > 100 || mb_strlen($oggetto) > 200) {
    rispondi(400, false, 'Uno o più campi superano la lunghezza massima consentita.');
}

if (mb_strlen($messaggio) > 5000) {
    rispondi(400, false, 'Il messaggio è troppo lungo (massimo 5000 caratteri).');
}

// Controllo che la configurazione SMTP sia stata compilata
$configurazioneMancante =
    strpos($smtpHost, 'INSERIRE') !== false ||
    strpos($smtpUsername, 'INSERIRE') !== false ||
    strpos($smtpPassword, 'INSERIRE') !== false ||
    strpos($mittenteEmail, 'INSERIRE') !== false ||
    strpos($destinatario, 'INSERIRE') !== false;

if ($configurazioneMancante) {
    error_log('[contatti.php] Configurazione SMTP incompleta: compilare le variabili in cima al file.');
    rispondi(500, false, 'Il modulo di contatto non è ancora configurato. Riprova più tardi o scrivici direttamente via email.');
}

$oggettoMail = 'Nuovo messaggio dal sito: ' . $oggetto;

$corpo = "Nome: {$nome}\n";
$corpo .= "Cognome: {$cognome}\n";
$corpo .= "Email: {$emailMittente}\n\n";
$corpo .= "Messaggio:\n{$messaggio}\n";

$mail = new PHPMailer(true);

try {
    // Configurazione SMTP
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = $smtpEncryption;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';

    // Mittente e destinatario
    $mail->setFrom($mittenteEmail, $mittenteNome);
    $mail->addAddress($destinatario);
    $mail->addReplyTo($emailMittente, "{$nome} {$cognome}");

    // Contenuto
    $mail->isHTML(false);
    $mail->Subject = $oggettoMail;
    $mail->Body = $corpo;

    $mail->send();

    rispondi(200, true, 'Messaggio inviato correttamente.');
} catch (PHPMailerException $e) {
    error_log('[contatti.php] Invio SMTP fallito: ' . $mail->ErrorInfo);
    rispondi(500, false, 'Il server non è riuscito a inviare il messaggio. Riprova più tardi.');
}
