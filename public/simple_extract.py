#!/usr/bin/env python3
"""
Simple script to extract Chinese sentences from PDF files.
"""

import os
import re
import subprocess

def extract_text_from_pdf(pdf_path):
    """Extract text using pdftotext"""
    try:
        result = subprocess.run(['pdftotext', '-layout', pdf_path, '-'], 
                              capture_output=True, text=True, timeout=30)
        return result.stdout
    except subprocess.TimeoutExpired:
        print(f"Timeout extracting {pdf_path}")
        return ""
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")
        return ""

def extract_chinese_sentences(text):
    """Extract Chinese sentences from text"""
    if not text:
        return []
    
    # Split by lines and process each line
    lines = text.split('\n')
    sentences = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Find Chinese sentences ending with 。！？ 
        # Pattern: [content][。！？]
        parts = re.split(r'([。！？])', line)
        current_sentence = ""
        
        for part in parts:
            current_sentence += part
            if part in '。！？':
                # End of sentence
                sentence = current_sentence.strip()
                # Filter: must have Chinese chars, reasonable length
                if (len(sentence) >= 10 and 
                    re.search(r'[\u4e00-\u9fff]', sentence) and
                    len(re.findall(r'[\u4e00-\u9fff]', sentence)) >= 3):
                    sentences.append(sentence)
                current_sentence = ""
    
    return sentences

def process_file(pdf_path, output_dir, prefix):
    """Process a single PDF file"""
    print(f"Processing {pdf_path}")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        return 0
        
    sentences = extract_chinese_sentences(text)
    print(f"  Found {len(sentences)} sentences")
    
    if sentences:
        # Save sentences to file
        filename = os.path.basename(pdf_path).replace('.pdf', '.txt')
        output_path = os.path.join(output_dir, f"{prefix}_{filename}")
        with open(output_path, 'w', encoding='utf-8') as f:
            for sentence in sentences:
                f.write(sentence + '\n')
    
    return len(sentences)

def main():
    # Create directories
    os.makedirs('extracted/hsk', exist_ok=True)
    os.makedirs('extracted/other', exist_ok=True)
    
    total_hsk = 0
    total_other = 0
    
    # Process HSK files
    print("=== Processing HSK Materials ===")
    for level in range(1, 7):
        level_dir = f'HSK/HSK{level}'
        if not os.path.exists(level_dir):
            continue
            
        for material in ['Textbook', 'Workbook']:
            pdf_file = f'{level_dir}/HSK-{level}{"" if level <= 3 else ("A" if level <= 4 else "B")}-{material}.pdf'
            if not os.path.exists(pdf_file):
                pdf_file = f'{level_dir}/HSK-{level}{material}.pdf'
                
            if os.path.exists(pdf_file):
                count = process_file(pdf_file, 'extracted/hsk', f'hsk{level}_{material.lower()}')
                total_hsk += count
    
    # Process other textbooks
    print("\n=== Processing Other Textbooks ===")
    other_files = [
        'ic_1_tb_simplified4th_edition.pdf',
        'ic_1_textbook_chapters_1-3_reduced.pdf',
        'Learning Mandarin Chinese Characters Volume 1 The Quick and Easy Way to Learn Chinese Characters (HSK Level 1 AP Exam Prep) (Yi Ren) (z-library.sk, 1lib.sk, z-lib.sk).pdf',
        'Learning Mandarin Chinese Characters Volume 2 The Quick and Easy Way to Learn Chinese Characters (HSK Level 2 AP Study… (Yi Ren) (z-library.sk, 1lib.sk, z-lib.sk).pdf',
        'Modern Mandarin Chinese Grammar A Practical Guide ( etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf',
        'YCT1标准教程.pdf'
    ]
    
    for pdf_file in other_files:
        if os.path.exists(pdf_file):
            # Create clean prefix
            prefix = 'other_' + '_'.join(pdf_file.split('_')[:2]).replace(' ', '-')
            count = process_file(pdf_file, 'extracted/other', prefix)
            total_other += count
    
    print(f"\n=== Summary ===")
    print(f"HSK sentences: {total_hsk}")
    print(f"Other sentences: {total_other}")
    
    # Now create combined files with 100-120 sentences each
    print("\n=== Creating Combined Files ===")
    
    # Combine HSK sentences
    hsk_files = [f for f in os.listdir('extracted/hsk') if f.endswith('.txt')]
    all_hsk_sentences = []
    
    for hsk_file in hsk_files:
        with open(os.path.join('extracted/hsk', hsk_file), 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:
                    all_hsk_sentences.append((hsk_file, line))
    
    print(f"Total HSK sentences collected: {len(all_hsk_sentences)}")
    
    # Combine other sentences
    other_files = [f for f in os.listdir('extracted/other') if f.endswith('.txt')]
    all_other_sentences = []
    
    for other_file in other_files:
        with open(os.path.join('extracted/other', other_file), 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:
                    all_other_sentences.append((other_file, line))
    
    print(f"Total other sentences collected: {len(all_other_sentences)}")
    
    # Write HSK sentences in chunks of 110
    chunk_size = 110
    hsk_chunks = (len(all_hsk_sentences) + chunk_size - 1) // chunk_size
    
    for i in range(hsk_chunks):
        start = i * chunk_size
        end = min(start + chunk_size, len(all_hsk_sentences))
        chunk = all_hsk_sentences[start:end]
        
        with open(f'extracted/hsk_sentences_part_{i+1:03d}.md', 'w', encoding='utf-8') as f:
            f.write(f'# HSK Sentences - Part {i+1} of {hsk_chunks}\n\n')
            f.write(f'*Contains sentences {start+1}-{end} of {len(all_hsk_sentences)} total*\n\n')
            
            current_file = None
            for source_file, sentence in chunk:
                if source_file != current_file:
                    current_file = source_file
                    f.write(f'## From {source_file}\n\n')
                f.write(f'- {sentence}\n')
            f.write('\n---\n\n')
    
    # Write other sentences in chunks of 110
    other_chunks = (len(all_other_sentences) + chunk_size - 1) // chunk_size
    
    for i in range(other_chunks):
        start = i * chunk_size
        end = min(start + chunk_size, len(all_other_sentences))
        chunk = all_other_sentences[start:end]
        
        with open(f'extracted/other_sentences_part_{i+1:03d}.md', 'w', encoding='utf-8') as f:
            f.write(f'# Other Chinese Textbook Sentences - Part {i+1} of {other_chunks}\n\n')
            f.write(f'*Contains sentences {start+1}-{end} of {len(all_other_sentences)} total*\n\n')
            
            current_file = None
            for source_file, sentence in chunk:
                if source_file != current_file:
                    current_file = source_file
                    f.write(f'## From {source_file}\n\n')
                f.write(f'- {sentence}\n')
            f.write('\n---\n\n')
    
    # Create AGENTS.md
    with open('extracted/AGENTS.md', 'w', encoding='utf-8') as f:
        f.write("""# Agents Instructions for Sentence Extraction

This directory contains extracted sentences from Chinese learning materials.

## File Structure

- `hsk_sentences_part_*.md`: HSK textbook and workbook sentences (100-120 sentences per file)
- `other_sentences_part_*.md`: Other Chinese textbook sentences (100-120 sentences per file)

## Processing Guidelines

1. Each output file should contain 100-120 sentences
2. Files are numbered sequentially (part_001, part_002, etc.)
3. Each sentence is presented as a markdown list item
4. Source file information is included as section headers
5. Only meaningful Chinese sentences are extracted (minimum 10 characters, containing Chinese characters)

## Usage

Run the simple_extract.py script to process all PDF files and generate the output.
""")
    
    print(f"\nDone! Created:")
    print(f"  - {hsk_chunks} HSK sentence files")
    print(f"  - {other_chunks} other textbook sentence files")
    print(f"  - AGENTS.md with instructions")
    print(f"All files are in the 'extracted/' directory")

if __name__ == '__main__':
    main()
