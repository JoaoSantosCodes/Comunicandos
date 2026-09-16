import React, { useState, useEffect } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Flame, Clock, Users, ShieldAlert, CheckCircle2, Megaphone, Plus, ArrowLeft } from "lucide-react";

export const CrisisRoomView = () => {
  const { getSelectedIncident, updateIncidentStatus, addTimelineEvent, setActiveTab, setActiveCardDraft } = useIncidentContext();
  const incident = getSelectedIncident();

  const [seconds, setSeconds] = useState(1420); // Elapsed timer simulation

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleCreateUpdateCard = () => {
    setActiveCardDraft({
      incidentId: incident.id,
      type: "atualizacao",
      title: `ATUALIZAÇÃO DE CRISE: ${incident.system}`,
      system: incident.system,
      process: incident.service,
      components: incident.components ? incident.components.join(" e ") : incident.service,
      impact: incident.description,
      scope: incident.scope,
      status: "Equipes atuando em alinhamento na Sala de Crise.",
      action: "Próximo alinhamento executivo em 30 minutos.",
      contact: "Central de Comando / Sala de Crise"
    });
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* War Room Header */}
      <div style={{ backgroundColor: "#7f1d1d", border: "2px solid #ef4444", borderRadius: "12px", padding: "20px 24px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Flame size={28} className="animate-pulse" />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fca5a5" }}>
              🚨 SALA DE CRISE OPERACIONAL ATIVA — P1 CRÍTICO
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800 }}>
              {incident.id}: {incident.system} — {incident.title}
            </h1>
          </div>
        </div>

        {/* SLA Timer */}
        <div style={{ textAlign: "right", backgroundColor: "rgba(0,0,0,0.4)", padding: "10px 18px", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fca5a5", textTransform: "uppercase" }}>Tempo Decorrido em Crise</div>
          <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 900, color: "#fff" }}>
            {formatTimer(seconds)}
          </div>
        </div>
      </div>

      {/* Grid: Technical Roster & Live War Room Logs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
        {/* Left: Technical Teams Roster */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={18} style={{ color: "#3b82f6" }} />
            EQUIPES EM PONTE TÉCNICA
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { name: "Equipe SAP Basis & Dev", status: "Conectado", leader: "Carlos Silva (Líder SAP)" },
              { name: "Wipro N3 Support", status: "Conectado", leader: "Consultor Sr. Wipro" },
              { name: "Redes & Telecom DPSP", status: "Conectado", leader: "Eng. Telecom" },
              { name: "Gerência dos CDs", status: "Conectado", leader: "Gerente CDSP/CDMG" },
              { name: "Central de Comando NOC", status: "Facilitador", leader: "João Carlos (NOC)" }
            ].map((t, idx) => (
              <div key={idx} style={{ backgroundColor: "#0b101d", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{t.leader}</div>
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#34d399", backgroundColor: "rgba(16,185,129,0.15)", padding: "2px 8px", borderRadius: "99px" }}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Decision Logs & Actions */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
              Decisões & Plano de Ação em Execução
            </h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn btn-primary btn-sm" onClick={handleCreateUpdateCard}>
                <Megaphone size={14} />
                <span>Publicar Comunicado de Crise</span>
              </button>
              <button className="btn btn-success btn-sm" onClick={() => updateIncidentStatus(incident.id, "normalizado")}>
                <CheckCircle2 size={14} />
                <span>Normalizar & Encerrar Crise</span>
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: "#0b101d", padding: "16px", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontWeight: 800, color: "#f87171" }}>15:20</span>
              <p style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
                Aprovada manobra de reinício controlado do pool de instâncias do serviço EWM.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontWeight: 800, color: "#fbbf24" }}>14:50</span>
              <p style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
                Identificada trava de locks de sessão no banco Oracle do ambiente SAP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
