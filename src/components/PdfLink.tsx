import { FileText } from 'lucide-react';
import type { PdfReference } from '../types';

interface Props {
  pdfRef: PdfReference;
  onClick: (pdfRef: PdfReference) => void;
}

export function PdfLink({ pdfRef, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(pdfRef)}
      className="inline-flex items-center gap-1.5 text-xs text-teal-light hover:text-gold
        transition-colors cursor-pointer group"
      title={`Open ${pdfRef.doc} at page ${pdfRef.page}`}
    >
      <FileText size={13} />
      <span className="group-hover:underline">{pdfRef.label}</span>
    </button>
  );
}
