#!/usr/bin/env python3
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
    return bool(re.search(r'[\u4e00-\u9fff]', text))


def has_pinyin_tone(text):
    return bool(re.search(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]', text))


def is_german_field(text):
    """Check if text contains German-specific patterns."""
    if not text:
        return False
    # German umlauts and ß
    if re.search(r'[äöüÄÖÜß]', text):
        return True
    # é and è common in German loanwords (e.g., Café, Klischee, Dekolleté)
    if re.search(r'[éèê]', text):
        return True
    return False


def has_german_patterns(parts):
    """Check if any field has strong German indicators."""
    for p in parts:
        if is_german_field(p):
            return True
    # Check if first field is a number > 5000 (German entry ID pattern)
    if parts[0] and re.match(r'^\d{4,5}$', parts[0]) and int(parts[0]) > 5000:
        return True
    return False


def has_frequency(parts):
    for p in parts:
        if re.match(r'^\d{1,4}$', p) and 1 <= int(p) <= 5000:
            return int(p)
    return None


GERMAN_WORDS = {
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem',
    'einer', 'eines', 'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'Sie',
    'nicht', 'ist', 'mit', 'als', 'auf', 'aus', 'bei', 'für', 'um', 'von',
    'zum', 'zur', 'sich', 'haben', 'sein', 'werden', 'wurde', 'wird', 'kann',
    'muss', 'hat', 'hast', 'habe', 'keine', 'kein', 'noch', 'schon', 'immer',
    'nur', 'sehr', 'auch', 'aber', 'dann', 'dort', 'hier', 'nach', 'über',
    'unter', 'vor', 'zwischen', 'durch', 'gegen', 'ohne', 'bis', 'dass',
    'weil', 'wenn', 'doch', 'mal', 'wohl', 'bereits', 'schon', 'gar',
    'gerade', 'etwa', 'zwar', 'denn', 'eigentlich', 'vielleicht',
    'natürlich', 'allerdings', 'trotzdem', 'deshalb', 'deswegen', 'tun',
    'getan', 'gemacht', 'gesagt', 'gegangen', 'gekommen', 'geworden',
    'machen', 'sagen', 'gehen', 'kommen', 'lassen', 'liegen', 'stehen',
    'stellen', 'setzen', 'geben', 'wissen', 'denken', 'finden', 'glauben',
    'heilbronn', 'steckbrief', 'abschied', 'krieger', 'soldat',
    'weitermachen', 'geschafft', 'klasse',
    'beibringen', 'beigebracht',
    'heutzutage', 'durcheinander', 'knifflig', 'heilbar', 'binnen',
    'nachtaktiv', 'hochtrabend', 'moin', 'digger',
    'komm', 'hau', 'solls', 'daneben',
    'guten', 'abend', 'beide', 'jener', 'klischee',
    'verlobte', 'verlobten', 'dekollete', 'dekolletés', 'café', 'cafés',
    'lapidar',
}


def _looks_like_german(parts, line_text):
    """Check if entry looks like German (no umlauts but clearly German)."""
    text = '\t'.join(parts)
    words = set(re.findall(r"[a-zA-ZäöüÄÖÜß]+", text.lower()))
    matches = words & GERMAN_WORDS
    has_german_cap = bool(re.findall(r'\b[A-ZÄÖÜ][a-zäöü]+', text))
    # German compound nouns (long words starting with capital)
    has_long_german_noun = bool(re.findall(r'\b[A-ZÄÖÜ][a-zäöü]{5,}', text))
    # German separable prefix verbs at end of sentence (capitalized in main clause inversion etc.)
    is_sentence_german = (words & {'komm', 'hau', 'mir', 'dir', 'soll', 'solls'})

    return (len(matches) >= 2
            or (len(matches) >= 1 and has_german_cap)
            or has_long_german_noun
            or bool(is_sentence_german))


def _is_pinyin_only(text):
    """Check if text is just a pinyin syllable (no real Spanish word)."""
    # Pinyin syllables: 1-5 Latin chars plus optional tone mark (including ü diacritics)
    # Matches patterns like: nǚ, lǘ, niǍo, zhōng, etc.
    pinyin = re.match(r'^[a-zA-Z]+[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]?$', text)
    if pinyin:
        return True
    # Also check for ü alone (common pinyin: nǚ, lǜ, etc.)
    if re.match(r'^[a-zA-Z]?[ǖǘǚǜ][a-zA-Z]?$', text):
        return True
    return False


PSEUDO_GERMAN_WORDS = {
    'Voll', 'daneben', 'TonePair',
}


def _is_fake_spanish_first_field(text, other_fields_text=''):
    """Check if first field looks like it's NOT a real Spanish word."""
    if not text:
        return True
    # Pure number
    if re.match(r'^\d+$', text):
        return True
    # Pinyin-only entries
    if _is_pinyin_only(text):
        return True
    # TonePair markers
    if text.startswith('TonePair'):
        return True
    if text in PSEUDO_GERMAN_WORDS:
        return True
    if text == 'Chinese':
        return True
    # If other fields have CJK and this field is short, it's probably Chinese metadata
    if re.match(r'^\d{1,4}$', text) and has_cjk(other_fields_text):
        return True
    return False


def _first_field_is_word(parts):
    """Check if first field looks like a real word (not a number/symbol/run-on)."""
    text = parts[0]
    if not text:
        return False
    # Is a number
    if re.match(r'^\d+$', text):
        return False
    # Is a single character (not a word)
    if len(text) <= 1:
        return False
    # Is a run-on string (no spaces, > 30 chars)
    if ' ' not in text and len(text) > 30:
        return False
    # Has meaningful Latin characters
    if re.match(r'^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]', text):
        return True
    return False


def classify_entry(parts, line_text):
    """Classify entry as 'spanish', 'chinese', or 'german'."""

    # Chinese: first field has CJK characters
    if has_cjk(parts[0]):
        return 'chinese', None

    # German: has umlauts/ß, or entry ID > 5000
    if has_german_patterns(parts):
        return 'german', None

    # Chinese entries with allsetlearning.com URL
    if 'allsetlearning.com' in line_text:
        return 'chinese', None

    # Chinese: has pinyin tones AND first field is NOT a real word (e.g., pure pinyin syllable)
    if has_pinyin_tone(line_text) and _is_fake_spanish_first_field(parts[0], '\t'.join(parts[1:])):
        return 'chinese', None

    # Chinese entries with valid/invalid markers
    if 'valid' in line_text or 'invalid' in line_text:
        return 'chinese', None

    # Spanish with pinyin-like accents but a real word in first field
    if has_pinyin_tone(line_text) and _first_field_is_word(parts):
        freq = has_frequency(parts)
        return 'spanish', freq

    # Spanish: has frequency number in 1-5000
    freq = has_frequency(parts)
    if freq is not None:
        return 'spanish', freq

    # Spanish: has POS tag in parentheses
    if re.search(r'\((?:adj|v|nf|nm|nc|nmf|nm/f|nf el|nm el|num|adv|pron|interj|conj|prep|art|n)\)', parts[0]):
        return 'spanish', None

    # If first field is short Latin, check other fields for CJK/pinyin
    if re.match(r'^[A-Za-z]', parts[0]):
        for p in parts[1:]:
            if has_cjk(p) or has_pinyin_tone(p):
                return 'chinese', None

    # Check for German without umlauts: common German words/patterns
    if _looks_like_german(parts, line_text):
        return 'german', None

    # Default to Spanish
    return 'spanish', None


def parse_spanish(parts, freq):
    entry = {
        'word': parts[0],
        'pos': '',
        'translation': '',
        'frequency': freq or 0,
    }

    pos_match = re.search(r'\(([^)]+)\)', parts[0])
    if pos_match:
        entry['pos'] = pos_match.group(1)
        entry['word'] = re.sub(r'\s*\([^)]+\)', '', parts[0])

    for p in parts[1:]:
        if p and re.match(r'^[a-zA-Z]', p) and not re.match(r'^\d+$', p) and len(p) > 2:
            entry['translation'] = p
            break

    return entry


def parse_chinese(parts):
    entry = {
        'word': parts[0],
        'pinyin': '',
        'translation': '',
        'notes': '',
        'tags': '',
        'grammar': '',
        'url': '',
    }

    if len(parts) >= 2 and not has_cjk(parts[1]):
        entry['pinyin'] = parts[1]
    if len(parts) >= 3:
        entry['translation'] = parts[2]
    if len(parts) >= 4:
        entry['notes'] = parts[3]

    for i, p in enumerate(parts):
        if not p:
            continue
        if 'allsetlearning.com' in p:
            entry['url'] = p
        elif i >= 4 and len(p) > 3 and 'http' not in p:
            # Look for grammar pattern in quoted form or HSK tags
            stripped = p.strip('" ')
            if p.startswith('HSK'):
                entry['tags'] = p
            elif '"' in p and not entry['grammar']:
                # This looks like a grammar point name with quotes
                clean = stripped.strip()
                # Clean up common noise
                if not re.match(r'^\d+$', clean) and len(clean) > 2:
                    entry['grammar'] = clean
            elif not entry['tags'] and not re.match(r'^[a-zA-Z0-9 .]+$', stripped) and len(stripped) > 2:
                entry['tags'] = stripped

    return entry


def parse_german(parts):
    entry = {
        'word': '',
        'german': '',
        'translation': '',
        'notes': '',
        'id': '',
    }

    # First field might be an ID number or German word
    if re.match(r'^\d+$', parts[0]):
        entry['id'] = parts[0]
        if len(parts) >= 2:
            entry['german'] = parts[1]
        if len(parts) >= 3:
            entry['translation'] = parts[2]
        if len(parts) >= 4:
            entry['notes'] = parts[3]
        entry['word'] = entry['german']
    else:
        entry['german'] = parts[0]
        entry['word'] = parts[0]
        for p in parts[1:]:
            if p and re.match(r'^[A-Za-z]', p) and not re.match(r'^\d+$', p):
                entry['translation'] = p
                break

    return entry


def tag_clean(tag):
    """Clean up grammar tag for use as a heading."""
    tag = tag.strip('"').strip()
    if len(tag) > 80:
        tag = tag[:77] + '...'
    return tag


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    spanish_entries = []
    chinese_entries = []
    german_entries = []

    with open(INPUT, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue

            parts = line.strip().split('\t')
            if not parts or not parts[0]:
                continue

            line_text = '\t'.join(parts)
            lang, freq = classify_entry(parts, line_text)

            if lang == 'spanish':
                spanish_entries.append(parse_spanish(parts, freq))
            elif lang == 'chinese':
                chinese_entries.append(parse_chinese(parts))
            else:
                german_entries.append(parse_german(parts))

    # ========== SPANISH ==========
    es_dir = os.path.join(OUTPUT_DIR, 'Spanish')
    os.makedirs(es_dir, exist_ok=True)

    level_groups = defaultdict(list)
    unassigned = []
    for e in spanish_entries:
        freq = e.get('frequency', 0) or 0
        assigned = False
        for level_name, lo, hi in SPANISH_LEVELS:
            if lo <= freq <= hi:
                level_groups[level_name].append(e)
                assigned = True
                break
        if not assigned:
            unassigned.append(e)

    if unassigned:
        level_groups['Unassigned'] = unassigned

    for k in level_groups:
        level_groups[k].sort(key=lambda x: x.get('frequency', 0), reverse=True)

    for level_name, lo, hi in SPANISH_LEVELS:
        entries = level_groups.get(level_name, [])
        if not entries:
            continue

        freq_range = f"{lo}-{hi}"
        filepath = os.path.join(es_dir, f"{level_name}.md")

        with open(filepath, 'w', encoding='utf-8') as out:
            label = level_name.replace('-', ' ')
            out.write(f"# Spanish Vocabulary — {label} (freq {freq_range})\n\n")
            out.write(f"**{len(entries)} words**\n\n")
            out.write("| # | Word | POS | Translation | Frequency |\n")
            out.write("|---|---|---|---|---|\n")

            for i, e in enumerate(entries, 1):
                word = e['word'].replace('|', '\\|')
                pos = e['pos'].replace('|', '\\|')
                trans = e['translation'].replace('|', '\\|')
                freq = e.get('frequency', '') or ''
                out.write(f"| {i} | {word} | {pos} | {trans} | {freq} |\n")

        print(f"  Spanish/{level_name}.md — {len(entries)} entries")

    if unassigned:
        filepath = os.path.join(es_dir, "Unassigned.md")
        with open(filepath, 'w', encoding='utf-8') as out:
            out.write("# Spanish Vocabulary — Unassigned\n\n")
            out.write(f"**{len(unassigned)} words** (no frequency data)\n\n")
            out.write("| # | Word | POS | Translation |\n")
            out.write("|---|---|---|---|\n")
            for i, e in enumerate(unassigned, 1):
                word = e['word'].replace('|', '\\|')
                pos = e['pos'].replace('|', '\\|')
                trans = e['translation'].replace('|', '\\|')
                out.write(f"| {i} | {word} | {pos} | {trans} |\n")
        print(f"  Spanish/Unassigned.md — {len(unassigned)} entries")

    total_es = len(spanish_entries)
    with open(os.path.join(es_dir, 'README.md'), 'w', encoding='utf-8') as out:
        out.write("# Spanish Vocabulary\n\n")
        out.write(f"**Total: {total_es} words**\n\n")
        out.write("Organized by word frequency rank (lower = more common).\n\n")
        out.write("| Level | Frequency Range | Words |\n")
        out.write("|---|---|---|\n")
        for level_name, lo, hi in SPANISH_LEVELS:
            cnt = len(level_groups.get(level_name, []))
            out.write(f"| [{level_name.replace('-', ' ')}]({level_name}.md) | {lo}-{hi} | {cnt} |\n")
        if unassigned:
            out.write(f"| [Unassigned](Unassigned.md) | — | {len(unassigned)} |\n")

    # ========== CHINESE ==========
    cn_dir = os.path.join(OUTPUT_DIR, 'Chinese')
    os.makedirs(cn_dir, exist_ok=True)

    grammar_groups = defaultdict(list)

    for e in chinese_entries:
        grammar = e.get('grammar', '').strip()
        tags = e.get('tags', '').strip()

        if grammar:
            key = tag_clean(grammar)
        elif tags:
            key = tag_clean(tags)
        elif has_cjk(e['word']) and len(e['word']) <= 3:
            key = "Vocabulary"
        else:
            key = "Miscellaneous"

        grammar_groups[key].append(e)

    # Merge small sections (< 10 entries) into "Other Grammar Points"
    BIG_KEYS = {'Miscellaneous', 'Vocabulary'}
    other_entries = []
    merged = defaultdict(list)
    for key, entries in grammar_groups.items():
        if key in BIG_KEYS or len(entries) >= 10:
            merged[key] = entries
        else:
            other_entries.extend(entries)

    if other_entries:
        merged['Other Grammar Points'] = other_entries

    sorted_groups = sorted(merged.items(), key=lambda x: len(x[1]), reverse=True)

    filepath = os.path.join(cn_dir, 'Grammar-Notes.md')
    total_cn = len(chinese_entries)
    with open(filepath, 'w', encoding='utf-8') as out:
        out.write("# Chinese Vocabulary & Grammar Notes\n\n")
        out.write(f"**Total: {total_cn} entries**\n\n")
        out.write("---\n\n")

        for group_name, entries in sorted_groups:
            safe = group_name.replace('<', '&lt;').replace('>', '&gt;')
            out.write(f"## {safe}\n\n")
            out.write(f"*{len(entries)} entries*\n\n")
            out.write("| # | Chinese | Pinyin | Translation | Notes |\n")
            out.write("|---|---|---|---|---|\n")

            for i, e in enumerate(entries, 1):
                word = e['word'].replace('|', '\\|').replace('<', '&lt;')
                pinyin = e.get('pinyin', '').replace('|', '\\|').replace('<', '&lt;')
                trans = e.get('translation', '').replace('|', '\\|').replace('<', '&lt;')
                notes = e.get('notes', '').replace('|', '\\|').replace('<', '&lt;')
                out.write(f"| {i} | {word} | {pinyin} | {trans} | {notes} |\n")

            out.write("\n---\n\n")

    print(f"  Chinese/Grammar-Notes.md — {total_cn} entries")

    with open(os.path.join(cn_dir, 'README.md'), 'w', encoding='utf-8') as out:
        out.write("# Chinese Vocabulary & Grammar Notes\n\n")
        out.write(f"**Total: {total_cn} entries**\n\n")
        out.write("Organized by grammar topic.\n\n")
        out.write("See [Grammar Notes](Grammar-Notes.md) for the full listing.\n\n")
        out.write("### Grammar Topics\n\n")
        for group_name, entries in sorted_groups[:30]:
            out.write(f"- **{group_name[:60]}** ({len(entries)} entries)\n")
        if len(sorted_groups) > 30:
            out.write(f"- *...and {len(sorted_groups) - 30} more topics*\n")

    # ========== GERMAN ==========
    de_dir = os.path.join(OUTPUT_DIR, 'German')
    os.makedirs(de_dir, exist_ok=True)

    filepath = os.path.join(de_dir, 'Vocabulary.md')
    total_de = len(german_entries)
    with open(filepath, 'w', encoding='utf-8') as out:
        out.write("# German — Spanish Vocabulary\n\n")
        out.write(f"**Total: {total_de} entries**\n\n")
        out.write("| # | ID | German | Spanish Translation | Notes |\n")
        out.write("|---|---|---|---|---|\n")

        for i, e in enumerate(german_entries, 1):
            eid = e.get('id', '').replace('|', '\\|')
            german_word = e.get('german', '').replace('|', '\\|')
            trans = e.get('translation', '').replace('|', '\\|')
            notes = e.get('notes', '').replace('|', '\\|').replace('<br />', ' ').replace('&lt;', '<')
            # Truncate long notes
            if len(notes) > 200:
                notes = notes[:197] + '...'
            out.write(f"| {i} | {eid} | {german_word} | {trans} | {notes} |\n")

    print(f"  German/Vocabulary.md — {total_de} entries")

    with open(os.path.join(de_dir, 'README.md'), 'w', encoding='utf-8') as out:
        out.write("# German — Spanish Vocabulary\n\n")
        out.write(f"**Total: {total_de} entries**\n\n")
        out.write("German vocabulary with Spanish translations.\n\n")
        out.write("See [Vocabulary](Vocabulary.md) for the full listing.\n")

    # ========== ROOT README ==========
    with open(os.path.join(OUTPUT_DIR, 'README.md'), 'w', encoding='utf-8') as out:
        total_all = total_es + total_cn + total_de
        out.write("# Vocabulary Notes\n\n")
        out.write(f"Organized from `All Decks.txt` — {total_all} total entries\n\n")
        out.write("## Languages\n\n")
        out.write(f"- [Spanish](Spanish/README.md) — {total_es} words\n")
        out.write(f"- [Chinese](Chinese/README.md) — {total_cn} entries\n")
        out.write(f"- [German](German/README.md) — {total_de} entries\n")

    print(f"\nDone! {total_es} Spanish + {total_cn} Chinese + {total_de} German entries organized.")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == '__main__':
    main()
