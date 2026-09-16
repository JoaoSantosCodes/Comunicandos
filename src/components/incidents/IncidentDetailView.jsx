import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import {
  Clock,
  Megaphone,
  CheckCircle2,
  Users,
  Plus,
  Flame,
  ArrowLeft,
  FileText,
  AlertCircle
} from "lucide-react";

export const IncidentDetailView = () => {
  const {
    getSelectedIncident,
    updateIncidentStatus,
    addTimelineEvent,
    setActiveTab,
    setActiveCardDraft
  } = useIncidentContext();

  const incident = getSelectedIncident();
  const [subTab, setSubTab] = useState("overview"); // overview, timeline, communications, teams
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");

  if (!incident) {
    return (
      <div className="panel-card" style={{ textAlign: "center", padding: "40px" }}>
        <AlertCircle size={36} style={{ color: "#ef4444", margin: "0 auto 12px auto" }} />
        <h3>Nenhum incidente selecionado</h3>
        <button className="btn btn-primary" style={{ marginTop: "12px" }} onClick={() => setActiveTab("incidents")}>
          Voltar para Lista
        </button>
      </div>
    );
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;
    addTimelineEvent(incident.id, {
      title: newEventTitle,
      description: newEventDesc,
      type: "atualizacao"
    });
    setNewEventTitle("");
    setNewEventDesc("");
    setShowEventModal(false);
  };

  const handleCreateCard = () => {
    setActiveCardDraft({
      incidentId: incident.id,
      type: incident.status === "investigacao" ? "indisponibilidade" : incident.status === "normalizado" ? "normalizacao" : "atualizacao",
      title: `${incident.system.toUpperCase()} - ${incident.service.toUpperCase()}`,
      system: incident.system,
      process: incident.service,
      components: incident.components ? incident.components.join(" e ") : incident.service,
      impact: incident.description || "Sob análise técnica.",
      scope: incident.scope || ["CDSP"],
      status: `Equipe ${incident.responsible} atuando no problema.`,
      action: "Central de Comando acompanhando tratativa.",
      contact: "Suporte TI / Central de Serviços"
    });
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("incidents")}>
          <ArrowLeft size={16} />
          <span>Voltar para Lista</span>
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          {incident.severity === "critica" && (
            <button className="btn btn-danger btn-sm" onClick={() => setActiveTab("crisis-room")}>
              <Flame size={16} />
              <span>Abrir Sala de Crise</span>
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={handleCreateCard}>
            <Megaphone size={16} />
            <span>Gerar Card de Comunicado</span>
          </button>
          {incident.status !== "normalizado" && (
            <button className="btn btn-success btn-sm" onClick={() => updateIncidentStatus(incident.id, "normalizado")}>
              <CheckCircle2 size={16} />
              <span>Normalizar Incidente</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="panel-card" style={{ borderLeft: `6px solid ${incident.status === 'normalizado' ? '#10b981' : incident.severity === 'critica' ? '#ef4444' : '#f59e0b'}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1rem", color: "#2f6ea8" }}>
                {incident.id}
              </span>
              {incident.acn && (
                <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.8rem", backgroundColor: "rgba(200, 55, 45, 0.15)", color: "var(--accent-red)", padding: "2px 8px", borderRadius: "6px" }}>
                  {incident.acn}
                </span>
              )}
              <span className={`status-badge ${incident.severity}`}>
                {incident.severity.toUpperCase()}
              </span>
              <span className={`status-badge ${incident.status}`}>
                {incident.status.toUpperCase()}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-main)" }}>
              {incident.system} • {incident.title}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>
              Serviço: <strong style={{ color: "var(--text-main)" }}>{incident.service}</strong> | Início: {new Date(incident.startAt).toLocaleString("pt-BR")}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px 18px", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "right" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Analista NOC</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", marginTop: "2px" }}>{incident.analistaResponsavel || "Operador NOC"}</div>
            </div>
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px 18px", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "right" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Responsável Técnico</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", marginTop: "2px" }}>{incident.responsible}</div>
            </div>
          </div>
        </div>

        {/* RCA & Solução se Normalizado */}
        {incident.status === "normalizado" && (incident.solucaoAplicada || incident.causaRaizResolvida) && (
          <div style={{ marginTop: "14px", padding: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "10px", fontSize: "0.82rem" }}>
            {incident.solucaoAplicada && (
              <div style={{ color: "#0f7a56", marginBottom: "4px" }}>
                <strong>🟢 Solução Aplicada:</strong> {incident.solucaoAplicada}
              </div>
            )}
            {incident.causaRaizResolvida && (
              <div style={{ color: "var(--text-muted)" }}>
                <strong>🔍 Causa Raiz (RCA):</strong> {incident.causaRaizResolvida}
              </div>
            )}
          </div>
        )}

        {/* Scope Chips */}
        <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem" }}>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Abrangência:</span>
          {incident.scope.map(sc => (
            <span key={sc} style={{ backgroundColor: "#387fef", color: "#fff", padding: "2px 8px", borderRadius: "999px", fontWeight: 600, fontSize: "0.75rem" }}>
              {sc}
            </span>
          ))}
        </div>
      </div>

      {/* Internal Subtabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "2px" }}>
        {[
          { id: "overview", label: "Visão Geral", icon: FileText },
          { id: "timeline", label: `Timeline (${incident.timeline ? incident.timeline.length : 0})`, icon: Clock },
          { id: "communications", label: `Comunicados (${incident.communications ? incident.communications.length : 0})`, icon: Megaphone },
          { id: "teams", label: "Equipes Acionadas", icon: Users }
        ].map(tb => {
          const Icon = tb.icon;
          const isActive = subTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setSubTab(tb.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                backgroundColor: isActive ? "rgba(32,30,29,0.06)" : "transparent",
                color: isActive ? "#2f6ea8" : "var(--text-muted)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #387fef" : "2px solid transparent"
              }}
            >
              <Icon size={16} />
              <span>{tb.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB CONTENT: OVERVIEW */}
      {subTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>Descrição & Diagnóstico</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {incident.description || "Nenhum detalhamento fornecido."}
            </p>

            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginTop: "12px" }}>Componentes Envolvidos</h3>
            <div style={{ display: "flex", gap: "8px" }}>
              {incident.components && incident.components.map(c => (
                <span key={c} style={{ backgroundColor: "rgba(56,127,239,0.1)", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 600, color: "#2f6ea8" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>Ações Operacionais</h3>
            <button className="btn btn-secondary" onClick={() => setShowEventModal(true)}>
              <Plus size={16} />
              <span>Adicionar Evento na Timeline</span>
            </button>
            <button className="btn btn-primary" onClick={handleCreateCard}>
              <Megaphone size={16} />
              <span>Gerar Card Institucional</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT: TIMELINE */}
      {subTab === "timeline" && (
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>Linha do Tempo do Incidente</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowEventModal(true)}>
              <Plus size={14} />
              <span>Novo Evento</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", paddingLeft: "24px" }}>
            <div style={{ position: "absolute", left: "9px", top: "10px", bottom: "10px", width: "2px", backgroundColor: "var(--border-hover)" }}></div>

            {incident.timeline && incident.timeline.map((evt) => (
              <div key={evt.id} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ position: "absolute", left: "-24px", top: "4px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: evt.type === 'normalizacao' ? '#10b981' : evt.type === 'comunicado' ? '#387fef' : '#f59e0b', border: "3px solid var(--paper)" }}></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontWeight: 800, color: "#2f6ea8", fontSize: "0.85rem" }}>{evt.time}</span>
                  <span style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.9rem" }}>{evt.title}</span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", backgroundColor: "var(--bg-dark-hover)", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", marginTop: "4px" }}>
                  {evt.description}
                </p>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Registrado por {evt.author}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENT ADD MODAL */}
      {showEventModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(32,30,29,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="panel-card" style={{ width: "480px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "16px" }}>
              Adicionar Evento na Timeline
            </h3>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label className="form-label">Título do Evento</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Equipe Wipro iniciou análise de logs..."
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Detalhamento</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Detalhes adicionais..."
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEventModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
