import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { FolderTree } from "lucide-react";

export const CatalogView = () => {
  const { catalog } = useIncidentContext();

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <FolderTree style={{ color: "#387fef" }} />
          CATÁLOGO DE SISTEMAS & PROCESSOS
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Mapeamento oficial de arquitetura, serviços e dependências operacionais.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {catalog.map(cat => (
          <div key={cat.id} className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)" }}>{cat.name}</h3>
              <span style={{ fontSize: "0.72rem", backgroundColor: "#387fef", color: "#fff", padding: "2px 8px", borderRadius: "999px", fontWeight: 700 }}>{cat.category}</span>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>Serviços & Componentes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.services.map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: "var(--bg-dark-hover)", padding: "10px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>{s.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#2f6ea8", marginTop: "2px" }}>Componentes: {s.components.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Equipes Responsáveis</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{cat.teams.join(" • ")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
