// Data catalogue for Command Center DPSP Dashboards, Screens 1 to 14, Operator Portals, SharePoint spreadsheets, and Extra System Links.

export const TELAS_DASHBOARDS = [
  {
    id: "tela-1",
    screen: "TELA 1",
    title: "Vendas Represadas, Storex Services & Capacity Servidores",
    category: "Grafana Lojas & Capacidade",
    links: [
      { name: "Grafana - Visão Geral (Dashboard 1)", url: "http://172.16.2.250:3000/d/PKFrjRO7z/a7f95c64-bbcd-5319-be3b-d0730424bf8e?orgId=1&refresh=1m" },
      { name: "Grafana - DPSP Vendas Represadas EPs", url: "http://172.16.2.250:3000/d/beue0cis8ar5sd/dpsp-vendas-represadas-eps?orgId=1" },
      { name: "Grafana - DPSP Storex Services EPs", url: "http://172.16.2.250:3000/d/85EOaMnIk/dpsp-storex-services-ep-s?orgId=1" },
      { name: "Grafana - DPSP Capacity Servidores EPs", url: "http://172.16.2.250:3000/d/cezn6h79pxn28e/dpsp-capacity-servidores-eps?orgId=1" }
    ],
    description: "Monitoramento em tempo real do fluxo de vendas represadas nas filiais, status dos serviços Storex e capacidade de processamento dos servidores das lojas.",
    tags: ["Vendas", "Storex", "Capacity", "EPs", "Grafana"]
  },
  {
    id: "tela-2",
    screen: "TELA 2",
    title: "Datadog - Dashboard Alertas Command",
    category: "Datadog APM & Infra",
    links: [
      { name: "Datadog - Alertas Command Center", url: "https://app.datadoghq.com/account/login?next=%2Fdashboard%2Fb87-7sv-gv7%2Falertas-command%3FfromUser%3Dfalse%26refresh_mode%3Dsliding%26from_ts%3D1780407099974%26to_ts%3D1780407399974%26live%3Dtrue" }
    ],
    description: "Central de alertas de infraestrutura, aplicações, integrações e barramentos corporativos no Datadog HQ.",
    tags: ["Datadog", "Alertas", "APM", "Infraestrutura", "Command"]
  },
  {
    id: "tela-3",
    screen: "TELA 3",
    title: "OMSv3 Negócio Geral",
    category: "Grafana E-commerce & OMS",
    links: [
      { name: "Grafana - OMSv3 Negócio Geral", url: "http://172.16.2.250:3000/d/fenrk3q5ygdtsf/omsv3-negocio-geral?orgId=1&refresh=1m" }
    ],
    description: "Acompanhamento dos pedidos omnicanal, saúde do Order Management System (OMSv3), integrações de e-commerce e processamento de vendas digitais.",
    tags: ["OMS", "E-commerce", "Vendas Digitais", "Grafana"]
  },
  {
    id: "tela-4",
    screen: "TELA 4",
    title: "Monitoramento de Problemas de Infraestrutura",
    category: "Grafana Infraestrutura Core",
    links: [
      { name: "Grafana - Problemas de Infraestrutura DPSP", url: "http://172.16.2.250:3000/d/N53y7QA7z/dpsp-monitoramento-de-problemas-de-infraestrutura?orgId=1&refresh=1m" }
    ],
    description: "Painel unificado de incidentes de hardware, hipervisores, storages e serviços críticos da infraestrutura central.",
    tags: ["Infraestrutura", "Hardware", "Servidores", "Grafana"]
  },
  {
    id: "tela-5",
    screen: "TELA 5",
    title: "Utilização Links DC Equinix 2",
    category: "Grafana Data Center Links",
    links: [
      { name: "Grafana - Utilização Links Data Center Equinix 2", url: "http://172.16.2.250:3000/d/df4hu04cs24n4f/dpsp-utilizacao-links-dc-equinix-2?orgId=1&refresh=1m" }
    ],
    description: "Volumetria, consumo de banda e latência dos circuitos de dados principais do Data Center Equinix SP2/SP3.",
    tags: ["Equinix", "Data Center", "Links", "Banda", "Grafana"]
  },
  {
    id: "tela-6",
    screen: "TELA 6",
    title: "Datacosmos Macro & OGG Estoque Online",
    category: "Datacosmos & Estoque",
    links: [
      { name: "Datacosmos - Dashboard Macro v1", url: "https://g.datacosmos.com.br/d/kNP0nfhg07Jj/dashboard-macro-v1?orgId=21&refresh=1m" },
      { name: "Datacosmos - OGG Estoque Online", url: "https://g.datacosmos.com.br/d/F8fplfLIz/ogg-estoque-online?orgId=21&refresh=1m" }
    ],
    description: "Visão executiva do ecossistema Datacosmos e sincronização em tempo real do estoque (Golden Gate / OGG) entre lojas e DCs.",
    tags: ["Datacosmos", "Estoque", "OGG", "Macro"]
  },
  {
    id: "tela-7",
    screen: "TELA 7",
    title: "Controladoras Knapp CDSP Osasco & Jobs People",
    category: "Grafana CDs & WMS Automation",
    links: [
      { name: "Grafana - Controladoras Knapp CDSP Osasco", url: "http://172.16.2.250:3000/d/yUFVREz4z/dpsp-controladoras-knapp-cdsp-osasco?orgId=1&refresh=1m" },
      { name: "Grafana - Painel Monitoramento Jobs People", url: "http://172.16.2.250:3000/d/EE5E3eBMk/dpsp-painel-monitoramento-jobs-people?orgId=1&refresh=5m" }
    ],
    description: "Automação logística do Centro de Distribuição Osasco (Knapp) e status de processamento das rotinas batch PeopleSoft.",
    tags: ["Knapp", "CD Osasco", "Jobs", "PeopleSoft", "Grafana"]
  },
  {
    id: "tela-8",
    screen: "TELA 8",
    title: "Qlik Cloud Analytics & Dashboards Executivos",
    category: "Qlik Sense Analytics",
    links: [
      { name: "Qlik Cloud - Catalog & Analytics Space 1", url: "https://grupodpsp.us.qlikcloud.com/sense/app/3a5da73b-c4b5-4d8d-bf6b-579d4f6e82f1/sheet/9881b460-6f76-4165-9e39-215150c2ae0a/state/analysis/hubUrl/analytics/catalog?space_filter=656dc1eac4317a05e3d9be77" },
      { name: "Qlik Cloud - Analytics Home Space 2", url: "https://grupodpsp.us.qlikcloud.com/sense/app/fe808ee9-90bd-4898-bf28-afdefe5d05f6/sheet/41abf9dc-6c02-47ad-84b5-e621f5e5b7f0/state/analysis/hubUrl/%2Fanalytics%2Fhome" }
    ],
    description: "Relatórios analíticos executivos de vendas, margem, performance operacional e indicadores do Grupo DPSP.",
    tags: ["Qlik", "Analytics", "Vendas", "BI Executivo"]
  },
  {
    id: "tela-9",
    screen: "TELA 9",
    title: "Servidores, RPA, SMTP, Links Matriz & SEFAZ SP",
    category: "Grafana Servidores & Fiscal",
    links: [
      { name: "Grafana - Servidor WSRPAAPAWPRD01", url: "http://172.16.2.250:3000/d/cejvzat98gyrkf/dpsp-servidor-wsrpaapawprd01?orgId=1&refresh=30s" },
      { name: "Portal RPA Monitoring (Porta 8083)", url: "http://172.16.0.240:8083/" },
      { name: "Grafana - Monitoração de Servidores", url: "http://172.16.2.250:3000/d/n7c19vm4k/dpsp-monitoracao-servidores?orgId=1" },
      { name: "Grafana - Servidor de Email SMTP", url: "http://172.16.2.250:3000/d/lVdItkZSz/dpsp-servidor-de-email-smtp?orgId=1&refresh=1m" },
      { name: "Grafana - Disponibilidade e Consumo Links Matriz", url: "http://172.16.2.250:3000/d/afm9i9ASz/dpsp-disponibilidade-consumo-links-matriz?orgId=1&refresh=1m" },
      { name: "Grafana - Disponibilidade Serviço SEFAZ SP", url: "http://172.16.2.250:3000/d/whQ5B8-4z/dpsp-disponibilidade-servico-sefaz-sp?orgId=1" }
    ],
    description: "Monitoria dedicada aos robôs RPA, servidores de aplicação, relay SMTP de comunicados, links da Matriz e serviço de NF-e na SEFAZ SP.",
    tags: ["RPA", "SMTP", "SEFAZ", "Servidores", "Matriz", "Grafana"]
  },
  {
    id: "tela-10",
    screen: "TELA 10",
    title: "SoftwareExpress & Tecnospeed NFe SP",
    category: "TEF & Autorizadores Fiscais",
    links: [
      { name: "SoftwareExpress - Monit-Web Login", url: "https://monit-web.softwareexpress.com.br/monitoring/login" },
      { name: "Tecnospeed - Monitor NFe SP Status", url: "https://monitor.tecnospeed.com.br/?&filter-doc=nfe&filter-uf=sp&filter-type-chart=line&filter-by-chart=status" }
    ],
    description: "Status de autorizadores de cartão de crédito/débito (SiTef / SoftwareExpress) e tempo de resposta de emissão de NF-e na Tecnospeed.",
    tags: ["SoftwareExpress", "TEF", "SiTef", "Tecnospeed", "NFe"]
  },
  {
    id: "tela-11",
    screen: "TELA 11",
    title: "Grafana Visão Geral DPSP",
    category: "Grafana Master Overview",
    links: [
      { name: "Grafana - Visão Geral Corporativa DPSP", url: "http://172.16.2.250:3000/d/8UYXnFkSz/dpsp-visao-geral?orgId=1&refresh=1m" }
    ],
    description: "Cockpit executivo com os principais SLAs de TI, indisponibilidades de lojas e status de microsserviços.",
    tags: ["Grafana", "Visão Geral", "Cockpit", "SLAs"]
  },
  {
    id: "tela-12",
    screen: "TELA 12",
    title: "Alertas Links Lojas por Região",
    category: "Grafana Links Regional",
    links: [
      { name: "Grafana - Alertas Links Lojas por Região", url: "http://172.16.2.250:3000/d/fegtxb86010cgd/dpsp-alertas-links-lojas-por-regiao?orgId=1&refresh=1m" }
    ],
    description: "Mapa geográfico e regional de indisponibilidade de links (SP, RJ, MG, GO, ES, BA, PE, PR, SC, RS) agrupados por regional.",
    tags: ["Links", "Lojas", "Regiões", "Telecom", "Grafana"]
  },
  {
    id: "tela-13",
    screen: "TELA 13",
    title: "Firewalls Fortinet Core & Switches Spine/Leaf",
    category: "Grafana Telecom & Network Core",
    links: [
      { name: "Grafana - Monitoramento Firewall 1000D Core", url: "http://172.16.2.250:3000/d/E80n8zs7k/dpsp-monitoramento-firewall-1000d-core?orgId=1&refresh=5s" },
      { name: "Grafana - Monitoramento Firewall 1100E Core Lojas", url: "http://172.16.2.250:3000/d/7tkwjkynz/dpsp-monitoramento-firewall-1100e-core-lojas?orgId=1" },
      { name: "Grafana - Monitoramento SW SP2 SP3 Spine IPN", url: "http://172.16.2.250:3000/d/sjlzy9ASk/dpsp-monitoramento-sw-sp2-sp3-spine-ipn?orgId=1&refresh=1m" },
      { name: "Grafana - Monitoramento SW SP2 SP3 Leaf", url: "http://172.16.2.250:3000/d/PkQzp9AIk/dpsp-monitoramento-sw-sp2-sp3-leaf?orgId=1&refresh=30s" }
    ],
    description: "Disponibilidade e utilização dos Firewalls Core Fortinet (1000D / 1100E) e infraestrutura de switching Spine/Leaf do Data Center.",
    tags: ["Fortinet", "Firewall", "Switches", "Spine", "Leaf", "Grafana"]
  },
  {
    id: "tela-14",
    screen: "TELA 14",
    title: "Status Pages de Parceiros & Serviços Externos",
    category: "Página de Status Parceiros",
    links: [
      { name: "Wallethub Status", url: "https://cdn-prd-wallethub-status.azureedge.net/" },
      { name: "Linx Tecfiscal Status", url: "https://status.tecfiscal.linx.com.br/#/" },
      { name: "VTEX Status", url: "https://status.vtex.com/" },
      { name: "ClearSale Anti-Fraude Status", url: "https://status.clearsale.com.br/#" },
      { name: "ClinicaRX Status", url: "https://status.clinicarx.com.br/" },
      { name: "Nexp Status", url: "https://status.nexp.app/" },
      { name: "Frete Rápido Status", url: "https://freterapido.statuspage.io/#" },
      { name: "Intelipost Uptime", url: "https://uptime.intelipost.com.br/" },
      { name: "Adyen Payments Status", url: "https://status.adyen.com/" },
      { name: "UptimeRobot DPSP Monitor", url: "https://stats.uptimerobot.com/wVQgOI0XJr" },
      { name: "Tifarma Portal Status", url: "https://app.tifarma.com.br/#/" },
      { name: "Sua Receita Digital Status", url: "https://dpsp.suareceitadigital.com.br/" },
      { name: "iFood Developer API Status", url: "https://developer.ifood.com.br/en-US/support/api-status" },
      { name: "Grafana Dashboard Correlacionado", url: "http://172.16.2.250:3000/d/D6yLitJnk/49538749-f3c0-5724-9a09-249785da8013?orgId=1" }
    ],
    description: "Grid centralizado com o status em tempo real de todas as APIs parceiras (VTEX, Adyen, ClearSale, iFood, Linx, ClinicaRX, Frete Rápido).",
    tags: ["Status", "Parceiros", "APIs", "VTEX", "Adyen", "Linx", "iFood"]
  }
];

export const OPERADORAS_PORTAIS = [
  {
    name: "Embratel / Claro Empresas Online",
    url: "https://webebt01.embratel.com.br/claroempresasonline/index",
    provider: "Claro / Embratel",
    type: "Portal de Chamados & Links MPLS",
    desc: "Abertura de chamados de indisponibilidade de links MPLS/Internet e consulta de ordens de serviço."
  },
  {
    name: "Vivo MVE (Meu Vivo Empresas)",
    url: "https://mve.vivo.com.br/oauth?logout=true",
    provider: "Vivo Telefônica",
    type: "Gestão de Circuitos e Voz",
    desc: "Acompanhamento de circuitos Vivo, telefonia fixa/móvel e liberação de acesso de técnicos."
  },
  {
    name: "Vivo Smart TData (Orion)",
    url: "https://vivosmart.tdata.com.br/Orion/Login.aspx?autologin=no&SuccessfulLogout=yes&AccountID=drogariasp",
    provider: "Vivo / TData Orion",
    type: "Monitoramento de SLA Vivo",
    desc: "Portal Orion para consulta de disponibilidade de banda, perda de pacotes e SLA de circuitos Drogarias SP."
  },
  {
    name: "Global Tech Support Portal",
    url: "https://portal.globaltechsupport.com.br/login",
    provider: "Global Tech",
    type: "Suporte de Links Regional",
    desc: "Portal de atendimento para fornecedores regionais de conectividade e atendimento de field."
  },
  {
    name: "Americanet / Simetra Cliente",
    url: "https://meuamericanetempresas.com.br/SimetraCliente/",
    provider: "Americanet",
    type: "Links de Fibra & Contingência",
    desc: "Acompanhamento de chamados e reparo de links de fibra óptica Americanet."
  },
  {
    name: "Algar Telecom Portal de Serviços",
    url: "https://portaldeservicos.algar.com.br/portal/default/login/",
    provider: "Algar Telecom",
    type: "Links MPLS Regional MG/GO/SP",
    desc: "Gestão de chamados técnicos e circuitos Algar Telecom."
  }
];

export const SHAREPOINT_PLANILHAS = [
  {
    name: "SharePoint Command Center DPSP (Home)",
    url: "https://dpspo365.sharepoint.com/sites/commandcenter/SitePages/CommandHome.aspx?ovuser=5c397059-9711-4e99-99f1-4d475696b69b%2cjoao.carloos%40dpsp.com.br&OR=Teams-HL&CT=1738628925119&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNTAxMDYyMDQxMCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3d%3d&CID=68f33ba2-8070-f000-72d0-3a85874bcb3c&cidOR=SPO",
    category: "SharePoint Principal",
    desc: "Portal oficial da Central de Comando DPSP no Office 365 com diretório de documentos, comunicados e procedimentos."
  },
  {
    name: "Planilha de Controle - Malha de Preços",
    url: "https://dpspo365.sharepoint.com/:x:/r/sites/commandcenter/_layouts/15/Doc.aspx?sourcedoc=%7B9ce03038-d6fb-4a99-9bd4-b86f9c7ac98f%7D&action=edit&wdinitialsession=910fd35e-d0cb-d3c1-eff7-f6e2c3d56609&wdrldsc=41&wdrldc=2&wdrldr=FileOpenUserUnauthorized%2CDeploymentInvalidEditSess&wdenableroaming=1&wdlcid=pt-BR&wdorigin=Other&wdredirectionreason=Force_SingleStepBoot&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1764874867806&web=1",
    category: "Malha de Preços",
    desc: "Acompanhamento diário da subida e descida de preços, etiquetas e jobs PeopleSoft/CAWA."
  },
  {
    name: "Descida de Bases 3.0.xlsx",
    url: "https://dpspo365.sharepoint.com/:x:/r/sites/commandcenter/_layouts/15/Doc.aspx?sourcedoc=%7B5B275B13-E740-4288-8BC9-801D5DE01F0B%7D&file=Descida%20de%20bases%203.0.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1%3Fweb%3D1",
    category: "Bases & Cargas",
    desc: "Controle da descida de cargas de produto, convênio e tabelas de preço para o PDV das lojas."
  },
  {
    name: "DPSP NOC Escala Command Center 2025",
    url: "https://dpspo365.sharepoint.com/:x:/r/sites/commandcenter/_layouts/15/doc2.aspx?sourcedoc=%7B452bc819-39d9-4e1d-bbf9-29b804a16560%7D&action=view&wdenableroaming=1&wdlcid=pt-BR&wdorigin=AuthPrompt&wdredirectionreason=Force_SingleStepBoot&wdinitialsession=70a0d970-db8a-4a14-1a93-ae91d4a403d8&wdrldsc=2&wdrldc=2&wdrldr=FileOpenUserUnauthorized%2CWorkbookIsReadOnlyRecomme&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1759447735208&web=1&ovuser=5c397059-9711-4e99-99f1-4d475696b69b%2Cpedro.melo%40dpsp.com.br&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNTExMDIwMjMxNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
    category: "Escala & Turnos",
    desc: "Escala de plantão dos analistas do NOC/Central de Comando, turnos T1, T2 e Plantão 00h."
  },
  {
    name: "Relatório Operacional NOC DPSP",
    url: "https://dpspo365.sharepoint.com/:x:/r/sites/GestodeServios-DPSP/_layouts/15/Doc.aspx?sourcedoc=%7B2828be59-798d-4685-b5a2-1010b74f2654%7D&action=edit&wdinitialsession=1c4f452a-bf16-d211-3540-5903815c29e3&wdrldsc=7&wdrldc=2&wdrldr=FileOpenUserUnauthorized%2CDeploymentInvalidEditSess&wdenableroaming=1&wdlcid=pt-BR&wdorigin=Other&wdredirectionreason=Force_SingleStepBoot",
    category: "Relatórios & SLAs",
    desc: "Relatório de gestão de serviços, consolidado de incidentes, disponibilidade e MTTR."
  },
  {
    name: "Planilha de Escalation DPSP.xlsx",
    url: "https://dpspo365.sharepoint.com/:x:/r/sites/IntranetTI-DPSP/_layouts/15/doc2.aspx?sourcedoc=%7B529096A3-FEDB-4A03-819E-98888F84CEB1%7D&file=Escalation.xlsx&action=default&mobileredirect=true&wdExp=TEAMS-TREATMENT&web=1&isSPOFile=1&ovuser=5c397059-9711-4e99-99f1-4d475696b69b%2Ceduardo.lucas%40dpsp.com.br&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNjA1MTQxNjcxMyJ9",
    category: "Escalonamentos",
    desc: "Matriz de contatos, coordenadores, gerentes, diretores e parceiros terceirizados para acionamento de crises."
  },
  {
    name: "GLPI Suporte DPSP (Chamados)",
    url: "https://suporte.dpsp.io/index.php?redirect=%2Ffront%2Fcentral.php&error=3",
    category: "GLPI ITSM",
    desc: "Sistema oficial de ITSM DPSP para abertura de chamados de Crise, Sala Técnica, Problemas e infraestrutura."
  },
  {
    name: "Portal BackOffice - Command Center (Lovable App)",
    url: "https://smart-view-monitor.lovable.app/#",
    category: "Portal Web BackOffice",
    desc: "Portal web Smart View Monitor para acompanhamento de filas e automações da Central de Comando."
  },
  {
    name: "Portal de Consulta VD Streamlit",
    url: "https://consulta-lojas.streamlit.app/?opcao=vd",
    category: "Consulta Lojas VD",
    desc: "Aplicação Streamlit para busca rápida de números de loja VD, IP de estabelecimentos e dados cadastrais."
  },
  {
    name: "Extinção Automática Blaze",
    url: "https://dashboard.blaze.today/snippet/R7UEGL9VnpkSv8u7fmNc",
    category: "Snippets & Templates",
    desc: "Snippets de texto automatizados Blaze para acelerar a redação de chamados no GLPI e comunicados."
  },
  {
    name: "Cards TI WhatsApp - Central de Comando (PPTX)",
    url: "https://dpspo365.sharepoint.com/:p:/r/sites/commandcenter/_layouts/15/Doc.aspx?sourcedoc=%7B152B498C-4C2C-4583-8508-C254312CD929%7D&file=Cards%20TI%20-%20WhatsApp%20-%20Central%20de%20Comando.pptx&action=edit&mobileredirect=true&previoussessionid=66a5a6b1-9d4e-343e-c617-ae0f1b4cded6",
    category: "Modelos de Cards",
    desc: "Modelos PowerPoint oficiais dos cards de comunicados de TI para grupos operacionais de WhatsApp."
  }
];

export const LINKS_EXTRAS = [
  {
    name: "Balcão2 Front DPSP (Seleção de Loja)",
    url: "https://balcao2-front.dpsp.io/modal-route/select-store",
    category: "Sistemas de Loja",
    desc: "Interface do Balcão 2 para consulta de estoque, orçamento e vendas na loja."
  },
  {
    name: "Prateleira Infinita DPSP",
    url: "https://dpsp-prateleira-infinita.dpsp.io/auth-filial.html",
    category: "Omnicanalidade",
    desc: "Autenticação por filial para consulta de catálogo estendido do e-commerce dentro das lojas físicas."
  },
  {
    name: "AcompMais Frontend DPSP",
    url: "https://dpsp-acompmais-frontend.dpsp.io/orders",
    category: "Vendas & Pedidos",
    desc: "Painel de acompanhamento de status de pedidos de clientes e entrega rápida."
  },
  {
    name: "Neo Duquesa Profimetrics Cloud (Dashboard)",
    url: "https://neo-duquesa.profimetrics-cloud.com/zyg_store/dashboard",
    category: "Etiquetas & Pricing",
    desc: "Dashboard do sistema Profimetrics para gestão de etiquetas eletrônicas, preços e pre-batch."
  },
  {
    name: "Rundeck Automation Prod",
    url: "https://rundeck-prod.dpsp.io/user/login",
    category: "Automação & Execução",
    desc: "Console Rundeck para disparo autônomo de scripts, restart de serviços e jobs operacionais."
  },
  {
    name: "Linx Portal Big Retail v2 (Porta 8443 - Instância 1)",
    url: "https://172.16.0.30:8443/portal-big-retail-v2/#/login",
    category: "Linx Retail ERP",
    desc: "Portal de administração Linx Big Retail para parametrização do PDV e tabelas operacionais."
  },
  {
    name: "Linx Portal Big Retail v2 (Porta 8443 - Instância 2)",
    url: "https://172.16.0.35:8443/portal-big-retail-v2/#/login",
    category: "Linx Retail ERP",
    desc: "Instância de contingência do Portal Linx Big Retail v2."
  },
  {
    name: "PeopleSoft ERP Login DPSP",
    url: "http://peoplesoft.dsp.int/psp/dpsperp/?cmd=login&errorPg=ckreq&languageCd=POR",
    category: "PeopleSoft ERP",
    desc: "Login de produção no PeopleSoft ERP do Grupo DPSP."
  },
  {
    name: "PeopleSoft Process Monitor",
    url: "http://peoplesoft.dsp.int/psp/dpsperp/EMPLOYEE/ERP/c/PROCESSMONITOR.PROCESSMONITOR.GBL?Folder=MYFAVORITES",
    category: "PeopleSoft ERP",
    desc: "Monitor de processos e jobs em background do PeopleSoft (Malha de preços, cargas e financeiro)."
  }
];
