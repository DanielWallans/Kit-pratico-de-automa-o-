import { useState, useMemo } from 'react';
import {
  BOOK_METADATA,
  TABLE_OF_CONTENTS,
  SCRIPTS,
  PROMPTS,
} from './data/bookContent';
import HeaderBar from './components/HeaderBar';
import TableOfContents from './components/TableOfContents';
import CodeBlock from './components/CodeBlock';
import InteractiveChecklist from './components/InteractiveChecklist';
import ExportPdfModal from './components/ExportPdfModal';
import {
  FileText,
  ShieldCheck,
  Terminal,
  Sparkles,
  CheckSquare,
  AlertTriangle,
  FolderTree,
  Printer,
  ChevronRight,
  Info,
  Clock,
  Layers,
  ArrowRight,
  Download,
} from 'lucide-react';

export default function App() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'compact'>('normal');

  // Filtered check
  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const fontSizeClass = useMemo(() => {
    switch (fontSize) {
      case 'compact':
        return 'text-[13px] leading-relaxed';
      case 'large':
        return 'text-[16px] leading-loose';
      case 'normal':
      default:
        return 'text-[14px] leading-relaxed';
    }
  }, [fontSize]);

  return (
    <div className={`min-h-screen bg-white text-gray-900 ${fontSizeClass}`}>
      {/* Interactive top navigation and controls */}
      <HeaderBar
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation (Desktop only, hidden on print) */}
          <aside className="lg:col-span-3 print-hide">
            <div className="sticky top-20 space-y-6">
              <TableOfContents />

              {/* Quick Info Box */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sobre este Manual Técnico</span>
                </div>
                <p>
                  Formatado com fundo branco, linhas numeradas visíveis e realce de sintaxe para facilitar a leitura técnica da sua equipe de engenharia.
                </p>
                <div className="pt-2 border-t border-gray-200 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Scripts Windows:</span>
                    <strong className="text-gray-900">4 automações</strong>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Superprompts IA:</span>
                    <strong className="text-gray-900">3 modelos (5 vars)</strong>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Checklist Final:</span>
                    <strong className="text-gray-900">12 itens</strong>
                  </div>
                </div>
              </div>

              {/* Quick Export Button */}
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Salvar Documento em PDF</span>
              </button>
            </div>
          </aside>

          {/* Document Content Area */}
          <main className="lg:col-span-9 bg-white document-container space-y-12">
            
            {/* Header Stamp (Preserved on print) */}
            <header className="border-b-2 border-gray-900 pb-8 pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gray-100 border border-gray-300 font-mono text-xs font-semibold text-gray-800 mb-3">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>MANUAL TÉCNICO DE AUTOMAÇÃO E PRODUTIVIDADE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
                {BOOK_METADATA.title}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-700 mt-2">
                {BOOK_METADATA.subtitle}
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                {BOOK_METADATA.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-gray-500">
                <span>Versão: {BOOK_METADATA.version}</span>
                <span>•</span>
                <span>Data: {BOOK_METADATA.date}</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">✓ Código Validado com Linhas Visíveis e Fundo Branco</span>
              </div>
            </header>

            {/* Sumário Documental */}
            <section id="sumario" className="p-6 bg-gray-50/70 border border-gray-200 rounded-xl">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <FolderTree className="w-4 h-4 text-blue-600" />
                <span>Sumário Geral do E-book</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-2">
                  <div className="font-bold text-gray-800 text-sm">1. INTRODUÇÃO RÁPIDA</div>
                  <ul className="pl-4 space-y-1 text-gray-600">
                    <li>• Como executar scripts no Windows com segurança (.BAT e .PS1)</li>
                    <li>• Como salvar um arquivo .BAT</li>
                    <li>• Como salvar um arquivo .PS1</li>
                    <li>• Como executar como administrador</li>
                  </ul>
                  <div className="font-bold text-gray-800 text-sm pt-2">2. MÓDULO 1 — SCRIPTS DE AUTOMAÇÃO WINDOWS</div>
                  <ul className="pl-4 space-y-1 text-gray-600">
                    <li>• Script 1 — Organizador Automático de Arquivos (.ps1)</li>
                    <li>• Script 2 — Faxina Rápida de Disco (.bat)</li>
                    <li>• Script 3 — Backup Incremental em 1 Clique (.bat)</li>
                    <li>• Script 4 — Modo Foco / Encerramento Rápido (.ps1)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-gray-800 text-sm">3. MÓDULO 2 — SUPERPROMPTS DE IA</div>
                  <ul className="pl-4 space-y-1 text-gray-600">
                    <li>• Prompt 1 — Extrator de Tarefas e Resumos de E-mails/Reuniões</li>
                    <li>• Prompt 2 — Central de Resposta a Clientes (Orçamento, Insatisfeito, Cobrança)</li>
                    <li>• Prompt 3 — Gerador de Relatórios Semanais de Produtividade</li>
                  </ul>
                  <div className="font-bold text-gray-800 text-sm pt-2">4. CONCLUSÃO E PRÓXIMOS PASSOS</div>
                  <ul className="pl-4 space-y-1 text-gray-600">
                    <li>• Como incorporar o kit à sua rotina & A Regra dos 5 Minutos</li>
                    <li>• Seu primeiro sistema de produtividade</li>
                    <li>• Checklist final da equipe</li>
                    <li>• Palavra Final: Do caos ao clique único</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: INTRODUÇÃO RÁPIDA */}
            <section id="intro" className="space-y-6 pt-6">
              <div className="border-b border-gray-200 pb-3">
                <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider">Capítulo 1</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">1. Introdução Rápida</h2>
              </div>

              <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Este kit foi criado para transformar pequenas tarefas repetitivas em processos de poucos cliques. Em vez de organizar arquivos manualmente, limpar pastas temporárias, preparar backups ou gastar vários minutos estruturando textos, você poderá utilizar scripts do Windows e prompts de IA preparados para essas situações. Dependendo da sua rotina, a combinação dessas ferramentas pode economizar de alguns minutos por dia a várias horas ao longo de um mês.
                </p>
                <p>
                  Você não precisa ser programador para utilizar o material. Os scripts foram preparados para serem copiados, salvos e executados seguindo as instruções deste e-book. Mesmo assim, automação deve ser utilizada com atenção: leia o que o script faz, confira as pastas envolvidas e, principalmente, não execute códigos de origem desconhecida sem antes entender sua finalidade.
                </p>
              </div>

              {/* Como Executar Scripts no Windows com Segurança */}
              <div id="seguranca" className="p-5 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Como Executar Scripts no Windows com Segurança</span>
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Existem duas extensões principais que você encontrará neste e-book:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-white border border-gray-200 rounded-md">
                    <span className="font-bold text-blue-700 text-sm">.BAT</span>
                    <p className="text-gray-600 mt-1">
                      Arquivo executado pelo Prompt de Comando do Windows (CMD). Muito útil para comandos tradicionais do Windows e ferramentas como Robocopy.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-md">
                    <span className="font-bold text-purple-700 text-sm">.PS1</span>
                    <p className="text-gray-600 mt-1">
                      Arquivo de script executado pelo PowerShell. Permite criar automações modernas e estruturadas com objetos e tratamento de erros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Como Salvar .BAT */}
              <div id="salvar-bat" className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-gray-900">Como Salvar um Arquivo .BAT</h3>
                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <p><strong>Passo 1 — Abra o Bloco de Notas:</strong> Pressione <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono text-xs">Windows + R</kbd>, digite <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-blue-800">notepad</code> e tecle Enter.</p>
                  <p><strong>Passo 2 — Cole o código:</strong> Copie o código <code className="font-mono">.BAT</code> fornecido e cole no Bloco de Notas.</p>
                  <p><strong>Passo 3 — Salve corretamente:</strong> Clique em <em>Arquivo &gt; Salvar como</em>. No campo <strong>Nome</strong>, digite por exemplo <code className="font-mono font-semibold text-gray-900">FaxinaRapida.bat</code>. Em <strong>Tipo</strong>, selecione <em>Todos os arquivos</em>. Em <strong>Codificação</strong>, selecione <em>UTF-8</em>.</p>
                  <p><strong>Passo 4 — Execute:</strong> Dê dois cliques no arquivo <code className="font-mono">.bat</code>. Se necessitar de privilégios, clique com o botão direito e selecione <em>Executar como administrador</em>.</p>
                </div>
              </div>

              {/* Como Salvar .PS1 */}
              <div id="salvar-ps1" className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-gray-900">Como Salvar um Arquivo .PS1</h3>
                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <p><strong>Passo 1 — Abra o Bloco de Notas:</strong> Pressione <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono text-xs">Windows + R</kbd>, digite <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-blue-800">notepad</code> e tecle Enter.</p>
                  <p><strong>Passo 2 — Cole o código PowerShell:</strong> Copie o script <code className="font-mono">.PS1</code> e cole no Bloco de Notas.</p>
                  <p><strong>Passo 3 — Salve:</strong> Salve como <code className="font-mono font-semibold text-gray-900">OrganizadorAutomatico.ps1</code>, tipo <em>Todos os arquivos</em>, codificação <em>UTF-8</em>.</p>
                  <p><strong>Passo 4 — Execute:</strong> Clique com o botão direito e escolha <em>Executar com PowerShell</em>.</p>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Política de Execução do PowerShell (ExecutionPolicy):</span>
                    </p>
                    <p>
                      Caso o Windows bloqueie a execução, você pode abrir o PowerShell na pasta do arquivo e executar de forma controlada apenas para aquele processo sem alterar configurações globais:
                    </p>
                    <CodeBlock
                      code={`powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\\OrganizadorAutomatico.ps1"`}
                      language="powershell"
                      title="Comando para Execução Segura Pontual"
                      showLineNumbers={false}
                      allowDownload={false}
                    />
                  </div>
                </div>
              </div>

              {/* Como Executar como Administrador */}
              <div id="executar-admin" className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-gray-900">Como Executar como Administrador</h3>
                <p className="text-gray-700">
                  1. Abra o menu Iniciar.<br />
                  2. Pesquise por <strong>PowerShell</strong> ou <strong>Prompt de Comando</strong>.<br />
                  3. Clique com o botão direito e selecione <strong>Executar como administrador</strong>.<br />
                  4. Confirme a janela de Controle de Conta de Usuário (UAC).
                </p>
                <div className="p-2.5 bg-white border border-gray-300 rounded font-mono text-xs text-gray-800 font-semibold">
                  Regra importante: Não execute como administrador simplesmente porque o script existe. Utilize privilégios administrativos somente quando a tarefa realmente precisar deles.
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: MÓDULO 1 — SCRIPTS DE AUTOMAÇÃO PARA WINDOWS */}
            <section id="modulo-1" className="space-y-8 pt-6 border-t border-gray-200 page-break-before">
              <div className="border-b border-gray-200 pb-3">
                <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider">Capítulo 2</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">2. Módulo 1 — Scripts de Automação para Windows</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-mono">
                  A proposta é simples: <strong>copiar → salvar → executar → economizar tempo.</strong>
                </p>
              </div>

              {/* SCRIPT 1 */}
              <div id="script-1" className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono">.PS1</span>
                    <span>Script 1 — Organizador Automático de Arquivos</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  O script analisa uma pasta escolhida e organiza automaticamente os arquivos em categorias. Por padrão, utiliza a pasta <strong>Downloads</strong> do usuário atual.
                </p>

                {/* Expected structure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <span className="font-bold text-gray-700">Estrutura de Categorias Criadas:</span>
                    <pre className="mt-1 text-gray-600 leading-tight">
{`Downloads/
├── Documentos    (.pdf, .doc, .docx, .txt, .odt)
├── Imagens       (.jpg, .jpeg, .png, .webp, .svg)
├── Instaladores  (.exe, .msi, .msix, .appx)
├── Planilhas     (.xls, .xlsx, .csv, .ods)
└── Compactados   (.zip, .rar, .7z, .tar, .gz)`}
                    </pre>
                  </div>
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-md text-emerald-950">
                    <span className="font-bold text-emerald-900">Segurança contra Sobrescrita:</span>
                    <p className="mt-1 text-xs text-emerald-800 leading-normal">
                      O script valida se um arquivo de mesmo nome já existe no destino. Se existir, ele é preservado e não é sobrescrito, evitando qualquer perda acidental de dados.
                    </p>
                  </div>
                </div>

                {/* Full Code Block */}
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                    <span>Código Fonte Completo (Salve como <code>OrganizadorAutomatico.ps1</code>):</span>
                  </div>
                  <CodeBlock
                    id="code-script-1"
                    code={SCRIPTS[0].code}
                    language="powershell"
                    filename={SCRIPTS[0].filename}
                    title={SCRIPTS[0].title}
                  />
                </div>

                {/* Instructions */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-2">
                  <span className="font-bold text-gray-900 text-sm">Como usar em outra pasta:</span>
                  <p className="text-gray-700">
                    No início do código, altere a linha:
                  </p>
                  <code className="block p-2 bg-white border border-gray-300 rounded font-mono text-blue-900">
                    $PastaOrigem = Join-Path $env:USERPROFILE "Downloads"
                  </code>
                  <p className="text-gray-700">
                    Para o caminho desejado, por exemplo: <code className="font-mono bg-white px-1 py-0.5 border border-gray-300 rounded">$PastaOrigem = "C:\Users\Daniel\Desktop\Arquivos"</code> ou <code className="font-mono bg-white px-1 py-0.5 border border-gray-300 rounded">$PastaOrigem = "D:\Trabalho"</code>.
                  </p>
                </div>
              </div>

              {/* SCRIPT 2 */}
              <div id="script-2" className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono">.BAT</span>
                    <span>Script 2 — Faxina Rápida de Disco</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  Este script realiza uma limpeza básica e segura de arquivos temporários do usuário, arquivos temporários do Windows e renova o cache DNS do sistema. O script não utiliza comandos destinados a apagar documentos pessoais ou arquivos essenciais.
                </p>

                <CodeBlock
                  id="code-script-2"
                  code={SCRIPTS[1].code}
                  language="bat"
                  filename={SCRIPTS[1].filename}
                  title={SCRIPTS[1].title}
                />

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                  <strong>Resultado Esperado:</strong> Limpeza do <code>%TEMP%</code> do usuário, limpeza segura do <code>%WINDIR%\Temp</code> e liberação do cache DNS com <code>ipconfig /flushdns</code>. Arquivos que estiverem em uso no momento não serão deletados, o que é o comportamento correto do sistema operacional.
                </div>
              </div>

              {/* SCRIPT 3 */}
              <div id="script-3" className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono">.BAT</span>
                    <span>Script 3 — Backup Incremental em 1 Clique</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  Este script utiliza o <strong>Robocopy</strong> nativo do Windows para copiar uma pasta de trabalho para outro disco ou pasta. Arquivos já atualizados não são copiados novamente, economizando tempo e uso de disco.
                </p>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                  <strong>Importante sobre a segurança deste script:</strong> Ele <strong>NÃO utiliza a flag <code>/MIR</code></strong> (espelhamento destrutivo). Isso evita que arquivos excluídos por engano na origem sejam imediatamente apagados do seu backup.
                </div>

                <CodeBlock
                  id="code-script-3"
                  code={SCRIPTS[2].code}
                  language="bat"
                  filename={SCRIPTS[2].filename}
                  title={SCRIPTS[2].title}
                />

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-2">
                  <span className="font-bold text-gray-900 text-sm">Como Configurar:</span>
                  <p className="text-gray-700">Substitua as variáveis no início do arquivo:</p>
                  <pre className="p-2.5 bg-white border border-gray-300 rounded font-mono text-gray-900">
{`set "ORIGEM=C:\\Users\\Daniel\\Documents\\Projetos"
set "DESTINO=D:\\Backup\\Projetos"`}
                  </pre>
                  <p className="text-xs text-gray-500 italic">
                    Boa prática: Backup que nunca foi testado não é considerado um backup confiável. Sempre confira a pasta de destino após a primeira execução.
                  </p>
                </div>
              </div>

              {/* SCRIPT 4 */}
              <div id="script-4" className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono">.PS1</span>
                    <span>Script 4 — Modo Foco / Encerramento Rápido</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  Encerra aplicativos de comunicação ou jogos previamente definidos (como WhatsApp, Telegram, Discord) e abre imediatamente a sua página de trabalho no navegador padrão.
                </p>

                <CodeBlock
                  id="code-script-4"
                  code={SCRIPTS[3].code}
                  language="powershell"
                  filename={SCRIPTS[3].filename}
                  title={SCRIPTS[3].title}
                />

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-2">
                  <span className="font-bold text-gray-900 text-sm">Personalização Segura:</span>
                  <p className="text-gray-700">
                    Defina os nomes exatos dos processos na variável <code className="font-mono">$ProcessosParaFechar</code> (sem o sufixo <code>.exe</code>).
                  </p>
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded text-red-900 text-[11px]">
                    <strong>Atenção de Segurança:</strong> NUNCA adicione processos essenciais do Windows, tais como: <code>explorer</code>, <code>svchost</code>, <code>lsass</code>, <code>winlogon</code>, <code>csrss</code>, <code>services</code> ou <code>System</code>.
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: MÓDULO 2 — SUPERPROMPTS DE PRODUTIVIDADE COM IA */}
            <section id="modulo-2" className="space-y-8 pt-6 border-t border-gray-200 page-break-before">
              <div className="border-b border-gray-200 pb-3">
                <span className="font-mono text-xs font-bold text-purple-700 uppercase tracking-wider">Capítulo 3</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">3. Módulo 2 — Superprompts de Produtividade com IA</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Enquanto os scripts automatizam o sistema operacional, os superprompts automatizam o trabalho intelectual: sumarização de reuniões, atendimento a clientes e confecção de relatórios executivos.
                </p>
              </div>

              {/* PROMPT 1 */}
              <div id="prompt-1" className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Prompt 1 — Extrator de Tarefas e Resumos de E-mails/Reuniões</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  {PROMPTS[0].whenToUse}
                </p>

                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-1">Prompt para Copiar:</div>
                  <CodeBlock
                    id="code-prompt-1"
                    code={PROMPTS[0].promptText}
                    language="text"
                    title="Prompt Extrator de Tarefas"
                  />
                </div>

                {/* Exemplo de Entrada e Saída */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-700">Exemplo de Entrada:</span>
                    <CodeBlock
                      code={PROMPTS[0].exampleInput}
                      language="text"
                      title="Entrada Desestruturada"
                      showLineNumbers={false}
                      allowDownload={false}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-800">Exemplo de Saída Estruturada da IA:</span>
                    <CodeBlock
                      code={PROMPTS[0].exampleOutput}
                      language="markdown"
                      title="Saída Executiva e Acionável"
                      showLineNumbers={false}
                      allowDownload={false}
                    />
                  </div>
                </div>
              </div>

              {/* PROMPT 2: CENTRAL DE RESPOSTA (3 VARIAÇÕES) */}
              <div id="prompt-2" className="space-y-6 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Prompt 2 — Central de Resposta a Clientes (3 Variações)</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Três modelos para WhatsApp e e-mail: orçamentos ágeis, clientes insatisfeitos e cobranças com tom elegante.
                  </p>
                </div>

                {/* Variação 1: Orçamento */}
                <div className="space-y-3 p-4 bg-gray-50/70 border border-gray-200 rounded-lg">
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Variação 1 — Resposta Rápida para Orçamento</span>
                  </div>
                  <p className="text-xs text-gray-600">{PROMPTS[1].whenToUse}</p>
                  <CodeBlock
                    code={PROMPTS[1].promptText}
                    language="text"
                    title="Prompt Variação 1: Orçamento"
                  />
                  <div className="p-3 bg-white border border-gray-200 rounded text-xs">
                    <div className="font-semibold text-gray-800 mb-1">Exemplo de Resposta Gerada:</div>
                    <p className="text-gray-700 italic">{PROMPTS[1].exampleOutput}</p>
                  </div>
                </div>

                {/* Variação 2: Cliente Insatisfeito */}
                <div className="space-y-3 p-4 bg-gray-50/70 border border-gray-200 rounded-lg">
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    <span>Variação 2 — Cliente Insatisfeito ou com Problema</span>
                  </div>
                  <p className="text-xs text-gray-600">{PROMPTS[2].whenToUse}</p>
                  <CodeBlock
                    code={PROMPTS[2].promptText}
                    language="text"
                    title="Prompt Variação 2: Cliente Insatisfeito"
                  />
                  <div className="p-3 bg-white border border-gray-200 rounded text-xs">
                    <div className="font-semibold text-gray-800 mb-1">Exemplo de Resposta Gerada:</div>
                    <p className="text-gray-700 italic">{PROMPTS[2].exampleOutput}</p>
                  </div>
                </div>

                {/* Variação 3: Cobrança Elegante */}
                <div className="space-y-3 p-4 bg-gray-50/70 border border-gray-200 rounded-lg">
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Variação 3 — Cobrança Elegante de Pagamento Pendente</span>
                  </div>
                  <p className="text-xs text-gray-600">{PROMPTS[3].whenToUse}</p>
                  <CodeBlock
                    code={PROMPTS[3].promptText}
                    language="text"
                    title="Prompt Variação 3: Cobrança Elegante"
                  />
                  <div className="p-3 bg-white border border-gray-200 rounded text-xs">
                    <div className="font-semibold text-gray-800 mb-1">Exemplo de Resposta Gerada:</div>
                    <p className="text-gray-700 italic">{PROMPTS[3].exampleOutput}</p>
                  </div>
                </div>
              </div>

              {/* PROMPT 3: RELATÓRIOS SEMANAIS */}
              <div id="prompt-3" className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Prompt 3 — Gerador de Relatórios Semanais de Produtividade</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm">
                  {PROMPTS[4].whenToUse}
                </p>

                <CodeBlock
                  id="code-prompt-3"
                  code={PROMPTS[4].promptText}
                  language="text"
                  title="Prompt Gerador de Relatório Semanal"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-700">Entrada (Anotações Informais):</span>
                    <CodeBlock
                      code={PROMPTS[4].exampleInput}
                      language="text"
                      title="Anotações Esparsas da Semana"
                      showLineNumbers={false}
                      allowDownload={false}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-800">Saída Executiva Completa com Tabela:</span>
                    <CodeBlock
                      code={PROMPTS[4].exampleOutput}
                      language="markdown"
                      title="Relatório Executivo Pronto para Envio"
                      showLineNumbers={false}
                      allowDownload={false}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: CONCLUSÃO, ROTINA E CHECKLIST */}
            <section id="modulo-3" className="space-y-8 pt-6 border-t border-gray-200 page-break-before">
              <div className="border-b border-gray-200 pb-3">
                <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">Capítulo 4</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">4. Conclusão e Próximos Passos</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Automação não é construir um sistema gigante de uma só vez, mas eliminar pequenas tarefas repetitivas do cotidiano.
                </p>
              </div>

              {/* Como Incorporar o Kit à sua Rotina */}
              <div id="rotina" className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Como Incorporar o Kit à sua Rotina</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">1. Comece por uma tarefa repetitiva</strong>
                    <p className="text-gray-600">Não tente automatizar tudo de uma vez. Identifique o gargalo que mais consome cliques diários.</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">2. Crie uma pasta para suas automações</strong>
                    <p className="text-gray-600">Recomendação: <code>C:\Automacoes</code> centralizando seus scripts <code>.ps1</code> e <code>.bat</code>.</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">3. Personalize antes de executar</strong>
                    <p className="text-gray-600">Ajuste caminhos, origens de backup, destinos e páginas web de trabalho.</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">4. Teste pequeno antes de automatizar grande</strong>
                    <p className="text-gray-600">Valide com pastas de teste antes de rodar em diretórios críticos de trabalho.</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">5. Use IA como assistente, não oráculo</strong>
                    <p className="text-gray-600">Revise valores monetários, termos contratuais e dados técnicos gerados.</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                    <strong className="text-gray-900">6. Crie sua biblioteca de prompts</strong>
                    <p className="text-gray-600">Estruture categorias como Clientes, Trabalho, Relatórios e Reuniões.</p>
                  </div>
                </div>

                {/* A Regra dos 5 Minutos (Destaque Matemático) */}
                <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>7. A Regra dos 5 Minutos (O Impacto Cumulativo)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    Se uma tarefa leva 5 minutos e é realizada todos os dias úteis, o cálculo ao longo de um ano revela um ganho substancial:
                  </p>
                  <div className="p-3 bg-white border border-blue-200 rounded font-mono text-xs text-blue-950 space-y-1">
                    <div>5 minutos × 5 dias = 25 minutos por semana</div>
                    <div>25 minutos × 52 semanas = 1.300 minutos por ano</div>
                    <div className="font-bold text-blue-700">1.300 minutos ≈ 21,6 horas de trabalho recuperadas por ano!</div>
                  </div>
                </div>

                {/* Fluxo do Sistema */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
                  <div className="font-bold text-gray-900 text-xs sm:text-sm">8. Seu Primeiro Sistema de Produtividade em 5 Etapas</div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-700 pt-2">
                    <span className="p-1.5 bg-white border border-gray-300 rounded">1. ENTRADA (Downloads)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="p-1.5 bg-white border border-gray-300 rounded">2. ORGANIZAÇÃO (Script .ps1)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="p-1.5 bg-white border border-gray-300 rounded">3. EXECUÇÃO (Modo Foco)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="p-1.5 bg-white border border-gray-300 rounded">4. BACKUP (Robocopy)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="p-1.5 bg-white border border-gray-300 rounded">5. RELATÓRIO (Superprompt)</span>
                  </div>
                </div>
              </div>

              {/* CHECKLIST FINAL INTERATIVO */}
              <div id="checklist">
                <InteractiveChecklist />
              </div>

              {/* PALAVRA FINAL */}
              <div className="p-6 bg-gray-900 text-white rounded-xl space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Palavra Final</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Produtividade não é fazer tudo mais rápido. É gastar menos energia com aquilo que não precisa da sua atenção. Um computador pode organizar arquivos. Um script pode executar tarefas repetitivas. Uma IA pode transformar informação desorganizada em algo útil. E você pode concentrar seu tempo naquilo que realmente precisa de você.
                </p>
                <div className="pt-2 font-mono text-sm font-bold text-blue-400 tracking-wide">
                  Do caos ao clique único.
                </div>
              </div>

            </section>

            {/* Document Footer */}
            <footer className="pt-8 pb-12 border-t border-gray-200 text-center text-xs text-gray-500 space-y-2 print-cover-stamp">
              <p className="font-semibold text-gray-700">
                {BOOK_METADATA.title} — {BOOK_METADATA.subtitle}
              </p>
              <p>
                Documentação técnica gerada para compartilhamento com equipes de desenvolvimento de software e infraestrutura.
              </p>
              <div className="print-hide pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-gray-700 text-xs font-medium cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  <span>Imprimir / Exportar em PDF</span>
                </button>
              </div>
            </footer>

          </main>
        </div>
      </div>

      {/* Export PDF Modal */}
      <ExportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
