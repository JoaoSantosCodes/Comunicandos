import React, { useState } from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { Check, ArrowRight, ArrowLeft, ShieldAlert } from "lucide-react";

export const IncidentWizardModal = () => {
  const { createIncident, setActiveTab } = useIncidentContext();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => ({
    system: "SAP",
    service: "Integração de Pedidos",
    title: "",
    severity: "alta",
    description: "",
    scope: ["CDSP", "CDMG"],
    teams: ["Equipe SAP", "Wipro"],
    responsible: "Wipro Tech Support",
    acn: `ACN-${Math.floor(1000 + Math.random() * 9000)}`,
    analistaResponsavel: "João Carlos (Operador NOC)"
  }));

  const availableScopes = ["CDSP", "CDMG", "CDRJ", "CDGO", "Matriz", "Lojas SP", "Lojas RJ", "Lojas MG"];
  const availableTeams = ["Equipe SAP", "Wipro", "Equipe Redes", "Telecom", "TI Varejo", "Central de Comando"];

  const handleScopeToggle = (scopeName) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.includes(scopeName)
        ? prev.scope.filter(s => s !== scopeName)
        : [...prev.scope, scopeName]
    }));
  };

  const handleTeamToggle = (teamName) => {
    setFormData(prev => ({
      ...prev,
      teams: prev.teams.includes(teamName)
        ? prev.teams.filter(t => t !== teamName)
        : [...prev.teams, teamName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Por favor informe o título do incidente.");
      return;
    }
    createIncident(formData);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div className="panel-card" style={{ padding: "28px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
              <ShieldAlert style={{ color: "#ef4444" }} />
              REGISTRO DE NOVO INCIDENTE
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
              Passo {step} de 4 — {step === 1 ? "Identificação do Serviço" : step === 2 ? "Impacto & Abrangência" : step === 3 ? "Equipes & Responsáveis" : "Revisão e Confirmação"}
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("dashboard")}>
            Cancelar
          </button>
        </div>

        {/* Step Progress Pills */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "24px" }}>
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              style={{
                height: "6px",
                borderRadius: "3px",
                backgroundColor: s <= step ? "var(--accent-red)" : "rgba(32,30,29,0.1)",
                transition: "all 0.2s"
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: IDENTIFICAÇÃO */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Sistema Atingido</label>
                <select
                  className="form-select"
                  value={formData.system}
                  onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                >
                  <option value="SAP">SAP ERP & Logística</option>
                  <option value="Rede / Telecom">Rede / Conectividade / Telecom</option>
                  <option value="Sistemas de Loja">Sistemas de Loja & PDV</option>
                  <option value="Cloud / AWS">Cloud AWS & Banco de Dados</option>
                  <option value="Outros">Outros Sistemas Operacionais</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Código ACN (Atuação de Crise NOC)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: ACN-9982"
                    value={formData.acn}
                    onChange={(e) => setFormData({ ...formData, acn: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Analista Responsável NOC</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: João Carlos (Operador NOC)"
                    value={formData.analistaResponsavel}
                    onChange={(e) => setFormData({ ...formData, analistaResponsavel: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Serviço / Processo Específico</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Integração PeopleSoft e EWM, Link 4G Loja..."
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Título do Incidente (Objetivo e Institucional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Instabilidade na sincronização de pedidos de transferência..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                  <span>Próximo (Impacto)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: IMPACTO & SCOPE */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Severidade Operacional</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {[
                    { id: "critica", label: "🔴 Crítica (P1)", desc: "Parada total" },
                    { id: "alta", label: "🟠 Alta (P2)", desc: "Impacto parcial grave" },
                    { id: "media", label: "🟡 Média (P3)", desc: "Lentidão / Contorno" },
                    { id: "baixa", label: "🟢 Baixa (P4)", desc: "Sem impacto direto" }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: item.id })}
                      style={{
                        padding: "12px 8px",
                        borderRadius: "12px",
                        border: formData.severity === item.id ? "2px solid var(--accent-red)" : "1px solid var(--border-color)",
                        backgroundColor: formData.severity === item.id ? "rgba(200, 55, 45, 0.1)" : "var(--bg-dark-hover)",
                        color: "var(--text-main)",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "2px" }}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Abrangência Operacional Afetada</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {availableScopes.map(sc => {
                    const isSelected = formData.scope.includes(sc);
                    return (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => handleScopeToggle(sc)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          border: isSelected ? "1px solid var(--accent-red)" : "1px solid var(--border-color)",
                          backgroundColor: isSelected ? "var(--accent-red)" : "var(--bg-dark-hover)",
                          color: isSelected ? "#fff" : "var(--text-main)",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {sc} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Descrição Resumida do Problema</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Detalhamento inicial da falha para histórico do NOC..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  <span>Voltar</span>
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                  <span>Próximo (Equipes)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EQUIPES */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Equipes Acionadas para Tratativa</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {availableTeams.map(tm => {
                    const isSelected = formData.teams.includes(tm);
                    return (
                      <button
                        key={tm}
                        type="button"
                        onClick={() => handleTeamToggle(tm)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          border: isSelected ? "1px solid #10b981" : "1px solid var(--border-color)",
                          backgroundColor: isSelected ? "rgba(16, 185, 129, 0.14)" : "var(--bg-dark-hover)",
                          color: isSelected ? "#0f7a56" : "var(--text-main)",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {tm} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Responsável Técnico Principal / Fornecedor</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Wipro / Equipe Basis SAP / Vivo Empresas"
                  value={formData.responsible}
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Nº do Chamado ServiceNow (SNOW)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: INC0098412"
                    value={formData.ticketServiceNow || ""}
                    onChange={(e) => setFormData({ ...formData, ticketServiceNow: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Horário Próximo Status (Follow-up)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: 16:30h"
                    value={formData.proximoStatus || ""}
                    onChange={(e) => setFormData({ ...formData, proximoStatus: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Link da Sala de Crise (Microsoft Teams / Meet)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: https://teams.microsoft.com/l/meetup-join/..."
                  value={formData.linkSalaCrise || ""}
                  onChange={(e) => setFormData({ ...formData, linkSalaCrise: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} />
                  <span>Voltar</span>
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>
                  <span>Revisar Incidente</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVISÃO & CONFIRMAÇÃO */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ backgroundColor: "var(--bg-dark-hover)", border: "1px solid var(--border-color)", padding: "16px", borderRadius: "12px" }}>
                <h4 style={{ color: "#2f6ea8", fontWeight: 700, fontSize: "0.95rem" }}>
                  {formData.system} — {formData.title}
                </h4>
                <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <div><strong>Severidade:</strong> {formData.severity.toUpperCase()}</div>
                  <div><strong>Serviço:</strong> {formData.service}</div>
                  <div><strong>Abrangência:</strong> {formData.scope.join(", ")}</div>
                  <div><strong>Responsável:</strong> {formData.responsible}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>
                  <ArrowLeft size={16} />
                  <span>Voltar</span>
                </button>
                <button type="submit" className="btn btn-success" style={{ padding: "10px 24px" }}>
                  <Check size={18} />
                  <span>CRIAR INCIDENTE & ABRIR PAINEL</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
