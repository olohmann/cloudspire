import type { Rule } from '../types';

export const rules: Rule[] = [
  // =====================
  // SETUP
  // =====================
  {
    id: 'setup-islands',
    topic: 'Island Creation',
    phase: 'setup',
    modes: {
      pvp: 'Random isle placement by players.',
      solo: 'Fixed per scenario map.',
      coop: 'Fixed per scenario map.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 9, label: 'Rulebook p.9', highlight: 'Create Your Island', exactMatch: true },
      { doc: 'Solo', page: 6, label: 'Solo p.6', highlight: 'Create Your Island', exactMatch: true },
    ],
    tags: ['setup', 'island', 'map', 'scenario'],
  },
  {
    id: 'setup-landmarks',
    topic: 'Landmarks',
    phase: 'setup',
    modes: {
      pvp: 'Random facedown on Source wells.',
      solo: 'Per scenario legend.',
      coop: 'Per scenario legend.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 10, label: 'Rulebook p.10', highlight: 'Landmark', exactMatch: true },
      { doc: 'Solo', page: 6, label: 'Solo p.6', highlight: 'The Rest', exactMatch: true },
    ],
    tags: ['setup', 'landmarks', 'source wells'],
  },
  {
    id: 'setup-events',
    topic: 'Event Deck',
    phase: 'setup',
    modes: {
      pvp: 'Shuffled, placed near play area.',
      solo: 'Not used.',
      coop: 'Not used.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 11, label: 'Rulebook p.11', highlight: 'Event', exactMatch: true },
      { doc: 'Solo', page: 6, label: 'Solo p.6', highlight: 'event deck', exactMatch: true },
    ],
    tags: ['setup', 'event', 'deck'],
  },
  {
    id: 'setup-relics',
    topic: 'Relic Deck',
    phase: 'setup',
    modes: {
      pvp: 'Full deck.',
      solo: 'Only cards with special icon.',
      coop: 'Only cards with special icon.',
    },
    pdfRefs: [{ doc: 'Solo', page: 6, label: 'Solo p.6', highlight: 'relic deck', exactMatch: true }],
    tags: ['setup', 'relic', 'deck'],
  },
  {
    id: 'setup-market',
    topic: 'Market Options',
    phase: 'setup',
    modes: {
      pvp: 'Players + 1.',
      solo: '3 options.',
      coop: '4 options.',
    },
    pdfRefs: [{ doc: 'Solo', page: 6, label: 'Solo p.6', highlight: 'market chip options', exactMatch: true }],
    tags: ['setup', 'market'],
  },
  {
    id: 'setup-spire-limit',
    topic: 'Spire Limit',
    phase: 'setup',
    modes: {
      pvp: '2 players = 6, 3 players = 5, 4 players = 4.',
      solo: '6 spires.',
      coop: '5 spires.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 13, label: 'Rulebook p.13', highlight: 'Spire Limit', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Spires', exactMatch: true },
    ],
    tags: ['setup', 'spire', 'limit', 'construction'],
  },

  // =====================
  // WAVE PHASES
  // =====================

  // --- Event Phase ---
  {
    id: 'event-mechanism',
    topic: 'Event Mechanism',
    phase: 'event',
    modes: {
      pvp: 'Draw event card (skip Wave 1). Events may alter rules or create side quests.',
      solo: 'Roll event die per scenario. Results are scenario-specific.',
      coop: 'Roll event die per scenario. Results are scenario-specific.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 16, label: 'Rulebook p.16', highlight: 'Event Phase', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Event Phase', exactMatch: true },
    ],
    tags: ['event', 'card', 'die', 'wave'],
  },

  // --- Income Phase ---
  {
    id: 'income-source',
    topic: 'Source Income',
    phase: 'income',
    modes: {
      pvp: 'Wave 1 = 5, Wave 2 = 7, Wave 3 = 9, Wave 4 = 11.',
      solo: 'Per scenario. AI has unlimited Source.',
      coop: 'Per scenario. AI has unlimited Source.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 16, label: 'Rulebook p.16', highlight: 'Income Phase', exactMatch: true },
      { doc: 'Solo', page: 11, label: 'Solo p.11', highlight: 'Income Phase', exactMatch: true },
    ],
    tags: ['income', 'source', 'wave', 'AI'],
  },
  {
    id: 'income-gate-repair',
    topic: 'Gate Repair',
    phase: 'income',
    modes: {
      pvp: 'In 3-4 player games, repair defeated gates after income: remove advancements to restore gate to 3 health, then spend 2 Source per health.',
      solo: 'Same rules apply if a player gate was defeated but the scenario continues.',
      coop: 'Same rules apply if a player gate was defeated but the scenario continues.',
    },
    pdfRefs: [{ doc: 'Reference', page: 16, label: 'Reference p.16', highlight: 'Repairing Your Gate', exactMatch: true }],
    tags: ['income', 'gate', 'repair', 'fortress', 'health'],
  },

  // --- Market Phase ---
  {
    id: 'market-purchases',
    topic: 'Purchases',
    phase: 'market',
    modes: {
      pvp: 'Players take turns, 1 purchase each. Market refreshes at start of each Market Phase (except Wave 1).',
      solo: 'As normal. AI buys highest cost option if instructed.',
      coop: 'As normal. AI buys highest cost option if instructed.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 16, label: 'Rulebook p.16', highlight: 'Market Phase', exactMatch: true },
      { doc: 'Solo', page: 11, label: 'Solo p.11', highlight: 'Market Phase', exactMatch: true },
    ],
    tags: ['market', 'purchase', 'buy', 'AI', 'merc', 'earthscape', 'equipment'],
  },

  // --- Build Phase ---
  {
    id: 'build-spire-construction',
    topic: 'Spire Construction',
    phase: 'build',
    modes: {
      pvp: 'On Source wells within influence. Pay Source cost.',
      solo: 'AI ignores influence restrictions.',
      coop: 'AI ignores influence restrictions.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 17, label: 'Rulebook p.17', highlight: 'Build Phase', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Spires', exactMatch: true },
    ],
    tags: ['build', 'spire', 'construction', 'influence', 'AI'],
  },
  {
    id: 'build-upgrade-capacity',
    topic: 'Upgrade Capacity',
    phase: 'build',
    modes: {
      pvp: 'Enforced. Each upgrade costs Source equal to the number of upgrades on the spire (including the new one).',
      solo: 'AI ignores upgrade capacities on spires.',
      coop: 'AI ignores upgrade capacities on spires.',
    },
    pdfRefs: [{ doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'upgrade capacities', exactMatch: true }],
    tags: ['build', 'upgrade', 'capacity', 'AI'],
  },
  {
    id: 'build-spire-count',
    topic: 'Spire Count Limit',
    phase: 'build',
    modes: {
      pvp: 'Per player count (see Setup).',
      solo: 'AI: no limit. Player: 6.',
      coop: 'AI: no limit. Player: 5.',
    },
    pdfRefs: [{ doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'number of spires', exactMatch: true }],
    tags: ['build', 'spire', 'limit', 'count', 'AI'],
  },
  {
    id: 'build-fortress-advancements',
    topic: 'Fortress Advancements',
    phase: 'build',
    modes: {
      pvp: 'Progressive within each structure, paid with Source. Grants unique abilities and adds to fortress power.',
      solo: 'AI gets them free; no sequential order needed.',
      coop: 'AI gets them free; no sequential order needed.',
    },
    pdfRefs: [{ doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Fortress Advancements', exactMatch: true }],
    tags: ['build', 'fortress', 'advancement', 'upgrade', 'AI'],
  },
  {
    id: 'build-earthscape',
    topic: 'Earthscape Placement',
    phase: 'build',
    modes: {
      pvp: 'Place earthscapes purchased from the market. Must have influence over at least one hex. May immediately construct a spire on its Source wells.',
      solo: 'Same rules. AI typically does not place earthscapes.',
      coop: 'Same rules. AI typically does not place earthscapes.',
    },
    pdfRefs: [{ doc: 'Reference', page: 6, label: 'Reference p.6', highlight: 'Earthscape', exactMatch: true }],
    tags: ['build', 'earthscape', 'influence', 'source well'],
  },

  // --- Prep Phase ---
  {
    id: 'prep-mark',
    topic: 'Mark Selection',
    phase: 'prep',
    modes: {
      pvp: "Opponent's fortress gate.",
      solo: 'Per scenario, may have options. AI marks determined during Prep Phase for the entire wave.',
      coop: 'Per scenario, may have options. AI marks determined during Prep Phase for the entire wave.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 18, label: 'Rulebook p.18', highlight: 'Prep Phase', exactMatch: true },
      { doc: 'Solo', page: 9, label: 'Solo p.9', highlight: 'Marks', exactMatch: true },
    ],
    tags: ['prep', 'mark', 'target', 'fortress', 'gate'],
  },
  {
    id: 'prep-cp',
    topic: 'Command Points (CP)',
    phase: 'prep',
    modes: {
      pvp: 'Wave 1 = 5, Wave 2 = 7, Wave 3 = 9, Wave 4 = 11. Used to select units for deployment.',
      solo: 'Per scenario.',
      coop: 'Per scenario.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 18, label: 'Rulebook p.18', highlight: 'Command Points', exactMatch: true },
      { doc: 'Solo', page: 11, label: 'Solo p.11', highlight: 'Prep Phase', exactMatch: true },
    ],
    tags: ['prep', 'CP', 'command points', 'wave'],
  },
  {
    id: 'prep-units',
    topic: 'Unit Selection & Deployment Stack',
    phase: 'prep',
    modes: {
      pvp: 'Select units from barracks using CP. Stack grouped minions top-down by lowest to highest movement. Heroes placed before or after minions, not between.',
      solo: 'AI stacks defined by scenario. AI may group in ways not normally allowed.',
      coop: 'AI stacks defined by scenario. AI may group in ways not normally allowed.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 18, label: 'Rulebook p.18', highlight: 'Deployment Stack', exactMatch: true },
      { doc: 'Solo', page: 11, label: 'Solo p.11', highlight: 'Prep Phase', exactMatch: true },
    ],
    tags: ['prep', 'unit', 'stack', 'selection', 'deployment', 'group', 'AI'],
  },

  // =====================
  // ONSLAUGHT SUB-PHASES
  // =====================

  // --- Start of Turn ---
  {
    id: 'onslaught-start-campfire',
    topic: 'Campfire Mode',
    phase: 'onslaught-start',
    modes: {
      pvp: 'If only one faction has units in play at the start of a turn, the other faction\'s heroes go into campfire mode (inactive) for the rest of the wave.',
      solo: 'AI heroes campfire when no player units are in play, and vice versa.',
      coop: 'AI heroes campfire when no player units are in play, and vice versa.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 4, label: 'Reference p.4', highlight: 'Campfire Mode', exactMatch: true },
      { doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'campfire mode', exactMatch: true },
    ],
    tags: ['onslaught', 'start', 'campfire', 'hero', 'inactive', 'AI'],
  },
  {
    id: 'onslaught-start-limited-build',
    topic: 'Limited Build Options',
    phase: 'onslaught-start',
    modes: {
      pvp: 'At the start of your turn, you may use up to 2 limited build options: construct or upgrade a spire. Track with fortress pegs.',
      solo: 'AI does not use limited build options.',
      coop: 'AI does not use limited build options.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 12, label: 'Reference p.12', highlight: 'Limited Build Option', exactMatch: true },
      { doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'limited build options', exactMatch: true },
    ],
    tags: ['onslaught', 'start', 'limited', 'build', 'spire', 'construct', 'upgrade'],
  },
  {
    id: 'onslaught-start-talents',
    topic: 'Start-of-Turn Triggers',
    phase: 'onslaught-start',
    modes: {
      pvp: 'Resolve any talents, events, or relics that trigger at the start of your turn (e.g., Healing, Raze, Spawn).',
      solo: 'AI start-of-turn talents still trigger (e.g., Healing, Raze). Check the AI Talent List for specific behavior.',
      coop: 'AI start-of-turn talents still trigger (e.g., Healing, Raze). Check the AI Talent List for specific behavior.',
    },
    pdfRefs: [{ doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'Start of Turn', exactMatch: true }],
    tags: ['onslaught', 'start', 'talent', 'trigger', 'healing', 'raze'],
  },

  // --- Movement ---
  {
    id: 'onslaught-minion-movement',
    topic: 'Minion Movement',
    phase: 'onslaught-movement',
    modes: {
      pvp: 'Must use full movement stat to make progress toward mark. If blocked, use as much movement as possible. If no progress, may make a lateral move.',
      solo: 'AI: must use full movement stat while making maximum progress toward mark.',
      coop: 'AI: must use full movement stat while making maximum progress toward mark.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 20, label: 'Rulebook p.20', highlight: 'Movement', exactMatch: true },
      { doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'Movement', exactMatch: true },
    ],
    tags: ['onslaught', 'movement', 'minion', 'progress', 'AI'],
  },
  {
    id: 'onslaught-hero-movement',
    topic: 'Hero Movement',
    phase: 'onslaught-movement',
    modes: {
      pvp: 'Free choice of direction and distance (up to movement stat). May move before or after minions. May split hero movement around minion movement.',
      solo: 'AI: toward mark. Range heroes only move as close as needed to attack.',
      coop: 'AI: toward mark. Range heroes only move as close as needed to attack.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 9, label: 'Reference p.9', highlight: 'Hero Movement', exactMatch: true },
      { doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'AI heroes move', exactMatch: true },
    ],
    tags: ['onslaught', 'movement', 'hero', 'range', 'AI'],
  },
  {
    id: 'onslaught-lateral-moves',
    topic: 'Lateral Moves',
    phase: 'onslaught-movement',
    modes: {
      pvp: 'Optional when no progress can be made. Must end same distance from mark.',
      solo: 'AI: optional (no closer, no further from mark).',
      coop: 'AI: optional (no closer, no further from mark).',
    },
    pdfRefs: [{ doc: 'Solo', page: 12, label: 'Solo p.12', highlight: 'lateral move', exactMatch: true }],
    tags: ['onslaught', 'movement', 'lateral', 'AI'],
  },
  {
    id: 'onslaught-deployment',
    topic: 'Deployment',
    phase: 'onslaught-movement',
    modes: {
      pvp: 'Units deploy by moving off the fortress gate hex. Units must deploy at earliest opportunity. Heroes are not obligated to deploy onto a hex that doesn\'t connect to their mark.',
      solo: 'Same rules. AI units deploy from their fortress gate as normal.',
      coop: 'Same rules. AI units deploy from their fortress gate as normal.',
    },
    pdfRefs: [{ doc: 'Reference', page: 5, label: 'Reference p.5', highlight: 'Deployment', exactMatch: true }],
    tags: ['onslaught', 'movement', 'deployment', 'fortress', 'gate'],
  },

  // --- Spires Fire ---
  {
    id: 'onslaught-spire-targeting',
    topic: 'Spire Target Selection',
    phase: 'onslaught-spires',
    modes: {
      pvp: 'Opponent\'s spires fire at your units. Each attacking spire chooses a target in range, rolls attack dice equal to attack upgrades.',
      solo: 'AI spire priority: 1) Hero defeat, 2) Minion defeat, 3) Hero damage, 4) Minion damage, 5) Any unit.',
      coop: 'AI spire priority: 1) Hero defeat, 2) Minion defeat, 3) Hero damage, 4) Minion damage, 5) Any unit.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 20, label: 'Rulebook p.20', highlight: 'Spires Fire', exactMatch: true },
      { doc: 'Solo', page: 13, label: 'Solo p.13', highlight: 'Spire Attack Priority', exactMatch: true },
    ],
    tags: ['onslaught', 'spire', 'target', 'priority', 'AI', 'fire', 'dice'],
  },
  {
    id: 'onslaught-spire-damage',
    topic: 'Spire Damage & Retaliation',
    phase: 'onslaught-spires',
    modes: {
      pvp: 'Spires roll attack dice; damage dealt to targeted unit. Units do NOT retaliate against spires. Spires cannot attack landmarks, fortress gates, or units not currently taking their turn.',
      solo: 'Same rules apply.',
      coop: 'Same rules apply.',
    },
    pdfRefs: [{ doc: 'Rulebook', page: 20, label: 'Rulebook p.20', highlight: 'Attacking with Spires', exactMatch: true }],
    tags: ['onslaught', 'spire', 'damage', 'retaliation', 'dice'],
  },

  // --- Exploration ---
  {
    id: 'onslaught-exploration',
    topic: 'Exploration',
    phase: 'onslaught-exploration',
    modes: {
      pvp: 'Units adjacent to unrevealed landmarks may explore: look at facedown side secretly, then choose to reveal or keep facedown. Each landmark explored once per turn.',
      solo: 'AI units do NOT explore.',
      coop: 'AI units do NOT explore.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 21, label: 'Rulebook p.21', highlight: 'Exploration', exactMatch: true },
      { doc: 'Solo', page: 13, label: 'Solo p.13', highlight: 'Exploration', exactMatch: true },
    ],
    tags: ['onslaught', 'exploration', 'landmark', 'AI', 'reveal'],
  },

  // --- Attack ---
  {
    id: 'onslaught-attack-targeting',
    topic: 'Attack Target Selection',
    phase: 'onslaught-attack',
    modes: {
      pvp: 'Player chooses targets. Minions must attack if able. Heroes may choose not to attack.',
      solo: 'AI uses 10-level priority: 1) Fortress gate, 2) Hero defeat, 3) Spire defeat, 4) Faction minion defeat, 5) Landmark minion defeat, 6) Hero damage, 7) Spire damage, 8) Faction minion damage, 9) Landmark minion damage, 10) Any unit.',
      coop: 'AI uses 10-level priority: 1) Fortress gate, 2) Hero defeat, 3) Spire defeat, 4) Faction minion defeat, 5) Landmark minion defeat, 6) Hero damage, 7) Spire damage, 8) Faction minion damage, 9) Landmark minion damage, 10) Any unit.',
    },
    pdfRefs: [{ doc: 'Solo', page: 14, label: 'Solo p.14', highlight: 'AI Unit Attack Priority', exactMatch: true }],
    tags: ['onslaught', 'attack', 'target', 'priority', 'AI'],
  },
  {
    id: 'onslaught-hero-attacks',
    topic: 'Hero Attacks',
    phase: 'onslaught-attack',
    modes: {
      pvp: 'Optional. Heroes may attack adjacent targets. Can interleave hero attacks between minion attacks.',
      solo: 'AI heroes skip attack if no damage would result.',
      coop: 'AI heroes skip attack if no damage would result.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 9, label: 'Reference p.9', highlight: 'Hero Attacks', exactMatch: true },
      { doc: 'Solo', page: 14, label: 'Solo p.14', highlight: 'AI heroes follow', exactMatch: true },
    ],
    tags: ['onslaught', 'attack', 'hero', 'AI'],
  },
  {
    id: 'onslaught-attack-damage',
    topic: 'Damage & Retaliation',
    phase: 'onslaught-attack',
    modes: {
      pvp: 'Damage equal to attack stat dealt to target. Target removes health chips; if health reaches 0, unit is defeated. Target retaliates (deals its attack stat back). Each unit attacks once per turn.',
      solo: 'Same rules apply.',
      coop: 'Same rules apply.',
    },
    pdfRefs: [{ doc: 'Reference', page: 2, label: 'Reference p.2', highlight: 'Attack', exactMatch: true }],
    tags: ['onslaught', 'attack', 'damage', 'retaliation', 'health', 'defeat'],
  },

  // =====================
  // GAME CONCEPTS
  // =====================

  // --- Units & Heroes ---
  {
    id: 'units-hero-vs-minion',
    topic: 'Heroes vs. Minions',
    phase: 'units-heroes',
    modes: {
      pvp: 'Heroes (gold border): free choice in movement and attack, may level up, max 2 in play. Minions (bronze border): must make progress, must attack if able, can be grouped.',
      solo: 'Same distinctions. AI heroes follow modified movement rules (toward mark). AI heroes level up but do NOT promote.',
      coop: 'Same distinctions. AI heroes follow modified movement rules (toward mark). AI heroes level up but do NOT promote.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 9, label: 'Reference p.9', highlight: 'Hero', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Heroes', exactMatch: true },
    ],
    tags: ['hero', 'minion', 'unit', 'gold', 'bronze', 'movement', 'attack'],
  },
  {
    id: 'units-level-up',
    topic: 'Leveling Up',
    phase: 'units-heroes',
    modes: {
      pvp: 'When a hero defeats a unit, spire, or fortress gate, it may level up: add an upgrade chip (if below capacity) or promote to its promoted side.',
      solo: 'AI: level up but do NOT promote. Gain attack upgrade only.',
      coop: 'AI: level up but do NOT promote. Gain attack upgrade only.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 12, label: 'Reference p.12', highlight: 'Level Up', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'level up', exactMatch: true },
    ],
    tags: ['hero', 'level', 'upgrade', 'promote', 'AI'],
  },
  {
    id: 'units-grouping',
    topic: 'Grouping',
    phase: 'units-heroes',
    modes: {
      pvp: 'Stack minions during Prep Phase. Group uses top unit\'s stats and talents. When top unit defeated, next unit revealed with its own health. Heroes may NOT be grouped.',
      solo: 'AI may group in ways not normally allowed by standard rules.',
      coop: 'AI may group in ways not normally allowed by standard rules.',
    },
    pdfRefs: [{ doc: 'Reference', page: 8, label: 'Reference p.8', highlight: 'Group', exactMatch: true }],
    tags: ['group', 'stack', 'minion', 'unit', 'deployment'],
  },
  {
    id: 'units-mercs',
    topic: 'Mercs',
    phase: 'units-heroes',
    modes: {
      pvp: 'Purchased from the market. Heroes (gold), minions (bronze), spires (silver). Merc heroes count toward 2-hero limit. Merc units cost 0 CP. Defeated merc heroes are removed from the game.',
      solo: 'Same rules. AI typically does not purchase mercs unless scenario specifies.',
      coop: 'Same rules. AI typically does not purchase mercs unless scenario specifies.',
    },
    pdfRefs: [{ doc: 'Reference', page: 12, label: 'Reference p.12', highlight: 'Merc', exactMatch: true }],
    tags: ['merc', 'mercenary', 'market', 'hero', 'minion', 'spire', 'purchase'],
  },

  // --- Fortress & Gates ---
  {
    id: 'fortress-gate-health',
    topic: 'Fortress Gate',
    phase: 'fortress-gates',
    modes: {
      pvp: 'Gate starts at 10 health. Gate retaliates for 1 damage (unlimited range) when attacked, even if defeated. Opposing units cannot move onto gate hex.',
      solo: 'Same rules. AI gate damage always goes to gate (not redirected to deployment stack).',
      coop: 'Same rules. AI gate damage always goes to gate (not redirected to deployment stack).',
    },
    pdfRefs: [
      { doc: 'Reference', page: 7, label: 'Reference p.7', highlight: 'Fortress Gate', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Fortress Gates', exactMatch: true },
    ],
    tags: ['fortress', 'gate', 'health', 'retaliation', 'damage'],
  },
  {
    id: 'fortress-damage-redirect',
    topic: 'Damage Redirection',
    phase: 'fortress-gates',
    modes: {
      pvp: 'When gate is attacked and you have a deployment stack, you may redirect attack damage to the topmost unit in the stack instead.',
      solo: 'AI: damage always goes to gate (never redirected).',
      coop: 'AI: damage always goes to gate (never redirected).',
    },
    pdfRefs: [{ doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Fortress Gates', exactMatch: true }],
    tags: ['fortress', 'gate', 'damage', 'redirect', 'deployment', 'AI'],
  },
  {
    id: 'fortress-defeating-gate',
    topic: 'Defeating a Gate',
    phase: 'fortress-gates',
    modes: {
      pvp: '2-player: game ends immediately when one gate is defeated. 3-4 player: play continues if more than one gate remains; defeated player is pillaged.',
      solo: 'AI defeats ANY player gate = immediate loss. ALL AI gates defeated = scenario may end.',
      coop: 'AI defeats ANY player gate = immediate loss. ALL AI gates defeated = scenario may end.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 6, label: 'Reference p.6', highlight: 'End of the Game', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'defeats any', exactMatch: true },
    ],
    tags: ['fortress', 'gate', 'defeat', 'loss', 'win', 'pillage', 'AI'],
  },
  {
    id: 'fortress-power',
    topic: 'Fortress Power',
    phase: 'fortress-gates',
    modes: {
      pvp: 'Gate health + number of fortress advancements. Used to determine winner at end of Wave 4 if no gate was defeated.',
      solo: 'Not used as win condition; scenarios use objectives instead.',
      coop: 'Not used as win condition; scenarios use objectives instead.',
    },
    pdfRefs: [{ doc: 'Reference', page: 8, label: 'Reference p.8', highlight: 'Fortress Power', exactMatch: true }],
    tags: ['fortress', 'power', 'winning', 'advancement'],
  },

  // --- Terrain & Movement ---
  {
    id: 'terrain-types',
    topic: 'Terrain Types',
    phase: 'terrain',
    modes: {
      pvp: '5 types by difficulty: Path (easiest) > Plains > Forest > Mountains > Water (hardest). Units with a terrain allowance icon can traverse that terrain and all easier types. No icon = path only.',
      solo: 'Same terrain rules apply.',
      coop: 'Same terrain rules apply.',
    },
    pdfRefs: [{ doc: 'Reference', page: 19, label: 'Reference p.19', highlight: 'Terrain', exactMatch: true }],
    tags: ['terrain', 'path', 'plains', 'forest', 'mountains', 'water', 'movement'],
  },
  {
    id: 'terrain-blocked',
    topic: 'Blocked Movement',
    phase: 'terrain',
    modes: {
      pvp: 'When a minion is blocked by a unit on its path, it makes as much progress as possible using available movement. Minions may displace friendly heroes.',
      solo: 'AI units follow the same blocking rules. AI units will displace friendly heroes only if it results in more progress.',
      coop: 'AI units follow the same blocking rules. AI units will displace friendly heroes only if it results in more progress.',
    },
    pdfRefs: [{ doc: 'Reference', page: 3, label: 'Reference p.3', highlight: 'Blocked', exactMatch: true }],
    tags: ['terrain', 'blocked', 'movement', 'displace', 'progress'],
  },
  {
    id: 'terrain-influence',
    topic: 'Influence',
    phase: 'terrain',
    modes: {
      pvp: 'You have influence over a hex group if: it\'s adjacent to your fortress gate, contains your spire, or is adjacent to a hex with your spire. Influence required to construct spires and place earthscapes.',
      solo: 'AI ignores influence restrictions for spire construction.',
      coop: 'AI ignores influence restrictions for spire construction.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 10, label: 'Reference p.10', highlight: 'Influence', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'influence restrictions', exactMatch: true },
    ],
    tags: ['influence', 'spire', 'construction', 'earthscape', 'fortress'],
  },

  // --- Source & Economy ---
  {
    id: 'source-capacity',
    topic: 'Source Capacity',
    phase: 'source-economy',
    modes: {
      pvp: 'Default maximum of 20 Source. Any Source gained above capacity is lost. Tracked on fortress Source tracker.',
      solo: 'AI has unlimited Source. Player has normal capacity.',
      coop: 'AI has unlimited Source. Player has normal capacity.',
    },
    pdfRefs: [{ doc: 'Reference', page: 17, label: 'Reference p.17', highlight: 'Source', exactMatch: true }],
    tags: ['source', 'capacity', 'maximum', 'tracker'],
  },
  {
    id: 'source-rewards',
    topic: 'Source & Rewards from Defeats',
    phase: 'source-economy',
    modes: {
      pvp: 'Defeating opposing units/spires grants rewards shown on the chip: Source reward, Spire reward (construct a free spire), or Relic reward (draw a relic card).',
      solo: 'AI does NOT gain rewards from defeats. Player earns rewards normally.',
      coop: 'AI does NOT gain rewards from defeats. Player earns rewards normally.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 16, label: 'Reference p.16', highlight: 'Reward', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Source rewards', exactMatch: true },
    ],
    tags: ['source', 'reward', 'defeat', 'spire', 'relic', 'AI'],
  },

  // --- Upgrades & Spires ---
  {
    id: 'upgrades-types',
    topic: 'Upgrade Types',
    phase: 'upgrades-spires',
    modes: {
      pvp: '3 types: Attack (orange, +1 attack), Range (green, +1 range), Fortification (yellow, absorbs next damage). Spires: upgrades stacked underneath determine stats. Units: upgrades added beneath chip on top of health.',
      solo: 'Same upgrade rules. AI spire upgrades limited only by supply.',
      coop: 'Same upgrade rules. AI spire upgrades limited only by supply.',
    },
    pdfRefs: [{ doc: 'Reference', page: 19, label: 'Reference p.19', highlight: 'Upgrades', exactMatch: true }],
    tags: ['upgrade', 'attack', 'range', 'fortification', 'spire', 'unit'],
  },
  {
    id: 'upgrades-spire-damage',
    topic: 'Damaging Spires',
    phase: 'upgrades-spires',
    modes: {
      pvp: '1+ damage removes the bottom upgrade from a spire. Fortification upgrade requires 2+ damage to remove. No attack upgrades = spire cannot attack. Spires do not retaliate.',
      solo: 'Same rules apply.',
      coop: 'Same rules apply.',
    },
    pdfRefs: [{ doc: 'Reference', page: 18, label: 'Reference p.18', highlight: 'Damaging a Spire', exactMatch: true }],
    tags: ['spire', 'damage', 'upgrade', 'fortification', 'attack'],
  },

  // --- Rewards & Defeat ---
  {
    id: 'rewards-gains',
    topic: 'Reward Types',
    phase: 'rewards',
    modes: {
      pvp: '3 reward types on defeated chips: Source reward (gain Source), Spire reward (construct free spire on defeated hex), Relic reward (draw a relic card). No rewards for defeating your own units.',
      solo: 'AI does NOT gain rewards from defeats.',
      coop: 'AI does NOT gain rewards from defeats.',
    },
    pdfRefs: [
      { doc: 'Reference', page: 16, label: 'Reference p.16', highlight: 'Reward', exactMatch: true },
      { doc: 'Solo', page: 10, label: 'Solo p.10', highlight: 'Source rewards', exactMatch: true },
    ],
    tags: ['reward', 'source', 'spire', 'relic', 'AI', 'defeat'],
  },
  {
    id: 'rewards-defeat-resolution',
    topic: 'Defeat Resolution',
    phase: 'rewards',
    modes: {
      pvp: 'When a unit/spire is defeated: 1) Trigger defeat talents, 2) Clear the hex (unit/spire returned to barracks or discarded), 3) Defeating faction gains reward, 4) Hero that made the kill may level up.',
      solo: 'Same resolution order. AI does not gain rewards.',
      coop: 'Same resolution order. AI does not gain rewards.',
    },
    pdfRefs: [{ doc: 'Reference', page: 5, label: 'Reference p.5', highlight: 'Defeat', exactMatch: true }],
    tags: ['defeat', 'resolution', 'clear', 'reward', 'level up', 'talent'],
  },

  // --- Winning ---
  {
    id: 'winning-condition',
    topic: 'Win Condition',
    phase: 'winning',
    modes: {
      pvp: 'Defeat all opponents\' fortress gates OR have highest fortress power (gate health + advancements) after Wave 4.',
      solo: 'Complete at least 1 of 3 scenario objectives without triggering the loss condition. Each objective completed earns renown.',
      coop: 'Complete at least 1 of 3 scenario objectives without triggering the loss condition. Each objective completed earns renown.',
    },
    pdfRefs: [
      { doc: 'Rulebook', page: 22, label: 'Rulebook p.22', highlight: 'End of the Game', exactMatch: true },
      { doc: 'Solo', page: 9, label: 'Solo p.9', highlight: 'Objectives', exactMatch: true },
    ],
    tags: ['win', 'victory', 'objective', 'fortress', 'power', 'renown'],
  },
  {
    id: 'winning-loss',
    topic: 'Loss Condition (Solo/Co-op)',
    phase: 'winning',
    modes: {
      pvp: 'N/A — PvP has no "loss" condition, only winners and losers.',
      solo: 'AI defeats any player fortress gate = immediate loss. Additional scenario-specific loss conditions may apply.',
      coop: 'AI defeats any player fortress gate = immediate loss. Additional scenario-specific loss conditions may apply.',
    },
    pdfRefs: [{ doc: 'Solo', page: 9, label: 'Solo p.9', highlight: 'Loss', exactMatch: true }],
    tags: ['loss', 'defeat', 'gate', 'scenario', 'objective'],
  },
];
