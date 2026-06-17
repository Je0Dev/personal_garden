export interface CodeSnippet {
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface Game {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  image?: string;
  new?: boolean;
  status?: string;
  details: {
    features: string[];
    tech: string[];
  };
  codeSnippets?: CodeSnippet[];
}

export interface UpcomingGamePreview {
  features: string[];
  tech: string[];
  codeSnippet?: CodeSnippet;
}

export interface UpcomingGame {
  name: string;
  type: string;
  description: string;
  targetDate: string;
  preview?: UpcomingGamePreview;
}

export const upcomingGames: UpcomingGame[] = [
  {
    name: 'Neon Vault',
    type: 'Game',
    description: 'A 2D infinite runner with procedural biomes, AI enemies, and synthesized audio. Built with vanilla JavaScript — zero external dependencies.',
    targetDate: '2026-09-01T00:00:00',
    preview: {
      features: [
        '4 procedural biomes: Neon City, Cyber Jungle, Void Depth, Solar Flare',
        '4 AI enemy types: Static, Hunter, Diver, Flying — unique behaviors per type',
        'Power-up system: Shield, SlowMo, Score Multiplier, Coins',
        'Combo scoring with multipliers for consecutive skilled play',
        'Unlockable player skins with localStorage persistence',
        'Synthesized audio via Web Audio API — no audio files required',
        'Parallax backgrounds, particle explosions, screen shake effects',
        'Built-in debug mode via ?debug=true for QA',
      ],
      tech: [
        'Vanilla JavaScript ES modules (no framework)',
        'Web Audio API for procedural sound synthesis',
        'Canvas 2D rendering with requestAnimationFrame loop',
        'Pub/Sub EventBus for decoupled service communication',
        'ObjectPool pattern for memory-efficient entity recycling',
        'CSS custom properties for dynamic biome theming',
        'Node.js native test runner (zero-dependency testing)',
        'LocalStorage for save persistence',
      ],
      codeSnippet: {
        title: 'Procedural Biome System',
        description: 'Each biome defines its own visual theme, enemy spawns, and difficulty modifiers. Transitions happen every BIOME_THRESHOLD score points with smooth CSS variable updates.',
        language: 'javascript',
        code: `const biomes = [
  {
    name: 'NEON_CITY',
    bgGradient: ['#050505', '#1a1a1a'],
    groundColor: '#00f3ff',
    obstacleColor: '#ff0055',
    enemyTypes: ['STATIC'],
    speedModifier: 1.0,
  },
  {
    name: 'CYBER_JUNGLE',
    bgGradient: ['#0a1a0a', '#1a3a1a'],
    groundColor: '#00ff41',
    obstacleColor: '#ffaa00',
    enemyTypes: ['STATIC', 'HUNTER'],
    speedModifier: 1.2,
  },
  {
    name: 'VOID_DEPTH',
    bgGradient: ['#1a051a', '#3a1a3a'],
    groundColor: '#ff00ff',
    enemyTypes: ['STATIC', 'HUNTER', 'DIVER'],
    speedModifier: 1.4,
  },
];

update(currentScore) {
  const biomeIndex = Math.min(
    Math.floor(currentScore / BIOME_THRESHOLD),
    biomes.length - 1
  );
  if (biomeIndex !== this.currentBiome) {
    this.currentBiome = biomeIndex;
    this.applyBiomeTheme(biomes[biomeIndex]);
    globalEventBus.emit('BIOME_CHANGE',
      biomes[biomeIndex]);
  }
  return biomes[biomeIndex];
}`,
      },
    },
  },
  {
    name: 'Echoes of the Fallen Kingdom',
    type: 'Game',
    description: 'A text-based RPG with turn-based combat, dynamic world, survival mechanics, and a branching story. Built entirely with Python\'s standard library.',
    targetDate: '2026-10-15T00:00:00',
    preview: {
      features: [
        '3 character classes: Warrior, Mage, Rogue with unique skill trees',
        'Turn-based combat with weakness system and tactical skills',
        'Dynamic day/night cycle with weather affecting gameplay',
        'Survival mechanics: hunger, thirst, stamina, fatigue',
        'Crafting system with 10+ recipes and material gathering',
        'Faction reputation system with branching dialogue',
        '12+ locations with NPCs, quests, and world events',
        'Persistent save/load via file I/O',
      ],
      tech: [
        'Python 3.8+ standard library only (no external deps)',
        'Modular architecture: engine, systems, content, ui layers',
        'Pub/sub event system for game state changes',
        'JSON-based content data for items, NPCs, locations',
        'Comprehensive test suite with unittest',
        'Dynamic time system with environmental effects',
      ],
      codeSnippet: {
        title: 'Turn-Based Combat Engine',
        description: 'Manages combat encounters with enemy AI, damage calculations, weakness multipliers, and loot distribution. Each enemy has unique stats, weaknesses, and loot tables.',
        language: 'python',
        code: `def attack_enemy(self):
    """Player attacks the current enemy."""
    base_damage = self.character.get_attack_power()

    # Check weakness multiplier
    if self.current_enemy['weakness'] == \
       self.character.equipped_weapon_type:
        base_damage = int(base_damage * 1.5)

    # Apply damage
    self.current_enemy['health'] -= base_damage

    # Enemy retaliates if alive
    if self.current_enemy['health'] > 0:
        enemy_damage = self.current_enemy['damage']
        # Weather affects combat
        if self.world.weather == 'stormy':
            enemy_damage = int(enemy_damage * 0.8)
        damage_dealt = self.character.take_damage(
            enemy_damage
        )

        return {
            'player_damage': base_damage,
            'enemy_damage': damage_dealt,
            'enemy_health': max(0,
                self.current_enemy['health']),
        }
    else:
        self.end_combat()
        return {
            'player_damage': base_damage,
            'enemy_damage': 0,
            'enemy_health': 0,
            'victory': True,
            'exp': self.current_enemy['exp'],
            'gold': self.current_enemy['gold'],
        }`,
      },
    },
  },
];

export const games: Game[] = [
  {
    slug: 'translation',
    title: 'Translate Mania',
    description: 'A language learning translation game with multiple modes, power-ups, and spaced repetition. Test your vocabulary across Greek, German, Chinese, and Spanish.',
    tags: ['React', 'TypeScript', 'Language Learning'],
    new: true,
    status: 'Development',
    image: 'https://www.oldbookillustrations.com/site/assets/files/12575/owls-poppies.jpg',
    details: {
      features: [
        '5 languages: Spanish, Greek, English, German, Chinese',
        '4 game modes: Classic, Daily, Practice, Maniac',
        'Power-up system: Hint, Freeze, Skip, Shield, 2x Points, Extra Life',
        '15 shop items with XP-based progression and leveling',
        'TTS pronunciation via Web Speech API for 5 languages',
        'Real-time streak tracking, scoring, and combo multipliers',
        'Speech-to-text integration for spoken answers (Chrome)',
        'Local storage progress persistence with achievements',
        'Procedural sound effects via Web Audio API (no audio files)',
        'API-based translation pipeline with fallback chain',
        'Pinyin romanization support for Chinese questions',
        'Error tracking with review history for missed questions',
      ],
      tech: [
        'React 19 + TypeScript + Vite',
        'framer-motion for smooth game animations',
        'Tailwind CSS with dark theme',
        'Web Speech API (TTS + STT)',
        'MyMemory translation API',
        'localStorage-based progress system',
        'Single-file build via vite-plugin-singlefile (~130 KB gzipped)',
        'Web Audio API procedural sound generation',
        'Google Translate API (pinyin fallback)',
        'XP-based leveling with 15 shop items',
        'Responsive design (mobile-first)',
        'Full error replay & review system',
      ],
    },
    codeSnippets: [
      {
        title: 'Game Timer with Freeze Mechanic',
        description: 'Countdown timer that powers the Maniac mode pressure. Supports freeze (stop timer), skip (move on), and auto-timeout on expiry.',
        language: 'typescript',
        code: `const useGameTimer = (gameState: string, onTimeout: () => void) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerFrozen, setTimerFrozen] = useState(false);

  useEffect(() => {
    if (gameState === 'playing' && !timerFrozen) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            onTimeout();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timerFrozen, onTimeout]);

  const freezeTimer = useCallback(() => setTimerFrozen(true), []);

  return { timeLeft, timerFrozen, startTimer, freezeTimer };
};`,
      },
      {
        title: 'Procedural Sound Effects',
        description: 'All game audio is generated in real-time using the Web Audio API — no audio files needed. Different waveforms create distinct sounds for correct, wrong, power-up, and coin events.',
        language: 'typescript',
        code: `const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain);
gain.connect(ctx.destination);

if (type === 'correct') {
  osc.type = 'sine';
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
} else if (type === 'wrong') {
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}`,
      },
      {
        title: 'XP & Scoring System',
        description: 'Points are calculated from difficulty, streak multiplier, and remaining time. The scoring formula rewards quick correct answers on hard difficulties during long streaks.',
        language: 'typescript',
        code: `const calculatePoints = (
  difficulty: number,
  currentStreak: number,
  time: number
) => {
  return 10 * difficulty
    + Math.floor(currentStreak / 5) * 5
    + time;
};

const updateProgress = (points: number, correct: boolean) => {
  setProgress(prev => ({
    ...prev,
    xp: prev.xp + points,
    totalXp: prev.totalXp + points,
    stats: {
      ...prev.stats,
      correct: prev.stats.correct + (correct ? 1 : 0),
      wrong: prev.stats.wrong + (correct ? 0 : 1),
      totalQuestions: prev.stats.totalQuestions + 1,
      bestStreak: Math.max(prev.stats.bestStreak, streak),
    },
  }));
};`,
      },
      {
        title: 'Translation Pipeline',
        description: 'The game uses MyMemory API for translations with a fallback chain. For non-English pairs, it translates via English as a bridge language. Chinese questions also fetch pinyin romanization.',
        language: 'typescript',
        code: `export async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const langPair = \`\${source}|\${target}\`;
  const url = \`https://api.mymemory.translated.net/get
    ?q=\${encodeURIComponent(text)}
    &langpair=\${encodeURIComponent(langPair)}\`;
  const res = await fetch(url);
  const data = await res.json();
  return data.responseData?.translatedText || text;
}

export async function fetchPinyin(text: string): Promise<string> {
  const url = \`https://translate.googleapis.com/translate_a/single
    ?client=gtx&sl=zh-CN&tl=en&dt=rm
    &q=\${encodeURIComponent(text)}\`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0]?.[1]?.[3] || '';
}`,
      },
      {
        title: 'Hint Power-Up (Option Elimination)',
        description: 'The hint system eliminates 2 wrong answers by cross-referencing the player\'s current options against the correct translation. Uses array filtering and shuffle for random selection.',
        language: 'typescript',
        code: `const useHint = () => {
  if (hints > 0 && !lastAnswerCorrect && currentQuestion) {
    deductItem('hints');
    playSound('powerup');

    const wrong = currentOptions.filter(
      o => o !== currentQuestion.translation
    );
    setEliminatedOptions(
      shuffleArray(wrong).slice(0, 2)
    );
  }
};

// In the UI, eliminated options are dimmed:
{currentOptions.map((option, i) => {
  const isEliminated = eliminatedOptions.includes(option);
  return (
    <button
      key={i}
      disabled={isEliminated}
      className={isEliminated
        ? 'opacity-20 pointer-events-none'
        : 'hover:bg-olive-light'
      }
    >
      {option}
    </button>
  );
})}`,
      },
    ],
  },
];
