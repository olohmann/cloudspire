import { useState } from 'react';
import { Layers, ChevronRight } from 'lucide-react';
import { NAV_SECTIONS, type Phase, type SectionId } from '../types';
import { PhaseIcon, SectionIcon } from './PhaseIcon';

interface Props {
  activePhase: Phase | null;
  onSelect: (phase: Phase | null) => void;
  ruleCounts: Record<Phase, number>;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activePhase, onSelect, ruleCounts, isOpen, onClose }: Props) {
  const [expandedSections, setExpandedSections] = useState<Record<SectionId, boolean>>({
    setup: true,
    wave: true,
    onslaught: true,
    talents: true,
    concepts: true,
  });

  const toggleSection = (id: SectionId) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-12 left-0 h-[calc(100%-3rem)] w-60 bg-midnight-dark/95 backdrop-blur border-r border-gold/10
          z-50 transform transition-transform duration-300 overflow-y-auto
          lg:static lg:h-auto lg:translate-x-0 lg:z-auto lg:min-h-[calc(100vh-3rem)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-3">
          {/* All Phases button */}
          <button
            onClick={() => {
              onSelect(null);
              onClose();
            }}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer flex items-center gap-2.5 mb-2
              ${activePhase === null ? 'bg-gold/15 text-gold' : 'text-parchment-dark hover:bg-midnight-light hover:text-parchment'}
            `}
          >
            <Layers size={15} className="opacity-70" />
            <span>All Rules</span>
          </button>

          {/* Grouped navigation */}
          {NAV_SECTIONS.map((section) => {
            const isExpanded = expandedSections[section.id];
            const sectionCount = section.phases.reduce(
              (sum, p) => sum + (ruleCounts[p.id] || 0),
              0,
            );
            const hasActiveChild = section.phases.some((p) => p.id === activePhase);

            return (
              <div key={section.id} className="mb-1">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`
                    w-full text-left px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider
                    transition-colors cursor-pointer flex items-center gap-2
                    ${hasActiveChild ? 'text-gold' : 'text-parchment-dark/60 hover:text-parchment-dark'}
                  `}
                >
                  <ChevronRight
                    size={12}
                    className={`transition-transform shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                  />
                  <SectionIcon section={section.id} size={13} className="opacity-60 shrink-0" />
                  <span className="flex-1">{section.label}</span>
                  {sectionCount > 0 && (
                    <span className="text-[10px] text-parchment-dark/40 tabular-nums">{sectionCount}</span>
                  )}
                </button>

                {/* Phase items */}
                {isExpanded && (
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l border-gold/5 pl-2">
                    {section.phases.map((phase) => {
                      const count = ruleCounts[phase.id] || 0;
                      return (
                        <button
                          key={phase.id}
                          onClick={() => {
                            onSelect(phase.id);
                            onClose();
                          }}
                          className={`
                            w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 cursor-pointer
                            ${activePhase === phase.id
                              ? 'bg-gold/15 text-gold'
                              : 'text-parchment-dark hover:bg-midnight-light hover:text-parchment'}
                          `}
                        >
                          <PhaseIcon phase={phase.id} size={14} className="opacity-60 shrink-0" />
                          <span className="flex-1">{phase.label}</span>
                          {count > 0 && (
                            <span className="text-[10px] text-parchment-dark/40 tabular-nums">{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
