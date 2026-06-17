export interface LanguageScript {
  name: string;
  description: string;
  language: string;
  tags: string[];
  file: string;
  codePreview: string;
  exists?: boolean;
  image?: string;
}

export const languageScripts: LanguageScript[] = [
  {
    name: "radicals_org.py",
    description: "Combines radical list files into a unified reference with pinyin, meanings, examples, and story-based mnemonics for all 214 Kangxi radicals.",
    language: "python",
    tags: ["Chinese", "Characters", "Anki"],
    image: "https://www.oldbookillustrations.com/site/assets/files/14478/toilet-lock.jpg",
    file: "scripts/radicals_org.py",
    codePreview: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Combines radicals.txt and Radicals.txt into a single tab-separated file.
Adds pinyin to all example characters and appends compact, story-based mnemonics.
"""

import os
import re
from pypinyin import pinyin, Style

# --------------------------------------------------------------------------
# 1. COMPACT MNEMONICS DICTIONARY (Radical Key -> Story)
# --------------------------------------------------------------------------
MNEMONICS = {
    "一": "One line (一) begins all: stack for three (三), bend for hill (丘).",
    "丨": "Vertical line (丨) pierces center (中).",
    "丶": "Dot (丶) drops: makes pill (丸) or master (主) when atop king.",
    "丿": "Sweeping slash (丿) extends time (久) or guides path (之).",
    "乙": "Curved hook (乙) bends: second place (九) or \\"also\\" (也).",
    "亅": "Hook (亅) finishes task (了) or hangs matter (事).",
    "二": "Two lines (二) cross for five (五), frame well (井).",
    "亠": "Lid (亠) covers death (亡) or capital (京).",
    "人": "Person (人) rests by tree (休), stands in place (位), two people show kindness (仁).",
    "儿": "Legs (儿) stand; mouth above = brother (兄) calling.",
    "入": "Roof shape (入) lets you enter (入) fully (全).",
    "八": "Splitting strokes (八) = eight; divide for public (公) use.",
    "冂": "Downward box (冂) holds inside (内) or repeats (再)."`,
  },
  {
    name: "s1.py",
    description: "Chinese character enricher that fetches traditional forms, radical data, and generates mnemonics from multiple sources for Anki import.",
    language: "python",
    tags: ["Chinese", "Characters", "API"],
    image: "https://www.oldbookillustrations.com/site/assets/files/14477/barge.jpg",
    file: "scripts/s1.py",
    codePreview: `import os
import re
import json
import time
import requests
import xml.etree.ElementTree as ET
from opencc import OpenCC
from tqdm import tqdm

# ================= CONFIG =================
CACHE_FILE = "char_api_cache.json"
RATE_LIMIT_SEC = 0.35  # Respect free API limits
TRAD_CONVERTER = OpenCC('s2t')
RADICAL_API = "https://hanzi.seric.at/api.php?c={}"

# Simple radical-to-English mapping for mnemonic generation
RADICAL_NAMES = {
    '人': 'person', '女': 'woman', '子': 'child', '口': 'mouth', '目': 'eye',
    '心': 'heart', '手': 'hand', '木': 'tree', '水': 'water', '火': 'fire',
    '土': 'earth', '金': 'metal', '日': 'sun', '月': 'moon', '山': 'mountain',
    '大': 'big', '小': 'small', '一': 'one', '二': 'two', '十': 'ten',
    '言': 'speech', '衣': 'clothes', '食': 'food', '刀': 'knife', '力': 'strength',
    '走': 'walk', '足': 'foot', '马': 'horse', '车': 'cart', '门': 'door',
    '宀': 'roof', '广': 'shelter', '厂': 'cliff', '辶': 'walk', '彳': 'step',`,
  },
  {
    name: "organize_vocab.py",
    description: "Parses a multilingual vocabulary dump, auto-detects language (Spanish, Chinese, German), and outputs organized markdown files by language, level, and grammar topic.",
    language: "python",
    tags: ["Multilingual", "Parser", "CLI"],
    image: "https://www.oldbookillustrations.com/site/assets/files/14476/billet-doux.jpg",
    file: "scripts/organize_vocab.py",
    codePreview: `#!/usr/bin/env python3
"""Parse All Decks.txt and organize into markdown files by language & level."""

import os
import re
from collections import defaultdict

INPUT = "/home/mastroni/Documents/All Decks.txt"
OUTPUT_DIR = "/home/mastroni/Documents/Vocabulary"

SPANISH_LEVELS = [
    ("Basic", 0, 500),
    ("Level-01", 501, 1000),
    ("Level-02", 1001, 1500),
    ("Level-03", 1501, 2000),
    ("Level-04", 2001, 2500),
    ("Level-05", 2501, 3000),
    ("Level-06", 3001, 3500),
    ("Level-07", 3501, 4000),
    ("Level-08", 4001, 4500),
    ("Level-09", 4501, 5000),
]


def has_cjk(text):
    return bool(re.search(r'[\\u4e00-\\u9fff]', text))


def has_pinyin_tone(text):
    return bool(re.search(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]', text))


def is_german_field(text):
    """Check if text contains German-specific patterns."""
    if not text:
        return False
    # German umlauts and ß
    if re.search(r'[äöüÄÖÜß]', text):
        return True`,
  },
  {
    name: "build_anki_decks.py",
    description: "Builds HSK Anki flashcard decks with TTS audio using edge-tts, organized by level. Generates professionally styled cards with Chinese, pinyin, English, and audio.",
    language: "python",
    tags: ["Anki", "Chinese", "TTS"],
    image: "https://www.oldbookillustrations.com/site/assets/files/14474/barons-prayer.jpg",
    file: "scripts/build_anki_decks.py",
    codePreview: `#!/usr/bin/env python3
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
</div>\`,
  },
  ],
];`,
  },
  {
    name: "extract_vocab.py",
    description: "HSK vocabulary extractor from PDF textbooks with OCR fallback. Extracts Chinese–English pairs, deduplicates, and sorts by character for Anki import.",
    language: "python",
    tags: ["Chinese", "PDF", "OCR"],
    image: "https://www.oldbookillustrations.com/site/assets/files/14468/rosa-centifolia-caryophyllea.jpg",
    file: "scripts/extract_vocab.py",
    exists: false,
    codePreview: `import pdfplumber
import re
from collections import Counter

def extract_vocab(pdf_path: str, hsk_level: int) -> list[dict]:
    \"\"\"Extract HSK-level vocabulary from a PDF textbook.\"\"\"
    vocab: list[dict] = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            # Find Chinese-english pairs like:
            # 你好 (nǐ hǎo) - hello
            pairs = re.findall(
                r'([\\u4e00-\\u9fff]+)\\s*'
                r'\\(([^)]+)\\)\\s*[-–]\\s*(.+)',
                text
            )

            for hanzi, pinyin, meaning in pairs:
                vocab.append({
                    'hanzi': hanzi,
                    'pinyin': pinyin,
                    'meaning': meaning.strip(),
                    'hsk_level': hsk_level,
                    'source_page': page.page_number,
                })

    # Deduplicate by hanzi character
    seen = set()
    unique = []
    for v in vocab:
        if v['hanzi'] not in seen:
            seen.add(v['hanzi'])
            unique.append(v)

    return sorted(unique, key=lambda x: x['hanzi'])`,
    },
  ];