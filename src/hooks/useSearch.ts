import { useMemo, useState } from 'react';
import type { Rule, GameMode, Ability } from '../types';

export function useSearch(rules: Rule[], abilities: Ability[], activeMode: GameMode) {
  const [query, setQuery] = useState('');

  const filteredRules = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return rules;

    return rules.filter((rule) => {
      const searchable = [
        rule.topic,
        rule.modes[activeMode],
        ...rule.tags,
      ]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((term) => searchable.includes(term));
    });
  }, [rules, query, activeMode]);

  const filteredAbilities = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return abilities.filter((ability) => {
      const searchable = [
        ability.name,
        ability.description,
        ability.aiDescription || '',
        ...ability.tags,
      ]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((term) => searchable.includes(term));
    });
  }, [abilities, query]);

  return { query, setQuery, filteredRules, filteredAbilities };
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const terms = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (terms.length === 0) return text;
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  return text.replace(regex, '<mark class="bg-gold/30 text-parchment rounded px-0.5">$1</mark>');
}
