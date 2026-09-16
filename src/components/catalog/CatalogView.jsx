import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { FolderTree } from "lucide-react";

export const CatalogView = () => {
  const { catalog } = useIncidentContext();

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
          <FolderTree style={{ color: "#3b82f6" }} />
          CATÁLOGO DE SISTEMAS & PROCESSOS
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          Mapeamento oficial de arquitetura, serviços e dependências operacionais.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {catalog.map(cat => (
          <div key={cat.id} className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{cat.name}</h3>
              <span style={{ fontSize: "0.72rem", backgroundColor: "#1d4ed8", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>{cat.category}</span>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "6px" }}>Serviços & Componentes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.services.map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: "#0b101d", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{s.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#60a5fa", marginTop: "2px" }}>Componentes: {s.components.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>Equipes Responsáveis</div>
              <div style={{ fontSize: "0.8rem", color: "#d1d5db" }}>{cat.teams.join(" • ")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
