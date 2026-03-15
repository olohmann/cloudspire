import type { GameMode, Rule, PdfReference } from '../types';
import { PdfLink } from './PdfLink';
import { highlightMatch } from '../hooks/useSearch';

const modeBadgeStyles: Record<GameMode, string> = {
  pvp: 'bg-pvp/20 text-pvp border-pvp/30',
  solo: 'bg-solo/20 text-solo border-solo/30',
  coop: 'bg-coop/20 text-coop border-coop/30',
};

const modeLabels: Record<GameMode, string> = {
  pvp: 'PvP',
  solo: 'Solo',
  coop: 'Co-op',
};

interface Props {
  rule: Rule;
  activeMode: GameMode;
  showAllModes: boolean;
  query: string;
  onPdfClick: (ref: PdfReference) => void;
}

export function RuleCard({ rule, activeMode, showAllModes, query, onPdfClick }: Props) {
  const hasDifference =
    rule.modes.pvp !== rule.modes.solo ||
    rule.modes.pvp !== rule.modes.coop ||
    rule.modes.solo !== rule.modes.coop;

  const modes: GameMode[] = showAllModes ? ['pvp', 'solo', 'coop'] : [activeMode];

  return (
    <div className="card-parchment rounded-lg p-4 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4
          className="text-gold-light text-sm font-semibold"
          dangerouslySetInnerHTML={{ __html: highlightMatch(rule.topic, query) }}
        />
        {hasDifference && (
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
            Differs
          </span>
        )}
      </div>

      <div className={`space-y-2 ${showAllModes ? '' : ''}`}>
        {modes.map((mode) => (
          <div key={mode} className="flex gap-2">
            {showAllModes && (
              <span
                className={`shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border mt-0.5 ${modeBadgeStyles[mode]}`}
              >
                {modeLabels[mode]}
              </span>
            )}
            <p
              className="text-sm text-parchment/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightMatch(rule.modes[mode], query) }}
            />
          </div>
        ))}
      </div>

      {rule.pdfRefs.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gold/10">
          {rule.pdfRefs.map((ref, i) => (
            <PdfLink key={i} pdfRef={ref} onClick={onPdfClick} />
          ))}
        </div>
      )}
    </div>
  );
}
