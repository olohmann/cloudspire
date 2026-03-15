import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { GameMode, PhaseInfo, Rule, PdfReference } from '../types';
import { RuleCard } from './RuleCard';
import { PhaseIcon } from './PhaseIcon';

interface Props {
  phase: PhaseInfo;
  rules: Rule[];
  activeMode: GameMode;
  showAllModes: boolean;
  query: string;
  onPdfClick: (ref: PdfReference) => void;
  defaultOpen?: boolean;
}

export function RuleSection({ phase, rules, activeMode, showAllModes, query, onPdfClick, defaultOpen = true }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (rules.length === 0) return null;

  return (
    <section id={`phase-${phase.id}`} className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-midnight-light/50 rounded-lg
          hover:bg-midnight-light transition-colors cursor-pointer group"
      >
        <PhaseIcon phase={phase.id} size={18} className="text-gold/70" />
        <h3 className="text-gold text-base font-semibold flex-1 text-left">
          {phase.label}
        </h3>
        <span className="text-xs text-parchment-dark mr-2 tabular-nums">{rules.length}</span>
        <ChevronDown
          size={16}
          className={`text-parchment-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2 ml-2">
          {rules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              activeMode={activeMode}
              showAllModes={showAllModes}
              query={query}
              onPdfClick={onPdfClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
