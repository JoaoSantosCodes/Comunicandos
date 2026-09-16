import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { AlertTriangle, Search, Plus, ArrowRight } from "lucide-react";

export const IncidentsView = () => {
  const { incidents, searchQuery, setSearchQuery, setActiveTab, setSelectedIncidentId } = useIncidentContext();
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSev = filterSeverity === "all" || inc.severity === filterSeverity;
    const matchesStat = filterStatus === "all" || inc.status === filterStatus;
    return matchesSearch && matchesSev && matchesStat;
  });

  const handleOpen = (id) => {
    setSelectedIncidentId(id);
    setActiveTab("incident-detail");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
            <AlertTriangle style={{ color: "#ef4444" }} />
            GESTÃO DE INCIDENTES OPERACIONAIS
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Acompanhamento centralizado e ciclo de vida de ocorrências TI.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab("wizard")}>
          <Plus size={16} />
          <span>Novo Incidente</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="panel-card" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "36px" }}
            placeholder="Buscar por ID, sistema ou título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select className="form-select" value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="all">Todas Severidades</option>
            <option value="critica">🔴 Crítica (P1)</option>
            <option value="alta">🟠 Alta (P2)</option>
            <option value="media">🟡 Média (P3)</option>
            <option value="baixa">🟢 Baixa (P4)</option>
          </select>

          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Todos os Status</option>
            <option value="investigacao">Em Investigação</option>
            <option value="acompanhamento">Em Acompanhamento</option>
            <option value="normalizado">Normalizados</option>
          </select>
        </div>
      </div>

      {/* Incident List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredIncidents.map(inc => (
          <div key={inc.id} className="panel-card hoverable" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span className={`status-badge ${inc.severity}`}>{inc.severity.toUpperCase()}</span>
                <span className={`status-badge ${inc.status}`}>{inc.status.toUpperCase()}</span>
                <span style={{ fontFamily: "monospace", color: "#2f6ea8", fontWeight: 700 }}>{inc.id}</span>
                <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>• {inc.system} ({inc.service})</span>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "4px" }}>
                {inc.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                Responsável: <strong style={{ color: "var(--text-main)" }}>{inc.responsible}</strong> | Abrangência: {inc.scope.join(", ")}
              </p>
            </div>

            <button className="btn btn-primary btn-sm" onClick={() => handleOpen(inc.id)}>
              <span>Abrir Painel</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
