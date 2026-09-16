import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Users, Phone, Mail } from "lucide-react";

export const TeamsView = () => {
  const { teams } = useIncidentContext();

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
          <Users style={{ color: "#3b82f6" }} />
          EQUIPES & FORNECEDORES
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          Escalonamento de acionamento técnico e contatos de emergência.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {teams.map(tm => (
          <div key={tm.id} className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{tm.name}</h3>
            <span style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: 600 }}>{tm.role}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", color: "#9ca3af", marginTop: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Mail size={14} /> {tm.contact}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Phone size={14} /> {tm.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
