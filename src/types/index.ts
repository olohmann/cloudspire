export type GameMode = 'pvp' | 'solo' | 'coop';

export interface PdfReference {
  doc: string;
  page: number;
  label: string;
  /** Text to show in "Look for" hint and optionally search in the PDF */
  highlight?: string;
  /** If true, highlight text matches the PDF verbatim and can be used for in-PDF search */
  exactMatch?: boolean;
}

export interface ModeContent {
  pvp: string;
  solo: string;
  coop: string;
}

export interface Rule {
  id: string;
  topic: string;
  phase: Phase;
  modes: ModeContent;
  pdfRefs: PdfReference[];
  tags: string[];
}

export type Phase =
  // Setup
  | 'setup'
  // Wave Phases
  | 'event'
  | 'income'
  | 'market'
  | 'build'
  | 'prep'
  // Onslaught Sub-phases
  | 'onslaught-start'
  | 'onslaught-movement'
  | 'onslaught-spires'
  | 'onslaught-exploration'
  | 'onslaught-attack'
  // Talents
  | 'talents'
  // Game Concepts
  | 'units-heroes'
  | 'fortress-gates'
  | 'terrain'
  | 'source-economy'
  | 'upgrades-spires'
  | 'rewards'
  | 'winning';

export interface PhaseInfo {
  id: Phase;
  label: string;
}

export type SectionId = 'setup' | 'wave' | 'onslaught' | 'talents' | 'concepts';

export interface NavSection {
  id: SectionId;
  label: string;
  phases: PhaseInfo[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'setup',
    label: 'Setup',
    phases: [
      { id: 'setup', label: 'Game Setup' },
    ],
  },
  {
    id: 'wave',
    label: 'Wave Phases',
    phases: [
      { id: 'event', label: 'Event' },
      { id: 'income', label: 'Income' },
      { id: 'market', label: 'Market' },
      { id: 'build', label: 'Build' },
      { id: 'prep', label: 'Prep' },
    ],
  },
  {
    id: 'onslaught',
    label: 'Onslaught',
    phases: [
      { id: 'onslaught-start', label: 'Start of Turn' },
      { id: 'onslaught-movement', label: 'Movement' },
      { id: 'onslaught-spires', label: 'Spires Fire' },
      { id: 'onslaught-exploration', label: 'Exploration' },
      { id: 'onslaught-attack', label: 'Attack' },
    ],
  },
  {
    id: 'talents',
    label: 'Talents & Abilities',
    phases: [
      { id: 'talents', label: 'All Talents' },
    ],
  },
  {
    id: 'concepts',
    label: 'Game Concepts',
    phases: [
      { id: 'units-heroes', label: 'Units & Heroes' },
      { id: 'fortress-gates', label: 'Fortress & Gates' },
      { id: 'terrain', label: 'Terrain & Movement' },
      { id: 'source-economy', label: 'Source & Economy' },
      { id: 'upgrades-spires', label: 'Upgrades & Spires' },
      { id: 'rewards', label: 'Rewards & Defeat' },
      { id: 'winning', label: 'Winning' },
    ],
  },
];

// Flat list of all phases (for iteration)
export const ALL_PHASES: PhaseInfo[] = NAV_SECTIONS.flatMap((s) => s.phases);

export interface Ability {
  id: string;
  name: string;
  description: string;
  aiDescription?: string;
  pdfRef: PdfReference;
  aiPdfRef?: PdfReference;
  tags: string[];
}

export const PDF_DOCS: Record<string, string> = {
  'Rulebook': 'docs/Rulebook.pdf',
  'Solo': 'docs/Coop and Solo Rules and Scenarios.pdf',
  'Reference': 'docs/Rules Reference.pdf',
  'Sheet': 'docs/Reference Sheet.pdf',
  'Talents': 'docs/Master Talent List.pdf',
  'AI Talents': 'docs/ai/AI Master Talent List.pdf',
};
