import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { FileCode, ArrowRight } from "lucide-react";

export const TemplatesView = () => {
  const { templates, setActiveTab, setActiveCardDraft } = useIncidentContext();

  const handleUseTemplate = (tpl) => {
    setActiveCardDraft({
      type: tpl.type,
      title: tpl.headerTitle,
      system: "SAP",
      process: "Processo Exemplo",
      components: "Módulos Core",
      impact: "Descrição do impacto conforme o modelo...",
      scope: ["CDSP", "CDMG"],
      status: "Status conforme modelo...",
      action: "Ação em andamento...",
      contact: "Suporte TI"
    });
    setActiveTab("card-generator");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <FileCode style={{ color: "#387fef" }} />
          BIBLIOTECA DE TEMPLATES DE COMUNICAÇÃO
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Modelos padronizados por contexto operacional.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {templates.map(tpl => (
          <div key={tpl.id} className="panel-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px", borderTop: `4px solid ${tpl.accentColor}` }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>{tpl.name}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{tpl.description}</p>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => handleUseTemplate(tpl)}>
              <span>Usar Template</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
