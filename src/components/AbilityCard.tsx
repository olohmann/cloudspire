import type { Ability, GameMode, PdfReference } from '../types';
import { PdfLink } from './PdfLink';
import { highlightMatch } from '../hooks/useSearch';

interface Props {
  ability: Ability;
  activeMode: GameMode;
  showAllModes: boolean;
  query: string;
  onPdfClick: (ref: PdfReference) => void;
}

export function AbilityCard({ ability, activeMode, showAllModes, query, onPdfClick }: Props) {
  const isAiMode = activeMode !== 'pvp';
  const hasAiVersion = !!ability.aiDescription;
  const aiDiffers = hasAiVersion && ability.aiDescription !== ability.description;

  // Determine what to show based on mode and toggle
  const showPvp = activeMode === 'pvp' || showAllModes;
  const showAi = (isAiMode || showAllModes) && hasAiVersion;

  return (
    <div className="card-parchment rounded-lg p-4 transition-all duration-200 border-l-4 border-l-teal/50">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4
          className="text-teal-light text-sm font-semibold"
          dangerouslySetInnerHTML={{ __html: highlightMatch(ability.name, query) }}
        />
        <div className="flex items-center gap-1.5 shrink-0">
          {aiDiffers && (
            <span className="text-[10px] uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
              AI Differs
            </span>
          )}
          {hasAiVersion && !aiDiffers && isAiMode && (
            <span className="text-[10px] uppercase tracking-wider text-solo bg-solo/10 px-2 py-0.5 rounded-full border border-solo/20">
              Same
            </span>
          )}
          {!hasAiVersion && isAiMode && (
            <span className="text-[10px] uppercase tracking-wider text-parchment-dark/50 bg-midnight-light px-2 py-0.5 rounded-full border border-parchment-dark/10">
              Player Only
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider text-teal bg-teal/10 px-2 py-0.5 rounded-full border border-teal/20">
            Talent
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {/* PvP / Player description */}
        {showPvp && (
          <div className="flex gap-2">
            {showAllModes && hasAiVersion && (
              <span className="shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border mt-0.5 bg-pvp/20 text-pvp border-pvp/30">
                PvP
              </span>
            )}
            <p
              className="text-sm text-parchment/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightMatch(ability.description, query) }}
            />
          </div>
        )}

        {/* AI description */}
        {showAi && (
          <div className="flex gap-2">
            {showAllModes && (
              <span className="shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border mt-0.5 bg-solo/20 text-solo border-solo/30">
                AI
              </span>
            )}
            {!showAllModes && aiDiffers && (
              <span className="shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border mt-0.5 bg-solo/20 text-solo border-solo/30">
                AI
              </span>
            )}
            <p
              className={`text-sm leading-relaxed ${aiDiffers ? 'text-gold-light' : 'text-parchment/90'}`}
              dangerouslySetInnerHTML={{ __html: highlightMatch(ability.aiDescription!, query) }}
            />
          </div>
        )}

        {/* If in AI mode, not showing all, and no AI version exists */}
        {isAiMode && !showAllModes && !hasAiVersion && (
          <p className="text-sm text-parchment/90 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: highlightMatch(ability.description, query) }} />
            <span className="text-parchment-dark/50 italic ml-1">(player talent only)</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gold/10">
        <PdfLink pdfRef={ability.pdfRef} onClick={(r) => onPdfClick({ ...r, highlight: ability.name, exactMatch: true })} />
        {ability.aiPdfRef && (showAi || isAiMode) && (
          <PdfLink pdfRef={ability.aiPdfRef} onClick={(r) => onPdfClick({ ...r, highlight: ability.name, exactMatch: true })} />
        )}
      </div>
    </div>
  );
}
