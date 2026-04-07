<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metodo non consentito.'
    ]);
    exit;
}

$nome = trim($_POST['nome'] ?? '');
$cognome = trim($_POST['cognome'] ?? '');
$email = trim($_POST['email'] ?? '');
$oggetto = trim($_POST['oggetto'] ?? '');
$messaggio = trim($_POST['messaggio'] ?? '');

if ($nome === '' || $cognome === '' || $email === '' || $oggetto === '' || $messaggio === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Compila tutti i campi obbligatori.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Email non valida.'
    ]);
    exit;
}

$destinatario = 'ausiliaridiprossimitabo@gmail.com'; // metti quella giusta
$soggetto = 'Nuovo messaggio dal sito: ' . $oggetto;

$corpo = "Nome: $nome\n";
$corpo .= "Cognome: $cognome\n";
$corpo .= "Email: $email\n\n";
$corpo .= "Messaggio:\n$messaggio\n";

$headers = "From: no-reply@tuodominio.it\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$inviata = mail($destinatario, $soggetto, $corpo, $headers);

if (!$inviata) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Il server non è riuscito a inviare il messaggio.'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Messaggio inviato correttamente.'
]);