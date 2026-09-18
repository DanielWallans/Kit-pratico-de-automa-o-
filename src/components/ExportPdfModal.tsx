import { Printer, FileDown, Check, Copy, X, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { SCRIPTS, PROMPTS } from '../data/bookContent';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportPdfModal({ isOpen, onClose }: ExportPdfModalProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    // Small delay to ensure modal doesn't flash or interfere with print
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleDownloadAllScripts = () => {
    // Generate a single consolidated script package text
    const bundleContent = `=== KIT PRÁTICO DE AUTOMAÇÃO E PRODUTIVIDADE ===
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

==================================================
1. OrganizadorAutomatico.ps1 (PowerShell)
==================================================
${SCRIPTS[0].code}

==================================================
2. FaxinaRapida.bat (Windows Batch)
==================================================
${SCRIPTS[1].code}

==================================================
3. BackupIncremental.bat (Windows Batch / Robocopy)
==================================================
${SCRIPTS[2].code}

==================================================
4. ModoFoco.ps1 (PowerShell)
==================================================
${SCRIPTS[3].code}
`;

    const blob = new Blob([bundleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kit-automacao-scripts-completos.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = async () => {
    let md = `# KIT PRÁTICO DE AUTOMAÇÃO E PRODUTIVIDADE\n\n## Scripts para Windows:\n\n`;
    SCRIPTS.forEach((s) => {
      md += `### ${s.title} (${s.filename})\n\`\`\`${s.language}\n${s.code}\n\`\`\`\n\n`;
    });
    md += `## Superprompts de IA:\n\n`;
    PROMPTS.forEach((p) => {
      md += `### ${p.title}\n\`\`\`text\n${p.promptText}\n\`\`\`\n\n`;
    });

    try {
      await navigator.clipboard.writeText(md);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs print-hide animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-base">Exportar Documento em PDF</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-gray-700">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 font-semibold text-blue-900 text-xs mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Dicas para gerar o PDF perfeito para sua equipe:</span>
            </div>
            <ul className="list-disc list-inside text-xs text-blue-800 space-y-1 pl-1">
              <li>No diálogo de impressão, selecione o Destino como <strong>"Salvar como PDF"</strong>.</li>
              <li>Mantenha as margens como <strong>Padrão</strong> (já otimizado para formato A4).</li>
              <li>Ative a opção <strong>"Gráficos de segundo plano"</strong> para preservar os blocos de código e números de linha.</li>
              <li>O documento foi formatado para quebrar páginas suavemente entre os módulos.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-xs transition-colors cursor-pointer text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Abrir Diálogo de Impressão / Salvar em PDF</span>
            </button>
          </div>

          <div className="pt-3 border-t border-gray-200 space-y-2">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Outras opções de compartilhamento técnico:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadAllScripts}
                className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
              >
                <FileDown className="w-4 h-4 text-gray-500" />
                <span>Baixar Todos os Scripts (.txt)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-500" />
                    <span>Copiar Tudo em Markdown</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
