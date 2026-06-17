#!/usr/bin/env python3
"""Build HSK Anki flashcard decks with audio, organized by level."""

import csv
import os
import hashlib
import asyncio
import edge_tts
import genanki

BASE = "/home/mastroni/Desktop/languageHuntingAdventure/chineses_material/extracted_data"
OUTPUT = "/home/mastroni/Desktop/languageHuntingAdventure/chinese_path_resouces/HSK_old/anki_decks"
AUDIO_DIR = os.path.join(OUTPUT, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(OUTPUT, exist_ok=True)

# Limit for audio generation per word
TTS_VOICE = "zh-CN-XiaoxiaoNeural"
TTS_RATE = "+0%"

# --- Card template ---
CARD_MODEL = genanki.Model(
    1607392319,
    "HSK Flashcard",
    fields=[
        {"name": "Chinese"},
        {"name": "Pinyin"},
        {"name": "English"},
        {"name": "AudioField"},
        {"name": "Level"},
    ],
    templates=[
        {
            "name": "HSK Card",
            "qfmt": """
<div class="card">
  <div class="level">{{Level}}</div>
  <div class="chinese">{{Chinese}}</div>
  <div class="play">{{AudioField}}</div>
</div>
""",
            "afmt": """
<div class="card back">
  <div class="level">{{Level}}</div>
  <div class="chinese">{{Chinese}}</div>
  <div class="play">{{AudioField}}</div>
  <hr>
  <div class="pinyin">{{Pinyin}}</div>
  <div class="english">{{English}}</div>
</div>
""",
        },
    ],
    css="""
.card {
  font-family: 'Noto Sans SC', 'Source Han Sans SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  text-align: center;
  padding: 20px;
}
.level {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}
.chinese {
  font-size: 60px;
  font-weight: bold;
  margin: 30px 0;
  line-height: 1.3;
}
.play {
  margin: 10px 0;
}
.back .chinese {
  font-size: 40px;
  margin: 20px 0;
}
.pinyin {
  font-size: 28px;
  color: #e91e63;
  margin: 15px 0;
}
.english {
  font-size: 22px;
  color: #333;
  margin: 15px 0;
}
hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}
""",
)


def sanitize_filename(s):
    return "".join(c if c.isalnum() or c in " -_" else "_" for c in s).strip()


def make_audio_filename(chinese, level):
    h = hashlib.md5(chinese.encode()).hexdigest()[:10]
    return f"hsk{level}_{h}.mp3"


def read_vocab(level):
    """Read HSK vocab TSV for a given level. Returns list of (chinese, pinyin, english)."""
    path = os.path.join(BASE, f"HSK_{level}_Vocabulary_list.tsv")
    if not os.path.exists(path):
        path = os.path.join(BASE, f"HSK-{level}-Vocabulary-List_CLEAN.tsv")
    if not os.path.exists(path):
        # Try ALL_COMBINED
        path2 = os.path.join(BASE, f"HSK_All_Levels_Vocabulary_HSK_All_Levels_Vocabulary_HSK_{level}_Vocabulary_list_CLEAN.tsv")
        if os.path.exists(path2):
            path = path2

    entries = []
    with open(path, encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        header = next(reader, None)
        for row in reader:
            if len(row) >= 3:
                chinese = row[0].strip()
                pinyin = row[1].strip()
                english = row[2].strip()
                if chinese and pinyin:
                    entries.append((chinese, pinyin, english))
    return entries


async def generate_audio(entries, level, existing_files):
    """Generate TTS audio for entries that don't have audio yet."""
    tasks = []
    for chinese, pinyin, english in entries:
        fname = make_audio_filename(chinese, level)
        fpath = os.path.join(AUDIO_DIR, fname)
        if fpath in existing_files:
            continue
        tts_text = chinese
        communicate = edge_tts.Communicate(tts_text, TTS_VOICE, rate=TTS_RATE)
        tasks.append((chinese, fname, fpath, communicate))

    if not tasks:
        print(f"  All {len(entries)} audio files already exist")
        return

    print(f"  Generating {len(tasks)} audio files...")
    for i, (chinese, fname, fpath, comm) in enumerate(tasks):
        await comm.save(fpath)
        if (i + 1) % 50 == 0:
            print(f"    ... {i+1}/{len(tasks)} generated")


def create_deck(level, entries, sublabel=None):
    """Create an Anki deck package for a set of entries."""
    if sublabel:
        deck_name = f"HSK {level} - {sublabel}"
        deck_id_salt = f"HSK{level}_{sublabel}"
    else:
        deck_name = f"HSK {level}"
        deck_id_salt = f"HSK{level}"

    deck_id = abs(hash(deck_id_salt)) % (10 ** 10)
    deck = genanki.Deck(deck_id, deck_name)

    # Determine the level tag
    level_tag = f"hsk{level}"
    if sublabel == "A":
        level_tag = f"hsk{level}a"
    elif sublabel == "B":
        level_tag = f"hsk{level}b"

    # Create notes
    for chinese, pinyin, english in entries:
        fname = make_audio_filename(chinese, level)
        audio_path = os.path.join(AUDIO_DIR, fname)
        sound_tag = f"[sound:{fname}]" if os.path.exists(audio_path) else ""

        note = genanki.Note(
            model=CARD_MODEL,
            fields=[chinese, pinyin, english, sound_tag, level_tag],
            tags=[level_tag, "chinese"],
        )
        deck.add_note(note)

    package = genanki.Package(deck)

    # Collect media files
    media_files = []
    for chinese, pinyin, english in entries:
        fname = make_audio_filename(chinese, level)
        fpath = os.path.join(AUDIO_DIR, fname)
        if os.path.exists(fpath):
            media_files.append(fpath)
    package.media_files = media_files

    return package, len(entries)


async def main():
    # Levels to process: old HSK 1-6
    # For 4-6, split into A/B halves
    level_configs = [
        (1, None),
        (2, None),
        (3, None),
        (4, "A"),
        (4, "B"),
        (5, "A"),
        (5, "B"),
        (6, "A"),
        (6, "B"),
    ]

    all_level_data = {}
    for level, sub in level_configs:
        key = (level, sub)
        entries = read_vocab(level)
        if not entries:
            print(f"WARNING: No entries found for HSK{level} {sub or ''}")
            continue

        # For A/B splits, divide the list
        if sub == "A":
            mid = len(entries) // 2
            entries = entries[:mid]
        elif sub == "B":
            mid = len(entries) // 2
            entries = entries[mid:]

        all_level_data[key] = entries
        label = f"HSK{level}" + (f" {sub}" if sub else "")
        print(f"{label}: {len(entries)} entries")

    # Generate all audio
    print("\n--- Generating Audio ---")
    existing = set()
    for (level, sub), entries in all_level_data.items():
        await generate_audio(entries, level, existing)

    # Build decks
    print("\n--- Building Anki Decks ---")
    for (level, sub), entries in all_level_data.items():
        package, count = create_deck(level, entries, sub)
        sublabel = f"_{sub}" if sub else ""
        fname = f"HSK{level}{sublabel}.apkg"
        fpath = os.path.join(OUTPUT, fname)
        package.write_to_file(fpath)
        label = f"HSK{level}" + (f" {sub}" if sub else "")
        print(f"  {label}: {count} cards -> {fname}")

    print(f"\nDone! Decks saved to: {OUTPUT}")


if __name__ == "__main__":
    asyncio.run(main())
