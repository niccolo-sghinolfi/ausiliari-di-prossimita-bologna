#!/bin/bash
# Sistema la cartella immagini/ (e API/) del progetto Ausiliari di Prossimità.
# Esegui questo script dalla cartella principale del progetto, quella che
# contiene dentro .git, html/, css/, js/, immagini/ (es: cd ~/progetti/ausiliari-di-prossimita-bologna)
#
# Uso:
#   bash fix-immagini.sh

set -e

if [ ! -d "immagini" ] || [ ! -d ".git" ]; then
    echo "ERRORE: esegui questo script dalla cartella principale del progetto"
    echo "(deve contenere sia 'immagini/' che '.git/')."
    exit 1
fi

STAGING=$(mktemp -d)
echo "Cartella temporanea: $STAGING"

# --- 1) metto da parte le foto vere, prese dai percorsi vecchi ---
cp "immagini/Emergenze/pvic.jpeg" "$STAGING/emergenze-pvic.jpeg"
cp "immagini/Emergenze/servizio.jpeg" "$STAGING/emergenze-servizio.jpeg"
cp "immagini/Manifestazioni/25-aprile.jpeg" "$STAGING/manifestazioni-25-aprile.jpeg"
cp "immagini/Maratone/maratona.jpeg" "$STAGING/maratone-maratona.jpeg"
cp "immagini/Parco/parco.jpeg" "$STAGING/parco-parco.jpeg"
cp "immagini/Parco/studio.jpeg" "$STAGING/parco-studio.jpeg"
cp "immagini/Parco/volontari-parchi-2026-04-02.jpeg" "$STAGING/parco-volontari-parchi.jpeg"
cp "immagini/Logo-Comune-Bologna.png" "$STAGING/logo-comune-bologna.png"

# --- 2) cancello le cartelle/file vecchi (doppioni o con nomi sbagliati) ---
rm -rf "immagini/Emergenze" "immagini/Manifestazioni" "immagini/Maratone" "immagini/Parco" \
       "immagini/Concerti" "immagini/Stadio" "immagini/Piazza Maggiore" \
       "immagini/homepage" "immagini/volontari" "immagini/Logo-Comune-Bologna.png"

rm -f immagini/25-aprile.jpeg immagini/maratona.jpeg immagini/pvic.jpeg immagini/servizio.jpeg \
      immagini/studio.jpeg immagini/parco.jpeg immagini/piazza-maggiore.jpeg \
      immagini/volontari-parchi-2026-04-02.jpeg immagini/aisa1.jpeg immagini/coopi.jpeg \
      immagini/memoria.jpeg immagini/gruppo.jpeg immagini/stadio.jpeg immagini/logo-volontari.png \
      immagini/ausiliari-chi-sono.jpeg immagini/ausiliari-background.jpg \
      immagini/placeholder-volontario.jpg immagini/phone-solid.png immagini/rappresentanti-volontari.jpeg

rm -f js/dati-volontari.js

# --- 3) ricreo le cartelle corrette da zero e rimetto dentro le foto ---
mkdir -p immagini/emergenze immagini/manifestazioni immagini/maratone immagini/parco \
         immagini/concerti immagini/stadio

cp "$STAGING/emergenze-pvic.jpeg" "immagini/emergenze/pvic.jpeg"
cp "$STAGING/emergenze-servizio.jpeg" "immagini/emergenze/servizio.jpeg"
cp "$STAGING/manifestazioni-25-aprile.jpeg" "immagini/manifestazioni/25-aprile.jpeg"
cp "$STAGING/maratone-maratona.jpeg" "immagini/maratone/maratona.jpeg"
cp "$STAGING/parco-parco.jpeg" "immagini/parco/parco.jpeg"
cp "$STAGING/parco-studio.jpeg" "immagini/parco/studio.jpeg"
cp "$STAGING/parco-volontari-parchi.jpeg" "immagini/parco/volontari-parchi-2026-04-02.jpeg"
cp "$STAGING/logo-comune-bologna.png" "immagini/logo-comune-bologna.png"

touch immagini/concerti/.gitkeep immagini/stadio/.gitkeep
# feste-di-strada/ e piazza-maggiore/ sono gia' corrette, non le tocco

# --- 4) API -> api ---
if [ -d "API" ]; then
    mkdir -p api
    cp "API/contatti.php" "api/contatti.php"
    rm -rf "API"
fi

rm -rf "$STAGING"

echo ""
echo "Fatto. Controlla con 'git status' cosa e' cambiato, poi:"
echo "  git add -A"
echo "  git commit -m \"sistema cartelle immagini e api (case-sensitive)\""
echo "  git push"
