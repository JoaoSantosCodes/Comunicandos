import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Archive, Search, ArrowRight } from "lucide-react";

export const HistoryView = () => {
  const { incidents, setSelectedIncidentId, setActiveTab } = useIncidentContext();
  const [term, setTerm] = useState("");

  const filtered = incidents.filter(i =>
    i.title.toLowerCase().includes(term.toLowerCase()) ||
    i.system.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
          <Archive style={{ color: "#3b82f6" }} />
          HISTÓRICO & KNOWLEDGE BASE
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          Pesquisa histórica de ocorrências passadas para diagnóstico e reutilização.
        </p>
      </div>

      <div className="panel-card" style={{ padding: "16px" }}>
        <input
          type="text"
          className="form-input"
          placeholder="Pesquisar por palavras-chave (ex: SAP WMS, Queda Vivo CDSP)..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map(inc => (
          <div key={inc.id} className="panel-card hoverable" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "0.78rem", color: "#60a5fa", fontWeight: 700 }}>{inc.id}</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{inc.system} • {inc.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Início: {new Date(inc.startAt).toLocaleDateString("pt-BR")}</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedIncidentId(inc.id); setActiveTab("incident-detail"); }}>
              <span>Ver Histórico</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
