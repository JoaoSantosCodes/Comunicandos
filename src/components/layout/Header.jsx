import React from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { Search, Bell, Plus, ShieldAlert, Sparkles, Menu } from "lucide-react";

export const Header = ({ onToggleMobileMenu = () => {} }) => {
  const { searchQuery, setSearchQuery, setActiveTab, incidents } = useIncidentContext();
  
  const activeCritical = incidents.filter(i => i.severity === "critica" && i.status !== "normalizado");

  return (
    <header className="header">
      {/* Left: Mobile Hamburger & Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          title="Abrir Menu Operacional"
        >
          <Menu size={20} />
        </button>

        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>
          Central Ops Hub
        </h2>
        <span className="header-breadcrumbs-slash" style={{ color: "var(--text-dim)" }}>/</span>
        <span className="header-breadcrumbs-sub" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Painel de Gestão & Comunicação</span>
      </div>

      {/* Center: Global Search */}
      <div style={{ flex: 1, maxWidth: "420px", margin: "0 24px", position: "relative" }}>
        <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
        <input
          type="text"
          placeholder="Buscar incidentes, sistemas (SAP, Rede), comunicados (Ctrl+K)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: "36px", height: "38px", fontSize: "0.82rem" }}
        />
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Urgent Crise Banner if any P1 */}
        {activeCritical.length > 0 && (
          <button
            onClick={() => setActiveTab("crisis-room")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(200, 55, 45, 0.12)",
              color: "var(--accent-red-deep)",
              border: "1px solid rgba(200, 55, 45, 0.3)",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            <ShieldAlert size={15} className="animate-pulse" />
            <span>SALA DE CRISE ({activeCritical.length})</span>
          </button>
        )}

        {/* AI Parser Quick Trigger */}
        <button
          onClick={() => setActiveTab("ai-assistant")}
          className="btn btn-secondary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Sparkles size={14} style={{ color: "#a855f7" }} />
          <span>IA Parser</span>
        </button>

        {/* Notifications Icon */}
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setActiveTab("notifications")}>
          <Bell size={19} style={{ color: "var(--text-muted)" }} />
          <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-red)" }}></span>
        </div>

        {/* Action Button: + Novo Incidente */}
        <button
          onClick={() => setActiveTab("wizard")}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Novo Incidente</span>
        </button>
      </div>
    </header>
  );
};
