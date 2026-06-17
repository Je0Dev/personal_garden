#!/usr/bin/env python3
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
    "乙": "Curved hook (乙) bends: second place (九) or \"also\" (也).",
    "亅": "Hook (亅) finishes task (了) or hangs matter (事).",
    "二": "Two lines (二) cross for five (五), frame well (井).",
    "亠": "Lid (亠) covers death (亡) or capital (京).",
    "人": "Person (人) rests by tree (休), stands in place (位), two people show kindness (仁).",
    "儿": "Legs (儿) stand; mouth above = brother (兄) calling.",
    "入": "Roof shape (入) lets you enter (入) fully (全).",
    "八": "Splitting strokes (八) = eight; divide for public (公) use.",
    "冂": "Downward box (冂) holds inside (内) or repeats (再).",
    "冖": "Cover (冖) shelters work (冗) or crowns (冠).",
    "冫": "Two drops (冫) freeze: winter (冬) is cold (冷), water freezes (凍).",
    "几": "Low table (几) holds ordinary (凡) items.",
    "凵": "Upward box (凵) traps danger (凶) or releases (出).",
    "刀": "Blade (刀) splits (分), cuts (切), starts (初), carves rules (則) for ahead (前).",
    "力": "Flexed arm (力) adds (加) strength to help (助) and encourage (勉).",
    "勹": "Curved arm (勹) hooks (勾) or packs (包).",
    "匕": "Spoon (匕) stirs change (化) or points north (北).",
    "匚": "Right-open box (匚) holds chest (匣).",
    "匸": "Hiding box (匸) matches (匹) or zones (區) secretly.",
    "十": "Cross (十) = ten; add stroke for thousand (千), noon (午), half (半).",
    "卜": "Dot over line (卜) predicts (占) hexagrams (卦).",
    "卩": "Kneeling figure (卩) stamps seal (印), warns danger (危).",
    "厂": "Cliff overhang (厂) shelters thick (厚) ground, origin (原).",
    "厶": "Private mark (厶) departs (去) or joins secretly (參).",
    "又": "Hand again (又) befriends (友), takes (取), receives (受).",
    "口": "Mouth (口) speaks ancient (古) words, names (名), agrees (和), commands (命).",
    "囗": "Big box (囗) surrounds four (四), returns (回), nation (國), map (圖).",
    "土": "Earth (土) is where you are (在), ground (地), builds city (城), wall (壁).",
    "士": "Scholar (士) stands for one (壹) principle.",
    "夂": "Foot descending (夂) meets (夆) ahead.",
    "夊": "Slow steps (夊) through summer (夏).",
    "夕": "Half-moon (夕) = evening; outside (外), many (多) stars at night (夜).",
    "大": "Person spreading arms (大) = big; sky (天) is biggest.",
    "女": "Woman (女) + child = good (好); begins (始) family name (姓).",
    "子": "Child (子) in crib (乚) = son; learns characters (字), study (學).",
    "宀": "Roof (宀) guards (守) home (家), shelters from cold (寒), holds truth (實).",
    "寸": "Hand + dot (寸) = inch; temple (寺) measures respect (尊), general (將) commands.",
    "小": "Tiny strokes (小) = small; fewer (少) means less.",
    "尢": "Lame leg (尢) especially (尤) leads to accomplishment (就).",
    "尸": "Body outline (尸) measures foot (尺), defines situation (局).",
    "屮": "Sprout (屮) pushes through earth, gathers (屯).",
    "山": "Peaks (山) form ridge (岡), rock (岩), island (島).",
    "巛": "Flowing lines (川) = river; province (州), patrol (巡) along water.",
    "工": "Tool shape (工) = work; left hand (左), shaman (巫), difference (差).",
    "己": "Curled self (己) = oneself; snake hour (巳).",
    "巾": "Cloth (巾) sold in market (市), fabric (布), emperor's (帝) robe, constant (常) wear.",
    "干": "Shield (干) defends peace (平), harvest year (年).",
    "幺": "Tiny thread (幺) weaves illusion (幻), youth (幼).",
    "广": "Dotted cliff (广) shelters sequence (序), shop (店), mansion (府), measure (度).",
    "廴": "Long stride (廴) extends (延) forward.",
    "廾": "Two hands (廾) lift cap (弁).",
    "弋": "Stake with string (弋) = shoot; model (式), kill ruler (弑).",
    "弓": "Arched bow (弓) draws (引), younger brother (弟) is weak (弱), fills (彌) tension.",
    "彐": "Snout (彐) faces current (当), judgment (彖).",
    "彡": "Bristles (彡) give form (形), elegance (彦).",
    "彳": "Step (彳) serves duty (役), reaches that (彼), follows behind (後), gains (得).",
    "心": "Heart (心) must (必) rush (忙), avoid taboo (忌), defines nature (性), emotion (情).",
    "戈": "Halberd (戈) achieves (成), models (式), two (弐), fights war (戦).",
    "戶": "Door (戸) turns back (戻), marks place (所).",
    "手": "Hand (手) has talent (才), holds (持), hangs (掛), raises (挙), worships (拜).",
    "支": "Branch (支) supports leaning (攱), tilts (攲).",
    "攴": "Tap (攴) receives (收), narrates (敍), counts (數), teaches (斅).",
    "文": "Script (文) decorates (斌), elegance (斐), patterns (斑), brilliance (斕).",
    "斗": "Dipper (斗) measures ingredients (料), pivots (斡).",
    "斤": "Axe (斤) splits wood (斦), chops (斧), makes new (新), rebukes (斥), cuts (斬).",
    "方": "Square (方) releases (放), travels (旅), forms clan (族).",
    "无": "Lacking (无) = not; already (旡) finished.",
    "日": "Sun (日) brightens white (白), hundred (百) days, bright (明), target (的), time (時).",
    "曰": "Mouth speaking (曰) writes (書), most (最), advances (晉), asks (曷), once (曾).",
    "月": "Moon (月) = have (有), serve (服), blue-green (青), morning (朝).",
    "木": "Tree (木) is wood (木), plank (板), mutual (相), root (根), forest (森), joy (楽).",
    "欠": "Yawning mouth (欠) rejoices (欣), admires (欽), desires (欲), sings (歌).",
    "止": "Foot stopping (止) corrects (正), steps (歩), this (此), march (武), year (歲).",
    "歹": "Broken bone (歹) = death (死), row (列), mold (殕).",
    "殳": "Weapon (殳) serves (役), throws (投), beats (殴), dynasty (殷).",
    "毋": "Prohibition (毋) + woman = mother (母), each (毎), tutor (姆), plum (梅).",
    "比": "Two spoons (比) compare: all (皆), critique (批), finish (毕), cautious (毖).",
    "毛": "Fur (毛) plucks (毟), felt (毡), fine hair (毫), down (毳), consumes (耗).",
    "氏": "Clan mark (氏) defines people (民), paper (紙), marriage (婚), commoner (氓).",
    "气": "Vapor (气) = air (気), steam (汽), oxygen (氧).",
    "水": "Water (水) flows forever (永), swim (泳), decide (決), govern (治), sea (海).",
    "火": "Fire (火) lights lamp (灯), warms blanket (毯), explodes (爆), fierce (烈), cooks (烹).",
    "爪": "Claw (爪) climbs (爬), lifts (爯), struggles (爭), aids (爰), acts (爲).",
    "父": "Father (父) wields axe (斧), cooks in pot (釜).",
    "爻": "Trigram lines (爻) arrange altar (爼), refresh (爽), you (爾).",
    "爿": "Half log (爿) makes bed (牀), grand (奘), tablet (牃).",
    "片": "Split wood (片) = slice; edition (版), sign (牌), document (牒).",
    "牙": "Tooth (牙) sprouts (芽), exclaims (呀), props (牚).",
    "牛": "Cow (牛) reports (告), moos (牟), herds (牧), thing (物), special (特).",
    "犬": "Dog (犬) commits crime (犯), rages (狂), ambushes (狙), is dog (狗), beast (獣).",
    "玄": "Mysterious (玄) strings (弦), here (玆).",
    "玉": "Jade dot (玉) makes king (王), jade (玉), master (主), play (弄), emperor (皇).",
    "瓜": "Melon (瓜) chirps (呱), small melon (瓞).",
    "瓦": "Tile (瓦) measures weight (瓧), jar (瓮), selects (甄).",
    "甘": "Sweet (甘) citrus (柑), sweet (甜), drunk (酣).",
    "生": "Life (生) = animal (牲), flute (笙), nephew (甥).",
    "用": "Use (用) hires servant (佣), tube (甬), peaceful (甯).",
    "田": "Field (田) plots (町), thinks (思), stays (留), roughly (略), times (番).",
    "疋": "Cloth bolt (疋) sparse (疏), clear (楚), assistant (胥), extends (延).",
    "疒": "Sickbed (疒) = illness: disease (病), symptom (症), pain (痛), cancer (癌).",
    "癶": "Feet spreading (癶) depart (発), ascend (登).",
    "白": "White (白) appearance (皃), target (的), all (皆), emperor (皇).",
    "皮": "Skin (皮) drapes (披), that (彼), waves (波).",
    "皿": "Dish (皿) holds bowl (盂), harmonizes (盉), why not (盍), watches (監).",
    "目": "Eye (目) sees (見), has tools (具), reflects (省), sleeps (眠), eye (眼).",
    "矛": "Spear (矛) = thatch (茅), pities (矜).",
    "矢": "Arrow (矢) heals (医), clans (族), measures (矩).",
    "石": "Stone (石) forms rock (岩), sand (砂), breaks (破), stele (碑), jade-green (碧).",
    "示": "Spirit altar (示) shows (示), rites (礼), society (社), god (神), sacrifice (祭).",
    "禸": "Animal track (禸) = Yu (禹), monkey (禺), bird (禽).",
    "禾": "Grain stalk (禾) benefits (利), private (私), season (季), harmony (和), fragrant (香).",
    "穴": "Cave (穴) is empty (空), sudden (突), deep (窅), poor (窘), nest (窩).",
    "立": "Stand (立) makes sound (音), produce (産), next (翌), meaning (意), new (新).",
    "竹": "Bamboo (竹) India (竺), laughs (笑), sequence (第), equal (等), simple (簡).",
    "米": "Rice (米) ingredients (料), cut (断), deep (奥), paste (糊), unicorn (麟).",
    "糸": "Silk thread (糸) connects (系), grade (級), paper (紙), plain (素), fine (細).",
    "缶": "Earthen jar (缶) = jar (缶), vat (缸), kiln (窑), pottery (陶).",
    "网": "Net (网) catches buy (買), crime (罪), place (置), spread (羅).",
    "羊": "Sheep (羊) wears (着), antelope (羚), soars (翔).",
    "羽": "Feathers (羽) practice (習), soar up (翀), old man (翁), glide (翔).",
    "老": "Old (老) venerable (耆), filial (孝), aged (耋).",
    "而": "And (而) softens (耎), endures (耐), begins (耑).",
    "耒": "Plow (耒) hoes (耔), trenches (耝), weeds (耨), harrows (耰).",
    "耳": "Ear (耳) takes (取), hears (聞), duty (職), cluster (叢).",
    "聿": "Brush (聿) writes law (律), book (書), builds (建).",
    "肉": "Meat (肉) = flesh (肉), resembles (肖), thigh (股), stomach (胃).",
    "臣": "Minister (臣) lies down (臥), serves official (宦), stores (蔵).",
    "自": "Self (自) alone (臫), standard (臬), unstable (臲).",
    "至": "Arrive (至) causes (致), reaches (臸), platform (臺).",
    "臼": "Mortar (臼) holds tree (桕), uncle (舅), pounds (舂), rat (鼠).",
    "舌": "Tongue (舌) confuses (乱), suitable (适), speaks (話), abandons (舍).",
    "舛": "Opposing feet (舛) = oppose (舛), Shun (舜), dance (舞).",
    "舟": "Boat (舟) sails (航), ship (船), warship (艦).",
    "艮": "Stopping (艮) good (良), drinks (飲), very (很).",
    "色": "Color (色) = hue (色), angry (艴), gorgeous (艷).",
    "艸": "Grass (艸) together (共), flower (花), hero (英), bitter (苦), tea (茶).",
    "虍": "Tiger head (虍) = tiger (虎), cruel (虐), stripes (彪), tiger (虒).",
    "虫": "Insect (虫) worm (蚯), earthworm (蚓), strong (強), touch (触), ant (蟻).",
    "血": "Blood (血) moat (洫), blood (衁), rift (衅), crowd (衆).",
    "行": "Walk enclosure (行) go (行), spread (衍), art (術), charge (衝).",
    "衣": "Clothes (衣) = garment (衣), begin (初), quilt (被), dress (装), cut (裁).",
    "襾": "West cover (襾) = west (西), want (要), restrain (覊).",
    "見": "See (見) rules (規), relative (親), realize (覺), observe (觀).",
    "角": "Horn (角) wine cup (觚), untie (解), rough (觕), goblet (觥), touch (觸).",
    "言": "Speech (言) speak (誁), curse (詋), edict (詔), evaluate (評), test (試).",
    "谷": "Valley (谷) stream (谿), ravine (豀), mountain peak (谸).",
    "豆": "Bean (豆) how (豈), abundant (豐), vertical (豎).",
    "豕": "Pig (豕) piglet (豖), pig (豚), elephant (象).",
    "豸": "Badger (豸) leopard (豹), appearance (貌), cat (貓), badger (貉).",
    "貝": "Shell (貝) wealth (財), thief (賊), gift (賜), poor (貧), goods (貨).",
    "赤": "Red (赤) brilliant (赫), reddish-brown (赭).",
    "走": "Run (走) go to (赴), rise (起), surpass (超).",
    "足": "Foot (足) runs (跑), strides (跨), heel (跟), kneels (跪), road (路).",
    "身": "Body (身) bows (躬), hides (躲), body (軀).",
    "車": "Cart (車) track (軌), soft (軟), compare (較), army (軍), carry (載).",
    "辛": "Bitter (辛) guilt (辜), law (辟), spicy (辣), handle (辦), distinguish (辨).",
    "辰": "Morning (辰) shame (辱), farming (農).",
    "辵": "Walk radical (辵) patrol (巡), welcome (迎), through (通), chase (追), flee (逃).",
    "邑": "City (邑) that (那), nation (邦), young man (郎), part (部), outer wall (郭).",
    "酉": "Wine jar (酉) drunk (醉), sauce (酱), oil (油), sober (醒), sour (酸).",
    "釆": "Claw + rice (釆) glaze (釉), explain (釋).",
    "里": "Village (里) field (野), field (野).",
    "金": "Gold (金) silver (銀), copper (銅), nail (釘), sharp (銳), mold (鋞).",
    "長": "Long (長) long (镸), long (镽).",
    "門": "Gate (門) between (間), idle (閑), close (關), fight (闘), shut (閉).",
    "阜": "Mound (阜) slope (阪), defend (防), block (阻), land (陆), pass (陘).",
    "隶": "Slave (隶) clerk (隸), crane (隺).",
    "隹": "Bird (隹) sparrow (雀), gather (集), goose (雁), difficult (难), elegant (雅).",
    "雨": "Rain (雨) fog (雾), frost (霜), snow (雪), overlord (霸), cloud (雲).",
    "青": "Blue-green (青) pure (靕), peaceful (靖), quiet (靜).",
    "非": "Wrong (非) rely (靠), variegated (靟).",
    "面": "Face (面) shy (靦), dimple (靨).",
    "革": "Leather (革) boot (靴), saddle (鞍), harness (鞅), whip (鞭).",
    "韋": "Tanned leather (韋) Wei (韋), Han (韓), conceal (韜).",
    "韭": "Leek (韭) fine (韱), mince (韲).",
    "音": "Sound (音) melodious (韶), rhyme (韻), harmonious (韾).",
    "頁": "Leaf (頁) moment (頃), neck (項), obey (順), must (須), collar (領).",
    "風": "Wind (風) typhoon (颱), float (飄), sail (颿), whirl (颩).",
    "飛": "Fly (飛) turn over (飜), fly (飝).",
    "食": "Eat (食) rice (飯), drink (飲), hungry (餓), surplus (餘), meal (餐).",
    "首": "Head (首) crossroads (馗), cut ear (馘).",
    "香": "Fragrant (香) aromatic (馨), fragrant (馫).",
    "馬": "Horse (馬) rely on (馮), tame (馴), gallop (馳), station (駐), startle (驚).",
    "骨": "Bone (骨) skeleton (骼), dirty (髒), thigh (髀), kneecap (骿).",
    "高": "Tall (高) skull (髚), skull (髛).",
    "髟": "Long hair (髟) hair (髮), beard (鬚), loose (鬆), beard (鬍).",
    "鬥": "Fight (鬥) noisy (鬧), fight (鬪).",
    "鬯": "Sacrificial wine (鬯) luxuriant (鬰), depressed (鬱).",
    "鬲": "Cauldron (鬲) spouted vessel (鬶), cauldron (鬷), pot (鬸).",
    "鬼": "Ghost (鬼) soul (魂), chief (魁), demon (鬽), spirit (魄).",
    "魚": "Fish (魚) carp (鯉), abalone (鮑), knife fish (魛), person fish (魜).",
    "鳥": "Bird (鳥) goose (鳫), rooster (鳮), phoenix (鳳), sing (鳴), swan (鴻).",
    "鹵": "Salt (鹵) salty (鹹), alkali (鹼), salt (鹽).",
    "鹿": "Deer (鹿) dust (塵), deer (麃), elk (麋), deer (麉), unicorn (麟).",
    "麥": "Wheat (麥) yeast (麴), noodles (麵), wheat (麱), roasted flour (麨).",
    "麻": "Hemp (麻) what (麼), demon (魔).",
    "黃": "Yellow (黃) bright (黊), school (黌).",
    "黍": "Millet (黍) sticky (黏), dawn (黎).",
    "黑": "Black (黑) dot (點), eyebrow pencil (黛), black (黱), party (黨).",
    "黹": "Embroidery (黹) axe pattern (黼), symmetrical pattern (黻).",
    "黽": "Frog (黽) turtle (鼈), softshell (黿), frog (鼆).",
    "鼎": "Tripod (鼎) cover (鼏), small tripod (鼒).",
    "鼓": "Drum (鼓) small drum (鼗), drumming (鼘).",
    "鼠": "Rat (鼠) mole (鼢), bark (鼣), rat (鼤).",
    "鼻": "Nose (鼻) snout (鼼), nose (鼽), nose (鼿).",
    "齊": "Even (齊) vegetarian (齋), minced (齏).",
    "齒": "Tooth (齒) age (齡), childhood (齠), gums (齗).",
    "龍": "Dragon (龍) double dragon (龖), triple dragon (龘).",
    "龜": "Turtle (龜) autumn (龝).",
    "龠": "Flute (龠) music (龣), harmonize (龤)."
}

# --------------------------------------------------------------------------
# 2. HELPER FUNCTIONS
# --------------------------------------------------------------------------
def get_pinyin_for_examples(examples_str):
    """Converts comma/space-separated Chinese examples to 'char(pinyin)' format."""
    if not examples_str or not re.search(r'[\u4e00-\u9fff]', examples_str):
        return ""
    chars = re.split(r'[，,、\s]+', examples_str)
    chars = [c.strip() for c in chars if c and re.match(r'^[\u4e00-\u9fff]+$', c)]
    result = []
    for char in chars:
        py = pinyin(char, style=Style.TONE)[0][0]
        result.append(f"{char}({py})")
    return ", ".join(result)

def extract_radical_data(filepath):
    """Parses a tab-separated radical file and returns a dict keyed by main radical char."""
    data = {}
    if not os.path.exists(filepath):
        print(f"⚠️ Warning: {filepath} not found. Skipping.")
        return data
        
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            parts = [p.strip() for p in line.split('\t')]
            if not parts: continue

            rad_raw = parts[0]
            rad_main = re.sub(r'[^\u4e00-\u9fff]', '', rad_raw)
            rad_main = rad_main[0] if rad_main else rad_raw.split()[0]

            pinyin_val, meaning, examples = '', '', ''
            content = [p for p in parts[1:] if p]
            
            # Heuristic assignment based on typical file structure
            if len(content) >= 3:
                pinyin_val, meaning, examples = content[0], content[1], content[2]
            elif len(content) == 2:
                pinyin_val, meaning = content[0], content[1]
            elif len(content) == 1:
                if re.search(r'[\u4e00-\u9fff]', content[0]):
                    examples = content[0]
                else:
                    meaning = content[0]

            if rad_main not in data:
                data[rad_main] = {'raw': rad_raw, 'pinyin': pinyin_val, 'meaning': meaning, 'examples': examples}
            else:
                # Merge non-empty fields
                d = data[rad_main]
                d['pinyin'] = d['pinyin'] or pinyin_val
                d['meaning'] = d['meaning'] or meaning
                d['examples'] = d['examples'] or examples
    return data

# --------------------------------------------------------------------------
# 3. MAIN PROCESSING
# --------------------------------------------------------------------------
def main():
    file1, file2 = "radicals.txt", "Radicals.txt"
    print(f"📖 Reading {file1}...")
    data1 = extract_radical_data(file1)
    print(f"📖 Reading {file2}...")
    data2 = extract_radical_data(file2)

    # Merge: prioritize file2 for richer examples, fill gaps from file1
    merged = {**data1, **data2}
    for k, v in data1.items():
        if k in merged:
            if not merged[k]['pinyin']: merged[k]['pinyin'] = v['pinyin']
            if not merged[k]['meaning']: merged[k]['meaning'] = v['meaning']

    output_lines = []
    count = 0
    print("🔍 Processing radicals & generating pinyin/mnemonics...")
    
    # Sort by radical stroke count or just keep insertion order (214 standard)
    sorted_radicals = sorted(merged.keys(), key=lambda x: merged[x].get('raw', x))
    
    for rad in sorted_radicals:
        info = merged[rad]
        rad_str = info['raw']
        py = info['pinyin'] or "?"
        meaning = info['meaning'] or "?"
        examples_py = get_pinyin_for_examples(info['examples'])
        mnemonic = MNEMONICS.get(rad, f"[Create story: {rad} ({meaning}) combines to form {examples_py}]")
        
        line = f"{rad_str}\t{py}\t{meaning}\t{examples_py}\t{mnemonic}"
        output_lines.append(line)
        count += 1

    out_file = "combined_radicals.txt"
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(output_lines))
        
    print(f"✅ Successfully processed {count} radicals!")
    print(f"📄 Output saved to: {out_file}")
    print("💡 Format: Radical \\t Pinyin \\t Meaning \\t Examples(pinyin) \\t Mnemonic")

if __name__ == "__main__":
    main()
