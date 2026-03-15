import { useState, useCallback, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

const TRACKS = [
  { src: '/audio/ambience.mp3', name: 'The Medieval Banquet' },
  { src: '/audio/fantasy-overture.mp3', name: 'Fantasy Overture' },
  { src: '/audio/pagan-cross.mp3', name: 'Pagan Cross' },
  { src: '/audio/through-the-woods.mp3', name: 'Through The Woods' },
  { src: '/audio/the-paladins-underworld.mp3', name: "The Paladin's Underworld" },
];

const STORAGE_KEY_TRACK = 'cloudspire-track-index';

export function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_TRACK);
    return stored ? Math.min(parseInt(stored, 10) || 0, TRACKS.length - 1) : 0;
  });
  const [showPicker, setShowPicker] = useState(false);

  const track = TRACKS[trackIndex];
  const { isPlaying, volume, toggle, setVolume } = useAudio(track.src);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRACK, String(trackIndex));
  }, [trackIndex]);

  const nextTrack = useCallback(() => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {/* Track picker dropdown */}
      {showPicker && (
        <div className="absolute bottom-full right-0 mb-2 w-56 bg-midnight-dark/95 backdrop-blur
          border border-gold/20 rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gold/10">
            <span className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold">
              Select Track
            </span>
          </div>
          {TRACKS.map((t, i) => (
            <button
              key={t.src}
              onClick={() => { setTrackIndex(i); setShowPicker(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer
                ${i === trackIndex
                  ? 'bg-gold/15 text-gold'
                  : 'text-parchment-dark hover:bg-midnight-light hover:text-parchment'
                }`}
            >
              {i === trackIndex && '♪ '}{t.name}
            </button>
          ))}
        </div>
      )}

      {/* Player controls */}
      <div className="flex items-center gap-2 bg-midnight-dark/95 backdrop-blur
        border border-gold/20 rounded-full px-3 py-2 shadow-lg">
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-full
            bg-midnight-light hover:bg-gold/20 transition-colors cursor-pointer text-gold"
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={nextTrack}
          className="w-6 h-6 flex items-center justify-center rounded-full
            hover:bg-gold/20 transition-colors cursor-pointer text-parchment-dark hover:text-gold"
          title="Next track"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="text-[10px] text-parchment-dark/70 hover:text-parchment transition-colors
            cursor-pointer max-w-[100px] truncate"
          title={track.name}
        >
          {track.name}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-14 h-1 accent-gold cursor-pointer"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />

        <a
          href="https://www.silvermansound.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] text-parchment-dark/40 hover:text-parchment-dark transition-colors whitespace-nowrap"
          title="Music by Shane Ivers - Silverman Sound (CC BY 4.0)"
        >
          CC BY
        </a>
      </div>
    </div>
  );
}
