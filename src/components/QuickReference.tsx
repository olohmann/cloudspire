import { useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import type { GameMode } from '../types';

interface Props {
  activeMode: GameMode;
}

export function QuickReference({ activeMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-parchment rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-midnight-light/30 transition-colors"
      >
        <BarChart3 size={18} className="text-gold/70" />
        <h3 className="text-gold text-sm font-semibold flex-1 text-left">
          Quick Reference
        </h3>
        <ChevronDown
          size={16}
          className={`text-parchment-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {/* Source Income per Wave */}
          {activeMode === 'pvp' && (
            <div>
              <h4 className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
                Source Income per Wave
              </h4>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                {[
                  { wave: 'W1', value: '5' },
                  { wave: 'W2', value: '7' },
                  { wave: 'W3', value: '9' },
                  { wave: 'W4', value: '11' },
                ].map((w) => (
                  <div key={w.wave} className="bg-midnight-dark rounded p-2">
                    <div className="text-parchment-dark">{w.wave}</div>
                    <div className="text-gold font-semibold text-sm">{w.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CP per Wave */}
          {activeMode === 'pvp' && (
            <div>
              <h4 className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
                Command Points per Wave
              </h4>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                {[
                  { wave: 'W1', value: '5' },
                  { wave: 'W2', value: '7' },
                  { wave: 'W3', value: '9' },
                  { wave: 'W4', value: '11' },
                ].map((w) => (
                  <div key={w.wave} className="bg-midnight-dark rounded p-2">
                    <div className="text-parchment-dark">{w.wave}</div>
                    <div className="text-gold font-semibold text-sm">{w.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMode !== 'pvp' && (
            <div className="text-xs text-parchment-dark italic">
              Source income and CP are per scenario in Solo/Co-op mode. Check your scenario sheet.
            </div>
          )}

          {/* Spire Limits */}
          <div>
            <h4 className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
              Spire Limits
            </h4>
            {activeMode === 'pvp' ? (
              <div className="grid grid-cols-3 gap-1 text-center text-xs">
                {[
                  { players: '2P', limit: '6' },
                  { players: '3P', limit: '5' },
                  { players: '4P', limit: '4' },
                ].map((s) => (
                  <div key={s.players} className="bg-midnight-dark rounded p-2">
                    <div className="text-parchment-dark">{s.players}</div>
                    <div className="text-gold font-semibold text-sm">{s.limit}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 text-center text-xs">
                <div className="bg-midnight-dark rounded p-2">
                  <div className="text-parchment-dark">Player</div>
                  <div className="text-gold font-semibold text-sm">
                    {activeMode === 'solo' ? '6' : '5'}
                  </div>
                </div>
                <div className="bg-midnight-dark rounded p-2">
                  <div className="text-parchment-dark">AI</div>
                  <div className="text-gold font-semibold text-sm">No limit</div>
                </div>
              </div>
            )}
          </div>

          {/* AI Spire Target Priority */}
          {activeMode !== 'pvp' && (
            <div>
              <h4 className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
                AI Spire Target Priority
              </h4>
              <ol className="text-xs text-parchment/90 space-y-1 list-decimal list-inside">
                <li>Defeat a Hero</li>
                <li>Defeat a Minion</li>
                <li>Damage a Hero</li>
                <li>Damage a Minion</li>
                <li>Any unit in range</li>
              </ol>
            </div>
          )}

          {/* Phase Order */}
          <div>
            <h4 className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
              Phase Order
            </h4>
            <div className="text-xs text-parchment/90 space-y-0.5">
              {[
                'Event',
                'Income',
                'Market',
                'Build',
                'Prep',
                'Onslaught (Move → Spires → Explore → Attack)',
              ].map((phase, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gold-dark font-mono">{i + 1}.</span>
                  <span>{phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
