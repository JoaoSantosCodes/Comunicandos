import React from "react";
import { Settings, Lock } from "lucide-react";

export const SettingsView = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div className="panel-card" style={{ padding: "28px" }}>
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
            <Settings style={{ color: "#387fef" }} />
            CONFIGURAÇÕES DO SISTEMA & MARCA
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Parâmetros organizacionais e travas de segurança institucional DPSP.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#92660a", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={16} />
              STATUS DAS TRAVAS DE MARCA (BRAND GUARDRAILS)
            </h3>
            <ul style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "10px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li><strong>Logotipos DPSP / T+PERTO:</strong> Bloqueado contra exclusão ou reposicionamento</li>
              <li><strong>Cores Institucionais:</strong> Chrome `#232a3d` e Vermelho `#c8372d` fixados</li>
              <li><strong>Tipografia Corporativa:</strong> Caprasimo & Figtree padronizadas</li>
              <li><strong>Estrutura do Rodapé:</strong> Contato Service Desk e timestamps auditáveis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
