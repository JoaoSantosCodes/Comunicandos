import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Megaphone, ExternalLink, Download } from "lucide-react";

export const CommunicationsView = () => {
  const { communications, setActiveTab, setActiveCardDraft } = useIncidentContext();

  const handleEdit = (comm) => {
    setActiveCardDraft(comm);
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
          <Megaphone style={{ color: "#3b82f6" }} />
          COMUNICAÇÕES PUBLICADAS
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          Histórico de comunicados e cards emitidos pela Central de Comando.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {communications.map(comm => (
          <div key={comm.id} className="panel-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <span className={`status-badge ${comm.type}`}>{comm.type.toUpperCase()}</span>
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{comm.id}</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                {comm.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {comm.impact}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>Canal: {comm.channel || "WhatsApp"}</span>
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
