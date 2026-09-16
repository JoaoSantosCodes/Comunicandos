import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Send, CheckCircle2, Copy, AlertTriangle, ShieldCheck } from "lucide-react";

export const PublishingCentralView = () => {
  const { communications, setActiveTab } = useIncidentContext();
  const latestComm = communications[0] || {};

  const [channels, setChannels] = useState({
    whatsapp: true,
    teams: true,
    email: false
  });

  const [isPublished, setIsPublished] = useState(false);

  const handleDispatch = () => {
    setIsPublished(true);
    setTimeout(() => {
      alert("Comunicado publicado com sucesso nos canais selecionados!");
      setIsPublished(false);
      setActiveTab("communications");
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="panel-card" style={{ padding: "28px" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
            <Send style={{ color: "#10b981" }} />
            CENTRAL DE PUBLICAÇÃO & DISPATCH
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
            Validação final e envio automatizado de comunicados institucionais.
          </p>
        </div>

        {/* Pre-flight Checklist */}
        <div style={{ backgroundColor: "#0b101d", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#60a5fa", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} />
            CHECKLIST PRÉ-ENVIO DE SEGURANÇA
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "#d1d5db" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} style={{ color: "#10b981" }} />
              <span>Texto revisado de acordo com o padrão DPSP</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} style={{ color: "#10b981" }} />
              <span>Abrangência e sistemas impactados devidamente alinhados</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} style={{ color: "#10b981" }} />
              <span>Identidade de marca e logotipos institucionais validados</span>
            </div>
          </div>
        </div>

        {/* Selected Communication Preview */}
        <div style={{ backgroundColor: "#111827", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Comunicado Selecionado para Envio</span>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
            {latestComm.title || "INDISPONIBILIDADE INTEGRACAO SAP"}
          </h4>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "4px" }}>
            Sistema: {latestComm.system} | Processo: {latestComm.process}
          </p>
        </div>

        {/* Multi-channel Selectors */}
        <div style={{ marginBottom: "28px" }}>
          <label className="form-label" style={{ marginBottom: "12px" }}>SELECIONE OS CANAIS DE DESTINO:</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              { id: "whatsapp", label: "WhatsApp Broadcast", desc: "Grupos de Operação e CDs" },
              { id: "teams", label: "Microsoft Teams", desc: "Canal #Ops-Central" },
              { id: "email", label: "E-mail Corporativo", desc: "Lista Gerência DPSP" }
            ].map(ch => (
              <label
                key={ch.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px",
                  borderRadius: "8px",
                  border: channels[ch.id] ? "2px solid #3b82f6" : "1px solid var(--border-color)",
                  backgroundColor: channels[ch.id] ? "rgba(59, 130, 246, 0.15)" : "#0b101d",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{ch.label}</span>
                  <input
                    type="checkbox"
                    checked={channels[ch.id]}
                    onChange={(e) => setChannels({ ...channels, [ch.id]: e.target.checked })}
                  />
                </div>
                <span style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "4px" }}>{ch.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dispatch Action Button */}
        <button
          className="btn btn-success"
          onClick={handleDispatch}
          disabled={isPublished}
          style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: 800 }}
        >
          <Send size={18} />
          <span>{isPublished ? "DISPARANDO COMUNICADO..." : "CONFIRMAR & DISPARAR COMUNICADO"}</span>
        </button>
      </div>
    </div>
  );
};
