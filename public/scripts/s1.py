import os
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
    '宀': 'roof', '广': 'shelter', '厂': 'cliff', '辶': 'walk', '彳': 'step',
    '氵': 'water', '火': 'fire', '艹': 'grass', '竹': 'bamboo', '⺮': 'bamboo',
    '纟': 'silk', '糹': 'silk', '王': 'king', '玉': 'jade', '贝': 'shell',
    '田': 'field', '疒': 'sickness', '病': 'sick', '矢': 'arrow', '弓': 'bow',
    '戈': 'spear', '斤': 'axe', '页': 'head', '面': 'face', '耳': 'ear',
    '鼻': 'nose', '舌': 'tongue', '身': 'body', '骨': 'bone', '血': 'blood'
}

# ================= CACHE MANAGEMENT =================
def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

# ================= API CALLS =================
def fetch_traditional(char):
    return TRAD_CONVERTER.convert(char)

def fetch_radicals(char, cache):
    if char in cache:
        return cache[char].get("radicals", [char])
    
    try:
        url = RADICAL_API.format(char)
        res = requests.get(url, timeout=5)
        res.raise_for_status()
        
        # Parse XML response from seric.at
        root = ET.fromstring(res.content)
        comps = root.findall('.//comp')
        radicals = [comp.text for comp in comps] if comps else [char]
        
        cache[char] = {"radicals": radicals}
        save_cache(cache)
        return radicals
    except Exception:
        cache[char] = {"radicals": [char]}
        save_cache(cache)
        return [char]

# ================= MNEMONIC GENERATOR =================
def generate_mnemonic(char, radicals):
    """
    Creates a short, memorable story from radical breakdowns.
    Replace the return statement below with an API call if you find a dedicated mnemonic API.
    """
    eng_parts = []
    for r in radicals:
        eng_parts.append(f"{r} ({RADICAL_NAMES.get(r, r)})")
    
    # Simple 1-line mnemonic template
    story = f" + ".join(eng_parts)
    return f"Radicals: {story} → [Create a quick visual link: e.g., '{char}']"

# ================= FILE PARSING =================
def parse_commonchars2(filepath):
    entries = {}
    if not os.path.exists(filepath): return entries
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'): continue
            parts = line.split('\t')
            if len(parts) < 3: continue
            char, pinyin, meaning = parts[0].strip(), parts[1].strip(), parts[2].strip()
            examples = [p.strip() for p in parts[3:5] if len(parts) > 3 and p.strip()]
            entries[char] = {'pinyin': pinyin, 'meaning': meaning, 'combined': '; '.join(examples)}
    return entries

def parse_commonchars(filepath):
    entries = {}
    if not os.path.exists(filepath): return entries
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'): continue
            parts = line.split('\t')
            if len(parts) >= 4:
                char = parts[1].strip()
                entries[char] = {'pinyin': parts[2].strip(), 'meaning': parts[3].strip(), 'combined': ''}
    return entries

def parse_hsk1(filepath):
    entries = {}
    if not os.path.exists(filepath): return entries
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or line.startswith('Chinese'): continue
            parts = line.split('\t')
            if len(parts) >= 3 and len(parts[0].strip()) == 1:
                char = parts[0].strip()
                entries[char] = {'pinyin': parts[1].strip(), 'meaning': parts[2].strip(), 'combined': ''}
    return entries

def merge_entries(*dicts):
    merged = {}
    for d in dicts:
        for char, data in d.items():
            if char not in merged:
                merged[char] = data.copy()
            else:
                if not merged[char]['combined'] and data.get('combined'):
                    merged[char]['combined'] = data['combined']
    return merged

# ================= MAIN EXECUTION =================
def main():
    print("📂 Loading source files...")
    db = merge_entries(
        parse_commonchars2('commonchars2.txt'),
        parse_commonchars('commonchars.txt'),
        parse_hsk1('hsk1_levels.txt')
    )
    
    cache = load_cache()
    sorted_chars = sorted(db.keys(), key=lambda c: db[c].get('pinyin', 'zzz'))
    
    output_lines = [
        "#separator:tab",
        "#html:false",
        "# Format: character(trad) | pinyin | english | combined_words | mnemonic",
        ""
    ]
    
    print(f"🌐 Fetching data for {len(sorted_chars)} characters (cached & rate-limited)...")
    for char in tqdm(sorted_chars, desc="Enriching"):
        trad = fetch_traditional(char)
        radicals = fetch_radicals(char, cache)
        mnemonic = generate_mnemonic(char, radicals)
        pinyin = db[char]['pinyin']
        meaning = db[char]['meaning']
        combined = db[char]['combined']
        
        line = f"{char}({trad})\t{pinyin}\t{meaning}\t{combined}\t{mnemonic}"
        output_lines.append(line)
        time.sleep(RATE_LIMIT_SEC)
        
    output_file = "organized_chinese_chars.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))
        
    print(f"\n✅ Successfully created '{output_file}' with {len(sorted_chars)} unique entries.")
    print("💡 Tip: Replace generate_mnemonic() with your preferred API call if you find a dedicated mnemonic provider.")

if __name__ == "__main__":
    main()
