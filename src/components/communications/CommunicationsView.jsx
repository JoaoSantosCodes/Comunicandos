import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { Megaphone, ExternalLink } from "lucide-react";

export const CommunicationsView = () => {
  const { communications, setActiveTab, setActiveCardDraft } = useIncidentContext();

  const handleEdit = (comm) => {
    setActiveCardDraft(comm);
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Megaphone style={{ color: "#387fef" }} />
          COMUNICAÇÕES PUBLICADAS
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Histórico de comunicados e cards emitidos pela Central de Comando.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {communications.map(comm => (
          <div key={comm.id} className="panel-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className={`status-badge ${comm.type}`}>{comm.type.toUpperCase()}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{comm.id}</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>
                {comm.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {comm.impact}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>Canal: {comm.channel || "WhatsApp"}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(comm)}>
                <ExternalLink size={14} />
                <span>Ver / Editar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
