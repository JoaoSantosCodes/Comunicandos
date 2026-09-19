import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export const NormalizeIncidentModal = ({ incident, onCancel, onConfirm }) => {
  const [solucao, setSolucao] = useState("");
  const [causaRaiz, setCausaRaiz] = useState("");

  if (!incident) return null;

  const handleConfirm = () => {
    onConfirm(solucao.trim(), causaRaiz.trim());
    setSolucao("");
    setCausaRaiz("");
  };

  return (
    <div
      className="animate-fade-in"
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(32,30,29,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "20px" }}
    >
      <div className="panel-card animate-modal-pop" style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle2 size={18} style={{ color: "#10b981" }} />
            Encerrar {incident.id}
          </h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          Registre a solução aplicada e a causa raiz antes de normalizar. Esses campos aparecem no painel do incidente e ficam disponíveis para auditoria e RCA (ambos opcionais).
        </p>

        <div className="form-group">
          <label className="form-label">Solução Aplicada</label>
          <textarea
            className="form-textarea"
            rows={2}
            placeholder="Ex: Reinício controlado do pool de instâncias restabeleceu o processamento."
            value={solucao}
            onChange={(e) => setSolucao(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Causa Raiz (RCA)</label>
          <textarea
            className="form-textarea"
            rows={2}
            placeholder="Ex: Trava de locks de sessão no banco Oracle do ambiente SAP."
            value={causaRaiz}
            onChange={(e) => setCausaRaiz(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleConfirm}>
            <CheckCircle2 size={16} />
            <span>Confirmar Normalização</span>
          </button>
        </div>
      </div>
    </div>
  );
};
