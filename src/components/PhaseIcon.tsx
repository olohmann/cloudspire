import {
  Settings,
  Dices,
  Coins,
  Store,
  Hammer,
  ClipboardList,
  Play,
  Footprints,
  Zap,
  Compass,
  Swords,
  Shield,
  Castle,
  Mountain,
  Wallet,
  CircleFadingArrowUp,
  Trophy,
  Crown,
  BookOpen,
  BarChart3,
  Search,
  FileText,
} from 'lucide-react';
import type { Phase, SectionId } from '../types';

const iconMap: Record<Phase, typeof Settings> = {
  'setup': Settings,
  'event': Dices,
  'income': Coins,
  'market': Store,
  'build': Hammer,
  'prep': ClipboardList,
  'onslaught-start': Play,
  'onslaught-movement': Footprints,
  'onslaught-spires': Zap,
  'onslaught-exploration': Compass,
  'onslaught-attack': Swords,
  'talents': BookOpen,
  'units-heroes': Shield,
  'fortress-gates': Castle,
  'terrain': Mountain,
  'source-economy': Wallet,
  'upgrades-spires': CircleFadingArrowUp,
  'rewards': Trophy,
  'winning': Crown,
};

const sectionIconMap: Record<SectionId, typeof Settings> = {
  'setup': Settings,
  'wave': Dices,
  'onslaught': Swords,
  'talents': BookOpen,
  'concepts': BookOpen,
};

interface Props {
  phase: Phase;
  className?: string;
  size?: number;
}

export function PhaseIcon({ phase, className = '', size = 16 }: Props) {
  const Icon = iconMap[phase];
  return <Icon size={size} className={className} />;
}

interface SectionIconProps {
  section: SectionId;
  className?: string;
  size?: number;
}

export function SectionIcon({ section, className = '', size = 16 }: SectionIconProps) {
  const Icon = sectionIconMap[section];
  return <Icon size={size} className={className} />;
}

// Re-export commonly used icons for other components
export { BookOpen, BarChart3, Search, FileText };
