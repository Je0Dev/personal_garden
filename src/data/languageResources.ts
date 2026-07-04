export type ResourceType = "Video" | "Podcast" | "Reading" | "App" | "Tools" | "Grammar" | "AI" | "Translation";

export interface ResourceDetails {
  why: string;
  bestFor: string;
  level: string;
  price: string;
  pros: string[];
  cons: string[];
}

export interface Resource {
  name: string;
  desc: string;
  url: string;
  type: ResourceType;
  details?: ResourceDetails;
}

export interface LanguageResources {
  title: string;
  flag: string;
  color: string;
  hex: string;
  resources: Resource[];
}

export interface VideoGuide {
  title: string;
  excerpt: string;
  videoUrl: string;
  tags: string[];
  keyPoints?: string[];
}

export const videoGuides: VideoGuide[] = [
  {
    title: "How to Start Learning German",
    excerpt: "A comprehensive guide to starting your German learning journey with spaced repetition and comprehensible input.",
    videoUrl: "https://www.youtube.com/embed/7jP9Aw88h2Y",
    tags: ["German", "Beginner", "Resources"],
    keyPoints: [
      "Start with Nicos Weg on DW — free A1–B1 structured course with exercises",
      "Use Anki for daily vocabulary spaced repetition (10 new cards/day)",
      "Consume 30 minutes of Easy German or Slow German podcasts daily",
      "Focus on input over output for the first 3 months",
      "Set a habit streak — consistency beats intensity every time",
      "Join r/German and Discord communities for accountability"
    ]
  },
  {
    title: "Mastering English: Beyond Grammar",
    excerpt: "How to achieve advanced English proficiency through immersion and natural acquisition.",
    videoUrl: "https://www.youtube.com/embed/E6588DlZW-c",
    tags: ["English", "Advanced", "Immersion"],
    keyPoints: [
      "Switch all device interfaces to English for passive immersion",
      "Read The Economist, BBC News, or similar daily (15 min minimum)",
      "Watch TED Talks with English subtitles — replay 2-3 times per talk",
      "Practice shadowing: repeat native speakers aloud in real time",
      "Keep a digital vocabulary journal with example sentences, not translations",
      "Write daily journal entries and run them through DeepL Write for feedback"
    ]
  },
  {
    title: "The Spanish Odyssey: A Journey to Fluency",
    excerpt: "From basic greetings to complex conversations in Spanish using the CI method.",
    videoUrl: "https://www.youtube.com/embed/83y55TVK09E",
    tags: ["Spanish", "Intermediate", "CI Method"],
    keyPoints: [
      "Dreaming Spanish is the gold standard — track 300+ hours of CI",
      "Start with superbeginner videos even if you know some Spanish",
      "Use Hoy Hablamos podcast for intermediate listening practice",
      "Read Spanish in Levels articles graded by CEFR level",
      "Avoid translating in your head — think in Spanish from day one",
      "Set measurable milestones: 50h, 150h, 300h of pure listening"
    ]
  },
  {
    title: "The Mandarin Mission: Conquering Chinese Characters",
    excerpt: "A roadmap for mastering Hanzi, tones, and Chengyu idioms.",
    videoUrl: "https://www.youtube.com/embed/v_VUa80gMf0",
    tags: ["Chinese", "Mandarin", "HSK", "Characters"],
    keyPoints: [
      "Master pinyin and tones before touching characters — this is non-negotiable",
      "HelloChinese is the best free app for absolute beginners (A0–A2)",
      "Use DuChinese graded readers daily — tap any word for instant definition",
      "Learn radicals first: 214 building blocks make character memorization 10x easier",
      "Spaced repetition for characters: 5 new per day is sustainable long-term",
      "Watch Little Fox Chinese stories for beginner listening practice"
    ]
  },
  {
    title: "German: Sprich mit uns — Vorstellen, Smalltalk & Konversation (A2–B1)",
    excerpt: "Natural German conversation practice with a teacher and learner — introductions, questions, and small talk for everyday life.",
    videoUrl: "https://www.youtube.com/embed/xGNs0lCEPn4",
    tags: ["German", "Conversation", "A2", "B1"],
    keyPoints: [
      "Practice introducing yourself — name, origin, profession in natural German",
      "Learn how to ask follow-up questions to keep conversations flowing",
      "Master small talk phrases for everyday social situations",
      "Includes free PDF vocabulary list and common mistake corrections",
      "Dialogues combine all three topics into realistic role-play",
      "Perfect prep for Goethe and Telc speaking exams"
    ]
  },
  {
    title: "60 Minutes of Easy German Dialogues — Real Conversations (A1–A2)",
    excerpt: "Fifty short, practical German dialogues covering daily life: ordering food, asking directions, shopping, small talk, and more.",
    videoUrl: "https://www.youtube.com/embed/TkXwcO747ws",
    tags: ["German", "Conversation", "Dialogues", "A1", "A2"],
    keyPoints: [
      "Practice real-life scenarios: bakery, doctor, job interview, train station, and more",
      "Learn natural conversation flow with shadow-and-repeat technique",
      "Hear the intonation and rhythm of authentic spoken German",
      "Covers essential phrases for travel, work, and daily errands",
      "Ideal for building listening comprehension from A1 to A2",
      "Use alongside Anki to memorize the most useful dialogue phrases"
    ]
  },
  {
    title: "German: 100+ Questions & Answers with Essential Verbs (A1–B1)",
    excerpt: "Build speaking confidence with over 100 everyday questions and answers using the most important German verbs.",
    videoUrl: "https://www.youtube.com/embed/bV2jhdkFZFc",
    tags: ["German", "Speaking", "Vocabulary", "A1", "B1"],
    keyPoints: [
      "Practice responding naturally to common question words: was, wo, wann, warum, wie, welche",
      "Focus on high-frequency verbs for daily situations and routines",
      "Listen-repeat method builds muscle memory for pronunciation",
      "Ideal for learners who freeze when asked questions in conversation",
      "Covers A1 through B1 level, progressing in complexity",
      "Use alongside Anki to cement the most useful verb-question pairs"
    ]
  },
  {
    title: "Speak English in 30 Minutes — Advanced English Lesson",
    excerpt: "Immerse yourself in clear American English covering the top mistakes learners make and essential pronunciation secrets.",
    videoUrl: "https://www.youtube.com/embed/Iv4F-YV0TxY",
    tags: ["English", "Advanced", "Pronunciation", "Fluency"],
    keyPoints: [
      "Avoid the 5 most common grammar mistakes that even advanced learners make",
      "Master 5 American English pronunciation secrets: linking, reductions, and rhythm",
      "Learn 30 essential phrasal verbs for natural conversation",
      "Free PDF worksheet included for active practice",
      "Shadow the speaker aloud to train your mouth muscles",
      "Ideal for B2–C1 learners aiming for native-like fluency"
    ]
  },
  {
    title: "Real English Conversation — Advanced English Lesson",
    excerpt: "A natural, unscripted advanced English conversation covering reading habits, vocabulary acquisition, and fluency strategies.",
    videoUrl: "https://www.youtube.com/embed/iRKGHkY-u50",
    tags: ["English", "Advanced", "Conversation", "Fluency"],
    keyPoints: [
      "Hear natural back-and-forth dialogue at native speed with clear enunciation",
      "Learn what to read to maximize vocabulary growth across different domains",
      "Discover how to retain new words through contextual repetition",
      "Understand the difference between active and passive vocabulary",
      "Practice noticing discourse markers that make speech flow naturally",
      "Transcript-style captions help you catch every word"
    ]
  },
  {
    title: "Read the News With Me — Advanced English Vocabulary & Grammar",
    excerpt: "Read a real news article together, breaking down advanced vocabulary, grammar structures, and natural expressions.",
    videoUrl: "https://www.youtube.com/embed/tM60VPCBAOs",
    tags: ["English", "Advanced", "Vocabulary", "News"],
    keyPoints: [
      "Learn 33 advanced words and phrases from a real news article",
      "Understand how news English differs from conversational English",
      "Practice reading comprehension at native speed with full breakdown",
      "Focus on collocations and fixed expressions used by journalists",
      "Free PDF lesson guide with all vocabulary and example sentences",
      "Build the habit of reading English news daily for natural acquisition"
    ]
  },
  {
    title: "Learn Spanish at a Real Picnic — Real-Life Comprehensible Input",
    excerpt: "Follow along at a real outdoor picnic with slow, clear Spanish designed for beginner and intermediate comprehension.",
    videoUrl: "https://www.youtube.com/embed/LXVj7lFo4fM",
    tags: ["Spanish", "Comprehensible Input", "Beginner", "Intermediate"],
    keyPoints: [
      "Learn food, nature, and outdoor vocabulary through real visual context",
      "Hear slow, clear Spanish spoken naturally without translation crutch",
      "Understand without translating — the core principle of comprehensible input",
      "Perfect bridge between classroom Spanish and real-life conversations",
      "Practice listening to connected speech at a learner-friendly pace",
      "Use the visual clues to infer meaning just like a child acquires language"
    ]
  },
  {
    title: "Learn Spanish While I Do My Makeup — Easy Comprehensible Input",
    excerpt: "Relaxed intermediate Spanish lesson with real-time commentary on makeup, products, and daily routines.",
    videoUrl: "https://www.youtube.com/embed/t0CNKRhEiag",
    tags: ["Spanish", "Intermediate", "Comprehensible Input", "Daily Life"],
    keyPoints: [
      "Learn beauty and personal care vocabulary in an authentic context",
      "Hear natural sentence flow with clear, deliberate enunciation",
      "Understand how native speakers describe processes and sequences",
      "Pick up everyday expressions you won't find in textbooks",
      "Visual demonstrations make every word immediately comprehensible",
      "Great for intermediate learners who want real, unscripted content"
    ]
  },
  {
    title: "Dreaming Spanish: Discovering Korea's Most Modern District",
    excerpt: "Join Shel from Dreaming Spanish exploring Gangnam, Seoul — pure comprehensible input with zero English.",
    videoUrl: "https://www.youtube.com/embed/LDYXb-3Be0s",
    tags: ["Spanish", "Beginner", "Dreaming Spanish", "Travel"],
    keyPoints: [
      "100% Spanish immersion — no English, no translations, just real input",
      "Learn technology and city vocabulary through contextual storytelling",
      "Discover Korean culture through Spanish — two languages in one video",
      "Beginner-friendly pace with clear visuals supporting every word",
      "Part of Dreaming Spanish's structured roadmap with tracked watch time",
      "Ideal for learners following the pure comprehensible input method"
    ]
  },
  {
    title: "VLOG in Chinese — Just a Random Day in My Life",
    excerpt: "Follow Grace through a typical day in Taiwan with natural Mandarin vlogging about food, exercise, and daily routines.",
    videoUrl: "https://www.youtube.com/embed/29P9QAv3h8Y",
    tags: ["Chinese", "Mandarin", "VLOG", "Intermediate", "Listening"],
    keyPoints: [
      "Hear natural, unscripted Taiwanese Mandarin with authentic flow",
      "Learn daily life vocabulary: food descriptions, exercise, routines",
      "Chinese subtitles throughout — read along as you listen",
      "Exposed to regional vocabulary differences (Taiwan vs. China)",
      "Vlog format keeps engagement high while training your ear",
      "Intermediate level: understand the gist first, then re-watch for detail"
    ]
  },
  {
    title: "The Pig Butchering Scam — Mandarin Chinese Podcast (Upper Intermediate)",
    excerpt: "A deep-dive discussion about one of China's biggest modern scams, with natural unscripted Mandarin conversation.",
    videoUrl: "https://www.youtube.com/embed/WA9CCC1Apys",
    tags: ["Chinese", "Mandarin", "Advanced", "Podcast", "Listening"],
    keyPoints: [
      "Long-form unscripted conversation at natural speed with clear enunciation",
      "Learn contemporary Chinese vocabulary around technology, crime, and society",
      "Understand how native speakers structure arguments and opinions",
      "Dual subtitles: Chinese characters with English translations available",
      "Excellent for upper-intermediate learners ready for real content",
      "Downloadable PDF transcript for deep study and shadowing practice"
    ]
  },
  {
    title: "100% Chinese Listening Challenge — Understand More Than You Expect",
    excerpt: "Pure Chinese immersion: listen to natural speech about language learning strategies and gradually build comprehension.",
    videoUrl: "https://www.youtube.com/embed/Q2MUzqjYZEg",
    tags: ["Chinese", "Mandarin", "Listening", "Beginner", "Intermediate"],
    keyPoints: [
      "Challenge yourself to understand Chinese without pausing or translating",
      "Covers practical language learning tips — meta-learning in Chinese",
      "Spoken at a measured pace with clear articulation throughout",
      "Chinese subtitles help bridge listening and reading skills",
      "Build confidence by noticing how much you already understand",
      "From ShuoshuoChinese — one of the most popular Mandarin channels"
    ]
  },
];

export const languageResources: LanguageResources[] = [
  {
    title: "General",
    flag: "🌍",
    color: "border-olive-light",
    hex: "#8b9b6b",
    resources: [
      { name: "AnkiWeb", desc: "Spaced repetition flashcards (web version)", url: "https://apps.ankiweb.net/", type: "App", details: { why: "The undisputed king of spaced repetition — free, open-source, and infinitely customizable.", bestFor: "Daily vocabulary retention across any language", level: "All levels", price: "Free (desktop) / $25 one-time (iOS)", pros: ["Highly customizable card types and templates", "Community-shared decks for every language", "Syncs across all devices", "Open-source with active development"], cons: ["Steep learning curve for advanced features", "Official iOS app is paid", "Design feels dated"] } },
      { name: "Forvo", desc: "The largest pronunciation dictionary in the world", url: "https://forvo.com/", type: "Tools", details: { why: "Hear words pronounced by native speakers from all over the world — invaluable for correct pronunciation.", bestFor: "Checking pronunciation of specific words", level: "All levels", price: "Free (basic) / Premium removes ads", pros: ["Recordings from actual native speakers", "Covers rare and regional pronunciations", "Download audio for offline use", "Free tier is very usable"], cons: ["Inconsistent audio quality", "No structured learning path", "Website design is cluttered"] } },
      { name: "WordReference", desc: "Comprehensive bilingual dictionaries", url: "https://www.wordreference.com/", type: "Translation", details: { why: "The most reliable online dictionary — far more accurate than Google Translate for individual words.", bestFor: "Getting accurate translations with usage context", level: "All levels", price: "Free", pros: ["Detailed usage notes and examples", "Forum discussions for nuanced questions", "Conjugation tables built-in", "Fast and no-nonsense interface"], cons: ["Limited language pairs", "No full-sentence translation", "App is basic"] } },
      { name: "Reverso Context", desc: "Translations in context with real-life examples", url: "https://context.reverso.net/translation/", type: "Translation", details: { why: "Shows how words and phrases are actually used in real sentences — not just dictionary definitions.", bestFor: "Understanding usage through real examples", level: "A2–C1", price: "Free (limited) / Premium $9/mo", pros: ["Real examples from books, media, and transcripts", "Bilingual sentence pairs side by side", "Supports 15+ language pairs", "Contextual understanding beats dictionaries"], cons: ["Some examples are machine-translated", "Premium needed for offline access", "Not a complete learning tool on its own"] } },
      { name: "DeepL", desc: "World's most accurate translator", url: "https://www.deepl.com/en/translator", type: "Translation", details: { why: "Produces the most natural-sounding translations of any machine translator — often indistinguishable from human.", bestFor: "Translating full sentences and paragraphs with high accuracy", level: "All levels", price: "Free (limited) / Pro $8.99/mo", pros: ["Most natural translations of any AI translator", "Preserves formatting in documents", "Glossary feature for consistent terminology", "Supports 30+ languages"], cons: ["Limited free tier (1,500 chars per translation)", "Not all language pairs are equally good", "Requires internet connection"] } },
      { name: "NotebookLM", desc: "Google's AI notebook for organizing learning materials", url: "https://notebooklm.google.com/", type: "AI", details: { why: "Upload your textbooks, articles, or notes and get AI-powered summaries, study guides, and Q&A.", bestFor: "Processing and organizing language learning materials", level: "B1–C2", price: "Free", pros: ["Upload any PDF or text as learning source", "Generates study guides automatically", "Ask questions about your specific materials", "Sources are grounded — no hallucination"], cons: ["Limited to uploaded source material", "No direct language practice features", "Google account required"] } },
      { name: "Quizlet", desc: "Simple flashcards and study sets", url: "https://quizlet.com/", type: "App", details: { why: "Quick and easy flashcard creation with gamified study modes — great for vocabulary drilling.", bestFor: "Quick vocabulary review with gamified features", level: "All levels", price: "Free (limited) / Plus $7.99/mo", pros: ["Very easy to create study sets", "Multiple study modes (match, test, learn)", "Huge library of community sets", "Mobile apps for on-the-go study"], cons: ["Spaced repetition is behind paywall", "Less customizable than Anki", "Ads on free version"] } },
    ]
  },
  {
    title: "German",
    flag: "🇩🇪",
    color: "border-tomato",
    hex: "#c45c3e",
    resources: [
      { name: "Nicos Weg", desc: "DW's beginner series with interactive lessons", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "Video", details: { why: "The gold standard for beginner German — structured like a TV show with integrated exercises.", bestFor: "Absolute beginners starting from zero", level: "A1–B1", price: "Free", pros: ["Story-driven narrative keeps you engaged", "Built-in exercises reinforce each lesson", "Professional production quality", "Covers all key beginner grammar"], cons: ["Can feel slow for intermediate learners", "Limited speaking practice", "Video-only — no live tutoring"] } },
      { name: "Easy German", desc: "Street interviews and grammar explanations", url: "https://www.youtube.com/@easygerman", type: "Video", details: { why: "Real street German with subtitles — bridges the gap between textbook and natural speech.", bestFor: "Building listening comprehension with authentic content", level: "A2–C1", price: "Free (YouTube) / Patreon for extras", pros: ["Real native speakers, natural pace", "German & English subtitles on all videos", "Covers grammar explicitly", "Fun cultural topics"], cons: ["Not a structured course", "Some episodes lack depth", "Patreon required for transcripts"] } },
      { name: "Slow German", desc: "Podcast with transcripts by Annik Rubens", url: "https://slowgerman.com/", type: "Podcast", details: { why: "Clear, slow-paced German for learners — ideal for commuting.", bestFor: "Listening practice on the go", level: "A2–B2", price: "Free (with paid transcripts)", pros: ["Slow, clear articulation", "Transcripts available", "Covers cultural topics", "Short episodes (10–15 min)"], cons: ["Not interactive", "Limited vocabulary range", "Can feel unnatural compared to real speech"] } },
      { name: "Nachrichten Leicht", desc: "Simple news articles in easy German", url: "https://www.nachrichtenleicht.de/", type: "Reading", details: { why: "Real news rewritten in simple German — stay informed while learning.", bestFor: "Daily reading habit building", level: "A2–B1", price: "Free", pros: ["Real news, simplified language", "Updated daily", "Short, manageable articles", "Audio version available"], cons: ["Limited archive depth", "No translation support", "B2+ learners may find it too simple"] } },
      { name: "Lingolia German", desc: "Comprehensive grammar explanations and exercises", url: "https://deutsch.lingolia.com/de/", type: "Grammar", details: { why: "The clearest grammar explanations I've found — each topic has exercises with immediate feedback.", bestFor: "Structured grammar study with practice exercises", level: "A1–B2", price: "Free (basic) / Premium €12/yr", pros: ["Topics organized by CEFR level", "Clear explanations with color-coded examples", "Immediate exercise feedback", "Very affordable premium"], cons: ["Basic interface design", "Limited vocabulary/content beyond grammar", "German-only explanations at higher levels"] } },
      { name: "Projekt Gutenberg", desc: "Free German classic literature", url: "https://projekt-gutenberg.org/", type: "Reading", details: { why: "Thousands of classic German texts — free and legal — for when you're ready to tackle real literature.", bestFor: "Advanced reading practice with authentic texts", level: "B2–C2", price: "Free", pros: ["Massive library of German classics", "All texts are public domain and free", "No registration required", "Download as EPUB or PDF"], cons: ["Only classic literature (no modern content)", "No learner aids or translations", "Outdated website design"] } },
      { name: "Dict.cc", desc: "Crowdsourced translation dictionary", url: "https://www.dict.cc/", type: "Translation", details: { why: "The go-to dictionary for German learners — comprehensive, fast, and community-driven.", bestFor: "Quick German word lookups with usage examples", level: "All levels", price: "Free", pros: ["Huge database of German translations", "Audio pronunciations by native speakers", "Verb conjugation tables built-in", "Offline app available"], cons: ["Some entries are user-submitted (less reliable)", "Interface is dated", "Ads on free version"] } },
      { name: "Anki Decks", desc: "Shared vocabulary decks for all levels", url: "https://ankiweb.net/shared/decks/german", type: "Tools", details: { why: "Thousands of pre-made German decks shared by the community — save hours of card creation.", bestFor: "Ready-made vocabulary for Anki", level: "All levels", price: "Free", pros: ["Thousands of decks for every level", "Covers vocabulary, grammar, and phrases", "Download and start reviewing immediately", "Most decks are high quality"], cons: ["Quality varies between decks", "No quality control on uploads", "Need Anki desktop to browse and download"] } },
    ]
  },
  {
    title: "Spanish",
    flag: "🇪🇸",
    color: "border-amber",
    hex: "#c4915a",
    resources: [
      { name: "Dreaming Spanish", desc: "CI method from beginner to advanced", url: "https://www.dreamingspanish.com/", type: "Video", details: { why: "Pure comprehensible input — the closest thing to immersion without traveling.", bestFor: "Developing natural listening fluency", level: "Superbeginner–Advanced", price: "Free (limited) / Premium $8/mo", pros: ["100% target language (no English)", "Structured roadmap with hours tracked", "Huge library of videos by level", "Premium gives full access + sorting tools"], cons: ["No grammar explanations", "Requires patience — results take 300+ hours", "Speaking not directly practiced", "Premium needed for full experience"] } },
      { name: "Hoy Hablamos", desc: "Intermediate podcast with transcripts", url: "https://www.hoyhablamos.com/", type: "Podcast", details: { why: "Daily Spanish podcast for intermediate learners with full transcripts.", bestFor: "Daily listening habit at intermediate level", level: "B1–B2", price: "Free (basic) / Premium €5/mo", pros: ["Daily episodes keep consistency", "Transcripts included", "Natural speaking pace", "Covers current events & culture"], cons: ["Not for beginners", "Premium required for transcripts", "Can be Spain-centric"] } },
      { name: "Spanish in Levels", desc: "Reading materials for all levels", url: "https://spanishinlevels.com/", type: "Reading", details: { why: "Graded reading with integrated vocabulary — learn words in context.", bestFor: "Building reading comprehension gradually", level: "A1–B2", price: "Free", pros: ["Organized by CEFR levels", "Click any word for translation", "Audio narration included", "Short, daily-updated articles"], cons: ["Limited content at higher levels", "Basic interface design", "No mobile app"] } },
      { name: "SpanishDict Vocabulary", desc: "Curated vocabulary lists and flashcards", url: "https://www.spanishdict.com/vocabulary", type: "Tools", details: { why: "Pre-built vocabulary lists organized by topic with built-in flashcard functionality — zero setup required.", bestFor: "Topic-based vocabulary building with instant practice", level: "A1–B2", price: "Free", pros: ["Curated lists by theme and difficulty", "Integrated flashcard mode with spaced repetition", "Example sentences for every word", "Audio pronunciations by native speakers"], cons: ["No grammar explanations", "Lists can feel rigid compared to Anki", "Ads on the free version"] } },
      { name: "Lingolia Spanish", desc: "Spanish grammar and exercises", url: "https://www.lingolia.com/de/", type: "Grammar", details: { why: "Clear, well-structured grammar explanations with exercises that give instant feedback.", bestFor: "Filling grammar gaps with focused practice", level: "A1–B2", price: "Free (basic) / Premium €12/yr", pros: ["Grammar topics organized by CEFR level", "Exercises with immediate correction", "Concise explanations without fluff", "Very affordable premium tier"], cons: ["Interface is basic", "No speaking or listening practice", "German UI can be confusing"] } },
      { name: "SpanishDict", desc: "Dictionary, conjugator, and translations", url: "https://www.spanishdict.com/", type: "Translation", details: { why: "The most comprehensive Spanish-English dictionary online — conjugation tables, example sentences, and pronunciation.", bestFor: "Quick lookups with full context and verb conjugations", level: "All levels", price: "Free", pros: ["Complete verb conjugation tables", "Millions of example sentences", "Audio pronunciation by dialect (Spain/Mexico)", "Fast and mobile-friendly"], cons: ["Not a structured course", "Some user translations are unreliable", "Limited offline functionality"] } },
      { name: "Fluent with Stories", desc: "Learning through engaging stories", url: "https://www.fluentwithstories.com/stories/es", type: "Reading", details: { why: "Short, engaging stories with built-in translation — read naturally without stopping to look up words.", bestFor: "Story-based reading immersion", level: "A2–B1", price: "Free", pros: ["Click any word for instant translation", "Short stories you can finish in one sitting", "Audio narration included", "Stories are genuinely interesting"], cons: ["Limited library size", "No progress tracking", "Basic design"] } },
    ]
  },
  {
    title: "Chinese",
    flag: "🇨🇳",
    color: "border-rust",
    hex: "#b85c38",
    resources: [
      { name: "HelloChinese", desc: "Beginner app with tone training", url: "https://www.hellochinese.cc/", type: "App", details: { why: "The best free app for absolute beginner Mandarin — gamified and effective.", bestFor: "Complete beginners learning pinyin & tones", level: "A0–A2", price: "Free (with optional paid content)", pros: ["Excellent tone training with voice recognition", "Gamified progression keeps motivation high", "Covers characters, grammar, and culture", "Clean, modern interface"], cons: ["Limited advanced content", "Some features behind paywall", "Only for beginners"] } },
      { name: "DuChinese", desc: "Graded stories for Chinese learners", url: "https://duchinese.net/lessons", type: "Reading", details: { why: "The best graded reader library for Chinese — essential for character recognition.", bestFor: "Building character reading fluency", level: "A1–C1", price: "Free (limited) / Premium $12/mo", pros: ["Stories organized by HSK level", "Tap any word for instant definition", "Audio narration by native speakers", "New lessons added weekly"], cons: ["Premium required for full access", "No grammar explanations", "Limited traditional character support"] } },
      { name: "YoYo Chinese", desc: "Video-based courses and materials", url: "https://yoyochinese.com/courses", type: "Video", details: { why: "Engaging video lessons with a native speaker who explains Chinese in a clear, accessible way.", bestFor: "Structured video learning with cultural context", level: "A1–B1", price: "Free (limited) / Full access $29/mo", pros: ["Entertaining teacher makes lessons enjoyable", "Clear pinyin and character displays", "Covers tones and pronunciation thoroughly", "Built-in review system"], cons: ["Can be pricey for full access", "Video quality varies (older lessons)", "Limited advanced content"] } },
      { name: "Little Fox Chinese", desc: "Stories and songs for beginners", url: "https://chinese.littlefox.com/en", type: "Video", details: { why: "Animated stories designed specifically for Chinese learners — like a children's show you can understand.", bestFor: "Beginner-friendly animated immersion", level: "A0–A2", price: "Free", pros: ["Animated stories keep learners engaged", "Graduated difficulty levels", "Subtitles in Chinese and English", "Downloadable worksheets"], cons: ["Geared toward younger audiences", "Limited content for intermediate+", "No grammar explanations"] } },
      { name: "Pinyin Chart", desc: "Interactive Mandarin pronunciation tool", url: "https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table", type: "Tools", details: { why: "Every possible pinyin syllable with native audio — essential for mastering tones.", bestFor: "Mastering pinyin pronunciation and tones", level: "A0–A1", price: "Free", pros: ["All pinyin combinations with audio", "Click any syllable to hear it", "Tone pair drills included", "No account needed"], cons: ["Pronunciation practice only", "No vocabulary or sentences", "Limited to beginner use"] } },
      { name: "AllSet Learning Grammar", desc: "The definitive Chinese grammar wiki", url: "https://resources.allsetlearning.com/chinese/grammar/", type: "Grammar", details: { why: "The most comprehensive Chinese grammar reference online — structured by level with example sentences.", bestFor: "Understanding Chinese grammar structures", level: "A1–B2", price: "Free", pros: ["Grammar points organized by CEFR/HSK level", "Thousands of example sentences", "Comparisons of similar structures", "Community-contributed corrections"], cons: ["Reference only — no exercises", "Website design is basic", "Can be overwhelming for beginners"] } },
      { name: "Mandarin Companion", desc: "Graded readers for intermediate learners", url: "https://mandarincompanion.com/", type: "Reading", details: { why: "Abridged adaptations of classics using only the most common characters — read real books from chapter one.", bestFor: "Building character fluency through real books", level: "A2–B1", price: "$10–$15 per book", pros: ["Limited vocabulary per level ensures accessibility", "Real stories adapted from classics", "Audio recordings included with books", "Proven graded reader methodology"], cons: ["Books cost money", "Limited number of titles", "Not a complete course"] } },
      { name: "YellowBridge", desc: "Chinese-English dictionary and tools", url: "https://www.yellowbridge.com/chinese/dictionary.php", type: "Translation", details: { why: "Deep dictionary with character etymology, stroke order animations, and example sentences.", bestFor: "Deep character lookups with etymology and stroke order", level: "All levels", price: "Free", pros: ["Character etymology and decomposition", "Stroke order animations", "Example sentences for every word", "Flashcard creation built-in"], cons: ["Busy website with ads", "No mobile app", "Outdated interface design"] } },
      { name: "Bilibili", desc: "Chinese video platform with diverse content", url: "https://www.bilibili.com/", type: "Video", details: { why: "The Chinese YouTube — immerse yourself in content made by natives for natives.", bestFor: "Authentic immersion with Chinese internet culture", level: "B1–C2", price: "Free (with paid membership)", pros: ["Real Chinese content for all interests", "Dual-subtitle feature on many videos", "Danmaku (comment overlay) for cultural immersion", "Massive library of authentic material"], cons: ["No learner tools or translation", "Requires intermediate+ level", "Chinese interface only", "Can be overwhelming"] } },
    ]
  },
  {
    title: "English",
    flag: "🇬🇧",
    color: "border-olive",
    hex: "#6b7b4b",
    resources: [
      { name: "TED Talks", desc: "Ideas worth spreading in English", url: "https://www.ted.com/talks", type: "Video", details: { why: "High-quality talks with transcripts in multiple languages — perfect for advanced learners.", bestFor: "Advanced listening + vocabulary in context", level: "B2–C2", price: "Free", pros: ["Diverse topics keep it interesting", "Interactive transcripts with timestamp sync", "Subtitles in 100+ languages", "Downloadable for offline viewing"], cons: ["Too advanced for beginners", "Speaker pace varies widely", "Not structured for learning"] } },
      { name: "BBC Learning English", desc: "Comprehensive free English courses", url: "https://www.bbc.co.uk/learningenglish", type: "App", details: { why: "British English at its best — structured courses from a trusted source.", bestFor: "Structured self-study with clear progression", level: "A1–C1", price: "Free", pros: ["Professionally designed curriculum", "Covers grammar, vocab, pronunciation", "Regularly updated with current events", "Includes quizzes and worksheets"], cons: ["British English only", "Website design feels dated", "No personalized feedback"] } },
      { name: "The Economist", desc: "Podcasts and articles for advanced learners", url: "https://www.economist.com/podcasts", type: "Podcast", details: { why: "World-class journalism with sophisticated vocabulary — the gold standard for advanced English.", bestFor: "Advanced vocabulary acquisition through real-world content", level: "B2–C2", price: "Free (limited articles) / Full access ~$15/mo", pros: ["Exposure to high-level academic vocabulary", "Podcasts with transcripts included", "Broad range of global topics", "Audio versions of all articles"], cons: ["Paywalled after a few free articles", "Too advanced for intermediate learners", "Dense writing can be exhausting"] } },
      { name: "Lingolia English", desc: "Grammar explanations and exercises", url: "https://english.lingolia.com/en/", type: "Grammar", details: { why: "Straightforward grammar explanations with exercises — ideal for targeting specific weak areas.", bestFor: "Focused grammar practice with clear explanations", level: "A1–B2", price: "Free (basic) / Premium €12/yr", pros: ["CEFR-level organized grammar topics", "Exercises with instant feedback", "Clear, concise explanations", "Very affordable premium"], cons: ["Only covers grammar", "Basic interface", "No speaking or listening practice"] } },
      { name: "YouGlish", desc: "Use YouTube for pronunciation context", url: "https://youglish.com/", type: "Tools", details: { why: "Hear any word pronounced in real YouTube videos — see how natives actually say it in context.", bestFor: "Hearing real-world pronunciation of specific words", level: "All levels", price: "Free", pros: ["Real native speaker examples from YouTube", "Filter by US, UK, or Australian accent", "See the word used in context", "Slow playback option available"], cons: ["Not a structured learning tool", "Video quality varies", "Requires internet connection"] } },
      { name: "Cambridge Dict.", desc: "Definitions with audio examples", url: "https://dictionary.cambridge.org/", type: "Tools", details: { why: "The most authoritative learner's dictionary — clear definitions, IPA transcriptions, and real audio.", bestFor: "Accurate word definitions with pronunciation", level: "All levels", price: "Free", pros: ["Clear definitions at multiple English levels", "UK and US audio pronunciations included", "Grammar labels and collocations", "Example sentences for every definition"], cons: ["No spaced repetition features", "Can be slow to load", "Limited language pairs"] } },
      { name: "6 Minute English", desc: "BBC learning podcast episodes", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", type: "Podcast", details: { why: "Short, focused episodes on interesting topics — perfect for daily listening without commitment.", bestFor: "Daily listening practice in short bursts", level: "B1–B2", price: "Free", pros: ["Short episodes fit any schedule", "Transcripts available for all episodes", "Covers current and cultural topics", "Key vocabulary explained at the end"], cons: ["Not a full course", "British English only", "Episodes are not sequential"] } },
    ]
  },
];

export interface AnkiDeckDetails {
  description: string;
  cardCount: string;
  difficulty: string;
  includes: string[];
}

export interface AnkiDeck {
  name: string;
  file: string;
  lang: string;
  size: string;
  color: string;
  details: AnkiDeckDetails;
  tags: string[];
  exists: boolean;
  new?: boolean;
  image?: string;
}

export const ankiDecks: AnkiDeck[] = [
  { name: "Spanish Core 1k", file: "Spanish core 1k vocab deck.apkg", lang: "Spanish", size: "202 MB", color: "border-amber", image: `${import.meta.env.BASE_URL}images/thylacine-wolf.jpg`, tags: ["Spanish", "Vocabulary", "Anki"], exists: true, details: { description: "1000 most frequent Spanish words with example sentences, audio, and images. Based on frequency analysis of native media.", cardCount: "1,000 cards", difficulty: "Beginner–Intermediate", includes: ["Frequency-ordered vocabulary", "Native audio on every card", "Example sentences from real media", "Memory hooks and mnemonics"] } },
  { name: "Refold Mandarin 1k", file: "Refold Mandarin 1k Simplified.apkg", lang: "Chinese", size: "102 MB", color: "border-rust", image: `${import.meta.env.BASE_URL}images/alpaca-wolf.jpg`, tags: ["Chinese", "Mandarin", "Vocabulary", "Anki"], exists: false, details: { description: "First 1000 words from the Refold Mandarin roadmap using simplified characters. Covers core vocabulary for daily life.", cardCount: "1,000 cards", difficulty: "Beginner", includes: ["Simplified Chinese characters", "Pinyin romanization on all cards", "Native speaker audio recordings", "Sentence-level context examples"] } },
  { name: "Chinese Radicals", file: "radicals.apkg", lang: "Chinese", size: "2.7 MB", color: "border-rust", image: `${import.meta.env.BASE_URL}images/battle-beaux-belles.jpg`, tags: ["Chinese", "Characters", "Anki"], exists: true, details: { description: "All 214 Kangxi radicals with meanings, examples, and stroke order — the building blocks of every Chinese character.", cardCount: "214 cards", difficulty: "Absolute Beginner", includes: ["All 214 Kangxi radicals", "Radical meanings and variations", "Stroke order diagrams", "Example characters per radical"] } },
  { name: "Class Notes", file: "class_notes.apkg", lang: "Chinese", size: "3.4 MB", color: "border-rust", image: `${import.meta.env.BASE_URL}images/mantchurian-crane.jpg`, tags: ["Chinese", "Class Notes", "Anki"], exists: true, new: true, details: { description: "Personal class notes from Chinese lessons — vocabulary, grammar points, and example sentences covered in tutoring sessions.", cardCount: "~150 cards", difficulty: "Beginner–Intermediate", includes: ["Personal class vocabulary", "Grammar patterns from lessons", "Example sentences from tutoring", "Custom mnemonics and notes"] } },
];

export interface PdfFile {
  name: string;
  file: string;
  size: string;
  desc: string;
  tags: string[];
  exists: boolean;
  new?: boolean;
}

export const pdfFiles: PdfFile[] = [
  { name: "Language Learning Links", file: "resources/languages/language learning links.pdf", size: "PDF", desc: "A curated collection of the best language learning resources — websites, apps, podcasts, and YouTube channels organized by language.", tags: ["Language Learning", "Resources", "Guide"], exists: true, new: true },
  { name: "German Grammar Reference", file: "resources/languages/german-grammar-reference.pdf", size: "PDF", desc: "Complete German grammar reference organized by CEFR level A1–B2, covering cases, tenses, word order, adjective declension, and more.", tags: ["German", "Grammar", "Reference"], exists: false },
];

export interface UpcomingItemPreview {
  cardCount?: string;
  difficulty?: string;
  includes?: string[];
  pageCount?: string;
  topics?: string[];
  language?: string;
  codePreview?: string;
  features?: string[];
}

export interface UpcomingItem {
  name: string;
  type: 'Anki Deck' | 'PDF Guide' | 'Script';
  description: string;
  targetDate?: string;
  preview?: UpcomingItemPreview;
}

export interface UpcomingRelease {
  targetDate: string;
  items: UpcomingItem[];
}

export const upcomingRelease: UpcomingRelease = {
  targetDate: '2026-07-15T00:00:00',
  items: [
    {
      name: 'Spanish Core 2k',
      type: 'Anki Deck',
      description: 'Next 2000 most frequent Spanish words with example sentences and native audio.',
      targetDate: '2026-07-15T00:00:00',
      preview: {
        cardCount: '2,000 cards',
        difficulty: 'Beginner–Intermediate',
        includes: [
          '2000 frequency-ordered Spanish words',
          'Native speaker audio on every card',
          'Example sentences from real media',
          'Memory hooks and mnemonics',
          'Part-of-speech tags for grammar',
          'Regional variants (Spain/Mexico/Argentina)',
        ],
      },
    },
    {
      name: 'German Grammar Reference',
      type: 'PDF Guide',
      description: 'Complete German grammar reference organized by CEFR level A1–B2.',
      targetDate: '2026-08-01T00:00:00',
      preview: {
        pageCount: '~120 pages',
        topics: [
          'Noun genders & der-die-das rules',
          'Case system: nominative, accusative, dative, genitive',
          'Verb conjugation across all tenses',
          'Separable and inseparable prefix verbs',
          'Preposition cases and two-way prepositions',
          'Word order: main clauses, subordinate, inverted',
          'Adjective declension patterns',
          'Modal verbs and their meanings',
        ],
      },
    },
    {
      name: 'extract_vocab.py',
      type: 'Script',
      description: 'HSK vocabulary extractor from PDF textbooks with OCR fallback.',
      targetDate: '2026-08-15T00:00:00',
      preview: {
        language: 'python',
        codePreview: `import pdfplumber
import re
from collections import Counter

def extract_vocab(pdf_path: str, hsk_level: int) -> list[dict]:
    """Extract HSK-level vocabulary from a PDF textbook."""
    vocab: list[dict] = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            # Find Chinese-english pairs like:
            # 你好 (nǐ hǎo) - hello
            pairs = re.findall(
                r'([\\u4e00-\\u9fff]+)\s*'
                r'\\(([^)]+)\\)\s*[-–]\\s*(.+)',
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
    },
  ],
};
