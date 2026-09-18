import { Printer, Download, Search, FileText, Sparkles, SlidersHorizontal } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookContent';

interface HeaderBarProps {
  onOpenPdfModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  fontSize: 'normal' | 'large' | 'compact';
  onFontSizeChange: (size: 'normal' | 'large' | 'compact') => void;
}

export default function HeaderBar({
  onOpenPdfModal,
  searchQuery,
  onSearchChange,
  fontSize,
  onFontSizeChange,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs print-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Document Name */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">
                  Guia Técnico para Equipe
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
                  v{BOOK_METADATA.version}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {BOOK_METADATA.title}
              </h1>
            </div>
          </div>

          {/* Controls: Search, Font size, Export PDF */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Pesquisar scripts, prompts..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Font scale toggle */}
            <div className="hidden lg:flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50 text-xs font-mono">
              <button
                type="button"
                onClick={() => onFontSizeChange('compact')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'compact' ? 'bg-white shadow-xs font-bold text-gray-900' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Visualização compacta"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('normal')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-gray-900' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Visualização padrão"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('large')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'large' ? 'bg-white shadow-xs font-bold text-gray-900' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Visualização grande"
              >
                A+
              </button>
            </div>

            {/* Export PDF Button (Primary Action) */}
            <button
              type="button"
              onClick={onOpenPdfModal}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Exportar documento completo em PDF para compartilhar com a equipe"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
