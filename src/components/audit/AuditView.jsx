import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { ShieldCheck } from "lucide-react";

export const AuditView = () => {
  const { auditLogs } = useIncidentContext();

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck style={{ color: "#387fef" }} />
          LOG DE AUDITORIA & RASTREABILIDADE
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Registro imutável de todas as ações executadas no sistema.
        </p>
      </div>

      <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {auditLogs.map(log => (
          <div key={log.id} style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <div>
              <span style={{ fontWeight: 800, color: "#2f6ea8" }}>[{log.time}]</span>{" "}
              <strong style={{ color: "var(--text-main)" }}>{log.user}</strong> — <span style={{ color: "#0f7a56" }}>{log.action}</span> ({log.target})
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>{log.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
