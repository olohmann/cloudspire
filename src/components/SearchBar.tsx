import { Search, X } from 'lucide-react';

interface Props {
  query: string;
  onChange: (q: string) => void;
}

export function SearchBar({ query, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-parchment-dark"
      />
      <input
        type="text"
        placeholder="Search rules and talents..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-midnight-dark border border-gold/20 rounded-lg
          text-parchment placeholder:text-parchment-dark/50
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30
          transition-colors"
      />
      {query && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment-dark hover:text-parchment cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
