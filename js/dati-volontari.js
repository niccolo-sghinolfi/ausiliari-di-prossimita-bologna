/**
 * Foto dei volontari in attività.
 *
 * Alimentano due punti del sito:
 *  - la pellicola a scorrimento nella homepage (tutte, nell'ordine di questo file)
 *  - le card della Galleria, insieme ai servizi
 *
 * Campi obbligatori: id, titolo, data (formato YYYY-MM-DD), tipologia, immagini.
 * Campi opzionali:   descrizioneBreve, mostraInGalleria.
 *
 * mostraInGalleria: impostare a false per mostrare la foto solo nella
 * pellicola della homepage ed escluderla dalla Galleria.
 */
const volontari = [
  {
    id: 1,
    titolo: "Volontari Ranger in servizio",
    data: "2026-04-02",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/coopi.jpeg"],
    descrizioneBreve: "Servizio di presidio sul territorio in collaborazione con altre associazioni."
  },
  {
    id: 2,
    titolo: "Volontario alla Maratona",
    data: "2026-03-30",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/maratona.jpeg"],
    descrizioneBreve: "Supporto logistico durante la maratona cittadina."
  },
  {
    id: 3,
    titolo: "Cooperazione con Protezione Civile",
    data: "2026-03-28",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pvic.jpeg"],
    descrizioneBreve: "Attività congiunta con la Protezione Civile."
  },
  {
    id: 4,
    titolo: "Volontari in Piazza Maggiore",
    data: "2026-03-25",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/piazza-maggiore.jpeg"],
    descrizioneBreve: "Presidio nel centro storico durante eventi pubblici."
  },
  {
    id: 5,
    titolo: "Servizio Parchi",
    data: "2026-03-22",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/volontari-parchi-2026-04-02.jpeg"],
    descrizioneBreve: "Attività di monitoraggio e supporto nei parchi cittadini."
  },
  {
    id: 6,
    titolo: "Servizio Parchi",
    data: "2026-03-20",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/parco.jpeg"],
    descrizioneBreve: "Servizio congiunto nei parchi pubblici."
  },
  {
    id: 7,
    titolo: "Volontario A.I.S.A. in servizio",
    data: "2026-03-18",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/aisa1.jpeg"],
    descrizioneBreve: "Servizio ordinario sul territorio."
  },
  {
    id: 8,
    titolo: "Servizio 25 Aprile",
    data: "2026-03-15",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/25-aprile.jpeg"],
    descrizioneBreve: "Servizio durante celebrazione pubblica."
  },
  {
    id: 9,
    titolo: "Commemorazione",
    data: "2026-03-10",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/memoria.jpeg"],
    descrizioneBreve: "Servizio durante evento commemorativo."
  },
  {
    id: 10,
    titolo: "Servizio allo stadio",
    data: "2026-03-05",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/stadio.jpeg"],
    descrizioneBreve: "Servizio di supporto durante evento sportivo."
  }
];
