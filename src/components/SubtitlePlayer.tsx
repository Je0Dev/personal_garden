import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { parseSubtitles, type Cue } from '../lib/srt-parser';
import { tokenize, detectLang } from '../lib/transcript';
import Transcript from './Transcript';
import MiningTray from './MiningTray';

interface Props {
  videoSrc?: string;
  youtubeId?: string;
  subtitles?: string;
  poster?: string;
}

const FONTS = ['"Noto Sans SC", system-ui, sans-serif', '"KaiTi", "STKaiti", serif', 'serif', 'monospace', 'system-ui, sans-serif'];

const SCHEME: Record<'zh' | 'eu', { bands: { label: string; cls: string }[] }> = {
  zh: { bands: [{ label: 'HSK 1', cls: 'lvl-1' }, { label: 'HSK 3', cls: 'lvl-2' }, { label: 'HSK 6', cls: 'lvl-3' }] },
  eu: { bands: [{ label: 'A1', cls: 'lvl-1' }, { label: 'B1', cls: 'lvl-2' }, { label: 'C1', cls: 'lvl-3' }] },
};

export default function SubtitlePlayer({ videoSrc, youtubeId, subtitles, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytRef = useRef<any>(null);
  const ytEl = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const [cues, setCues] = useState<Cue[]>([]);
  const [active, setActive] = useState(-1);
  const [activeToken, setActiveToken] = useState(-1);
  const [toast, setToast] = useState('');
  const [showPinyin, setShowPinyin] = useState(true);
  const [showLevels, setShowLevels] = useState(false);
  const [wordByWord, setWordByWord] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState(FONTS[0]);
  const [showTrad, setShowTrad] = useState(false);
  const [mined, setMined] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);
  const uid = useId();

  const tokens = useMemo(() => cues.map((c) => tokenize(c.text)), [cues]);
  const lang = useMemo(() => detectLang(cues.slice(0, 20).map((c) => c.text).join(' ')), [cues]);
  const isZh = lang === 'zh';
  useEffect(() => {
    if (subtitles) fetch(subtitles).then((r) => r.text()).then((t) => setCues(parseSubtitles(t)));
  }, [subtitles]);

  function sync(t: number) {
    let idx = cues.findIndex((c) => t >= c.start && t < c.end);
    if (idx === -1) idx = cues.findIndex((c) => t < c.start);
    setActive(idx);
    if (idx >= 0 && wordByWord && lang === 'zh' && tokens[idx]?.length) {
      const toks = tokens[idx];
      const total = toks.reduce((s, x) => s + x.word.length, 0) || 1;
      const pos = Math.min(1, Math.max(0, (t - cues[idx].start) / (cues[idx].end - cues[idx].start))) * total;
      let acc = 0, tok = toks.length - 1;
      for (let k = 0; k < toks.length; k++) { acc += toks[k].word.length; if (pos < acc) { tok = k; break; } }
      setActiveToken((prev) => (prev === tok ? prev : tok));
    } else setActiveToken(-1);
  }
  const syncRef = useRef(sync); useEffect(() => { syncRef.current = sync; });

  useEffect(() => {
    if (!youtubeId || !ytEl.current) return;
    let raf = 0;
    const tick = () => { syncRef.current(ytRef.current?.getCurrentTime?.() || 0); raf = requestAnimationFrame(tick); };
    const start = () => { ytRef.current = new (window as any).YT.Player(ytEl.current, { videoId: youtubeId, events: { onReady: tick } }); };
    const w = window as any;
    if (w.YT?.Player) start();
    else {
      if (!w.__ytApiReady) w.__ytApiReady = new Promise<void>((res) => { const p = w.onYouTubeIframeAPIReady; w.onYouTubeIframeAPIReady = () => { if (typeof p === 'function') p(); res(); }; if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) { const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.body.appendChild(s); } });
      w.__ytApiReady.then(start);
    }
    return () => cancelAnimationFrame(raf);
  }, [youtubeId]);
  function onTime() { if (videoRef.current) syncRef.current(videoRef.current.currentTime); }

  function mine(text: string) { if (!text) return; navigator.clipboard.writeText(text).catch(() => {}); setMined((m) => [...m, text]); setToast(`Mined: ${text.slice(0, 40)}…`); setTimeout(() => setToast(''), 1600); }

  function mineSelection() { const s = window.getSelection(); const t = s?.toString().trim() || ''; if (t && trRef.current?.contains(s.anchorNode)) mine(t); }

  function seek(i: number, j = -1) { const c = cues[i]; if (!c) return; let t = c.start; if (j >= 0 && tokens[i]?.length) { const toks = tokens[i]; const total = toks.reduce((s, x) => s + x.word.length, 0) || 1; let acc = 0; for (let k = 0; k <= j; k++) acc += toks[k].word.length; t = c.start + ((acc - toks[j].word.length / 2) / total) * (c.end - c.start); } if (videoRef.current) { videoRef.current.currentTime = t; videoRef.current.play().catch(() => {}); } else if (ytRef.current?.seekTo) { ytRef.current.seekTo(t, true); ytRef.current.playVideo?.(); } }

  function importFile(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) f.text().then((t) => setCues(parseSubtitles(t))); }
  function jumpToCurrent() { if (active >= 0) document.getElementById(`${uid}-cue-${active}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  const Toggle = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) => (<button onClick={() => set(!on)} className={`rounded border px-2 py-1 text-xs ${on ? 'border-olive-light text-cream' : 'border-moss text-earth-tan'}`}>{label}: {on ? 'on' : 'off'}</button>);

  return (
    <div className="my-8 rounded-xl border border-border bg-deep-forest/40 p-4">
      <div className="overflow-hidden rounded-lg">
        {videoSrc ? (
          <video ref={videoRef} src={videoSrc} poster={poster} controls className="w-full bg-black" onTimeUpdate={onTime} />
        ) : (
          <div ref={ytEl} className="aspect-video w-full bg-black" />
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-earth-tan">
        {isZh && <Toggle on={showPinyin} set={setShowPinyin} label="Pinyin" />}
        {isZh && <Toggle on={wordByWord} set={setWordByWord} label="Word-by-word" />}
        {isZh && <Toggle on={showTrad} set={setShowTrad} label="Traditional" />}
        <Toggle on={showLevels} set={setShowLevels} label="Levels" />
        <Toggle on={focus} set={setFocus} label="Focus" />
        <button onClick={jumpToCurrent} className="rounded border border-moss px-2 py-1 text-xs text-earth-tan hover:border-olive-light">Jump to current</button>
        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="rounded border border-moss bg-bg px-2 py-1 text-xs text-cream">
          {FONTS.map((f) => <option key={f} value={f}>{f.split(',')[0].replace(/"/g, '')}</option>)}
        </select>
        <input type="range" min="12" max="32" value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-20 accent-olive-light" aria-label="Font size" />
        <label className="cursor-pointer rounded border border-moss px-3 py-1 hover:border-olive-light">
          Import .srt/.vtt
          <input type="file" accept=".srt,.vtt" className="hidden" onChange={importFile} />
        </label>
      </div>
      {showLevels && <div className="mt-1 flex gap-3 text-xs text-earth-tan">{SCHEME[lang].bands.map((b, i) => <span key={i} className={`${b.cls} px-1`}>{b.label}</span>)}</div>}
      <div ref={trRef} onMouseUp={mineSelection}>
        <Transcript cues={tokens} active={active} activeToken={activeToken} showPinyin={lang === 'zh' && showPinyin} showLevels={showLevels} fontSize={fontSize} fontFamily={fontFamily} isZh={isZh} showTrad={showTrad} focus={focus} uid={uid} onSeek={seek} />
      </div>
      <MiningTray items={mined} onRemove={(i) => setMined((m) => m.filter((_, k) => k !== i))} onClear={() => setMined([])} />
      {toast && <div className="mt-2 rounded bg-olive-light/20 px-3 py-1 text-sm text-cream">{toast}</div>}
    </div>
  );
}
