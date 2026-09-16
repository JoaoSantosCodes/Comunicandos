import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { MessageSquare, Plus } from "lucide-react";

export const PhrasesView = () => {
  const { phrases } = useIncidentContext();

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
            <MessageSquare style={{ color: "#387fef" }} />
            BIBLIOTECA DE FRASES PADRONIZADAS
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Textos institucionais pré-aprovados para velocidade e padronização.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          <span>Nova Frase</span>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {phrases.map((cat, idx) => (
          <div key={idx} className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#2f6ea8", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
              {cat.category}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {cat.phrases.map((phrase, pIdx) => (
                <div key={pIdx} style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "10px", border: "1px solid var(--border-color)", fontSize: "0.85rem", color: "var(--text-main)" }}>
                  "{phrase}"
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
