import { useMemo, useState } from 'react';
import { Menu, BookOpen, Filter, Sun, Moon } from 'lucide-react';
import type { GameMode, Phase, PdfReference } from './types';
import { ALL_PHASES, NAV_SECTIONS } from './types';
import { rules } from './data/rules';
import { abilities } from './data/abilities';
import { useSearch } from './hooks/useSearch';
import { useTheme } from './hooks/useTheme';
import { ModeSelector } from './components/ModeSelector';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { RuleSection } from './components/RuleSection';
import { AbilityCard } from './components/AbilityCard';
import { QuickReference } from './components/QuickReference';
import { PdfViewer } from './components/PdfViewer';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const [activeMode, setActiveMode] = useState<GameMode>('pvp');
  const [activePhase, setActivePhase] = useState<Phase | null>(null);
  const [showAllModes, setShowAllModes] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePdf, setActivePdf] = useState<PdfReference | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { query, setQuery, filteredRules, filteredAbilities } = useSearch(rules, abilities, activeMode);

  const isTalentsView = activePhase === 'talents';

  const displayedRules = useMemo(() => {
    if (isTalentsView) return [];
    if (!activePhase) return filteredRules;
    return filteredRules.filter((r) => r.phase === activePhase);
  }, [filteredRules, activePhase, isTalentsView]);

  const displayedAbilities = useMemo(() => {
    if (isTalentsView) {
      const q = query.toLowerCase().trim();
      if (!q) return abilities;
      return filteredAbilities;
    }
    return filteredAbilities;
  }, [isTalentsView, query, abilities, filteredAbilities]);

  const ruleCounts = useMemo(() => {
    const counts = {} as Record<Phase, number>;
    for (const phase of ALL_PHASES) {
      if (phase.id === 'talents') {
        counts[phase.id] = abilities.length;
      } else {
        counts[phase.id] = filteredRules.filter((r) => r.phase === phase.id).length;
      }
    }
    return counts;
  }, [filteredRules, abilities]);

  const groupedBySection = useMemo(() => {
    const sections: {
      section: (typeof NAV_SECTIONS)[number];
      groups: { phase: (typeof ALL_PHASES)[number]; rules: typeof displayedRules }[];
    }[] = [];

    for (const section of NAV_SECTIONS) {
      const groups: { phase: (typeof ALL_PHASES)[number]; rules: typeof displayedRules }[] = [];
      for (const phase of section.phases) {
        const phaseRules = displayedRules.filter((r) => r.phase === phase.id);
        if (phaseRules.length > 0) {
          groups.push({ phase, rules: phaseRules });
        }
      }
      if (groups.length > 0) {
        sections.push({ section, groups });
      }
    }
    return sections;
  }, [displayedRules]);

  const hasResults = groupedBySection.length > 0 || displayedAbilities.length > 0;

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
      />
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-midnight/85' : 'bg-midnight/70'}`} />

      {/* Top header bar — spans full width */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-midnight-dark/90 backdrop-blur border-b border-gold/15">
        <div className="flex items-center gap-3 px-4 h-12">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-parchment-dark hover:text-parchment cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-gold font-display text-base font-bold tracking-widest uppercase">
            Cloudspire
          </h1>
          <span className="text-parchment-dark/40 text-xs hidden sm:inline">
            Rules Reference
          </span>
          <div className="flex-1" />
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded hover:bg-midnight-light text-parchment-dark hover:text-gold cursor-pointer transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <ModeSelector active={activeMode} onChange={setActiveMode} />
        </div>
      </header>

      {/* Layout: sidebar + content */}
      <div className="relative flex pt-12">
        <Sidebar
          activePhase={activePhase}
          onSelect={setActivePhase}
          ruleCounts={ruleCounts}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {/* Sticky search bar */}
          <div className="sticky top-12 z-20 bg-midnight-dark/80 backdrop-blur border-b border-gold/10">
            <div className="px-4 py-2.5 max-w-4xl mx-auto">
              <SearchBar query={query} onChange={setQuery} />
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-2 text-xs text-parchment-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAllModes}
                    onChange={(e) => setShowAllModes(e.target.checked)}
                    className="accent-gold"
                  />
                  Show all modes side-by-side
                </label>
                {activePhase && (
                  <button
                    onClick={() => setActivePhase(null)}
                    className="flex items-center gap-1 text-xs text-teal-light hover:text-gold transition-colors cursor-pointer"
                  >
                    <Filter size={12} />
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6 max-w-4xl mx-auto">
            <QuickReference activeMode={activeMode} />

            {/* Ability results */}
            {displayedAbilities.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 px-4 py-3 bg-teal/10 rounded-lg mb-2">
                  <BookOpen size={18} className="text-teal-light/70" />
                  <h3 className="text-teal-light text-base font-semibold flex-1">
                    Talents / Abilities
                  </h3>
                  <span className="text-xs text-parchment-dark">{displayedAbilities.length}</span>
                </div>
                <div className="space-y-2 ml-2">
                  {displayedAbilities.map((ability) => (
                    <AbilityCard
                      key={ability.id}
                      ability={ability}
                      activeMode={activeMode}
                      showAllModes={showAllModes}
                      query={query}
                      onPdfClick={setActivePdf}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rule results grouped by section */}
            <div className="mt-6 space-y-6">
              {groupedBySection.length > 0 ? (
                groupedBySection.map(({ section, groups }) => (
                  <div key={section.id}>
                    {!activePhase && (
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-parchment-dark/40 mb-3 px-1">
                        {section.label}
                      </h2>
                    )}
                    <div className="space-y-2">
                      {groups.map(({ phase, rules }) => (
                        <RuleSection
                          key={phase.id}
                          phase={phase}
                          rules={rules}
                          activeMode={activeMode}
                          showAllModes={showAllModes}
                          query={query}
                          onPdfClick={setActivePdf}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : !hasResults ? (
                <div className="text-center py-16 text-parchment-dark">
                  <p className="text-lg mb-2">No rules or abilities found.</p>
                  <p className="text-sm">Try a different search term or clear the filter.</p>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>

      <PdfViewer pdfRef={activePdf} onClose={() => setActivePdf(null)} />
      <MusicPlayer />
    </div>
  );
}
