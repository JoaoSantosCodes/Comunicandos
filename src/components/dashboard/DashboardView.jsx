import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Megaphone,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Plus
} from "lucide-react";

const MTTR_TARGET_MINUTES = 120; // Meta de SLA: 2h de tempo médio de resolução

const isSameCalendarDay = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
};

const formatDurationMinutes = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}h ${String(m).padStart(2, "0")}m`;
};

export const DashboardView = () => {
  const { incidents, communications, setActiveTab, setSelectedIncidentId, setActiveCardDraft } = useIncidentContext();

  const activeIncidents = incidents.filter(i => i.status !== "normalizado");
  const criticalIncidents = activeIncidents.filter(i => i.severity === "critica");
  const inProgressIncidents = incidents.filter(i => i.status === "acompanhamento");
  const normalizedIncidents = incidents.filter(i => i.status === "normalizado");
  const normalizedTodayIncidents = normalizedIncidents.filter(i => isSameCalendarDay(i.updatedAt));
  const totalComms = communications.length;

  const avgResolutionMinutes = normalizedIncidents.length > 0
    ? normalizedIncidents.reduce((sum, i) => sum + (new Date(i.updatedAt) - new Date(i.startAt)) / 60000, 0) / normalizedIncidents.length
    : 0;
  const mttrLabel = normalizedIncidents.length > 0 ? formatDurationMinutes(avgResolutionMinutes) : "—";
  const isMttrWithinTarget = normalizedIncidents.length === 0 || avgResolutionMinutes <= MTTR_TARGET_MINUTES;

  const handleOpenIncident = (id) => {
    setSelectedIncidentId(id);
    setActiveTab("incident-detail", id);
  };

  const handleCreateCardForIncident = (inc) => {
    setActiveCardDraft({
      incidentId: inc.id,
      type: inc.status === "investigacao" ? "indisponibilidade" : "atualizacao",
      title: `${inc.system.toUpperCase()} - ${inc.service.toUpperCase()}`,
      system: inc.system,
      process: inc.service,
      components: inc.components ? inc.components.join(" e ") : inc.service,
      impact: inc.description || "Impacto sob investigação técnica.",
      scope: inc.scope || ["CDSP"],
      status: `Equipe ${inc.responsible || "técnica"} atuando no problema.`,
      action: "Central de Comando acompanhando e direcionando alinhamentos.",
      contact: "Suporte Service Desk TI / NOC"
    });
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 400, color: "var(--text-main)" }}>
            Bom dia, Central de Comando
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Visão geral da operação em tempo real e acompanhamento de incidentes ativos.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab("ai-assistant")}>
            🤖 Parser de Anotações IA
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab("wizard")}>
            <Plus size={16} />
            Novo Incidente
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="panel-card" style={{ borderLeft: "4px solid #ef4444" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
            <span>Incidentes Ativos</span>
            <AlertTriangle size={18} style={{ color: "#ef4444" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginTop: "8px" }}>
            {String(activeIncidents.length).padStart(2, "0")}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#b3261e", marginTop: "4px", fontWeight: 600 }}>
            {criticalIncidents.length} crítico(s) necessitando atenção
          </p>
        </div>

        <div className="panel-card" style={{ borderLeft: "4px solid #f59e0b" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
            <span>Em Acompanhamento</span>
            <Clock size={18} style={{ color: "#f59e0b" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginTop: "8px" }}>
            {String(inProgressIncidents.length).padStart(2, "0")}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#92660a", marginTop: "4px", fontWeight: 600 }}>
            SLA de atualização em dia
          </p>
        </div>

        <div className="panel-card" style={{ borderLeft: "4px solid #10b981" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
            <span>Normalizados Hoje</span>
            <CheckCircle2 size={18} style={{ color: "#10b981" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginTop: "8px" }}>
            {String(normalizedTodayIncidents.length).padStart(2, "0")}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#0f7a56", marginTop: "4px", fontWeight: 600 }}>
            de {normalizedIncidents.length} normalizado(s) no total
          </p>
        </div>

        <div className="panel-card" style={{ borderLeft: "4px solid #387fef" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
            <span>Comunicados Emitidos</span>
            <Megaphone size={18} style={{ color: "#387fef" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginTop: "8px" }}>
            {totalComms}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#2f6ea8", marginTop: "4px", fontWeight: 600 }}>
            WhatsApp / Teams / Email
          </p>
        </div>

        <div className="panel-card" style={{ borderLeft: "4px solid #8b5cf6" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
            <span>Tempo Médio (MTTR)</span>
            <TrendingUp size={18} style={{ color: "#8b5cf6" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginTop: "8px" }}>
            {mttrLabel}
          </div>
          <p style={{ fontSize: "0.72rem", color: isMttrWithinTarget ? "#7c3aed" : "#b3261e", marginTop: "4px", fontWeight: 600 }}>
            {isMttrWithinTarget ? "Dentro da meta estabelecida" : "Acima da meta estabelecida"} ({formatDurationMinutes(MTTR_TARGET_MINUTES)})
          </p>
        </div>
      </div>

      {/* Main Grid: Active Incidents (Left) & Live Feed (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Active Incidents List */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={18} style={{ color: "#ef4444" }} />
              INCIDENTES OPERACIONAIS ATIVOS
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("incidents")}>
              Ver Todos ({incidents.length})
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activeIncidents.map(inc => (
              <div
                key={inc.id}
                style={{
                  backgroundColor: "var(--bg-dark-hover)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span className={`status-badge ${inc.severity}`}>
                      {inc.severity.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2f6ea8" }}>
                      {inc.id}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>• {inc.system}</span>
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "4px" }}>
                    {inc.title}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span>Abrangência:</span>
                    {inc.scope.map(s => (
                      <span key={s} style={{ backgroundColor: "rgba(32,30,29,0.08)", padding: "1px 6px", borderRadius: "4px", color: "var(--text-main)", fontSize: "0.7rem" }}>
                        {s}
                      </span>
                    ))}
                    <span style={{ marginLeft: "8px", color: "var(--text-dim)" }}>Resp: {inc.responsible}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleCreateCardForIncident(inc)}>
                    <Megaphone size={14} />
                    <span>Card</span>
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleOpenIncident(inc.id)}>
                    <span>Abrir</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            {activeIncidents.length === 0 && (
              <div style={{ textAlign: "center", padding: "30px", color: "var(--text-dim)" }}>
                <CheckCircle2 size={36} style={{ color: "#10b981", margin: "0 auto 10px auto" }} />
                <p style={{ fontWeight: 600 }}>Nenhum incidente ativo no momento.</p>
                <p style={{ fontSize: "0.8rem" }}>Operação totalmente estabilizada.</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Timeline Activity Feed */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} style={{ color: "#387fef" }} />
              ATIVIDADE RECENTE
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("timeline")}>
              Timeline
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {incidents.flatMap(i => i.timeline.map(t => ({ ...t, incidentId: i.id, system: i.system }))).slice(0, 5).map(evt => (
              <div key={evt.id} style={{ display: "flex", gap: "12px", fontSize: "0.82rem" }}>
                <div style={{ width: "48px", fontWeight: 700, color: "#2f6ea8", flexShrink: 0 }}>
                  {evt.time}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: "var(--text-main)" }}>{evt.title}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{evt.description}</p>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>Por {evt.author} • {evt.system}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
