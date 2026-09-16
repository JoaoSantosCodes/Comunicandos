import React from "react";
import { BarChart3, TrendingDown, Clock, ShieldCheck } from "lucide-react";

export const ReportsView = () => {
  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <BarChart3 style={{ color: "#387fef" }} />
          RELATÓRIOS & ANALYTICS OPERACIONAIS
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Métricas de MTTR, frequência por sistema e volumes de comunicação.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="panel-card" style={{ textAlign: "center", padding: "30px" }}>
          <Clock size={36} style={{ color: "#387fef", margin: "0 auto 10px auto" }} />
          <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>01h 42m</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Tempo Médio de Resolução (MTTR)</p>
        </div>

        <div className="panel-card" style={{ textAlign: "center", padding: "30px" }}>
          <TrendingDown size={36} style={{ color: "#10b981", margin: "0 auto 10px auto" }} />
          <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>-18%</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Redução de Incidentes P1 no Mês</p>
        </div>

        <div className="panel-card" style={{ textAlign: "center", padding: "30px" }}>
          <ShieldCheck size={36} style={{ color: "#8b5cf6", margin: "0 auto 10px auto" }} />
          <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>99.4%</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Conformidade SLA de Comunicação</p>
        </div>
      </div>
    </div>
  );
};
