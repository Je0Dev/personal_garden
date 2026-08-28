import { type Token, toTraditional } from '../lib/transcript';

interface Props {
  cues: Token[][];
  active: number;
  activeToken: number;
  showPinyin: boolean;
  showLevels: boolean;
  fontSize: number;
  fontFamily: string;
  isZh: boolean;
  showTrad: boolean;
  focus: boolean;
  uid: string;
  onSeek: (i: number, j?: number) => void;
}

export default function Transcript({
  cues, active, activeToken, showPinyin, showLevels, fontSize, fontFamily, isZh, showTrad, focus, uid, onSeek,
}: Props) {
  return (
    <div
      className="mt-3 max-h-72 space-y-1 overflow-y-auto pr-2 text-base leading-relaxed"
      style={{ fontSize: `${fontSize}px`, fontFamily }}
    >
      {cues.map((tokens, i) => (
        <p
          id={`${uid}-cue-${i}`}
          key={i}
          onClick={() => onSeek(i)}
          className={`cursor-pointer rounded px-2 py-1 transition-colors hover:bg-moss/20 ${
            i === active ? 'bg-olive-light/10' : 'text-earth-tan'
          } ${focus && i !== active ? 'blur-[2px] opacity-40' : ''}`}
        >
          {tokens.map((t, j) => (
            <span
              key={j}
              onClick={(e) => { e.stopPropagation(); onSeek(i, j); }}
              className={`rounded px-0.5 transition-colors ${
                i === active && j === activeToken ? 'tok-active' : ''
              } ${showLevels ? `lvl-${t.level}` : ''}`}
            >
              {showPinyin ? (
                <ruby>
                  {showTrad ? toTraditional(t.word) : t.word}
                  <rt className="ruby-py">{t.py}</rt>
                </ruby>
              ) : (
                showTrad ? toTraditional(t.word) : t.word
              )}{!isZh ? ' ' : ''}
            </span>
          ))}
        </p>
      ))}
      {!cues.length && <p className="text-text-muted">No subtitles loaded.</p>}
    </div>
  );
}
