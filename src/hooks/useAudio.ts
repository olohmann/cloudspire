import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY_VOLUME = 'cloudspire-volume';
const STORAGE_KEY_PLAYING = 'cloudspire-music-playing';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_PLAYING) === 'true';
  });
  const [volume, setVolumeState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_VOLUME);
    return stored ? parseFloat(stored) : 0.3;
  });

  // Create/recreate audio element when src changes
  useEffect(() => {
    // Remember if we were playing before track change
    const shouldPlay = wasPlayingRef.current || isPlaying;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    if (shouldPlay) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      wasPlayingRef.current = isPlaying;
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    localStorage.setItem(STORAGE_KEY_VOLUME, String(volume));
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
    localStorage.setItem(STORAGE_KEY_PLAYING, String(isPlaying));
  }, [isPlaying]);

  const toggle = useCallback(() => setIsPlaying((p) => !p), []);
  const setVolume = useCallback((v: number) => setVolumeState(v), []);

  return { isPlaying, volume, toggle, setVolume };
}
