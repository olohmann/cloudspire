import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { X, FileText, Search, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Highlighter } from 'lucide-react';
import type { PdfReference } from '../types';
import { PDF_DOCS } from '../types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Props {
  pdfRef: PdfReference | null;
  onClose: () => void;
}

export function PdfViewer({ pdfRef, onClose }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState(true);
  const [highlightOn, setHighlightOn] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Reset state when pdfRef changes
  useEffect(() => {
    if (pdfRef) {
      setPageNumber(pdfRef.page);
      setLoading(true);
      setHighlightOn(true);
    }
  }, [pdfRef]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const clearHighlights = useCallback(() => {
    if (!pageRef.current) return;
    const textLayer = pageRef.current.querySelector('.react-pdf__Page__textContent');
    if (!textLayer) return;
    textLayer.querySelectorAll('span').forEach((span) => {
      span.style.backgroundColor = '';
      span.style.borderRadius = '';
      span.style.mixBlendMode = '';
    });
  }, []);

  const applyHighlights = useCallback(() => {
    if (!pdfRef?.highlight || !pageRef.current) return;
    const textLayer = pageRef.current.querySelector('.react-pdf__Page__textContent');
    if (!textLayer) return;

    const searchLower = pdfRef.highlight.toLowerCase();
    const spans = Array.from(textLayer.querySelectorAll('span'));
    if (spans.length === 0) return;

    const markSpan = (span: HTMLElement) => {
      span.style.backgroundColor = 'rgba(197, 150, 58, 0.35)';
      span.style.borderRadius = '2px';
      span.style.mixBlendMode = 'multiply';
    };

    // Simple approach: check each span individually first
    let found = false;
    for (const span of spans) {
      const text = (span.textContent || '').toLowerCase();
      if (text.includes(searchLower)) {
        markSpan(span);
        found = true;
      }
    }
    if (found) return;

    // Multi-span approach: build char-offset map using raw text lengths
    const spanTexts = spans.map((s) => s.textContent || '');
    const spanStarts: number[] = [];
    let pos = 0;
    for (const t of spanTexts) {
      spanStarts.push(pos);
      pos += t.length;
    }
    const allTextLower = spanTexts.join('').toLowerCase();

    // Find matches in the concatenated text
    let searchFrom = 0;
    while (true) {
      const idx = allTextLower.indexOf(searchLower, searchFrom);
      if (idx === -1) break;
      const matchEnd = idx + searchLower.length;
      // Mark overlapping spans
      for (let i = 0; i < spans.length; i++) {
        const sStart = spanStarts[i];
        const sEnd = sStart + spanTexts[i].length;
        if (sEnd > idx && sStart < matchEnd) {
          markSpan(spans[i]);
        }
      }
      searchFrom = idx + 1;
    }
  }, [pdfRef?.highlight]);

  // Apply or clear highlights when toggle changes
  useEffect(() => {
    if (highlightOn) {
      applyHighlights();
    } else {
      clearHighlights();
    }
  }, [highlightOn, applyHighlights, clearHighlights]);

  // Watch for text layer spans to appear, then apply highlights.
  // onRenderSuccess fires before the text layer is populated,
  // so we use a MutationObserver to detect when spans are added.
  useEffect(() => {
    if (!highlightOn || !pdfRef?.highlight || !pageRef.current) return;

    const observer = new MutationObserver(() => {
      const textLayer = pageRef.current?.querySelector('.react-pdf__Page__textContent');
      if (textLayer && textLayer.querySelectorAll('span').length > 0) {
        applyHighlights();
        observer.disconnect();
      }
    });

    observer.observe(pageRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pageNumber, highlightOn, pdfRef?.highlight, applyHighlights]);

  // Scroll to top of page when page changes
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageNumber]);

  if (!pdfRef) return null;

  const pdfPath = PDF_DOCS[pdfRef.doc];
  if (!pdfPath) return null;

  const url = `/${pdfPath.split('/').map(encodeURIComponent).join('/')}`;
  const highlight = pdfRef.highlight;

  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(3, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.2));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl h-[90vh] bg-midnight-dark rounded-xl border border-gold/20 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gold/10 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <FileText size={16} className="text-gold/70 shrink-0" />
            <h3 className="text-gold text-sm font-medium truncate">
              {pdfRef.doc}
            </h3>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-1">
            <button onClick={prevPage} disabled={pageNumber <= 1}
              className="p-1.5 rounded hover:bg-midnight-light disabled:opacity-30 text-parchment-dark hover:text-parchment cursor-pointer disabled:cursor-default transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-parchment-dark tabular-nums min-w-[80px] text-center">
              Page {pageNumber} / {numPages || '...'}
            </span>
            <button onClick={nextPage} disabled={pageNumber >= numPages}
              className="p-1.5 rounded hover:bg-midnight-light disabled:opacity-30 text-parchment-dark hover:text-parchment cursor-pointer disabled:cursor-default transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Zoom + close */}
          <div className="flex items-center gap-1">
            <button onClick={zoomOut}
              className="p-1.5 rounded hover:bg-midnight-light text-parchment-dark hover:text-parchment cursor-pointer transition-colors">
              <ZoomOut size={15} />
            </button>
            <span className="text-[10px] text-parchment-dark tabular-nums min-w-[36px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button onClick={zoomIn}
              className="p-1.5 rounded hover:bg-midnight-light text-parchment-dark hover:text-parchment cursor-pointer transition-colors">
              <ZoomIn size={15} />
            </button>
            <div className="w-px h-4 bg-gold/10 mx-1" />
            <button onClick={onClose}
              className="p-1.5 rounded hover:bg-midnight-light text-parchment-dark hover:text-parchment cursor-pointer transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Highlight hint bar */}
        {highlight && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gold/10 border-b border-gold/10 text-xs text-gold-light shrink-0">
            <Search size={12} className="shrink-0" />
            <span className="flex-1">
              {highlightOn ? 'Highlighted' : 'Search term'}: <strong>{highlight}</strong>
            </span>
            <button
              onClick={() => setHighlightOn((v) => !v)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                highlightOn
                  ? 'bg-gold/20 text-gold hover:bg-gold/30'
                  : 'bg-midnight-light/50 text-parchment-dark hover:text-parchment'
              }`}
              title={highlightOn ? 'Turn off highlighting' : 'Turn on highlighting'}
            >
              <Highlighter size={12} />
              {highlightOn ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {/* PDF content */}
        <div ref={containerRef} className="flex-1 overflow-auto bg-[#525659]">
          {loading && (
            <div className="flex items-center justify-center h-32 text-parchment-dark">
              <Loader2 size={24} className="animate-spin" />
            </div>
          )}
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            error={
              <div className="flex items-center justify-center h-32 text-parchment-dark text-sm">
                Failed to load PDF.
              </div>
            }
            className="flex flex-col items-center py-4"
          >
            <div ref={pageRef}>
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading=""
                className="shadow-xl"
              />
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}
