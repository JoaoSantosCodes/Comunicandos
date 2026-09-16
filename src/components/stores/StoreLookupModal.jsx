import React, { useState } from "react";
import { STORES_CATALOG } from "../../data/storesData";
import { Search, Store, User, MapPin, X, Plus } from "lucide-react";

export const StoreLookupModal = ({ isOpen, onClose, onSelectStore }) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredStores = STORES_CATALOG.filter(st => {
    const q = query.toLowerCase();
    return (
      st.vd.toLowerCase().includes(q) ||
      st.nomeLoja.toLowerCase().includes(q) ||
      st.ggl.toLowerCase().includes(q) ||
      st.gr.toLowerCase().includes(q) ||
      st.regiao.toLowerCase().includes(q) ||
      st.estado.toLowerCase().includes(q)
    );
  });

  const handleConfirmSelect = (store) => {
    if (onSelectStore) {
      onSelectStore(store);
    }
    onClose();
  };

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      className="animate-fade-in"
    >
      <div 
        className="panel-card" 
        style={{ 
          width: "100%", 
          maxWidth: "760px", 
          maxHeight: "85vh", 
          display: "flex", 
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          backgroundColor: "var(--color-brand-chrome)",
          border: "1px solid var(--color-border)",
          color: "var(--color-cream-light)"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(245,234,216,0.12)", paddingBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: "var(--color-brand-red)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Store size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 400, margin: 0, color: "#fff" }}>
                CATÁLOGO DE LOJAS & VDs DPSP
              </h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(245,234,216,0.65)", margin: 0 }}>
                Consulta corporativa de VDs, Gerentes Gerais (GGL) e Gerentes Regionais (GR).
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(245,234,216,0.6)", cursor: "pointer", padding: "4px" }}>
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(245,234,216,0.4)" }} />
          <input 
            type="text"
            className="form-input"
            style={{ 
              paddingLeft: "40px", 
              backgroundColor: "rgba(0,0,0,0.3)", 
              borderColor: "rgba(245,234,216,0.15)",
              color: "#fff"
            }}
            placeholder="Buscar por VD (ex: VD 105), Nome da Loja, GGL, GR ou Cidade..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Stores Grid / List */}
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingRight: "4px", flex: 1 }}>
          {filteredStores.map(st => (
            <div 
              key={st.vd}
              style={{
                backgroundColor: "rgba(0,0,0,0.25)",
                border: selectedVd === st.vd ? "2px solid var(--color-brand-red)" : "1px solid rgba(245,234,216,0.1)",
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.15s"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 800, backgroundColor: st.bandeira === "DSP" ? "#c8372d" : "#2f6ea8", color: "#fff", padding: "2px 8px", borderRadius: "4px" }}>
                    {st.vd}
                  </span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(245,234,216,0.6)" }}>
                    • {st.regiao}
                  </span>
                </div>

                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: "0 0 4px 0" }}>
                  {st.nomeLoja}
                </h4>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "0.75rem", color: "rgba(245,234,216,0.7)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={12} color="#f2a39c" />
                    {st.endereco}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <User size={12} color="#f59e0b" />
                    <strong>GGL:</strong> {st.ggl} ({st.gglPhone})
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <User size={12} color="#387fef" />
                    <strong>GR:</strong> {st.gr} ({st.grPhone})
                  </span>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleConfirmSelect(st)}
                style={{ shrink: 0, display: "flex", alignItems: "center", gap: "6px", backgroundColor: "var(--color-brand-red)", border: "none" }}
              >
                <Plus size={14} />
                <span>Vincular</span>
              </button>
            </div>
          ))}

          {filteredStores.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "rgba(245,234,216,0.4)" }}>
              Nenhuma loja ou VD encontrada para a busca "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid rgba(245,234,216,0.12)", paddingTop: "12px" }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ color: "#fff" }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
