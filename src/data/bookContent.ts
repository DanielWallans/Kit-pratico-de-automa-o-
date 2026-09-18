export interface ScriptFile {
  id: string;
  title: string;
  filename: string;
  language: 'powershell' | 'bat' | 'text';
  category: 'windows-script' | 'prompt' | 'guide';
  code: string;
  description: string;
  howToUse: string[];
  customizationTips?: string[];
  expectedResult?: string;
}

export interface PromptItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  whenToUse: string;
  promptText: string;
  exampleInput: string;
  exampleOutput: string;
}

export const BOOK_METADATA = {
  title: "KIT PRÁTICO DE AUTOMAÇÃO E PRODUTIVIDADE",
  subtitle: "Do Caos ao Clique Único",
  description: "Scripts para Windows + Superprompts de IA para trabalhar melhor, mais rápido e com menos tarefas repetitivas",
  author: "Guia de Automação para Equipe de Desenvolvimento",
  version: "1.0.0",
  date: "Setembro / 2026",
};

export const TABLE_OF_CONTENTS = [
  { id: "intro", title: "1. Introdução Rápida" },
  { id: "seguranca", title: "Como Executar Scripts no Windows com Segurança" },
  { id: "salvar-bat", title: "Como Salvar um Arquivo .BAT" },
  { id: "salvar-ps1", title: "Como Salvar um Arquivo .PS1" },
  { id: "executar-admin", title: "Como Executar como Administrador" },
  { id: "modulo-1", title: "2. Módulo 1 — Scripts de Automação para Windows" },
  { id: "script-1", title: "• Script 1 — Organizador Automático de Arquivos (.ps1)" },
  { id: "script-2", title: "• Script 2 — Faxina Rápida de Disco (.bat)" },
  { id: "script-3", title: "• Script 3 — Backup Incremental em 1 Clique (.bat)" },
  { id: "script-4", title: "• Script 4 — Modo Foco / Encerramento Rápido (.ps1)" },
  { id: "modulo-2", title: "3. Módulo 2 — Superprompts de Produtividade com IA" },
  { id: "prompt-1", title: "• Prompt 1 — Extrator de Tarefas e Resumos de E-mails/Reuniões" },
  { id: "prompt-2", title: "• Prompt 2 — Central de Resposta a Clientes (3 Variações)" },
  { id: "prompt-3", title: "• Prompt 3 — Gerador de Relatórios Semanais de Produtividade" },
  { id: "modulo-3", title: "4. Conclusão e Próximos Passos" },
  { id: "rotina", title: "Como Incorporar o Kit à sua Rotina" },
  { id: "checklist", title: "Checklist Final da Equipe" },
];

export const SCRIPTS: ScriptFile[] = [
  {
    id: "script-1",
    title: "Script 1 — Organizador Automático de Arquivos",
    filename: "OrganizadorAutomatico.ps1",
    language: "powershell",
    category: "windows-script",
    description: "Analisa uma pasta escolhida (por padrão Downloads) e organiza automaticamente os arquivos em categorias estruturadas por extensão.",
    code: `# Define a pasta que será organizada.
# Por padrão, utiliza a pasta Downloads do usuário atual.
$PastaOrigem = Join-Path $env:USERPROFILE "Downloads"

# Cria uma tabela de categorias e suas respectivas extensões.
# Cada categoria receberá uma lista de extensões.
$Categorias = @{
    "Documentos" = @(".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt")
    "Imagens" = @(".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg")
    "Instaladores" = @(".exe", ".msi", ".msix", ".appx")
    "Planilhas" = @(".xls", ".xlsx", ".csv", ".ods")
    "Compactados" = @(".zip", ".rar", ".7z", ".tar", ".gz")
}

# Verifica se a pasta de origem realmente existe.
if (-not (Test-Path -LiteralPath $PastaOrigem)) {

    # Exibe uma mensagem de erro caso a pasta não seja encontrada.
    Write-Host "A pasta de origem nao foi encontrada: $PastaOrigem"

    # Encerra o script.
    exit
}

# Percorre todas as categorias configuradas.
foreach ($Categoria in $Categorias.Keys) {

    # Monta o caminho completo da pasta da categoria.
    $PastaDestino = Join-Path $PastaOrigem $Categoria

    # Cria a pasta caso ela ainda nao exista.
    New-Item -ItemType Directory -Path $PastaDestino -Force | Out-Null
}

# Obtém somente arquivos diretamente dentro da pasta de origem.
$Arquivos = Get-ChildItem -LiteralPath $PastaOrigem -File

# Percorre cada arquivo encontrado.
foreach ($Arquivo in $Arquivos) {

    # Obtém a extensão do arquivo em letras minusculas.
    $Extensao = $Arquivo.Extension.ToLower()

    # Define inicialmente que o arquivo ainda nao possui categoria.
    $CategoriaEncontrada = $null

    # Procura a extensão dentro das categorias configuradas.
    foreach ($Categoria in $Categorias.Keys) {

        # Verifica se a categoria atual possui a extensão do arquivo.
        if ($Categorias[$Categoria] -contains $Extensao) {

            # Guarda o nome da categoria encontrada.
            $CategoriaEncontrada = $Categoria

            # Interrompe a procura porque a categoria foi encontrada.
            break
        }
    }

    # Verifica se alguma categoria foi encontrada.
    if ($CategoriaEncontrada) {

        # Cria o caminho da pasta de destino.
        $PastaDestino = Join-Path $PastaOrigem $CategoriaEncontrada

        # Cria o caminho final do arquivo.
        $Destino = Join-Path $PastaDestino $Arquivo.Name

        # Verifica se já existe um arquivo com o mesmo nome.
        if (Test-Path -LiteralPath $Destino) {

            # Exibe uma mensagem e nao sobrescreve o arquivo existente.
            Write-Host "Ignorado: $($Arquivo.Name) ja existe no destino."
        }
        else {

            # Move o arquivo para sua categoria.
            Move-Item -LiteralPath $Arquivo.FullName -Destination $Destino

            # Exibe uma mensagem informando o que foi feito.
            Write-Host "Movido: $($Arquivo.Name) -> $CategoriaEncontrada"
        }
    }
}

# Exibe uma mensagem final.
Write-Host ""
Write-Host "Organizacao concluida."`,
    howToUse: [
      "Abra o Bloco de Notas (Windows + R -> notepad -> Enter).",
      "Cole o código do script acima.",
      "Salve como OrganizadorAutomatico.ps1 selecionando 'Todos os arquivos' e UTF-8.",
      "Coloque o arquivo na Área de Trabalho ou pasta de sua preferência.",
      "Clique com o botão direito e escolha 'Executar com PowerShell'."
    ],
    customizationTips: [
      "Para organizar outra pasta, altere: $PastaOrigem = Join-Path $env:USERPROFILE 'Downloads' para um caminho fixo como $PastaOrigem = 'C:\\Users\\Daniel\\Desktop\\Arquivos' ou 'D:\\Trabalho'.",
      "Adicione novas extensões à tabela $Categorias se precisar (ex: .mp4, .mov na categoria 'Videos')."
    ],
    expectedResult: `Antes:
Downloads/
├── contrato.pdf
├── foto.jpg
├── planilha.xlsx
├── programa.exe
└── backup.zip

Depois:
Downloads/
├── Documentos/
│   └── contrato.pdf
├── Imagens/
│   └── foto.jpg
├── Instaladores/
│   └── programa.exe
├── Planilhas/
│   └── planilha.xlsx
└── Compactados/
    └── backup.zip`
  },
  {
    id: "script-2",
    title: "Script 2 — Faxina Rápida de Disco",
    filename: "FaxinaRapida.bat",
    language: "bat",
    category: "windows-script",
    description: "Executa limpeza básica segura de arquivos temporários do usuário e do Windows, além de renovar o cache DNS.",
    code: `@echo off
REM Desativa a exibicao dos comandos para deixar o terminal mais limpo.

title Faxina Rapida de Disco
REM Define o titulo da janela do terminal.

color 07
REM Mantem as cores padrao do Prompt de Comando.

echo ==========================================
REM Exibe uma linha de separacao.

echo        FAXINA RAPIDA DE DISCO
REM Exibe o nome da ferramenta.

echo ==========================================
REM Exibe outra linha de separacao.

echo.
REM Cria uma linha em branco.

echo Limpando arquivos temporarios do usuario...
REM Informa que a limpeza da pasta TEMP do usuario sera iniciada.

del /f /s /q "%TEMP%\\*" >nul 2>&1
REM Remove arquivos temporarios do usuario.
REM /f força a remocao de arquivos somente quando permitido pelo sistema.
REM /s inclui subpastas.
REM /q evita perguntas de confirmacao.
REM >nul 2>&1 oculta mensagens tecnicas desnecessarias.

for /d %%D in ("%TEMP%\\*") do rd /s /q "%%D" >nul 2>&1
REM Tenta remover subpastas vazias ou temporarias dentro da pasta TEMP.
REM O Windows pode impedir a remocao de arquivos que estejam em uso.

echo Limpeza do TEMP do usuario concluida.
REM Informa o termino dessa etapa.

echo.
REM Cria uma linha em branco.

echo Limpando arquivos temporarios do Windows...
REM Informa o inicio da limpeza da pasta temporaria do Windows.

del /f /s /q "%WINDIR%\\Temp\\*" >nul 2>&1
REM Remove arquivos temporarios que possam ser excluidos com seguranca.
REM Arquivos atualmente utilizados pelo sistema podem permanecer.

for /d %%D in ("%WINDIR%\\Temp\\*") do rd /s /q "%%D" >nul 2>&1
REM Tenta remover subpastas temporarias que nao estejam em uso.

echo Limpeza dos arquivos temporarios do Windows concluida.
REM Informa o termino da segunda etapa.

echo.
REM Cria uma linha em branco.

echo Limpando cache DNS...
REM Informa que o cache DNS sera renovado.

ipconfig /flushdns
REM Limpa o cache DNS armazenado pelo Windows.

echo.
REM Cria uma linha em branco.

echo ==========================================
REM Exibe uma linha final.

echo        FAXINA CONCLUIDA
REM Informa que o processo terminou.

echo ==========================================
REM Fecha a moldura visual.

echo.
REM Cria uma linha em branco.

pause
REM Mantem a janela aberta para que o usuario possa visualizar o resultado.`,
    howToUse: [
      "Abra o Bloco de Notas (Windows + R -> notepad -> Enter).",
      "Cole o código .bat acima.",
      "Salve como FaxinaRapida.bat em 'Todos os arquivos' com codificação UTF-8.",
      "Clique com o botão direito no arquivo e selecione 'Executar como administrador' se quiser limpar pastas do sistema."
    ],
    customizationTips: [
      "Arquivos temporários atualmente abertos por navegadores ou pelo próprio Windows não serão apagados, o que é um comportamento de proteção esperado e normal."
    ]
  },
  {
    id: "script-3",
    title: "Script 3 — Backup Incremental em 1 Clique",
    filename: "BackupIncremental.bat",
    language: "bat",
    category: "windows-script",
    description: "Utiliza o utilitário nativo Robocopy para realizar cópia incremental inteligente e não-destrutiva de uma pasta de trabalho para outro destino.",
    code: `@echo off
REM Desativa a exibicao dos comandos para deixar a janela mais organizada.

title Backup Incremental em 1 Clique
REM Define o titulo da janela.

set "ORIGEM=C:\\Trabalho"
REM Define a pasta que sera protegida pelo backup.
REM ALTERE este caminho para a sua pasta real.

set "DESTINO=D:\\Backup\\Trabalho"
REM Define o local onde o backup sera armazenado.
REM ALTERE este caminho para o seu destino real.

echo ==========================================
REM Exibe uma linha visual.

echo       BACKUP INCREMENTAL
REM Exibe o nome da ferramenta.

echo ==========================================
REM Exibe outra linha visual.

echo.
REM Cria uma linha em branco.

if not exist "%ORIGEM%\\" (
    echo ERRO: A pasta de origem nao existe.
    echo Caminho: %ORIGEM%
    pause
    exit /b 1
)
REM Verifica se a pasta de origem realmente existe.
REM Caso nao exista, o script interrompe o processo.

if not exist "%DESTINO%\\" (
    mkdir "%DESTINO%"
)
REM Cria a pasta de destino caso ela ainda nao exista.

echo Origem:
REM Exibe o titulo da origem.

echo %ORIGEM%
REM Mostra o caminho configurado.

echo.
REM Cria uma linha em branco.

echo Destino:
REM Exibe o titulo do destino.

echo %DESTINO%
REM Mostra o caminho configurado.

echo.
REM Cria uma linha em branco.

echo Iniciando copia incremental...
REM Informa que a copia sera iniciada.

robocopy "%ORIGEM%" "%DESTINO%" /E /XO /FFT /Z /R:2 /W:2 /XJ
REM Executa o Robocopy.
REM /E copia subpastas, inclusive as vazias.
REM /XO ignora arquivos existentes no destino que sejam mais recentes.
REM /FFT utiliza uma tolerancia de dois segundos nas comparacoes de horario.
REM /Z permite que a copia possa ser retomada em determinadas interrupcoes.
REM /R:2 tenta novamente duas vezes quando ocorre uma falha.
REM /W:2 espera dois segundos entre as tentativas.
REM /XJ evita seguir juncoes de diretorios que podem causar copias indesejadas.

echo.
REM Cria uma linha em branco.

echo ==========================================
REM Exibe uma linha visual.

echo       BACKUP FINALIZADO
REM Informa que o processo foi encerrado.

echo ==========================================
REM Exibe a linha final.

echo.
REM Cria uma linha em branco.

echo Verifique a pasta de destino para confirmar os arquivos.
REM Recomenda uma verificacao simples do resultado.

pause
REM Mantem a janela aberta.`,
    howToUse: [
      "Salve o código como BackupIncremental.bat.",
      "Abra o arquivo no Bloco de Notas para configurar as linhas set \"ORIGEM=\" e set \"DESTINO=\".",
      "Exemplo: set \"ORIGEM=C:\\Users\\Daniel\\Documents\\Projetos\" e set \"DESTINO=D:\\Backup\\Projetos\".",
      "Certifique-se de que o disco de destino esteja conectado e execute o arquivo com duplo clique."
    ],
    customizationTips: [
      "Este script NÃO utiliza o parâmetro /MIR (espelhamento destrutivo), evitando deletar acidentalmente arquivos no destino caso você os apague na origem.",
      "Regra de ouro: Backup que nunca foi testado não é um backup confiável. Abra a pasta de destino após a execução para conferir."
    ]
  },
  {
    id: "script-4",
    title: "Script 4 — Modo Foco / Encerramento Rápido",
    filename: "ModoFoco.ps1",
    language: "powershell",
    category: "windows-script",
    description: "Fecha aplicativos de distração definidos (como WhatsApp, Telegram, Discord) e abre imediatamente a sua página de trabalho no navegador.",
    code: `# Exibe o inicio do processo.
Write-Host "=========================================="

# Exibe o nome da ferramenta.
Write-Host "          MODO FOCO"

# Exibe uma linha de separacao.
Write-Host "=========================================="

# Lista os programas que podem ser encerrados.
# IMPORTANTE: informe os nomes dos processos sem ".exe".
$ProcessosParaFechar = @(
    "WhatsApp",
    "Telegram",
    "Discord"
)

# Percorre cada processo definido na lista.
foreach ($NomeProcesso in $ProcessosParaFechar) {

    # Procura o processo pelo nome.
    $Processo = Get-Process -Name $NomeProcesso -ErrorAction SilentlyContinue

    # Verifica se o processo foi encontrado.
    if ($Processo) {

        # Informa que o processo sera encerrado.
        Write-Host "Encerrando: $NomeProcesso"

        # Solicita o encerramento normal do processo.
        $Processo | Stop-Process -ErrorAction SilentlyContinue
    }
    else {

        # Informa que o programa nao estava aberto.
        Write-Host "Nao encontrado ou ja fechado: $NomeProcesso"
    }
}

# Define a pagina de trabalho que sera aberta.
$PaginaDeTrabalho = "https://calendar.google.com"

# Exibe a informacao da pagina que sera aberta.
Write-Host ""
Write-Host "Abrindo pagina de trabalho..."

# Abre a pagina no navegador padrao do Windows.
Start-Process $PaginaDeTrabalho

# Exibe uma mensagem final.
Write-Host ""
Write-Host "Modo Foco ativado."

# Exibe uma linha final.
Write-Host "=========================================="`,
    howToUse: [
      "Salve como ModoFoco.ps1.",
      "Personalize a lista de processos na variável $ProcessosParaFechar.",
      "Personalize a URL da sua ferramenta de trabalho na variável $PaginaDeTrabalho.",
      "Execute com PowerShell ao iniciar o bloco de concentração."
    ],
    customizationTips: [
      "Para descobrir o nome correto de um processo, abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) e veja a aba Detalhes.",
      "NUNCA adicione processos essenciais do sistema operacional (explorer, svchost, lsass, winlogon, services)."
    ]
  }
];

export const PROMPTS: PromptItem[] = [
  {
    id: "prompt-1",
    title: "Prompt 1 — Extrator de Tarefas e Resumos de E-mails/Reuniões",
    category: "Organização & Reuniões",
    whenToUse: "Ao receber e-mails longos, atas de reuniões, anotações desestruturadas ou conversas para extrair responsáveis, prazos e prioridades.",
    promptText: `Aja como um assistente profissional de produtividade e organização de tarefas.

Vou fornecer abaixo um e-mail, ata de reunião, conversa ou conjunto de anotações.

Sua função é analisar o conteúdo e transformar informações dispersas em tarefas objetivas e acionáveis.

TEXTO PARA ANALISAR:

[INSIRA SEU TEXTO]

Siga estas regras:

1. Não invente informações que não estejam no texto.
2. Se o responsável não estiver definido, escreva "Não definido".
3. Se o prazo não estiver definido, escreva "Não definido".
4. Se existir uma data explícita, preserve a data.
5. Separe tarefas reais de comentários, opiniões ou informações gerais.
6. Evite repetir a mesma tarefa.
7. Escreva as tarefas de forma curta e clara.
8. Identifique dependências importantes quando existirem.
9. Se houver informações contraditórias, sinalize a contradição.
10. No final, apresente um resumo executivo curto.

Entregue o resultado exatamente nesta estrutura:

## RESUMO

[Resumo de até 5 linhas]

## TAREFAS

| O que fazer | Responsável | Prazo |
|---|---|---|
| Tarefa | Responsável | Prazo |

## PONTOS DE ATENÇÃO

- [Ponto relevante]
- [Ponto relevante]

## INFORMAÇÕES SEM RESPONSÁVEL OU PRAZO

- [Informação]
- [Informação]`,
    exampleInput: `Na reunião de segunda-feira ficou definido que Carlos vai atualizar os preços dos produtos até sexta-feira.

Maria precisa enviar as imagens novas para o site amanhã.

João comentou que seria interessante melhorar o formulário de contato, mas ainda não ficou decidido.

Também precisamos verificar com o fornecedor se o prazo de entrega continua sendo de 7 dias.`,
    exampleOutput: `## RESUMO

Foram definidas três ações principais: atualização de preços, envio de imagens e confirmação do prazo de entrega com o fornecedor. Também foi levantada uma possível melhoria no formulário de contato, ainda sem decisão.

## TAREFAS

| O que fazer | Responsável | Prazo |
|---|---|---|
| Atualizar os preços dos produtos | Carlos | Sexta-feira |
| Enviar as novas imagens para o site | Maria | Amanhã |
| Confirmar prazo de entrega com o fornecedor | Não definido | Não definido |

## PONTOS DE ATENÇÃO

- A melhoria do formulário de contato ainda não foi aprovada.
- É necessário definir quem fará o contato com o fornecedor.

## INFORMAÇÕES SEM RESPONSÁVEL OU PRAZO

- Melhorar o formulário de contato.
- Confirmar o prazo de entrega com o fornecedor.`
  },
  {
    id: "prompt-2-var1",
    title: "Prompt 2 (Variação 1) — Resposta Rápida para Orçamento",
    category: "Atendimento & Clientes",
    whenToUse: "Quando um cliente solicitar preço, prazos e condições de serviço via WhatsApp ou e-mail.",
    promptText: `Aja como um profissional de atendimento ao cliente de uma pequena empresa.

Preciso responder um cliente que solicitou um orçamento.

Informações disponíveis:

Nome do cliente:
[INSIRA O NOME]

Produto ou serviço:
[INSIRA O PRODUTO OU SERVIÇO]

Preço:
[INSIRA O PREÇO]

Prazo:
[INSIRA O PRAZO]

Condições de pagamento:
[INSIRA AS CONDIÇÕES]

Informações adicionais:
[INSIRA OUTRAS INFORMAÇÕES]

Mensagem original do cliente:
[INSIRA A MENSAGEM]

Crie uma resposta profissional, clara e natural.

Regras:

- Não seja excessivamente formal.
- Não utilize linguagem robótica.
- Não invente informações.
- Não altere preço ou prazo.
- Destaque os principais pontos do orçamento.
- Termine incentivando o cliente a tirar dúvidas ou confirmar o serviço.
- A resposta deve funcionar bem para WhatsApp.
- Seja objetiva.

Entregue somente a mensagem final pronta para enviar.`,
    exampleInput: `Nome: Rafael
Serviço: Manutenção de notebook
Preço: R$ 180
Prazo: 2 dias úteis
Pagamento: Pix ou cartão
Mensagem: "Boa tarde, quanto fica para fazer a manutenção do meu notebook?"`,
    exampleOutput: `Boa tarde, Rafael! Tudo bem?

A manutenção do notebook fica em R$ 180, com prazo de até 2 dias úteis para conclusão.

O pagamento pode ser feito via Pix ou cartão.

Se quiser, posso deixar o atendimento agendado e você pode trazer o equipamento para avaliarmos.`
  },
  {
    id: "prompt-2-var2",
    title: "Prompt 2 (Variação 2) — Cliente Insatisfeito ou com Problema",
    category: "Atendimento & Clientes",
    whenToUse: "Quando o cliente reclamar de um atraso, defeito ou insatisfação, transformando a conversa em resolução objetiva e acolhedora sem defensividade.",
    promptText: `Aja como um profissional experiente de atendimento e relacionamento com clientes.

Preciso responder um cliente que está insatisfeito.

Contexto do atendimento:

Nome do cliente:
[INSIRA O NOME]

Produto ou serviço:
[INSIRA O PRODUTO OU SERVIÇO]

Problema relatado:
[INSIRA O PROBLEMA]

O que já foi feito:
[INSIRA O QUE JÁ FOI FEITO]

O que podemos oferecer:
[INSIRA A SOLUÇÃO DISPONÍVEL]

Mensagem do cliente:
[INSIRA A MENSAGEM]

Crie uma resposta pronta para WhatsApp.

Regras:

- Reconheça a situação sem assumir culpa por algo que não esteja confirmado.
- Demonstre atenção ao problema.
- Não discuta com o cliente.
- Não utilize respostas defensivas.
- Explique o próximo passo.
- Não prometa algo que não foi informado.
- Seja profissional e humana.
- Evite textos longos.
- Não use linguagem excessivamente corporativa.

Entregue somente a mensagem final.`,
    exampleInput: `Cliente: "Vocês falaram que ficaria pronto ontem e até agora ninguém me deu retorno. Estou esperando o dia inteiro."

Contexto: O equipamento ainda está em análise e o técnico não concluiu o diagnóstico.
Solução: Informar que a análise está em andamento e oferecer atualização assim que houver uma posição.`,
    exampleOutput: `Olá! Entendo sua preocupação e peço desculpas pela falta de retorno.

O equipamento ainda está em análise e o diagnóstico não foi concluído. Vou acompanhar a situação e, assim que tivermos uma posição concreta, te atualizo com as informações e o próximo passo.

Obrigado pela paciência.`
  },
  {
    id: "prompt-2-var3",
    title: "Prompt 2 (Variação 3) — Cobrança Elegante de Pagamento Pendente",
    category: "Atendimento & Clientes",
    whenToUse: "Para lembrar o cliente sobre pendência financeira sem parecer agressivo, constrangedor ou presunçoso.",
    promptText: `Aja como um profissional de atendimento financeiro de uma pequena empresa.

Preciso enviar uma mensagem sobre um pagamento pendente.

Dados:

Nome do cliente:
[INSIRA O NOME]

Serviço ou produto:
[INSIRA O SERVIÇO OU PRODUTO]

Valor:
[INSIRA O VALOR]

Data de vencimento:
[INSIRA A DATA]

Forma de pagamento:
[INSIRA A FORMA DE PAGAMENTO]

Informação adicional:
[INSIRA INFORMAÇÕES]

Crie uma mensagem curta para WhatsApp.

Regras:

- Seja educado.
- Seja direto.
- Não pareça ameaçador.
- Não utilize linguagem constrangedora.
- Não presuma que o cliente está agindo de má-fé.
- Informe claramente o valor e a data quando fornecidos.
- Caso seja possível, ofereça uma abertura para o cliente informar se já realizou o pagamento.
- Não invente juros, multas ou consequências.

Entregue somente a mensagem pronta para envio.`,
    exampleInput: `Nome: Marcelo
Serviço: Manutenção do computador
Valor: R$ 250
Vencimento: 15/09
Pagamento: Pix`,
    exampleOutput: `Olá, Marcelo! Tudo bem?

Passando apenas para lembrar que ficou pendente o pagamento de R$ 250 referente à manutenção do computador, com vencimento em 15/09.

Caso o pagamento já tenha sido realizado, pode desconsiderar esta mensagem. Se precisar dos dados para o Pix, posso te enviar novamente.`
  },
  {
    id: "prompt-3",
    title: "Prompt 3 — Gerador de Relatórios Semanais de Produtividade",
    category: "Gestão & Relatórios",
    whenToUse: "No fechamento semanal para compilar dezenas de tarefas dispersas em um relatório executivo pronto para diretoria, gestores ou clientes.",
    promptText: `Aja como um analista profissional de produtividade e elaboração de relatórios executivos.

Vou fornecer uma lista de atividades realizadas durante uma semana.

Transforme essas informações em um relatório semanal profissional, claro e objetivo.

ATIVIDADES DA SEMANA:

[INSIRA SUA LISTA DE ATIVIDADES]

PERÍODO:

[INSIRA O PERÍODO]

PROJETO, CLIENTE OU EMPRESA:

[INSIRA O NOME]

OBJETIVO PRINCIPAL DA SEMANA:

[INSIRA O OBJETIVO, SE HOUVER]

Regras:

1. Não invente atividades, resultados, números ou informações.
2. Organize atividades semelhantes em grupos.
3. Remova repetições.
4. Transforme anotações informais em linguagem profissional.
5. Destaque entregas concluídas.
6. Separe atividades concluídas de atividades em andamento.
7. Identifique pendências quando existirem.
8. Preserve informações importantes fornecidas.
9. Se não houver dados suficientes para afirmar um resultado, não invente um.
10. Mantenha o relatório objetivo.
11. O texto deve ser adequado para apresentação a um cliente ou gestor.

Utilize exatamente esta estrutura:

# RELATÓRIO SEMANAL DE ATIVIDADES

## 1. Período

[Período]

## 2. Objetivo da Semana

[Objetivo]

## 3. Resumo Executivo

[Resumo profissional em um ou dois parágrafos]

## 4. Atividades Realizadas

| Atividade | Situação | Observação |
|---|---|---|
| Atividade | Concluída | Observação |

## 5. Principais Entregas

- [Entrega]
- [Entrega]
- [Entrega]

## 6. Atividades em Andamento

- [Atividade]

## 7. Pendências e Próximos Passos

- [Pendência ou próximo passo]

## 8. Considerações Finais

[Conclusão curta e profissional]`,
    exampleInput: `Semana de 14 a 18 de setembro.

Cliente: Empresa XPTO.

Objetivo: finalizar melhorias no sistema e atender solicitações do cliente.

- Corrigi erro no cadastro de clientes.
- Fiz reunião com cliente na terça.
- Ajustei tela de login.
- Cliente pediu alteração no relatório financeiro.
- Fiz backup do banco.
- Corrigi problema de impressão.
- Comecei alteração no relatório financeiro.
- Testei as alterações no sistema.
- Enviei atualização para o cliente.`,
    exampleOutput: `# RELATÓRIO SEMANAL DE ATIVIDADES

## 1. Período

14 a 18 de setembro.

## 2. Objetivo da Semana

Finalizar melhorias no sistema, corrigir problemas identificados e atender às solicitações apresentadas pelo cliente.

## 3. Resumo Executivo

Durante a semana foram realizadas correções no cadastro de clientes, tela de login e processo de impressão. Também foram realizados testes das alterações implementadas, backup do banco de dados e uma reunião com o cliente para alinhamento de novas necessidades.

Uma nova alteração no relatório financeiro foi iniciada a partir da solicitação apresentada pelo cliente e permanece em andamento.

## 4. Atividades Realizadas

| Atividade | Situação | Observação |
|---|---|---|
| Correção do cadastro de clientes | Concluída | Erro corrigido |
| Ajuste da tela de login | Concluída | Alteração implementada |
| Correção do processo de impressão | Concluída | Problema corrigido |
| Backup do banco de dados | Concluída | Backup realizado |
| Testes das alterações | Concluída | Alterações testadas |
| Reunião com o cliente | Concluída | Alinhamento realizado |
| Alteração do relatório financeiro | Em andamento | Solicitação do cliente |

## 5. Principais Entregas

- Correção do cadastro de clientes.
- Ajuste da tela de login.
- Correção do problema de impressão.
- Realização de backup do banco de dados.
- Testes das alterações realizadas.

## 6. Atividades em Andamento

- Desenvolvimento da alteração solicitada para o relatório financeiro.

## 7. Pendências e Próximos Passos

- Concluir a alteração do relatório financeiro.
- Realizar os testes relacionados à nova alteração.
- Enviar a atualização ao cliente para validação.

## 8. Considerações Finais

A semana foi concentrada em correções, melhorias e alinhamento de novas demandas. As principais correções previstas foram concluídas e a próxima etapa está relacionada à finalização da alteração solicitada para o relatório financeiro.`
  }
];

export const CHECKLIST_ITEMS = [
  "Criei uma pasta para minhas automações (ex: C:\\Automacoes).",
  "Salvei o Organizador Automático (OrganizadorAutomatico.ps1).",
  "Configurei a pasta correta do Organizador ($PastaOrigem).",
  "Testei a Faxina Rápida (FaxinaRapida.bat).",
  "Configurei corretamente a origem do Backup (%ORIGEM%).",
  "Configurei corretamente o destino do Backup (%DESTINO%).",
  "Testei o Backup e confirmei os arquivos copiados na pasta de destino.",
  "Configurei os programas do Modo Foco ($ProcessosParaFechar).",
  "Configurei minha página de trabalho no Modo Foco ($PaginaDeTrabalho).",
  "Salvei meus prompts favoritos na minha ferramenta de IA.",
  "Criei uma pasta para minha biblioteca pessoal de prompts.",
  "Escolhi pelo menos uma tarefa repetitiva diária para automatizar hoje."
];
