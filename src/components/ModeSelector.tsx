import { Swords, User, Users } from 'lucide-react';
import type { GameMode } from '../types';

const modes: { id: GameMode; label: string; icon: typeof Swords; color: string; activeColor: string }[] = [
  { id: 'pvp', label: 'PvP', icon: Swords, color: 'border-pvp/30 text-pvp/80', activeColor: 'bg-pvp text-white border-pvp' },
  { id: 'solo', label: 'Solo', icon: User, color: 'border-solo/30 text-solo/80', activeColor: 'bg-solo text-white border-solo' },
  { id: 'coop', label: 'Co-op', icon: Users, color: 'border-coop/30 text-coop/80', activeColor: 'bg-coop text-white border-coop' },
];

interface Props {
  active: GameMode;
  onChange: (mode: GameMode) => void;
}

export function ModeSelector({ active, onChange }: Props) {
  return (
    <div className="flex gap-0.5 p-0.5 bg-midnight/60 rounded-md">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`
              px-3 py-1 rounded text-xs font-semibold
              border transition-all duration-200 cursor-pointer
              flex items-center justify-center gap-1.5
              ${active === mode.id ? mode.activeColor : `${mode.color} bg-transparent hover:bg-midnight-light`}
            `}
          >
            <Icon size={13} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
