import { useState, useMemo } from 'react';
import { Check, Copy, Download, WrapText, FileCode } from 'lucide-react';
import { highlightCodeLines } from '../utils/highlighter';

interface CodeBlockProps {
  id?: string;
  code: string;
  language: string;
  filename?: string;
  title?: string;
  showLineNumbers?: boolean;
  allowDownload?: boolean;
  className?: string;
}

export default function CodeBlock({
  id,
  code,
  language,
  filename,
  title,
  showLineNumbers = true,
  allowDownload = true,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);

  const lines = useMemo(() => {
    return highlightCodeLines(code, language);
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const targetFilename = filename || (language === 'powershell' ? 'script.ps1' : language === 'bat' ? 'script.bat' : 'documento.txt');
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = targetFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const languageLabel = useMemo(() => {
    switch (language.toLowerCase()) {
      case 'powershell':
      case 'ps1':
        return 'PowerShell (.ps1)';
      case 'dos':
      case 'bat':
      case 'batch':
      case 'cmd':
        return 'Windows Batch (.bat)';
      case 'markdown':
      case 'md':
        return 'Markdown / Estrutura';
      case 'text':
      default:
        return 'Prompt / Texto';
    }
  }, [language]);

  return (
    <div
      id={id}
      className={`code-block-wrapper my-4 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-xs ${className}`}
    >
      {/* Header bar with filename, language, line count, and actions */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
        <div className="flex items-center gap-2 font-mono truncate">
          <FileCode className="w-4 h-4 text-blue-600 shrink-0" />
          {filename ? (
            <span className="font-semibold text-gray-800 tracking-tight">{filename}</span>
          ) : (
            <span className="font-medium text-gray-700">{title || languageLabel}</span>
          )}
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono bg-gray-200 text-gray-700">
            {languageLabel}
          </span>
          <span className="text-gray-400 text-[11px]">
            {lines.length} {lines.length === 1 ? 'linha' : 'linhas'}
          </span>
        </div>

        {/* Action buttons (hidden on print) */}
        <div className="flex items-center gap-1 print-hide">
          <button
            type="button"
            onClick={() => setWrapLines(!wrapLines)}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              wrapLines
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
            title={wrapLines ? 'Desativar quebra de linha' : 'Ativar quebra de linha'}
            aria-label="Alternar quebra de linha"
          >
            <WrapText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">{wrapLines ? 'Quebra: On' : 'Quebra: Off'}</span>
          </button>

          {allowDownload && filename && (
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 rounded text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors flex items-center gap-1"
              title={`Baixar arquivo ${filename}`}
              aria-label={`Baixar arquivo ${filename}`}
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline text-[11px]">Baixar {filename}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              copied
                ? 'bg-emerald-100 text-emerald-800 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
            title="Copiar código"
            aria-label="Copiar código completo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-medium">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body with visible line numbers column and monospace typography */}
      <div
        className={`bg-white font-mono text-xs overflow-x-auto ${
          wrapLines ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
        }`}
      >
        <div className="py-2 inline-block min-w-full">
          {lines.map((line) => (
            <div key={line.lineNumber} className="code-line group flex">
              {showLineNumbers && (
                <span
                  className="code-line-number"
                  aria-hidden="true"
                >
                  {line.lineNumber}
                </span>
              )}
              <span
                className="code-line-content font-mono text-gray-900"
                dangerouslySetInnerHTML={{ __html: line.html || '&nbsp;' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
