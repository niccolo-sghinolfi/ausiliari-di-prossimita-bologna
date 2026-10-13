/**
 * Servizi svolti sul territorio - alimentano la pagina Servizi e il
 * carosello "I Nostri Servizi" della homepage.
 *
 * Le foto di ogni servizio vengono dalla sottocartella di immagini/ che
 * corrisponde alla sua "tipologia" (stesso meccanismo della Galleria,
 * vedi dati-galleria.js): quando in quella cartella ci sono foto, il
 * campo "immagini" qui sotto le elenca tutte, cosi' la scheda del
 * servizio mostra un carosello se sono piu' di una. Le tipologie senza
 * ancora foto proprie (Festa di Strada, Stadio) usano l'immagine
 * segnaposto, in attesa che vengano aggiunte dentro
 * immagini/feste-di-strada/ e immagini/stadio/.
 *
 * Per aggiungere o cambiare le foto di un servizio: aggiungi il file
 * nella sottocartella giusta e poi fai aggiornare questo file - il sito
 * non può leggere da solo il contenuto delle cartelle sul server.
 *
 * Campi obbligatori: id, titolo, data (formato YYYY-MM-DD), tipologia, immagini.
 * Campi opzionali:   quartiere, luogo, descrizioneBreve, descrizioneCompleta.
 */
const servizi = [
  {
    id: 1,
    titolo: "Servizio Piazza Maggiore",
    data: "2026-03-25",
    tipologia: "Piazza Maggiore",
    quartiere: ["Navile"],
    immagini: [
      "../immagini/piazza-maggiore/piazza-maggiore.jpeg"
    ],
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
      "../immagini/parco/parco.jpeg",
      "../immagini/parco/studio.jpeg",
      "../immagini/parco/volontari-parchi-2026-04-02.jpeg"
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
      "../immagini/placeholder-servizio.jpg"
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
      "../immagini/placeholder-servizio.jpg"
    ],
    descrizioneBreve: "Servizio durante partita Bologna - Juventus.",
    descrizioneCompleta: "Servizio di supporto e sicurezza durante l'evento sportivo.",
    luogo: "Stadio Dall'Ara"
  }
];
