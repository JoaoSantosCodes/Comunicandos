import React, { useState } from "react";
import { 
  BookOpen, Search, Filter, CheckSquare, Copy, Check, ExternalLink, 
  Terminal, ShieldAlert, Cpu, Server, Wifi, AlertTriangle, ArrowRight,
  FileText, Clock, ChevronRight, Layers, UserCheck
} from "lucide-react";

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

export const ProcessosPOPsView = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPopId, setSelectedPopId] = useState("POP-NOC-001");
  const [checkedSteps, setCheckedSteps] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);

  const categories = ["Todos", "Subida de Vendas", "Descida de Bases", "Conectividade / Telecom", "Malha de Preços", "Plantão 00h", "Escalonamentos"];

  const filteredPops = POPS_CATALOG.filter(pop => {
    const matchesCat = selectedCategory === "Todos" || pop.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const q = query.toLowerCase();
    const matchesQuery = !q || (
      pop.code.toLowerCase().includes(q) ||
      pop.title.toLowerCase().includes(q) ||
      pop.description.toLowerCase().includes(q) ||
      pop.category.toLowerCase().includes(q)
    );
    return matchesCat && matchesQuery;
  });

  const activePop = POPS_CATALOG.find(p => p.id === selectedPopId) || filteredPops[0] || POPS_CATALOG[0];

  const toggleStep = (stepId) => {
    setCheckedSteps(prev => ({
      ...prev,
      [`${activePop.id}_${stepId}`]: !prev[`${activePop.id}_${stepId}`]
    }));
  };

  const handleCopyCode = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Banner */}
      <div className="panel-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
              Base de Conhecimento & Procedimentos (POPs NOC DPSP)
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
              Manuais de operação, checklists de validação e procedimentos operacionais padrão da Central de Comando.
            </p>
          </div>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", backgroundColor: "var(--bg-dark-hover)", padding: "6px 14px", borderRadius: "99px", border: "1px solid var(--border-color)" }}>
          📚 <strong>{POPS_CATALOG.length} Procedimentos Oficiais</strong> Cadastrados
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: "280px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: "38px", height: "40px", fontSize: "0.85rem" }}
            placeholder="Buscar por POP, sistema (Grafana, SAP, Fortinet), código ou procedimento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                border: selectedCategory === cat ? "1px solid #3b82f6" : "1px solid var(--border-color)",
                backgroundColor: selectedCategory === cat ? "rgba(59, 130, 246, 0.15)" : "var(--bg-dark-hover)",
                color: selectedCategory === cat ? "#3b82f6" : "var(--text-muted)",
                whiteSpace: "nowrap"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: POP List (Left) vs POP Content Detail (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "20px", alignItems: "start" }}>
        
        {/* Left Column: List of POP Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "750px", overflowY: "auto", paddingRight: "4px" }}>
          {filteredPops.map(pop => {
            const isSelected = activePop?.id === pop.id;
            return (
              <div
                key={pop.id}
                onClick={() => setSelectedPopId(pop.id)}
                className="panel-card"
                style={{
                  padding: "14px",
                  cursor: "pointer",
                  border: isSelected ? "2px solid #3b82f6" : "1px solid var(--border-color)",
                  backgroundColor: isSelected ? "rgba(59, 130, 246, 0.08)" : "var(--chrome)",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", fontWeight: 800, color: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.15)", padding: "2px 8px", borderRadius: "4px" }}>
                    {pop.code}
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: pop.severity === "critica" ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: pop.severity === "critica" ? "#ef4444" : "#f59e0b"
                  }}>
                    {pop.category}
                  </span>
                </div>

                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 6px 0", lineHeight: 1.3 }}>
                  {pop.title}
                </h4>

                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {pop.description}
                </p>
              </div>
            );
          })}

          {filteredPops.length === 0 && (
            <div className="panel-card" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              Nenhum POP encontrado para a busca "{query}".
            </div>
          )}
        </div>

        {/* Right Column: POP Full Detail View */}
        {activePop ? (
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "24px" }}>
            
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: "#fff", backgroundColor: "#3b82f6", padding: "3px 10px", borderRadius: "6px" }}>
                  {activePop.code}
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", backgroundColor: "var(--bg-dark-hover)", padding: "3px 10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                  {activePop.category}
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 8px 0" }}>
                {activePop.title}
              </h1>

              <div style={{ display: "flex", gap: "16px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span>✍️ <strong>Elaboração:</strong> {activePop.author}</span>
                <span>📅 <strong>Atualização:</strong> {activePop.updatedAt}</span>
                <span>📞 <strong>Escalonamento:</strong> {activePop.escalationTeam}</span>
              </div>
            </div>

            {/* Description & Prerequisites */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "14px", borderRadius: "10px", border: "1px solid var(--border-color)", fontSize: "0.85rem", color: "var(--text-main)", lineHeight: "1.5" }}>
                <strong style={{ color: "#3b82f6", display: "block", marginBottom: "4px" }}>🎯 Objetivo do Procedimento:</strong>
                {activePop.description}
              </div>

              {activePop.prerequisites && activePop.prerequisites.length > 0 && (
                <div style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(245, 158, 11, 0.2)", fontSize: "0.8rem", color: "#d97706" }}>
                  <strong>⚠️ Pré-requisitos & Ferramentas Necessárias:</strong>
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    {activePop.prerequisites.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Interactive Step-by-Step Execution Checklist */}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckSquare size={18} color="#10b981" />
                <span>Roteiro de Atuação Passo a Passo</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {activePop.steps.map((step) => {
                  const isDone = !!checkedSteps[`${activePop.id}_${step.id}`];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      style={{
                        backgroundColor: isDone ? "rgba(16, 185, 129, 0.08)" : "var(--bg-dark-hover)",
                        border: isDone ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-color)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ 
                        width: "22px", 
                        height: "22px", 
                        borderRadius: "6px", 
                        backgroundColor: isDone ? "#10b981" : "rgba(255,255,255,0.1)", 
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: "2px"
                      }}>
                        {isDone ? "✓" : step.id}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: isDone ? "#10b981" : "var(--text-main)" }}>
                          {step.title}
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "4px 0 0 0", lineHeight: "1.4" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Snippets & Jumpbox Paths */}
            {activePop.codeSnippets && activePop.codeSnippets.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Terminal size={18} color="#60a5fa" />
                  <span>Comandos, URLs & Links Rápidos</span>
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activePop.codeSnippets.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: "#0d111a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", display: "block" }}>{item.label}</span>
                        <code style={{ fontSize: "0.82rem", color: "#f1f5f9", fontFamily: "monospace" }}>{item.code}</code>
                      </div>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleCopyCode(item.code, idx)}
                        style={{ backgroundColor: copiedIndex === idx ? "#22c55e" : "#1e293b", color: "#fff", border: "none", fontSize: "0.72rem", padding: "4px 10px" }}
                      >
                        {copiedIndex === idx ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : null}
      </div>
    </div>
  );
};
