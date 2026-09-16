export const INITIAL_INCIDENTS = [
  {
    id: "INC-20260915-001",
    acn: "ACN-8841",
    ticketServiceNow: "INC0098412",
    proximoStatus: "16:30",
    linkSalaCrise: "https://teams.microsoft.com/l/meetup-join/dpsp-crise-p1",
    fornecedoresAcionados: ["Equipe Basis SAP", "Wipro Tech Support"],
    canaisAfetados: ["PDV Loja Física", "iFood / Rappi", "E-commerce DPSP"],
    slaEta: "17:30",
    title: "Instabilidade na Integração PeopleSoft / EWM",
    system: "SAP",
    service: "Integração de Pedidos",
    components: ["PeopleSoft", "EWM"],
    severity: "critica", // critica, alta, media, baixa
    status: "investigacao", // investigacao, acompanhamento, normalizado
    scope: ["CDSP", "CDMG", "Matriz"],
    startAt: "2026-09-15T14:10:00",
    updatedAt: "2026-09-15T15:45:00",
    teams: ["Equipe SAP", "Wipro", "Central de Comando"],
    responsible: "Wipro / Equipe SAP",
    description: "Falha na sincronização de pedidos entre os módulos PeopleSoft e EWM gerando represamento nas esteiras de faturamento e expedição dos CDs de São Paulo e Minas Gerais.",
    timeline: [
      {
        id: "evt-101",
        time: "14:10",
        type: "criacao",
        title: "Incidente identificado",
        description: "Falha na sincronização de pedidos detectada pela monitoria do NOC.",
        author: "Monitoria NOC"
      },
      {
        id: "evt-102",
        time: "14:18",
        type: "acionamento",
        title: "Central de Comando acionada",
        description: "Equipe de comunicação e acompanhamento técnico notificada.",
        author: "Operador NOC"
      },
      {
        id: "evt-103",
        time: "14:35",
        type: "investigacao",
        title: "Equipe SAP & Wipro em análise",
        description: "Diagnóstico da fila de mensagens estagnadas na fila de integração EWM.",
        author: "Eng. SAP Wipro"
      },
      {
        id: "evt-104",
        time: "14:42",
        type: "comunicado",
        title: "Comunicado de Indisponibilidade publicado",
        description: "Card 🔴 INDISPONIBILIDADE enviado via WhatsApp e Teams para os gerentes dos CDs.",
        author: "Central de Comando"
      },
      {
        id: "evt-105",
        time: "15:20",
        type: "atualizacao",
        title: "Causa raiz identificada",
        description: "Bloqueio de sessão no banco de dados da interface. Equipe atuando na liberação das locks.",
        author: "Equipe DB SAP"
      }
    ],
    communications: [
      {
        id: "COM-001",
        type: "indisponibilidade", // indisponibilidade, atualizacao, normalizacao, manutencao, informacao
        title: "INDISPONIBILIDADE! INTEGRAÇÃO PEDIDOS PEOPLESOFT E EWM",
        system: "SAP",
        process: "Integração de Pedidos",
        components: "PeopleSoft e EWM",
        impact: "Faturamento e expedição de pedidos temporariamente interrompidos.",
        scope: ["CDSP", "CDMG", "Matriz"],
        status: "Equipe SAP investigando o incidente.",
        action: "Central de Comando acompanhando e atuando na tratativa.",
        contact: "Suporte Service Desk / Central de Comando",
        publishedAt: "2026-09-15T14:42:00",
        channel: "WhatsApp / Teams"
      }
    ]
  },
  {
    id: "INC-20260915-002",
    acn: "ACN-4920",
    ticketServiceNow: "INC0098418",
    proximoStatus: "16:00",
    linkSalaCrise: "https://teams.microsoft.com/l/meetup-join/dpsp-telecom",
    fornecedoresAcionados: ["Vivo Empresas", "Algar Telecom"],
    canaisAfetados: ["PDV Loja Física", "PBM Convênios"],
    slaEta: "17:00",
    title: "Lentidão e oscilação no Link de Dados de Lojas",
    system: "Rede / Telecom",
    service: "Link Corporativo Loja",
    components: ["Link Principal Vivo", "Redundância Algar"],
    severity: "alta",
    status: "acompanhamento",
    scope: ["Lojas RJ", "Lojas MG"],
    startAt: "2026-09-15T13:30:00",
    updatedAt: "2026-09-15T15:20:00",
    teams: ["Equipe Redes", "Vivo Empresas", "Algar"],
    responsible: "Equipe Telecom",
    description: "Oscilação no roteador de circuito primário afetando consulta de estoque em tempo real e abertura de chamados no PDV em 14 filiais da regional.",
    timeline: [
      {
        id: "evt-201",
        time: "13:30",
        type: "criacao",
        title: "Alertas de conectividade",
        description: "Relatos de lentidão no envio de vendas TEF e acesso aos sistemas das lojas.",
        author: "Service Desk Lojas"
      },
      {
        id: "evt-202",
        time: "14:00",
        type: "acionamento",
        title: "Operadora Vivo acionada",
        description: "Aberto chamado emergencial de fibra óptica na região.",
        author: "Telecom DPSP"
      },
      {
        id: "evt-203",
        time: "15:20",
        type: "atualizacao",
        title: "Tráfego desviado para backup",
        description: "Redirecionamento automático via 4G/Algar estabilizou o atendimento nas lojas.",
        author: "Telecom DPSP"
      }
    ],
    communications: [
      {
        id: "COM-002",
        type: "atualizacao",
        title: "ATUALIZAÇÃO DE LINK DE COMUNICAÇÃO DE LOJAS",
        system: "Rede / Telecom",
        process: "Conectividade Loja",
        components: "Link Vivo / Backup 4G",
        impact: "Operação de caixa operando via circuito de redundância.",
        scope: ["Lojas RJ", "Lojas MG"],
        status: "Ambiente em monitoramento com operadora atuando.",
        action: "Central de Comando segue monitorando até estabilização total.",
        contact: "Central de Serviços TI",
        publishedAt: "2026-09-15T15:20:00",
        channel: "WhatsApp / Teams"
      }
    ]
  },
  {
    id: "INC-20260915-003",
    title: "Manutenção e Normalização no Processo WMS CDSP",
    system: "SAP",
    service: "Processo WMS",
    components: ["SAP WMS", "Coletor RF"],
    severity: "media",
    status: "normalizado",
    scope: ["CDSP"],
    startAt: "2026-09-15T10:00:00",
    updatedAt: "2026-09-15T12:15:00",
    teams: ["Equipe WMS", "Operação CDSP"],
    responsible: "Suporte WMS",
    description: "Reajuste nas filas de recepção de mercadorias finalizado com sucesso. Ambiente restabelecido e operando normalmente.",
    timeline: [
      {
        id: "evt-301",
        time: "10:00",
        type: "criacao",
        title: "Manutenção emergencial iniciada",
        description: "Limpeza de tabelas temporárias do coletor de RF.",
        author: "Suporte WMS"
      },
      {
        id: "evt-302",
        time: "12:15",
        type: "normalizacao",
        title: "Serviço totalmente normalizado",
        description: "Testes validados com a gerência do CDSP.",
        author: "Gerência CDSP"
      }
    ],
    communications: [
      {
        id: "COM-003",
        type: "normalizacao",
        title: "SERVIÇO NORMALIZADO | PROCESSO WMS CDSP",
        system: "SAP",
        process: "Processo WMS",
        components: "WMS / Coletor RF",
        impact: "Nenhum no momento. Operação 100% restabelecida.",
        scope: ["CDSP"],
        status: "Serviço normalizado.",
        action: "Em caso de nova ocorrência, abrir chamado pelos canais oficiais.",
        contact: "Central de Serviços TI",
        publishedAt: "2026-09-15T12:15:00",
        channel: "WhatsApp / E-mail"
      }
    ]
  }
];

export const SYSTEM_CATALOG = [
  {
    id: "cat-sap",
    name: "SAP ERP & Logística",
    category: "Sistemas Core",
    services: [
      { name: "Integração de Pedidos", components: ["PeopleSoft", "EWM", "PI/PO"] },
      { name: "Processo WMS", components: ["WMS CD", "Coletor RF", "Mapeamento"] },
      { name: "Faturamento & NF-e", components: ["SAP GRC", "Sefaz Interface"] },
      { name: "Módulo Financeiro", components: ["SAP FI", "SAP CO"] }
    ],
    teams: ["Equipe SAP", "Wipro Tech", "Consultoria Basis"],
    commonScope: ["CDSP", "CDMG", "CDRJ", "CDGO", "Matriz"]
  },
  {
    id: "cat-rede",
    name: "Rede & Infraestrutura",
    category: "Telecom",
    services: [
      { name: "Link Corporativo Loja", components: ["Vivo Fibra", "Algar", "TBNet"] },
      { name: "Conectividade CD", components: ["SD-WAN", "Cisco Router", "Firewall Palo Alto"] },
      { name: "VPN & Acesso Remoto", components: ["GlobalProtect", "Active Directory"] }
    ],
    teams: ["Equipe Redes", "Telecom", "Vivo Empresas"],
    commonScope: ["Lojas", "Matriz", "CDSP", "CDRJ", "CDMG", "CDGO"]
  },
  {
    id: "cat-loja",
    name: "Sistemas de Loja & PDV",
    category: "Varejo",
    services: [
      { name: "Frente de Caixa (PDV)", components: ["Software Caixa", "Impressora Fiscal"] },
      { name: "Autorizador TEF", components: ["Sitef", "Rede", "Stone", "Cielo"] },
      { name: "E-Commerce / Retirada", components: ["Plataforma VTEX", "App Drogaria"] }
    ],
    teams: ["Suporte Lojas", "Equipe PDV", "TI Varejo"],
    commonScope: ["Lojas SP", "Lojas RJ", "Lojas MG", "Lojas CO"]
  }
];

export const PHRASE_LIBRARY = [
  {
    category: "Status & Investigação",
    phrases: [
      "Equipe responsável acionada e investigando o problema.",
      "Investigação técnica em andamento junto ao fornecedor.",
      "Causa raiz em análise pelos especialistas de infraestrutura.",
      "Aguardando retorno da equipe de suporte terceiro N3.",
      "Time técnico atuando na correção do componente de integração."
    ]
  },
  {
    category: "Acompanhamento & Comunicação",
    phrases: [
      "A Central de Comando segue acompanhando a tratativa do incidente.",
      "A Central de Comando atualizará os envolvidos a cada 30 minutos.",
      "Novas informações serão compartilhadas assim que houver evolução.",
      "Ambiente mantido sob monitoramento intensivo pelo NOC.",
      "Alinhamento em andamento na Sala de Crise com os gestores."
    ]
  },
  {
    category: "Normalização & Encerramento",
    phrases: [
      "Serviço normalizado e validado junto às áreas operacionais.",
      "Ambiente estabilizado e operação fluindo normalmente.",
      "Monitoramento mantido por mais 60 minutos para garantia.",
      "Em caso de nova ocorrência ou instabilidade, abrir chamado nos canais oficiais.",
      "Incidente encerrado com sucesso após validação do usuário chave."
    ]
  }
];

export const CARD_TEMPLATES = [
  {
    id: "tpl-indisponibilidade",
    name: "🔴 Indisponibilidade Crítica",
    type: "indisponibilidade",
    description: "Para interrupções totais ou graves em serviços essenciais.",
    headerTitle: "INDISPONIBILIDADE!",
    accentColor: "#ef4444"
  },
  {
    id: "tpl-atualizacao",
    name: "🟡 Atualização Operacional",
    type: "atualizacao",
    description: "Para dar visibilidade sobre o andamento e novas ações.",
    headerTitle: "ATUALIZAÇÃO DE INCIDENTE",
    accentColor: "#eab308"
  },
  {
    id: "tpl-normalizacao",
    name: "🟢 Normalização de Serviço",
    type: "normalizacao",
    description: "Comunicado oficial de restabelecimento do ambiente.",
    headerTitle: "SERVIÇO NORMALIZADO",
    accentColor: "#22c55e"
  },
  {
    id: "tpl-manutencao",
    name: "🔵 Manutenção Programada",
    type: "manutencao",
    description: "Para avisos de janelas técnicas ou interrupções agendadas.",
    headerTitle: "COMUNICADO DE MANUTENÇÃO",
    accentColor: "#3b82f6"
  }
];

export const TEAMS_LIST = [
  { id: "team-1", name: "Central de Comando NOC", role: "Gestão de Incidentes & Comunicação", contact: "central.comando@dpsp.com.br", phone: "Ramal 4400" },
  { id: "team-2", name: "Equipe SAP Basis & Dev", role: "Sistemas ERP & Integrações", contact: "suporte.sap@dpsp.com.br", phone: "Ramal 4412" },
  { id: "team-3", name: "Wipro Tech Support", role: "Consultoria Terceirizada N3", contact: "dpsp-wipro@wipro.com", phone: "+55 11 98888-0000" },
  { id: "team-4", name: "Equipe Redes & Telecom", role: "Conectividade, Fibra e SD-WAN", contact: "telecom@dpsp.com.br", phone: "Ramal 4455" },
  { id: "team-5", name: "Suporte Varejo & Lojas", role: "Sistemas PDV, TEF e Impressoras", contact: "suporte.lojas@dpsp.com.br", phone: "Ramal 4422" }
];
