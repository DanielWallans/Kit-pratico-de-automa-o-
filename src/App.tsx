import { useState } from 'react';
import {
  BOOK_METADATA,
  SCRIPTS,
  PROMPTS,
} from './data/bookContent';
import CodeBlock from './components/CodeBlock';
import {
  Printer,
  FileDown,
  FileText,
  Terminal,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  Check,
  Copy,
} from 'lucide-react';

export default function App() {
  const [copiedAll, setCopiedAll] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = async () => {
    let text = `${BOOK_METADATA.title}\n${BOOK_METADATA.subtitle}\n\n`;
    SCRIPTS.forEach((s) => {
      text += `=== ${s.title} (${s.filename}) ===\n${s.code}\n\n`;
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* Barra Superior Discreta de Controle do PDF (Oculta na impressão) */}
      <nav aria-label="Barra de exportação" className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md text-white border-b border-zinc-800 shadow-md print-hide">
        <div className="max-w-[850px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Documento Técnico PDF
              </div>
              <div className="text-sm font-semibold text-zinc-100 truncate max-w-[280px] sm:max-w-md">
                {BOOK_METADATA.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAll}
              className="px-3 py-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors flex items-center gap-1.5"
              title="Copiar todos os scripts para a área de transferência"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scripts Copiados</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar Scripts</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              title="Salvar como PDF ou Imprimir"
            >
              <FileDown className="w-4 h-4" />
              <span>Salvar / Baixar PDF</span>
            </button>
          </div>
        </div>

        {/* Banner de orientação rápido para a equipe */}
        <div className="bg-blue-950/80 border-t border-blue-900/50 py-1.5 px-4 text-center text-[11px] text-blue-200">
          💡 <strong>Para exportar o PDF:</strong> Clique em <em>"Salvar / Baixar PDF"</em> e selecione o destino como <strong>"Salvar como PDF"</strong>. O arquivo já está formatado com quebras de página para formato A4.
        </div>
      </nav>

      {/* Folha do Documento (Proporção A4 com Fundo Branco) */}
      <main className="document-container max-w-[850px] mx-auto bg-white my-6 sm:my-10 p-8 sm:p-14 md:p-16 shadow-xl border border-zinc-200/80 rounded-none sm:rounded-sm">
        
        {/* =========================================================================
            CAPA / CABEÇALHO DO DOCUMENTO
           ========================================================================= */}
        <header className="border-b-2 border-zinc-900 pb-10 mb-12">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest pb-6 border-b border-zinc-200">
            <span>Guia Técnico de Engenharia & Automação</span>
            <span>Versão {BOOK_METADATA.version}</span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="inline-block px-2.5 py-1 bg-zinc-100 border border-zinc-300 rounded text-xs font-mono font-semibold text-zinc-800">
              MANUAL TÉCNICO COMPARTILHÁVEL
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              {BOOK_METADATA.title}
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
              {BOOK_METADATA.subtitle}
            </h2>

            <p className="text-base text-zinc-700 leading-relaxed max-w-2xl pt-2">
              {BOOK_METADATA.description}
            </p>
          </div>

          {/* Metadata Card */}
          <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-zinc-600">
            <div>
              <span className="text-zinc-400 block text-[10px]">DESTINATÁRIO</span>
              <span className="font-semibold text-zinc-900">Equipe de Dev</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">FORMATO</span>
              <span className="font-semibold text-zinc-900">PDF Técnico A4</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">CÓDIGO</span>
              <span className="font-semibold text-zinc-900">Linhas Visíveis</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">REALCE</span>
              <span className="font-semibold text-zinc-900">Syntax Highlight</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SUMÁRIO EXECUTIVO
           ========================================================================= */}
        <section className="mb-14 p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 pb-2 border-b border-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 bg-zinc-900 rounded-full"></span>
            <span>Sumário do Documento</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-xs font-mono text-zinc-700">
            <div className="space-y-1.5">
              <div className="font-bold text-zinc-900">1. INTRODUÇÃO RÁPIDA</div>
              <div className="pl-3 text-zinc-600 space-y-1">
                <div>• Execução de Scripts no Windows com Segurança</div>
                <div>• Como salvar e executar arquivos .BAT</div>
                <div>• Como salvar e executar arquivos .PS1</div>
                <div>• Regras de execução como Administrador</div>
              </div>

              <div className="font-bold text-zinc-900 pt-2">2. MÓDULO 1 — SCRIPTS WINDOWS</div>
              <div className="pl-3 text-zinc-600 space-y-1">
                <div>• Script 1: Organizador Automático (.ps1)</div>
                <div>• Script 2: Faxina Rápida de Disco (.bat)</div>
                <div>• Script 3: Backup Incremental em 1 Clique (.bat)</div>
                <div>• Script 4: Modo Foco / Encerramento Rápido (.ps1)</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-zinc-900">3. MÓDULO 2 — SUPERPROMPTS IA</div>
              <div className="pl-3 text-zinc-600 space-y-1">
                <div>• Prompt 1: Extrator de Tarefas e Resumos</div>
                <div>• Prompt 2: Central de Respostas (3 Variações)</div>
                <div>• Prompt 3: Relatórios Semanais Executivos</div>
              </div>

              <div className="font-bold text-zinc-900 pt-2">4. CONCLUSÃO & CHECKLIST</div>
              <div className="pl-3 text-zinc-600 space-y-1">
                <div>• Incorporando à rotina & A Regra dos 5 Minutos</div>
                <div>• Sistema de Produtividade em 5 Etapas</div>
                <div>• Checklist Final de Validação</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 1: INTRODUÇÃO RÁPIDA
           ========================================================================= */}
        <section className="mb-14 space-y-6">
          <div className="border-b border-zinc-300 pb-2">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">Capítulo 1</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">1. Introdução Rápida</h2>
          </div>

          <div className="space-y-4 text-sm text-zinc-800 leading-relaxed">
            <p>
              Este kit foi criado para transformar pequenas tarefas repetitivas em processos de poucos cliques. Em vez de organizar arquivos manualmente, limpar pastas temporárias, preparar backups ou gastar vários minutos estruturando textos, você poderá utilizar scripts do Windows e prompts de IA preparados para essas situações. Dependendo da sua rotina, a combinação dessas ferramentas pode economizar de alguns minutos por dia a várias horas ao longo de um mês.
            </p>
            <p>
              Você não precisa ser programador para utilizar o material. Os scripts foram preparados para serem copiados, salvos e executados seguindo as instruções deste e-book. Mesmo assim, automação deve ser utilizada com atenção: leia o que o script faz, confira as pastas envolvidas e, principalmente, não execute códigos de origem desconhecida sem antes entender sua finalidade.
            </p>
          </div>

          {/* Segurança */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Como Executar Scripts no Windows com Segurança</span>
            </h3>
            <p className="text-xs text-zinc-700">
              Existem duas extensões principais que você encontrará neste e-book:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                <span className="font-bold text-blue-700">.BAT</span>
                <p className="text-zinc-600 mt-1">
                  Arquivo executado pelo Prompt de Comando do Windows (CMD). Muito útil para comandos tradicionais do Windows e ferramentas como Robocopy.
                </p>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                <span className="font-bold text-purple-700">.PS1</span>
                <p className="text-zinc-600 mt-1">
                  Arquivo de script executado pelo PowerShell. Permite criar automações modernas e estruturadas com objetos e tratamento de erros.
                </p>
              </div>
            </div>
          </div>

          {/* Procedimentos para salvar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-800">
            <div className="p-4 border border-zinc-200 rounded-sm space-y-2">
              <h4 className="font-bold text-zinc-900 text-sm">Como Salvar um Arquivo .BAT</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-zinc-700">
                <li>Abra o Bloco de Notas (<kbd className="px-1 bg-zinc-100 border border-zinc-300 rounded font-mono">Win + R</kbd> &gt; <code>notepad</code>).</li>
                <li>Cole o código <code>.BAT</code> fornecido.</li>
                <li>Clique em <em>Arquivo &gt; Salvar como</em>.</li>
                <li>Nome: por exemplo <code>FaxinaRapida.bat</code>.</li>
                <li>Em <strong>Tipo</strong>, selecione <strong>Todos os arquivos</strong>.</li>
                <li>Em <strong>Codificação</strong>, selecione <strong>UTF-8</strong>.</li>
                <li>Dê dois cliques no arquivo para executar.</li>
              </ol>
            </div>

            <div className="p-4 border border-zinc-200 rounded-sm space-y-2">
              <h4 className="font-bold text-zinc-900 text-sm">Como Salvar um Arquivo .PS1</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-zinc-700">
                <li>Abra o Bloco de Notas (<kbd className="px-1 bg-zinc-100 border border-zinc-300 rounded font-mono">Win + R</kbd> &gt; <code>notepad</code>).</li>
                <li>Cole o código <code>.PS1</code> fornecido.</li>
                <li>Salve como <code>OrganizadorAutomatico.ps1</code>.</li>
                <li>Tipo: <strong>Todos os arquivos</strong> | Codificação: <strong>UTF-8</strong>.</li>
                <li>Clique com o botão direito e escolha <em>Executar com PowerShell</em>.</li>
              </ol>
              <div className="pt-1 text-[11px] text-amber-800 font-mono">
                Se bloqueado por política, execute pontualmente no terminal:
                <div className="bg-zinc-100 p-1.5 rounded mt-1 border border-zinc-200 select-all">
                  powershell -ExecutionPolicy Bypass -File ".\script.ps1"
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-800">
            <strong>Regra de Ouro:</strong> Não execute como administrador simplesmente porque o script existe. Utilize privilégios administrativos somente quando a tarefa realmente precisar deles.
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 2: MÓDULO 1 — SCRIPTS DE AUTOMAÇÃO WINDOWS
           ========================================================================= */}
        <section className="mb-14 space-y-10 page-break-before">
          <div className="border-b border-zinc-300 pb-2">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">Capítulo 2</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">2. Módulo 1 — Scripts de Automação para Windows</h2>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Copiar → Salvar → Executar → Economizar tempo.
            </p>
          </div>

          {/* SCRIPT 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Script 1 — Organizador Automático de Arquivos</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded">
                PowerShell (.ps1)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700">
              Analisa a pasta <strong>Downloads</strong> e organiza automaticamente os arquivos em subpastas categorizadas por extensão. Não sobrescreve arquivos existentes com o mesmo nome.
            </p>

            <CodeBlock
              code={SCRIPTS[0].code}
              language="powershell"
              filename={SCRIPTS[0].filename}
              title={SCRIPTS[0].title}
            />

            <div className="p-3 bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700">
              <strong>Personalização de Pasta:</strong> Para alterar a pasta monitorada, modifique a primeira linha de código para o caminho desejado, ex: <code>$PastaOrigem = "C:\Users\Daniel\Desktop\Arquivos"</code> ou <code>$PastaOrigem = "D:\Trabalho"</code>.
            </div>
          </div>

          {/* SCRIPT 2 */}
          <div className="space-y-3 pt-6 border-t border-zinc-200 page-break-before">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>Script 2 — Faxina Rápida de Disco</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Windows Batch (.bat)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700">
              Executa limpeza segura de arquivos temporários do usuário (<code>%TEMP%</code>), do sistema Windows e renova o cache DNS. Arquivos que estiverem em uso no momento permanecem intactos.
            </p>

            <CodeBlock
              code={SCRIPTS[1].code}
              language="bat"
              filename={SCRIPTS[1].filename}
              title={SCRIPTS[1].title}
            />
          </div>

          {/* SCRIPT 3 */}
          <div className="space-y-3 pt-6 border-t border-zinc-200 page-break-before">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>Script 3 — Backup Incremental em 1 Clique</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Robocopy (.bat)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700">
              Utiliza a ferramenta nativa <strong>Robocopy</strong> para cópia incremental segura. <em>Atenção:</em> não utiliza a flag <code>/MIR</code> propositalmente, garantindo que exclusões na origem nunca deletem seu backup.
            </p>

            <CodeBlock
              code={SCRIPTS[2].code}
              language="bat"
              filename={SCRIPTS[2].filename}
              title={SCRIPTS[2].title}
            />

            <div className="p-3 bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700">
              <strong>Configuração de Origem e Destino:</strong> Abra no bloco de notas e altere:<br />
              <code>set "ORIGEM=C:\Users\Daniel\Documents\Projetos"</code><br />
              <code>set "DESTINO=D:\Backup\Projetos"</code>
            </div>
          </div>

          {/* SCRIPT 4 */}
          <div className="space-y-3 pt-6 border-t border-zinc-200 page-break-before">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Script 4 — Modo Foco / Encerramento Rápido</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded">
                PowerShell (.ps1)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700">
              Encerra de forma limpa aplicativos que geram notificações ou distrações (WhatsApp, Telegram, Discord) e abre imediatamente a sua página web de trabalho no navegador padrão.
            </p>

            <CodeBlock
              code={SCRIPTS[3].code}
              language="powershell"
              filename={SCRIPTS[3].filename}
              title={SCRIPTS[3].title}
            />
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 3: MÓDULO 2 — SUPERPROMPTS DE PRODUTIVIDADE COM IA
           ========================================================================= */}
        <section className="mb-14 space-y-10 page-break-before">
          <div className="border-b border-zinc-300 pb-2">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">Capítulo 3</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">3. Módulo 2 — Superprompts de Produtividade com IA</h2>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Automatizando o trabalho intelectual: sumarização, atendimento e relatórios técnicos.
            </p>
          </div>

          {/* PROMPT 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Prompt 1 — Extrator de Tarefas e Resumos de E-mails/Reuniões</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700">
              Transforma longas conversas, e-mails ou anotações confusas em uma tabela clara com responsável, prazos e pendências.
            </p>

            <CodeBlock
              code={PROMPTS[0].promptText}
              language="text"
              title="Prompt Extrator de Tarefas"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-zinc-700 block mb-1">Exemplo de Entrada:</span>
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded font-mono text-[11px] whitespace-pre-wrap text-zinc-700">
                  {PROMPTS[0].exampleInput}
                </div>
              </div>
              <div>
                <span className="font-bold text-emerald-800 block mb-1">Saída Formatada da IA:</span>
                <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded font-mono text-[11px] whitespace-pre-wrap text-zinc-800">
                  {PROMPTS[0].exampleOutput}
                </div>
              </div>
            </div>
          </div>

          {/* PROMPT 2 */}
          <div className="space-y-4 pt-6 border-t border-zinc-200 page-break-before">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Prompt 2 — Central de Resposta a Clientes (3 Variações)</span>
            </h3>

            {/* Var 1 */}
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
              <div className="font-bold text-zinc-900 text-xs">Variação 1: Resposta Rápida para Orçamento</div>
              <CodeBlock
                code={PROMPTS[1].promptText}
                language="text"
                title="Prompt Orçamento"
              />
              <div className="p-2.5 bg-white border border-zinc-200 rounded text-xs text-zinc-700 italic">
                <strong>Saída exemplo:</strong> "{PROMPTS[1].exampleOutput}"
              </div>
            </div>

            {/* Var 2 */}
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
              <div className="font-bold text-zinc-900 text-xs">Variação 2: Cliente Insatisfeito ou com Problema</div>
              <CodeBlock
                code={PROMPTS[2].promptText}
                language="text"
                title="Prompt Cliente Insatisfeito"
              />
              <div className="p-2.5 bg-white border border-zinc-200 rounded text-xs text-zinc-700 italic">
                <strong>Saída exemplo:</strong> "{PROMPTS[2].exampleOutput}"
              </div>
            </div>

            {/* Var 3 */}
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
              <div className="font-bold text-zinc-900 text-xs">Variação 3: Cobrança Elegante de Pagamento Pendente</div>
              <CodeBlock
                code={PROMPTS[3].promptText}
                language="text"
                title="Prompt Cobrança Elegante"
              />
              <div className="p-2.5 bg-white border border-zinc-200 rounded text-xs text-zinc-700 italic">
                <strong>Saída exemplo:</strong> "{PROMPTS[3].exampleOutput}"
              </div>
            </div>
          </div>

          {/* PROMPT 3 */}
          <div className="space-y-3 pt-6 border-t border-zinc-200 page-break-before">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Prompt 3 — Gerador de Relatórios Semanais de Produtividade</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700">
              Converte anotações rápidas e dispersas da semana em um relatório executivo pronto para envio à diretoria ou clientes.
            </p>

            <CodeBlock
              code={PROMPTS[4].promptText}
              language="text"
              title="Prompt Relatório Semanal Executivo"
            />

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono space-y-2">
              <span className="font-bold text-zinc-900">Exemplo de Relatório Gerado em Markdown / Tabela:</span>
              <div className="p-3 bg-white border border-zinc-200 rounded text-[11px] whitespace-pre-wrap text-zinc-800 leading-relaxed">
                {PROMPTS[4].exampleOutput}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 4: CONCLUSÃO & CHECKLIST
           ========================================================================= */}
        <section className="mb-14 space-y-8 page-break-before">
          <div className="border-b border-zinc-300 pb-2">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">Capítulo 4</span>
            <h2 className="text-2xl font-bold text-zinc-900 mt-1">4. Conclusão e Próximos Passos</h2>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              Como incorporar o kit à rotina e checklist de validação técnica.
            </p>
          </div>

          {/* Destaque da Regra dos 5 Minutos */}
          <div className="p-5 bg-zinc-50 border-l-4 border-blue-600 text-xs text-zinc-800 space-y-2">
            <div className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>A Regra dos 5 Minutos (O Cálculo do Ganho Real)</span>
            </div>
            <p className="leading-relaxed">
              Se uma tarefa leva 5 minutos e é realizada todos os dias úteis:
            </p>
            <div className="p-2.5 bg-white border border-zinc-200 rounded font-mono text-zinc-900 space-y-0.5">
              <div>• 5 minutos × 5 dias = 25 minutos por semana</div>
              <div>• 25 minutos × 52 semanas = 1.300 minutos por ano</div>
              <div className="font-bold text-blue-700">• 1.300 minutos ≈ 21,6 horas de trabalho recuperadas por ano!</div>
            </div>
          </div>

          {/* Sistema em 5 etapas */}
          <div className="p-4 border border-zinc-200 rounded text-xs space-y-2">
            <span className="font-bold text-zinc-900">Seu Primeiro Sistema de Produtividade:</span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-zinc-700 pt-1">
              <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">1. ENTRADA (Downloads)</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">2. ORGANIZAÇÃO (.ps1)</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">3. EXECUÇÃO (Modo Foco)</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">4. BACKUP (Robocopy)</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="px-2 py-1 bg-zinc-100 border border-zinc-300 rounded">5. RELATÓRIO (Superprompt)</span>
            </div>
          </div>

          {/* Checklist Impresso */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono space-y-2.5">
            <span className="font-bold text-zinc-900 text-sm block border-b border-zinc-200 pb-2">
              CHECKLIST FINAL DE VALIDAÇÃO DA EQUIPE
            </span>
            <div className="space-y-1.5 text-zinc-700">
              <div>[  ] Criei uma pasta para minhas automações (ex: C:\Automacoes).</div>
              <div>[  ] Salvei o Organizador Automático (OrganizadorAutomatico.ps1).</div>
              <div>[  ] Configurei a pasta correta do Organizador ($PastaOrigem).</div>
              <div>[  ] Testei a Faxina Rápida (FaxinaRapida.bat).</div>
              <div>[  ] Configurei corretamente a origem do Backup (%ORIGEM%).</div>
              <div>[  ] Configurei corretamente o destino do Backup (%DESTINO%).</div>
              <div>[  ] Testei o Backup e confirmei os arquivos copiados no destino.</div>
              <div>[  ] Configurei os programas do Modo Foco ($ProcessosParaFechar).</div>
              <div>[  ] Configurei minha página de trabalho ($PaginaDeTrabalho).</div>
              <div>[  ] Salvei meus prompts favoritos na ferramenta de IA.</div>
              <div>[  ] Criei uma pasta para minha biblioteca de prompts.</div>
              <div>[  ] Escolhi pelo menos uma tarefa repetitiva para automatizar hoje.</div>
            </div>
          </div>

          {/* Palavra Final */}
          <div className="p-6 bg-zinc-900 text-white rounded text-xs sm:text-sm space-y-2">
            <h4 className="font-bold text-white text-base">Palavra Final</h4>
            <p className="text-zinc-300 leading-relaxed">
              Produtividade não é fazer tudo mais rápido. É gastar menos energia com aquilo que não precisa da sua atenção. Um computador pode organizar arquivos. Um script pode executar tarefas repetitivas. Uma IA pode transformar informação desorganizada em algo útil. E você pode concentrar seu tempo naquilo que realmente precisa de você.
            </p>
            <div className="pt-2 font-mono font-bold text-blue-400 text-sm">
              Do caos ao clique único.
            </div>
          </div>
        </section>

        {/* Rodapé Oficial do Documento */}
        <footer className="pt-8 border-t-2 border-zinc-900 text-center text-xs font-mono text-zinc-500 space-y-1">
          <p className="font-bold text-zinc-800">
            {BOOK_METADATA.title} — {BOOK_METADATA.subtitle}
          </p>
          <p>
            Documento Técnico Formatado para Exportação em PDF • Versão {BOOK_METADATA.version}
          </p>
        </footer>

      </main>
    </div>
  );
}
