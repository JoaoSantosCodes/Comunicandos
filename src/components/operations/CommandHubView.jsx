import React, { useState } from "react";
import { 
  Monitor, ExternalLink, Database, Workflow, Shield, Search, Copy, Check, 
  Radio, Activity, RefreshCw, FileSpreadsheet, Server, ArrowRight
} from "lucide-react";
import { TELAS_DASHBOARDS, OPERADORAS_PORTAIS, SHAREPOINT_PLANILHAS, LINKS_EXTRAS } from "../../data/commandLinksData";
import { SQL_QUERIES_CATALOG } from "../../data/sqlQueriesData";
import { useIncidentContext } from "../../context/useIncidentContext";

export const CommandHubView = () => {
  const { showToast } = useIncidentContext();
  const [activeTab, setActiveTab] = useState("telas"); // 'telas', 'portais', 'sql', 'malha', 'manual'
  const [telasSearch, setTelasSearch] = useState("");
  const [sqlSearch, setSqlSearch] = useState("");
  const [copiedSqlId, setCopiedSqlId] = useState(null);

  // Live status tracking for Malha de Preços, Etiquetas & MCD
  const [malhaGridStatus, setMalhaGridStatus] = useState([
    { id: "m-1", process: "Preços Regulares (Symphony / Syncros)", category: "Malha de Preços", window: "06:00 - 08:00", status: "OK", lastRun: "07:45", details: "Lote processado sem falhas. 2.085 lojas atualizadas." },
    { id: "m-2", process: "Preços Especiais & Promocionais", category: "Malha de Preços", window: "11:00 & 16:00", status: "PROCESSANDO", lastRun: "16:05", details: "Em execução via CAWA / PeopleSoft." },
    { id: "m-3", process: "Profimetrics Pre-batch & APP_UP", category: "Etiquetas", window: "22:00 - 23:30", status: "OK", lastRun: "23:25", details: "Geração de etiquetas de gôndola concluída." },
    { id: "m-4", process: "Label Printing + Closing Zygon Batch", category: "Etiquetas", window: "00:00 - 01:30", status: "OK", lastRun: "01:15", details: "Finalizado em 100% das regionais." },
    { id: "m-5", process: "Grid_1-SP & Grid_2-SP (MCD)", category: "MCD Rotinas", window: "02:00 - 03:30", status: "OK", lastRun: "03:10", details: "Sincronização com retaguarda concluída." },
    { id: "m-6", process: "Grid_3-SP & Grid_4-SP (MCD)", category: "MCD Rotinas", window: "03:30 - 04:30", status: "OK", lastRun: "04:22", details: "Concluído dentro da janela." },
    { id: "m-7", process: "Grid_Pacheco & Grid_Polos (MCD)", category: "MCD Rotinas", window: "04:30 - 05:30", status: "OK", lastRun: "05:15", details: "Bases atualizadas para a abertura das filiais." },
    { id: "m-8", process: "TROCO_SANGRIA D-1 & D-0 (Geral)", category: "MCD Rotinas", window: "05:30 - 06:30", status: "ATENCAO", lastRun: "06:45", details: "Oscilação em 4 lojas da regional RJ. Reexecutado via Rundeck." }
  ]);

  const handleCopySql = async (sqlCode, id) => {
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(sqlCode);
        success = true;
      }
    } catch {
      // Fallback
    }

    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = sqlCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Erro ao copiar SQL:", err);
      }
    }

    if (success) {
      setCopiedSqlId(id);
      showToast("Query SQL copiada para a área de transferência!");
      setTimeout(() => setCopiedSqlId(null), 2500);
    }
  };

  const filteredTelas = TELAS_DASHBOARDS.filter(t => {
    const q = telasSearch.toLowerCase();
    return !q || (
      t.screen.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  const filteredSql = SQL_QUERIES_CATALOG.filter(s => {
    const q = sqlSearch.toLowerCase();
    return !q || (
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.database.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.sql.toLowerCase().includes(q)
    );
  });

  const toggleMalhaStatus = (id) => {
    setMalhaGridStatus(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "OK" ? "PROCESSANDO" : item.status === "PROCESSANDO" ? "ATENCAO" : item.status === "ATENCAO" ? "ATRASADO" : "OK";
        return { ...item, status: nextStatus };
      }
      return item;
    }));
    showToast("Status da rotina atualizado!");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Banner */}
      <div className="panel-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", padding: "20px 24px", background: "linear-gradient(135deg, rgba(200,55,45,0.1) 0%, var(--paper) 60%)", borderLeft: "4px solid var(--accent-red)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: "var(--accent-red)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 0 16px rgba(200,55,45,0.4)" }}>
            <Radio size={26} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, margin: 0, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>HUB DE COMANDO & TELAS OPERACIONAIS</span>
              <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "2px 8px", borderRadius: "99px", fontWeight: 800 }}>NOC DPSP ONLINE</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "4px 0 0 0" }}>
              Acesso unificado a todas as 14 Telas de monitoramento, Portais de Operadoras, SharePoint, Console SQL e Fluxos da Malha.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ textAlign: "right", fontSize: "0.78rem" }}>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Disponibilidade Monitorada</span>
            <strong style={{ color: "#10b981", fontSize: "0.95rem" }}>14 TELAS MAPPED</strong>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", overflowX: "auto", paddingBottom: "2px" }}>
        {[
          { id: "telas", label: "Telas 1 a 14 (Grafana / Datadog)", icon: Monitor, count: TELAS_DASHBOARDS.length },
          { id: "portais", label: "Portais & SharePoint", icon: ExternalLink, count: OPERADORAS_PORTAIS.length + SHAREPOINT_PLANILHAS.length + LINKS_EXTRAS.length },
          { id: "sql", label: "Biblioteca SQL (P2K / Syncros)", icon: Database, count: SQL_QUERIES_CATALOG.length },
          { id: "malha", label: "Malha de Preços, Etiquetas & MCD", icon: Activity },
          { id: "manual", label: "Manual de Escopo & Atuação", icon: Shield }
        ].map(tb => {
          const Icon = tb.icon;
          const isActive = activeTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                backgroundColor: isActive ? "rgba(200, 55, 45, 0.15)" : "transparent",
                color: isActive ? "var(--accent-red)" : "var(--text-muted)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #e2574c" : "2px solid transparent",
                whiteSpace: "nowrap",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isActive ? "translateY(-1px)" : "translateY(0)"
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-dark-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Icon size={16} />
              <span>{tb.label}</span>
              {tb.count !== undefined && (
                <span style={{ fontSize: "0.7rem", backgroundColor: isActive ? "#e2574c" : "var(--bg-dark-hover)", color: isActive ? "#fff" : "var(--text-muted)", padding: "1px 6px", borderRadius: "99px", fontWeight: 700, transition: "all 0.2s ease" }}>
                  {tb.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: TELAS 1 A 14 */}
      {activeTab === "telas" && (
        <div key="telas" className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: "38px", height: "40px", fontSize: "0.85rem" }}
              placeholder="Buscar por Tela (Ex: Tela 1, Datadog, Equinix, SEFAZ, Firewall, Qlik)..."
              value={telasSearch}
              onChange={(e) => setTelasSearch(e.target.value)}
            />
          </div>

          {/* Grid of Telas 1 to 14 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "18px" }}>
            {filteredTelas.map((t, idx) => (
              <div key={t.id} className="panel-card hoverable animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "14px", border: "1px solid var(--border-color)", padding: "18px", animationDelay: `${Math.min(idx * 0.04, 0.4)}s`, animationFillMode: "backwards" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 800, backgroundColor: "#e2574c", color: "#fff", padding: "3px 8px", borderRadius: "6px" }}>
                      {t.screen}
                    </span>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                      {t.title}
                    </h3>
                  </div>
                </div>

                <span style={{ fontSize: "0.72rem", color: "#387fef", fontWeight: 700, textTransform: "uppercase", backgroundColor: "rgba(56, 127, 239, 0.12)", padding: "2px 8px", borderRadius: "4px", alignSelf: "flex-start" }}>
                  {t.category}
                </span>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.45 }}>
                  {t.description}
                </p>

                {/* Individual links inside the Screen card */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                  {t.links.map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{
                        justifyContent: "space-between",
                        fontSize: "0.78rem",
                        padding: "8px 12px",
                        textAlign: "left",
                        backgroundColor: "var(--bg-dark-hover)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-main)",
                        textDecoration: "none"
                      }}
                    >
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "280px" }}>
                        🔗 {lnk.name}
                      </span>
                      <ExternalLink size={13} style={{ flexShrink: 0, color: "#e2574c" }} />
                    </a>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "8px", borderTop: "1px dashed var(--border-color)" }}>
                  {t.tags.map(tg => (
                    <span
                      key={tg}
                      style={{ fontSize: "0.68rem", color: "var(--text-muted)", backgroundColor: "var(--bg-dark-hover)", padding: "2px 6px", borderRadius: "4px", transition: "all 0.15s ease", cursor: "default" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(200, 55, 45, 0.12)"; e.currentTarget.style.color = "var(--accent-red)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-dark-hover)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PORTAIS OPERADORAS & SHAREPOINT */}
      {activeTab === "portais" && (
        <div key="portais" className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Section 1: Portais das Operadoras */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Radio size={18} color="#e2574c" />
              <span>Portais das Operadoras de Telecom (Vivo, Claro/Embratel, Algar, Americanet)</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {OPERADORAS_PORTAIS.map((op, idx) => (
                <div key={idx} className="panel-card hoverable animate-fade-in" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", padding: "16px", animationDelay: `${Math.min(idx * 0.04, 0.4)}s`, animationFillMode: "backwards" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: "4px" }}>
                        {op.provider}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{op.type}</span>
                    </div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 4px 0" }}>{op.name}</h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>{op.desc}</p>
                  </div>
                  <a href={op.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", fontSize: "0.75rem", textDecoration: "none" }}>
                    <span>Acessar Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Planilhas SharePoint & Sistemas NOC */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FileSpreadsheet size={18} color="#387fef" />
              <span>Planilhas SharePoint, GLPI, Streamlit & Ferramentas NOC</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {SHAREPOINT_PLANILHAS.map((sp, idx) => (
                <div key={idx} className="panel-card hoverable animate-fade-in" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", padding: "16px", animationDelay: `${Math.min(idx * 0.04, 0.4)}s`, animationFillMode: "backwards" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#387fef", backgroundColor: "rgba(56, 127, 239, 0.12)", padding: "2px 8px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                      {sp.category}
                    </span>
                    <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 4px 0" }}>{sp.name}</h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>{sp.desc}</p>
                  </div>
                  <a href={sp.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start", fontSize: "0.75rem", textDecoration: "none" }}>
                    <span>Abrir Documento / App</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Links Extras (Rundeck, Linx, PeopleSoft, Balcão 2) */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Server size={18} color="#8b5cf6" />
              <span>Links Extras (Rundeck, Linx ERP, PeopleSoft, Profimetrics & Balcão)</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {LINKS_EXTRAS.map((ex, idx) => (
                <div key={idx} className="panel-card hoverable animate-fade-in" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", padding: "16px", animationDelay: `${Math.min(idx * 0.04, 0.4)}s`, animationFillMode: "backwards" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8b5cf6", backgroundColor: "rgba(139, 92, 246, 0.12)", padding: "2px 8px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                      {ex.category}
                    </span>
                    <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 4px 0" }}>{ex.name}</h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0 }}>{ex.desc}</p>
                  </div>
                  <a href={ex.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start", fontSize: "0.75rem", textDecoration: "none" }}>
                    <span>Acessar Sistema</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: BIBLIOTECA SQL */}
      {activeTab === "sql" && (
        <div key="sql" className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ position: "relative", minWidth: "300px", flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: "38px", height: "40px", fontSize: "0.85rem" }}
                placeholder="Filtrar por nome, tabela, P2K, Syncros, STATS_MODE..."
                value={sqlSearch}
                onChange={(e) => setSqlSearch(e.target.value)}
              />
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              ⚡ Clique em <strong>Copiar Query</strong> para colar direto no DBeaver / SQL Developer.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredSql.map((item, idx) => (
              <div key={item.id} className="panel-card hoverable animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "20px", animationDelay: `${Math.min(idx * 0.05, 0.4)}s`, animationFillMode: "backwards" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                  <div>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 800, color: "#e2574c", backgroundColor: "rgba(226, 87, 76, 0.15)", padding: "2px 8px", borderRadius: "4px", marginRight: "10px" }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#60a5fa", backgroundColor: "rgba(96, 165, 250, 0.15)", padding: "2px 8px", borderRadius: "4px" }}>
                      {item.database}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: "8px 0 0 0" }}>
                      {item.title}
                    </h3>
                  </div>

                  <button
                    className="btn btn-sm"
                    onClick={() => handleCopySql(item.sql, item.id)}
                    style={{ backgroundColor: copiedSqlId === item.id ? "#10b981" : "#e2574c", color: "#fff", border: "none", fontSize: "0.8rem", padding: "6px 14px" }}
                  >
                    {copiedSqlId === item.id ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedSqlId === item.id ? "Copiado!" : "Copiar Query SQL"}</span>
                  </button>
                </div>

                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                  {item.description}
                </p>

                {/* SQL Code Box */}
                <div style={{ backgroundColor: "#0d111a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "14px 16px", overflowX: "auto" }}>
                  <pre style={{ margin: 0, fontFamily: "Consolas, Monaco, monospace", fontSize: "0.84rem", color: "#4ade80", lineHeight: "1.5" }}>
                    {item.sql}
                  </pre>
                </div>

                <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  💡 <strong>Finalidade Operacional:</strong> {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MALHA DE PREÇOS, ETIQUETAS & MCD */}
      {activeTab === "malha" && (
        <div key="malha" className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Section 1: Fluxo de Atuação da Malha (Interactive Diagram) */}
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Workflow size={20} color="#e2574c" />
              <span>Fluxo de Atuação da Malha de Preços, Etiquetas & MCD</span>
            </h3>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", backgroundColor: "var(--bg-dark-hover)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              {[
                "MONITORAR PROCESSO",
                "VALIDAR HORÁRIO / STATUS",
                "IDENTIFICAR DESVIO",
                "AVALIAR IMPACTO",
                "ACIONAR RESPONSÁVEL",
                "ACOMPANHAR TRATATIVA",
                "VALIDAR NORMALIZAÇÃO",
                "REGISTRAR / COMUNICAR"
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#e2574c", backgroundColor: "rgba(226,87,76,0.15)", padding: "2px 6px", borderRadius: "4px" }}>Etapa {idx + 1}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-main)", maxWidth: "120px" }}>{step}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight size={16} color="var(--text-dim)" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Section 2: Painel de Controle de Rotinas (Preços, Profimetrics, MCD Grids) */}
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                  Acompanhamento de Processos em Tempo Real (Malha, Profimetrics & MCD)
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Clique no badge de status para simular alteração de estado operacional.
                </span>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => showToast("Status das rotinas atualizado!")}>
                <RefreshCw size={14} />
                <span>Atualizar Painel</span>
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-muted)" }}>
                    <th style={{ padding: "10px" }}>Categoria</th>
                    <th style={{ padding: "10px" }}>Processo / Rotina</th>
                    <th style={{ padding: "10px" }}>Janela Prevista</th>
                    <th style={{ padding: "10px" }}>Última Execução</th>
                    <th style={{ padding: "10px" }}>Status Operacional</th>
                    <th style={{ padding: "10px" }}>Detalhes / Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {malhaGridStatus.map(row => (
                    <tr key={row.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px 10px", color: "var(--text-muted)", fontWeight: 600 }}>{row.category}</td>
                      <td style={{ padding: "12px 10px", color: "var(--text-main)", fontWeight: 700 }}>{row.process}</td>
                      <td style={{ padding: "12px 10px", color: "#60a5fa", fontFamily: "monospace" }}>{row.window}</td>
                      <td style={{ padding: "12px 10px", color: "var(--text-muted)", fontFamily: "monospace" }}>{row.lastRun}</td>
                      <td style={{ padding: "12px 10px" }}>
                        <button
                          onClick={() => toggleMalhaStatus(row.id)}
                          style={{
                            borderRadius: "6px",
                            padding: "4px 10px",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            backgroundColor: row.status === "OK" ? "rgba(34, 197, 94, 0.15)" : row.status === "PROCESSANDO" ? "rgba(59, 130, 246, 0.15)" : row.status === "ATENCAO" ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: row.status === "OK" ? "#22c55e" : row.status === "PROCESSANDO" ? "#60a5fa" : row.status === "ATENCAO" ? "#f59e0b" : "#ef4444",
                            border: row.status === "OK" ? "1px solid rgba(34, 197, 94, 0.3)" : row.status === "PROCESSANDO" ? "1px solid rgba(59, 130, 246, 0.3)" : row.status === "ATENCAO" ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          {row.status === "OK" ? "🟢 OK" : row.status === "PROCESSANDO" ? "🔵 PROCESSANDO" : row.status === "ATENCAO" ? "🟡 ATENÇÃO" : "🔴 ATRASADO"}
                        </button>
                      </td>
                      <td style={{ padding: "12px 10px", color: "var(--text-muted)", fontSize: "0.78rem" }}>{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: MCD Grids Breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div className="panel-card" style={{ padding: "20px" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 10px 0" }}>
                📌 Detalhamento dos Grids MCD (Distribuição por Estado)
              </h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                <li><strong>Grid_1-SP:</strong> Lojas Grande SP e Capital (Maior volumetria)</li>
                <li><strong>Grid_2-SP:</strong> Lojas Interior SP e Litoral</li>
                <li><strong>Grid_3-SP:</strong> Lojas Regionais de Apoio SP</li>
                <li><strong>Grid_4-SP:</strong> Lojas Especializadas e Hubs Express SP</li>
                <li><strong>Grid_Pacheco:</strong> Lojas Drogarias Pacheco (RJ, MG, ES, GO, DF)</li>
                <li><strong>Grid_Polos:</strong> Lojas de Apoio Polos Logísticos</li>
              </ul>
            </div>

            <div className="panel-card" style={{ padding: "20px" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 10px 0" }}>
                💵 Rotinas TROCO_SANGRIA
              </h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                <li><strong>TROCO_SANGRIA D-1:</strong> Ajustes financeiros do dia anterior por loja.</li>
                <li><strong>TROCO_SANGRIA — Geral D-1:</strong> Consolidação de fechamento de caixa D-1.</li>
                <li><strong>TROCO_SANGRIA — Geral D-0:</strong> Liberação de abertura de caixa do dia atual.</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: MANUAL DO PAPEL DA COMMAND CENTER */}
      {activeTab === "manual" && (
        <div key="manual" className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Visual Diagram: General Operational Flow of Command Center */}
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px", background: "linear-gradient(180deg, rgba(200,55,45,0.08) 0%, var(--paper) 70%)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
              <Workflow size={22} color="#e2574c" />
              <span>FLUXO GERAL DA COMMAND CENTER DPSP</span>
            </h3>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", backgroundColor: "var(--bg-dark-hover)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              {[
                "MONITORAR",
                "VALIDAR",
                "IDENTIFICAR IMPACTO",
                "CLASSIFICAR",
                "DIRECIONAR",
                "ACIONAR",
                "ACOMPANHAR",
                "COMUNICAR",
                "NORMALIZAR",
                "REGISTRAR",
                "REPORTAR / PASSAR TURNO"
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "#fff", backgroundColor: "#e2574c", padding: "2px 6px", borderRadius: "4px" }}>{idx + 1}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-main)", maxWidth: "90px" }}>{step}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight size={14} color="#e2574c" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Operational Objective Summary */}
          <div className="panel-card" style={{ padding: "20px", borderLeft: "4px solid #10b981", backgroundColor: "rgba(16, 185, 129, 0.05)" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#10b981", margin: "0 0 6px 0" }}>
              🎯 Objetivo Operacional da Central de Comando
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-main)", margin: 0, lineHeight: 1.5 }}>
              Identificar rapidamente → Validar o impacto → Classificar → Direcionar → Acionar o responsável → Acompanhar a tratativa → Comunicar as partes envolvidas → Garantir a normalização → Registrar → Realizar a passagem do turno.
            </p>
          </div>

          {/* 11 Scope Sections Breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "18px" }}>
            {[
              { num: "1", title: "Gestão de Chamados e Operadoras", desc: "Abertura/acompanhamento junto às operadoras, liberação de acesso por e-mail, validação de indisponibilidades, cobrança ativa tel/WhatsApp, atendimento >4h, 4G contingência e Field presencial." },
              { num: "2", title: "Monitoramento e Tratativa de Incidentes", desc: "Alertas Datadog, classificação de impacto, direcionamento para squads, acionamento de plantonista, acompanhamento até normalização, apoio ao Field e lojas isoladas." },
              { num: "3", title: "Gestão de Rede e Conectividade", desc: "Cadastro/validação Gnet e Zabbix, monitoramento de switches sem gerência, detecção de loops de rede, falhas de comunicação e apoio ao Service Desk." },
              { num: "4", title: "Monitoramento de Vendas e Operação", desc: "Acompanhamento do Flash de Vendas, GAP de Vendas, anomalias operacionais, acompanhamento de indicadores e alinhamento com áreas." },
              { num: "5", title: "Gestão de Incidentes, Crises e Problemas (GLPI)", desc: "Formalização de incidentes no GLPI, Abertura de Sala Técnica (Monitoramento), Sala de Crise (P1), centralização de informações e Gestão de Problemas recorrentes." },
              { num: "6", title: "Comunicação Operacional e Executiva", desc: "Elaboração e envio de Alertas Executivos, Alertas de TI — Central de Comando, Alertas CD, atualizações de status e comunicados de normalização." },
              { num: "7", title: "Gestão da Fila de Chamados — GLPI", desc: "Validação periódica da fila no GLPI, priorização de chamados críticos de conectividade e infraestrutura, escalonamento e organização no plantão." },
              { num: "8", title: "Comunicação via WhatsApp", desc: "Gestão de grupos operacionais no WhatsApp, triagem de ocorrências, alinhamento com lojas, Field e parceiros, consolidação de informações." },
              { num: "9", title: "Fechamento de Plantão e Passagem de Turno", desc: "Consolidação de ocorrências, envio do relatório por e-mail, relação Gnet, cobranças pendentes >4h e destaque de incidentes críticos." },
              { num: "10", title: "Apoio Operacional e Contingência", desc: "Tratativa de lojas isoladas, validação prévia antes de acionar Field, solicitação de atendimento presencial e solicitação de modem 4G." },
              { num: "11", title: "Malha de Preços, Etiquetas e MCD", desc: "Acompanhamento de Preços Regulares/Promocionais, Syncros, GDB, Linx, Symphony, Profimetrics Pre-batch/Labels, MCD Grids 1-4 SP, Pacheco, Polos e Troco/Sangria." }
            ].map((sec, idx) => (
              <div key={sec.num} className="panel-card hoverable animate-fade-in" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", animationDelay: `${Math.min(idx * 0.04, 0.4)}s`, animationFillMode: "backwards" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "var(--accent-red)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0 }}>
                    {sec.num}
                  </span>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                    {sec.title}
                  </h4>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.45 }}>
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
