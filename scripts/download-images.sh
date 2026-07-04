#!/bin/bash
# Downloads all external images used in the project to public/images/

IMAGES_DIR="$(dirname "$0")/../public/images"
mkdir -p "$IMAGES_DIR"

URLS=(
  "https://www.oldbookillustrations.com/site/assets/files/14486/rape-lock.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-old-clockmaker-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2016/03/The-garden-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/11/Anvil-and-forge-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/09/Telegraph-instrument-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/09/Typewriter-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-reading-01.jpg"
  "https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-young-scholar-01.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14483/dream-lock.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14480/battle-beaux-belles.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14479/cave-spleen.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14466/rosa-stylosa-1.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14478/toilet-lock.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14477/barge.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14476/billet-doux.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14474/barons-prayer.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/14468/rosa-centifolia-caryophyllea.jpg"
  "https://www.oldbookillustrations.com/site/assets/files/12575/owls-poppies.jpg"
)

for url in "${URLS[@]}"; do
  filename=$(basename "$url")
  filepath="$IMAGES_DIR/$filename"
  if [ -f "$filepath" ]; then
    echo "SKIP: $filename already exists"
  else
    echo "DOWNLOADING: $filename..."
    curl -sL -o "$filepath" "$url"
    if [ $? -eq 0 ] && [ -f "$filepath" ]; then
      echo "  OK ($(wc -c < "$filepath") bytes)"
    else
      echo "  FAILED"
    fi
  fi
done
