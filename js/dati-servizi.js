/**
 * Servizi svolti sul territorio.
 *
 * Campi obbligatori: id, titolo, data (formato YYYY-MM-DD), tipologia, immagini.
 * Campi opzionali:   quartiere, luogo, descrizioneBreve,
 *                    descrizioneCompleta, mostraInGalleria.
 *
 * mostraInGalleria: impostare a false per tenere il servizio nella pagina
 * Servizi ma escluderne le foto dalla Galleria. Se il campo è assente,
 * il servizio finisce in Galleria.
 */
const servizi = [
  {
    id: 1,
    titolo: "Servizio Piazza Maggiore",
    data: "2026-03-25",
    tipologia: "Piazza Maggiore",
    quartiere: ["Navile"],
    immagini: [
      "https://static.bolognawelcome.com/immagini/c6/ea/e1/99/20200312105245_landscape_16_9_mobile.jpg"
    ],
    mostraInGalleria: false,
    descrizioneBreve: "Attività di presidio e supporto informativo nel quartiere.",
    descrizioneCompleta: "Testo più lungo con tutti i dettagli del servizio, obiettivi, persone coinvolte e attività svolte.",
    luogo: "Piazza Maggiore"
  },
  {
    id: 2,
    titolo: "Presidio area verde",
    data: "2026-03-20",
    tipologia: "Parco",
    quartiere: ["Saragozza"],
    immagini: [
      "https://www.bologna-guide.com/wp-content/uploads/2018/09/giardini-margherita-laghetto-artificiale.jpg"
    ],
    descrizioneBreve: "Attività di presenza sul territorio e ascolto dei cittadini.",
    descrizioneCompleta: "Descrizione completa del servizio con dettagli sulle attività svolte.",
    luogo: "Lunetta Gamberini"
  },
  {
    id: 3,
    titolo: "Festa di strada",
    data: "2026-03-20",
    tipologia: "Festa di Strada",
    quartiere: ["Saragozza"],
    immagini: [
      "https://cdn.zero.eu/uploads/2022/04/oltre-il-ponte.jpeg"
    ],
    descrizioneBreve: "Attività di presenza durante evento cittadino.",
    descrizioneCompleta: "Supporto organizzativo e presenza durante la festa di strada.",
    luogo: "Lunetta Gamberini"
  },
  {
    id: 4,
    titolo: "Servizio Stadio",
    data: "2024-01-01",
    tipologia: "Stadio",
    quartiere: ["Borgo Panigale"],
    immagini: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuBZLp8jWztBY0pEax2wJ-EFXEu8BUtqJTQ&s"
    ],
    descrizioneBreve: "Servizio durante partita Bologna - Juventus.",
    descrizioneCompleta: "Servizio di supporto e sicurezza durante l'evento sportivo.",
    luogo: "Stadio Dall'Ara"
  }
];
