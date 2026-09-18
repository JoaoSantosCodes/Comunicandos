import React, { useState } from "react";
import { BookOpen, Search, CheckSquare, Terminal } from "lucide-react";
import { POPS_CATALOG } from "../../data/popsData";

export const ProcessosPOPsView = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPopId, setSelectedPopId] = useState("POP-NOC-001");
  const [checkedSteps, setCheckedSteps] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);

  const categories = ["Todos", "Subida de Vendas", "Descida de Bases", "Conectividade / Telecom", "Malha de Preços", "Plantão 00h", "Escalonamentos"];

  const filteredPops = POPS_CATALOG.filter(pop => {
    const matchesCat = selectedCategory === "Todos" || pop.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const q = query.toLowerCase();
    const matchesQuery = !q || (
      pop.code.toLowerCase().includes(q) ||
      pop.title.toLowerCase().includes(q) ||
      pop.description.toLowerCase().includes(q) ||
      pop.category.toLowerCase().includes(q)
    );
    return matchesCat && matchesQuery;
  });

  const activePop = POPS_CATALOG.find(p => p.id === selectedPopId) || filteredPops[0] || POPS_CATALOG[0];

  const toggleStep = (stepId) => {
    setCheckedSteps(prev => ({
      ...prev,
      [`${activePop.id}_${stepId}`]: !prev[`${activePop.id}_${stepId}`]
    }));
  };

  const handleCopyCode = async (text, idx) => {
    let success = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback para contextos onde a Clipboard API é bloqueada
    }

    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Erro ao copiar código:", err);
      }
    }

    if (success) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Banner */}
      <div className="panel-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
              Base de Conhecimento & Procedimentos (POPs NOC DPSP)
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
              Manuais de operação, checklists de validação e procedimentos operacionais padrão da Central de Comando.
            </p>
          </div>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", backgroundColor: "var(--bg-dark-hover)", padding: "6px 14px", borderRadius: "99px", border: "1px solid var(--border-color)" }}>
          📚 <strong>{POPS_CATALOG.length} Procedimentos Oficiais</strong> Cadastrados
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: "280px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: "38px", height: "40px", fontSize: "0.85rem" }}
            placeholder="Buscar por POP, sistema (Grafana, SAP, Fortinet), código ou procedimento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                border: selectedCategory === cat ? "1px solid #3b82f6" : "1px solid var(--border-color)",
                backgroundColor: selectedCategory === cat ? "rgba(59, 130, 246, 0.15)" : "var(--bg-dark-hover)",
                color: selectedCategory === cat ? "#3b82f6" : "var(--text-muted)",
                whiteSpace: "nowrap"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: POP List (Left) vs POP Content Detail (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "20px", alignItems: "start" }}>
        
        {/* Left Column: List of POP Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "750px", overflowY: "auto", paddingRight: "4px" }}>
          {filteredPops.map(pop => {
            const isSelected = activePop?.id === pop.id;
            return (
              <div
                key={pop.id}
                onClick={() => setSelectedPopId(pop.id)}
                className="panel-card"
                style={{
                  padding: "14px",
                  cursor: "pointer",
                  border: isSelected ? "2px solid #3b82f6" : "1px solid var(--border-color)",
                  backgroundColor: isSelected ? "rgba(59, 130, 246, 0.08)" : "var(--paper)",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", fontWeight: 800, color: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.15)", padding: "2px 8px", borderRadius: "4px" }}>
                    {pop.code}
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: pop.severity === "critica" ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: pop.severity === "critica" ? "#ef4444" : "#f59e0b"
                  }}>
                    {pop.category}
                  </span>
                </div>

                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 6px 0", lineHeight: 1.3 }}>
                  {pop.title}
                </h4>

                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {pop.description}
                </p>
              </div>
            );
          })}

          {filteredPops.length === 0 && (
            <div className="panel-card" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              Nenhum POP encontrado para a busca "{query}".
            </div>
          )}
        </div>

        {/* Right Column: POP Full Detail View */}
        {activePop ? (
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "24px" }}>
            
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: "#fff", backgroundColor: "#3b82f6", padding: "3px 10px", borderRadius: "6px" }}>
                  {activePop.code}
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", backgroundColor: "var(--bg-dark-hover)", padding: "3px 10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                  {activePop.category}
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", margin: "0 0 8px 0" }}>
                {activePop.title}
              </h1>

              <div style={{ display: "flex", gap: "16px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span>✍️ <strong>Elaboração:</strong> {activePop.author}</span>
                <span>📅 <strong>Atualização:</strong> {activePop.updatedAt}</span>
                <span>📞 <strong>Escalonamento:</strong> {activePop.escalationTeam}</span>
              </div>
            </div>

            {/* Description & Prerequisites */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "14px", borderRadius: "10px", border: "1px solid var(--border-color)", fontSize: "0.85rem", color: "var(--text-main)", lineHeight: "1.5" }}>
                <strong style={{ color: "#3b82f6", display: "block", marginBottom: "4px" }}>🎯 Objetivo do Procedimento:</strong>
                {activePop.description}
              </div>

              {activePop.prerequisites && activePop.prerequisites.length > 0 && (
                <div style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(245, 158, 11, 0.2)", fontSize: "0.8rem", color: "#d97706" }}>
                  <strong>⚠️ Pré-requisitos & Ferramentas Necessárias:</strong>
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    {activePop.prerequisites.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Interactive Step-by-Step Execution Checklist */}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckSquare size={18} color="#10b981" />
                <span>Roteiro de Atuação Passo a Passo</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {activePop.steps.map((step) => {
                  const isDone = !!checkedSteps[`${activePop.id}_${step.id}`];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      style={{
                        backgroundColor: isDone ? "rgba(16, 185, 129, 0.08)" : "var(--bg-dark-hover)",
                        border: isDone ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-color)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ 
                        width: "22px", 
                        height: "22px", 
                        borderRadius: "6px", 
                        backgroundColor: isDone ? "#10b981" : "rgba(255,255,255,0.1)", 
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: "2px"
                      }}>
                        {isDone ? "✓" : step.id}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: isDone ? "#10b981" : "var(--text-main)" }}>
                          {step.title}
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "4px 0 0 0", lineHeight: "1.4" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Snippets & Jumpbox Paths */}
            {activePop.codeSnippets && activePop.codeSnippets.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Terminal size={18} color="#60a5fa" />
                  <span>Comandos, URLs & Links Rápidos</span>
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activePop.codeSnippets.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: "var(--bg-dark-hover)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#2f6ea8", fontWeight: 700, textTransform: "uppercase", display: "block" }}>{item.label}</span>
                        <code style={{ fontSize: "0.82rem", color: "var(--text-main)", fontFamily: "monospace", backgroundColor: "rgba(0,0,0,0.06)", padding: "2px 6px", borderRadius: "4px" }}>{item.code}</code>
                      </div>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleCopyCode(item.code, idx)}
                        style={{ backgroundColor: copiedIndex === idx ? "#10b981" : "var(--accent-red)", color: "#fff", border: "none", fontSize: "0.72rem", padding: "4px 10px" }}
                      >
                        {copiedIndex === idx ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : null}
      </div>
    </div>
  );
};
