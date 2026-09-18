export const POPS_CATALOG = [
  {
    id: "POP-NOC-001",
    code: "POP-NOC-001",
    title: "Monitoração de Subida de Vendas DataHub (Grafana)",
    category: "Subida de Vendas",
    author: "Central de Comando / NOC DPSP",
    updatedAt: "2026-08-03",
    description: "Procedimento para acompanhamento do fluxo de envio de vendas das filiais (DPA/DSP) para o DataHub no Grafana e ações em caso de estabilização da linha.",
    prerequisites: ["Acesso ao Dashboard Grafana DPSP", "Acesso à monitoria NOC de Vendas"],
    steps: [
      { id: 1, title: "Validação Visual no Grafana", desc: "Confirmar se o gráfico parou completamente (linha reta sem atualização) ou se foi apenas uma oscilação pontual nos últimos 5 minutos." },
      { id: 2, title: "Cruzamento de Dados com Gaps", desc: "Comparar o gráfico do DataHub com as telas auxiliares de 'Gap Venda' e 'Vendas Represadas EPs'." },
      { id: 3, title: "Identificação do Escopo", desc: "Verificar se a queda afeta todas as bandeiras ou se é isolada na DPA (Drogarias Pacheco) ou DSP (Drogaria São Paulo)." },
      { id: 4, title: "Coleta de Evidências", desc: "Capturar o print da tela do Grafana incluindo relógio/timestamp, volume anterior vs. atual e percentual de pendência." },
      { id: 5, title: "Acionamento de Engenharia DataHub", desc: "Acionar o engenheiro responsável (Alexandre / João Carlos / Fabio) informando a parada no gráfico." }
    ],
    codeSnippets: [
      { label: "Link do Grafana Subida de Vendas", code: "https://grafana.dpsp.int/d/subida-vendas-datahub/overview" },
      { label: "Comando de teste de porta DataHub", code: "Test-NetConnection -ComputerName datahub.dpsp.int -Port 8080" }
    ],
    escalationTeam: "Equipe DataHub / Alexandre / Fabio",
    severity: "alta"
  },
  {
    id: "POP-NOC-002",
    code: "POP-NOC-002",
    title: "Descida de Bases e Carga de Preço (PRD_DPSP)",
    category: "Descida de Bases",
    author: "Central de Comando / NOC DPSP",
    updatedAt: "2026-07-31",
    description: "Procedimento para verificação da carga diária de cadastros e preços nas instâncias de produção e diagnósticos de logs sc_libera.",
    prerequisites: ["Acesso via JUMP-BOX-01 ou JUMP-BOX-02", "Privilégio de leitura na instância PRD_DPSP"],
    steps: [
      { id: 1, title: "Acesso ao Servidor Jump-Box", desc: "Conectar via RDP no servidor JUMP-BOX-01 (10.12.44.15) ou JUMP-BOX-02." },
      { id: 2, title: "Consulta SQL de Lote de Referência", desc: "Executar a query de verificação do lote do dia na instância PRD_DPSP." },
      { id: 3, title: "Inspeção do Arquivo sc_libera.log", desc: "Navegar até a pasta de logs e verificar se existe o arquivo sc_libera_AAAAMMDD.log com data de modificação de hoje." },
      { id: 4, title: "Busca de Erros Críticos", desc: "Buscar dentro do log por palavras-chave: ERROR, EXCEPTION, TIMEOUT, Invalid username/password." },
      { id: 5, title: "Validação de Configurações", desc: "Em caso de falha de conexão, validar os parâmetros de IP e porta no arquivo MessagingConstants.properties." }
    ],
    codeSnippets: [
      { label: "Caminho do Log de Liberação", code: "C:\\dpsp\\base\\logs\\sc_libera_" + new Date().toISOString().slice(0,10).replace(/-/g,"") + ".log" },
      { label: "Query SQL de Validação do Lote", code: "SELECT LOTE_ID, STATUS, QTD_LOJAS, DATA_HORA FROM PRD_DPSP.CARGA_PRECO_LOG WHERE DATA_CARGA = TRUNC(SYSDATE);" }
    ],
    escalationTeam: "Equipe Banco de Dados (DB SAP) / Wipro",
    severity: "critica"
  },
  {
    id: "POP-NOC-003",
    code: "POP-NOC-003",
    title: "Troubleshooting de Conectividade & Fortinet Lojas",
    category: "Conectividade / Telecom",
    author: "Equipe Telecom / NOC DPSP",
    updatedAt: "2026-08-01",
    description: "Roteiro de diagnósticos para filiais que relatam lentidão ou queda nos links MPLS/Internet e validação de gateway por bandeira.",
    prerequisites: ["Acesso ao Console Fortinet FortiManager", "Console Zabbix Lojas"],
    steps: [
      { id: 1, title: "Validação SLA no Fortinet", desc: "Verificar se há perda de pacotes, aumento repentino de Jitter ou Latência acima de 120ms no circuito principal." },
      { id: 2, title: "Bateria de Pings por Bandeira", desc: "Executar o ping continuo para o gateway da loja. Lojas DPA usam terminação .250, lojas DSP usam terminação .97." },
      { id: 3, title: "Verificação do Desk-Server Local", desc: "Checar se o Desk-Server da filial está com alto uso de CPU/RAM ou se existem sessões RDP órfãs na aba Usuários." },
      { id: 4, title: "Teste do Autorizador TEF / Sitef", desc: "Validar se a comunicação com o concentrador TEF permanece ativa pela rota de contingência." },
      { id: 5, title: "Acionamento de Operadora", desc: "Caso o circuito principal esteja DOWN, solicitar abertura de chamado na operadora (Vivo / Embratel) informando o número da designação." }
    ],
    codeSnippets: [
      { label: "Ping Gateway Loja DSP", code: "ping 10.X.Y.97 -t" },
      { label: "Ping Gateway Loja DPA", code: "ping 10.X.Y.250 -t" }
    ],
    escalationTeam: "Telecom / Vivo Empresas / Embratel",
    severity: "alta"
  },
  {
    id: "POP-NOC-004",
    code: "POP-NOC-004",
    title: "Fluxo Completo da Malha de Preços (PeopleSoft & CAWA)",
    category: "Malha de Preços",
    author: "Gerência de Sistemas & NOC",
    updatedAt: "2026-07-28",
    description: "Passo a passo de acompanhamento das janelas das 11:00h e 16:00h da malha de preços e envio aos caixas das 2.085 lojas.",
    prerequisites: ["Acesso ao PeopleSoft ERP DPSP", "Acesso ao CAWA Workload Automation"],
    steps: [
      { id: 1, title: "Acompanhamento PeopleSoft (11h e 16h)", desc: "Acessar o módulo PeopleSoft ERP e validar a execução do processo DSP_APDV_PVL nas janelas exatas das 11:00 e 16:00." },
      { id: 2, title: "Disparo no CAWA Workload Automation", desc: "Conectar no console CAWA (wscwaapdcprd01:8443) e verificar se o job de precificação foi iniciado sem erros." },
      { id: 3, title: "Controle de Distribuição", desc: "Acompanhar a fila de envio das cargas para as lojas e conferir o percentual de filiais atualizadas." },
      { id: 4, title: "Contingência em Lojas Atrasadas", desc: "Caso alguma loja não receba o lote até às 18:00h, notificar a gerência de Pricing para disparo manual." }
    ],
    codeSnippets: [
      { label: "URL do PeopleSoft ERP", code: "http://peoplesoft.dsp.int/psp/dpsperp/EMPLOYEE/ERP/?cmd=logout" },
      { label: "Console CAWA Workload Automation", code: "https://wscwaapdcprd01:8443/deui/login#!/" }
    ],
    escalationTeam: "Equipe Pricing & Commercial SAP",
    severity: "alta"
  },
  {
    id: "POP-NOC-005",
    code: "POP-NOC-005",
    title: "Procedimento do Plantão da Madrugada (00h00)",
    category: "Plantão 00h",
    author: "Operação NOC / Central de Comando",
    updatedAt: "2026-08-02",
    description: "Checklist obrigatório para a equipe de plantão noturno após encerramento do expediente das lojas.",
    prerequisites: ["Script monitor_vd_ping instalado no C:\\zabbix\\base\\", "Acesso ao e-mail institucional do NOC"],
    steps: [
      { id: 1, title: "Conclusão do Processo Warley (FW)", desc: "Confirmar a finalização do lote FW no ambiente de retaguarda." },
      { id: 2, title: "Execução do Script monitor_vd_ping", desc: "Executar o script PowerShell em C:\\zabbix\\base\\Projeto atualização (Power Shell) - monitor_vd_ping.ps1." },
      { id: 3, title: "Validação dos IPs de Lojas UP", desc: "Conferir o relatório gerado e garantir que todas as filiais estejam respondendo via ICMP." },
      { id: 4, title: "Envio de E-mail de Status", desc: "Responder a thread de e-mail do NOC anexando os prints coletados pós-23h20 e pós-00h00." }
    ],
    codeSnippets: [
      { label: "Script PowerShell de Ping 00h", code: "powershell.exe -ExecutionPolicy Bypass -File \"C:\\zabbix\\base\\Projeto atualização (Power Shell)\\monitor_vd_ping.ps1\"" }
    ],
    escalationTeam: "Plantão NOC Central de Comando",
    severity: "media"
  },
  {
    id: "POP-NOC-006",
    code: "POP-NOC-006",
    title: "Matriz de Escalonamento & Acionamento de Crises P1",
    category: "Escalonamentos",
    author: "Gerência NOC DPSP",
    updatedAt: "2026-08-04",
    description: "Contatos diretos dos gerentes, diretores e parceiros terceirizados para acionamento emergencial em casos de indisponibilidade P1.",
    prerequisites: ["Abertura formal da Sala de Crise na Central de Comando"],
    steps: [
      { id: 1, title: "Abertura Formal da Sala de Crise", desc: "Registrar o incidente P1 na Central de Comando e gerar o link da sala Teams." },
      { id: 2, title: "Acionamento Nível 1 - Líderes Técnicos", desc: "Notificar Wipro Basis SAP, Equipe de Telecom (Vivo/Algar) e TI Varejo (Sitef)." },
      { id: 3, title: "Acionamento Nível 2 - Gerência NOC & TI", desc: "Notificar os gerentes regionais (GR) e gerentes gerais (GGL) das áreas impactadas." },
      { id: 4, title: "Acionamento Nível 3 - Diretoria DPSP", desc: "Caso o incidente ultrapasse 45 minutos sem causa raiz, notificar os diretores de TI e Operações." }
    ],
    codeSnippets: [
      { label: "Telefone de Emergência NOC DPSP", code: "(11) 5529-6003" },
      { label: "Plantão Suporte Wipro SAP", code: "+55 11 99821-4400" }
    ],
    escalationTeam: "Diretoria de TI & Central de Comando",
    severity: "critica"
  }
];
