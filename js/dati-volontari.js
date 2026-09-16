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
    titolo: "Supporto",
    data: "2026-04-02",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro1.jpeg"],
    descrizioneBreve: "Supporto alla popolazione."
  },
  {
    id: 2,
    titolo: "Briefing Serale",
    data: "2026-03-30",
    tipologia: "Servizio Serale",
    immagini: ["../immagini/pellicola/caro2.jpeg"],
    descrizioneBreve: "Briefing pre servizio serale"
  },
  {
    id: 3,
    titolo: "Briefing Giornaliero",
    data: "2026-03-28",
    tipologia: "Servizio Giornaliero",
    immagini: ["../immagini/pellicola/caro3.jpeg"],
    descrizioneBreve: "Briefing pre servizio giornaliero"
  },
  {
    id: 4,
    titolo: "Volontari in Piazza Maggiore",
    data: "2026-03-25",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro4.jpeg"],
    descrizioneBreve: "Presidio nel centro storico durante eventi pubblici."
  },
  {
    id: 5,
    titolo: "Servizio Parchi",
    data: "2026-03-22",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro5.jpeg"],
    descrizioneBreve: "Attività di monitoraggio e supporto nei parchi cittadini."
  },
  {
    id: 6,
    titolo: "Servizio Parchi",
    data: "2026-03-20",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro6.jpeg"],
    descrizioneBreve: "Servizio congiunto nei parchi pubblici."
  },
  {
    id: 7,
    titolo: "Volontario A.I.S.A. in servizio",
    data: "2026-03-18",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro7.jpeg"],
    descrizioneBreve: "Servizio ordinario sul territorio."
  },
  {
    id: 8,
    titolo: "Servizio 25 Aprile",
    data: "2026-03-15",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro8.jpeg"],
    descrizioneBreve: "Servizio durante celebrazione pubblica."
  },
  {
    id: 9,
    titolo: "Commemorazione",
    data: "2026-03-10",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro9.jpeg"],
    descrizioneBreve: "Servizio durante evento commemorativo."
  },
  {
    id: 10,
    titolo: "Servizio allo stadio",
    data: "2026-03-05",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro10.jpeg"],
    descrizioneBreve: "Servizio di supporto durante evento sportivo."
  },
    {
    id: 11,
    titolo: "Servizio allo stadio",
    data: "2026-03-05",
    tipologia: "Foto Volontari",
    immagini: ["../immagini/pellicola/caro11.jpeg"],
    descrizioneBreve: "Servizio di supporto durante evento sportivo."
  }
];
