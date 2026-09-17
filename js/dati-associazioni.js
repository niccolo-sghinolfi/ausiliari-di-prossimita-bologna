/**
 * Associazioni membro della rete.
 *
 * L'id genera l'ancora della scheda nella pagina Associazioni:
 * l'associazione con id 3 è raggiungibile da "associazioni.html#ass3".
 *
 * Campi obbligatori: id, nome, immagine.
 * Campi opzionali:   sede, presidente, contatti, email, descrizione
 *                    (se mancanti, la scheda mostra un trattino).
 */
const associazioni = [
  {
    id: 1,
    nome: "Rangers",
    sede: "Via del Rosario 2/5, 40131 Bologna",
    presidente: "Valter Grandi",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIn5EvYyf12ldKXJhmP3FvHE8CHmB8IcC_hA&s",
    contatti: "+39 377 491 3666",
    email: "rangers.emiliaromagna@gmail.com",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 2,
    nome: "A.I.S.A.",
    sede: "Viale Abramo Lincoln 66/A, 40139 Bologna",
    presidente: "Marco Ballotta",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9rdRmYvJwiJIjuguXi5rkEiT-b0tqJdAYA&s",
    contatti: "+39 348 1586490",
    email: "info@aisaboemiliaromagna.it",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 3,
    nome: "A.N.P.P.E",
    sede: "Saragozza",
    presidente: "Mario",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mdzMOyFPUSzcaBmTphD1g6fMTOtw50MJsg&s",
    contatti: "XXX",
    email: "XXX",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 4,
    nome: "Pattuglie Cittadine",
    sede: "Viale Abramo Lincoln 66/A, 40139 Bologn",
    presidente: "Alessandro Bonaccorsi",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOASBP_T6g-z_FttXbzRNrMUWDo_iY2aZ6g&s",
    contatti: "+39 051 546779",
    email: "XXX",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 5,
    nome: "A.NGI.V.",
    sede: "Saragozza",
    presidente: "mario",
    immagine:
      "https://www.angiv-provinciabologna.it/images/logo-ANGIV-login.png",
    contatti: "XXX",
    email: "XXX",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 6,
    nome: "Cinofili San Gregorio Magno",
    sede: "Saragozza",
    presidente: "Mario",
    immagine:
      "https://www.yeoandyeo.com/wp-content/uploads/07_02_21_1253437873_AAB_560x292.jpg",
    contatti: "XXX",
    email: "XXX",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 7,
    nome: "E.N.P.A.",
    sede: "Via Zamboni 59, 40126 Bologna",
    presidente: "Mario",
    immagine:
      "https://www.enpabologna.org/wp-content/uploads/2021/05/LOGO-black-209x101.png",
    contatti: "+39 051 246646 / 342 3204416",
    email: "bologna@enpa.org",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: 8,
    nome: "Finchè non capita a te",
    sede: "Via Cencetti 3, 40125 Bologna",
    presidente: "Francesco Borrelli",
    immagine: "../immagini/finche-te.webp",
    contatti: "+39 338 1441979 / 389 2443697",
    email: "info@finchenoncapitaate.it",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];
