import React, { useState } from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { Bot, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const AiAssistantView = () => {
  const { parseNotesWithAi, createIncident } = useIncidentContext();

  const [rawText, setRawText] = useState(
    "sap voltou a apresentar problema na integracao de pedidos, wipro ja esta olhando a causa raiz no cdsp e cdmg, sem previsao de retorno ainda"
  );

  const [parsedData, setParsedData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleNotes = [
    { label: "⚡ SAP Pedidos (CDSP/CDMG)", text: "sap voltou a apresentar problema na integracao de pedidos, wipro ja esta olhando a causa raiz no cdsp e cdmg, sem previsao de retorno ainda" },
    { label: "⚡ Instabilidade TEF Lojas", text: "instabilidade no autorizador sitef afetando vendas de cartao nas lojas de sp e rj, ti varejo e suporte sitef acionados emergencialmente" },
    { label: "⚡ Queda Fibra Vivo CD", text: "queda de fibra optica vivo empresas no cd de niteroi cdrj, trafego caindo no circuito 4g backup, chamado vivo 991823 aberto" }
  ];

  const handleAnalyze = (textToUse = rawText) => {
    if (!textToUse.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = parseNotesWithAi(textToUse);
      setParsedData(result);
      setIsAnalyzing(false);
    }, 500);
  };

  const handleCreateFromAi = () => {
    if (!parsedData) return;
    createIncident({
      title: parsedData.title,
      system: parsedData.system,
      service: parsedData.service,
      severity: parsedData.severity,
      scope: parsedData.scope,
      responsible: parsedData.responsible,
      description: parsedData.description
    });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "840px", margin: "0 auto" }}>
      <div className="panel-card" style={{ padding: "28px" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
            <Bot style={{ color: "#8b3fd1" }} />
            ASSISTENTE DE COMUNICAÇÃO IA (PARSER OPERACIONAL)
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Transforme anotações informais em campos estruturados sem alterar os fatos fornecidos.
          </p>
        </div>

        {/* Quick Sample Buttons */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8b3fd1", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
            Exemplos Prontos para Testar com 1-Clique:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {sampleNotes.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setRawText(sample.text);
                  handleAnalyze(sample.text);
                }}
                style={{
                  backgroundColor: "var(--bg-dark-hover)",
                  border: "1px solid #8b5cf640",
                  color: "#7c3aed",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Box */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Cole ou digite a anotação bruta:</span>
            <span style={{ fontSize: "0.7rem", color: "#8b3fd1" }}>Zero Alucinação • Fatos Preservados</span>
          </label>
          <textarea
            className="form-textarea"
            rows={4}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Ex: sap caiu no cdsp e cdmg afeta peoplesoft e ewm wipro ja ta vendo..."
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => handleAnalyze(rawText)}
          disabled={isAnalyzing}
          style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", fontWeight: 700 }}
        >
          <Sparkles size={18} />
          <span>{isAnalyzing ? "ANALISANDO ANOTAÇÃO..." : "PARSEAR ANOTAÇÃO COM IA"}</span>
        </button>

        {/* Parsed Results Box */}
        {parsedData && (
          <div style={{ marginTop: "28px", backgroundColor: "var(--bg-dark-hover)", border: "1px solid #8b5cf6", borderRadius: "14px", padding: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#7c3aed", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} />
              CAMPOS ESTRUTURADOS EXTRAÍDOS
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "0.85rem" }}>
              <div style={{ backgroundColor: "var(--paper)", padding: "10px 14px", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Sistema</span>
                <span style={{ color: "var(--text-main)", fontWeight: 700 }}>{parsedData.system}</span>
              </div>
              <div style={{ backgroundColor: "var(--paper)", padding: "10px 14px", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Serviço / Processo</span>
                <span style={{ color: "var(--text-main)", fontWeight: 700 }}>{parsedData.service}</span>
              </div>
              <div style={{ backgroundColor: "var(--paper)", padding: "10px 14px", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Abrangência Extraída</span>
                <span style={{ color: "#2f6ea8", fontWeight: 700 }}>{parsedData.scope.join(", ")}</span>
              </div>
              <div style={{ backgroundColor: "var(--paper)", padding: "10px 14px", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Responsável</span>
                <span style={{ color: "var(--text-main)", fontWeight: 700 }}>{parsedData.responsible}</span>
              </div>
            </div>

            <button
              className="btn btn-success"
              onClick={handleCreateFromAi}
              style={{ width: "100%", marginTop: "20px", padding: "12px", fontWeight: 700 }}
            >
              <span>CRIAR INCIDENTE COM ESTES DADOS</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
