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
      "I Rangers Emilia Romagna ODV sono un’associazione di volontariato impegnata nella tutela del territorio e della comunità. Attraverso la presenza dei propri volontari, contribuiscono alle attività di prevenzione, monitoraggio e assistenza, collaborando con le istituzioni per promuovere sicurezza, rispetto dell’ambiente e cura degli spazi comuni.",
  },
  {
    id: 2,
    nome: "A.I.S.A.",
    sede: "Via Abramo Lincoln 66/A",
    presidente: "Marco Ballotta",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9rdRmYvJwiJIjuguXi5rkEiT-b0tqJdAYA&s",
    contatti: "+39 348 1586490",
    email: "info@aisaboemiliaromagna.it",
    descrizione:
      "A.I.S.A. ODV è un’associazione impegnata nella tutela dell’ambiente e nella sicurezza del territorio. I suoi volontari svolgono attività di prevenzione, controllo e sensibilizzazione, contribuendo alla cura degli spazi pubblici e alla diffusione di una maggiore attenzione verso l’ambiente e la comunità.",
  },
  {
    id: 3,
    nome: "A.N.P.P.E",
    sede: "Saragozza",
    presidente: "Mario",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mdzMOyFPUSzcaBmTphD1g6fMTOtw50MJsg&s",
    contatti: "+39",
    email: "prova@ausiliaribologna.it",
    descrizione:
      "L’A.N.P.Pe. riunisce volontari con esperienza e competenze legate al mondo della Polizia Penitenziaria. A Bologna partecipa alle attività degli Ausiliari di Prossimità attraverso la presenza sul territorio, il supporto alla cittadinanza e la collaborazione con le istituzioni per promuovere sicurezza e civile convivenza.",
  },
  {
    id: 4,
    nome: "Pattuglie Cittadine",
    sede: "Viale Abramo Lincoln 66/A, 40139 Bologna",
    presidente: "Alessandro Bonaccorsi",
    immagine:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOASBP_T6g-z_FttXbzRNrMUWDo_iY2aZ6g&s",
    contatti: "+051 546779",
    email: "prova@ausiliaribologna.it",
    descrizione:
      "Il Corpo delle Pattuglie Cittadine è una realtà di volontariato attiva sul territorio bolognese. I volontari svolgono attività di presenza, osservazione e monitoraggio, contribuendo alla vivibilità degli spazi pubblici e segnalando agli organi competenti eventuali situazioni di pericolo, degrado o necessità.",
  },
  {
    id: 5,
    nome: "A.NGI.V.",
    sede: "Saragozza",
    presidente: "mario",
    immagine:
      "https://www.angiv-provinciabologna.it/images/logo-ANGIV-login.png",
    contatti: "+39",
    email: "prova@ausiliaribologna.it",
    descrizione:
      "A.N.G.I.V. è una realtà di volontariato impegnata nella presenza e nella tutela del territorio. Attraverso l’attività dei propri volontari contribuisce alle iniziative di prevenzione, assistenza e sensibilizzazione, collaborando con le altre realtà coinvolte per favorire una maggiore attenzione e partecipazione della comunità.",
  },
  {
    id: 6,
    nome: "Cinofili San Gregorio Magno",
    sede: "Saragozza",
    presidente: "Mario",
    immagine:
      "https://www.yeoandyeo.com/wp-content/uploads/07_02_21_1253437873_AAB_560x292.jpg",
    contatti: "+39 051 345 6789",
    email: "prova@ausiliaribologna.it",
    descrizione:
      "L’Associazione Cinofili San Gregorio Magno mette a disposizione la professionalità dei propri volontari e delle unità cinofile per attività a supporto della comunità. La preparazione dei conduttori e dei cani permette di svolgere attività di prevenzione, ricerca e assistenza, contribuendo alla sicurezza e alla presenza sul territorio.",
  },
  {
    id: 7,
    nome: "E.N.P.A.",
    sede: "Via Zamboni 59, 40126 Bologna",
    presidente: "Mario",
    immagine:
      "https://www.enpabologna.org/wp-content/uploads/2021/05/LOGO-black-209x101.png",
    contatti: "+39 342 3204416",
    email: "bologna@enpa.org",
    descrizione:
      "E.N.P.A. è un’associazione impegnata nella tutela e nella protezione degli animali. Attraverso i propri volontari promuove il rispetto e il benessere degli animali, sensibilizza la cittadinanza e contribuisce alla gestione delle situazioni che riguardano animali in difficoltà e la corretta convivenza tra persone e animali.",
  },
  {
    id: 8,
    nome: "Finchè non capita a te",
    sede: "Via Cencetti 3, 40125 Bologna",
    presidente: "Francesco Borrelli",
    immagine: "../immagini/finche-te.webp",
    contatti: "+39 389 2443697",
    email: "info@finchenoncapitaate.it",
    descrizione:
      "Finché non capita a te è un’associazione impegnata nella prevenzione e nella sensibilizzazione su tematiche sociali e di sicurezza. Attraverso attività informative e iniziative sul territorio promuove consapevolezza, responsabilità e attenzione verso le situazioni di rischio, favorendo una comunità più attenta e partecipe",
  },
];
