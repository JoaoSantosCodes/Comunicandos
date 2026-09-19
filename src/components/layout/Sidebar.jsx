import React, { useState } from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import {
  LayoutDashboard,
  Monitor,
  AlertTriangle,
  PlusCircle,
  Clock,
  Megaphone,
  Palette,
  Send,
  Flame,
  Archive,
  FileCode,
  MessageSquare,
  FolderTree,
  Users,
  BarChart3,
  Bot,
  ShieldCheck,
  Settings,
  Radio,
  ChevronLeft,
  BookOpen,
  ClipboardCheck
} from "lucide-react";

export const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { activeTab, setActiveTab, incidents } = useIncidentContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeCount = incidents.filter(i => i.status !== "normalizado").length;
  const criticalCount = incidents.filter(i => i.severity === "critica" && i.status !== "normalizado").length;

  const menuGroups = [
    {
      title: "OPERAÇÃO NOC",
      items: [
        { id: "dashboard", label: "Dashboard NOC", icon: LayoutDashboard, badge: activeCount ? activeCount : null },
        { id: "command-hub", label: "Hub de Telas & SQL", icon: Monitor, isNew: true, badge: "14 TELAS" },
        { id: "incidents", label: "Incidentes", icon: AlertTriangle, badge: criticalCount ? `${criticalCount} P1` : null, badgeColor: "bg-red-500" },
        { id: "wizard", label: "Novo Incidente", icon: PlusCircle, isHighlight: true },
        { id: "timeline", label: "Timeline", icon: Clock },
        { id: "crisis-room", label: "Sala de Crise", icon: Flame, isUrgent: criticalCount > 0 },
        { id: "shift-monitoring", label: "Monitoramento & Plantão", icon: ClipboardCheck, isNew: true }
      ]
    },
    {
      title: "ESTÚDIO DE CARDS",
      items: [
        { id: "card-generator", label: "Gerador de Cards", icon: Palette, isNew: true },
        { id: "communications", label: "Comunicações", icon: Megaphone },
        { id: "publishing", label: "Publicação", icon: Send }
      ]
    },
    {
      title: "RECURSOS & BASE KB",
      items: [
        { id: "pops-kb", label: "Processos & POPs", icon: BookOpen, isNew: true },
        { id: "phrases", label: "Biblioteca Frases", icon: MessageSquare },
        { id: "templates", label: "Templates", icon: FileCode },
        { id: "history", label: "Histórico / KB", icon: Archive },
        { id: "catalog", label: "Catálogo Sistemas", icon: FolderTree }
      ]
    },
    {
      title: "FERRAMENTAS & OPS",
      items: [
        { id: "ai-assistant", label: "Assistente IA", icon: Bot, isNew: true },
        { id: "teams", label: "Equipes / Vendors", icon: Users },
        { id: "reports", label: "Relatórios MTTR", icon: BarChart3 },
        { id: "audit", label: "Auditoria", icon: ShieldCheck },
        { id: "settings", label: "Configurações", icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          className="mobile-backdrop animate-fade-in"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open-mobile" : ""} ${isCollapsed ? "collapsed-dock" : ""}`}>
        {/* Photoshop Style Dock Header */}
        <div style={{ padding: "16px 14px", borderBottom: "1px solid rgba(245,234,216,0.1)", display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "11px", background: "var(--accent-red)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>
              <Radio size={18} />
            </div>
            <div style={{ opacity: isCollapsed ? 0 : 1, maxWidth: isCollapsed ? 0 : "160px", overflow: "hidden", transition: "opacity 0.18s ease, max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-on-chrome)", letterSpacing: "0.02em", lineHeight: 1.15, whiteSpace: "nowrap" }}>
                CENTRAL<br />DE COMANDO
              </h1>
            </div>
          </div>

          {/* Dock Collapse Toggle Button (Photoshop Style << / >>) */}
          <button
            className="dock-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expandir Painel (Ctrl+B)" : "Recolher para Dock de Ícones"}
          >
            <ChevronLeft
              size={16}
              style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </button>
        </div>

        {/* Status Bar */}
        <div
          style={{
            padding: isCollapsed ? "0 16px" : "8px 16px",
            maxHeight: isCollapsed ? 0 : "34px",
            opacity: isCollapsed ? 0 : 1,
            overflow: "hidden",
            backgroundColor: "var(--chrome-2)",
            borderBottom: isCollapsed ? "none" : "1px solid rgba(245,234,216,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            transition: "max-height 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease, padding 0.22s ease, border-color 0.22s ease"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontWeight: 600, whiteSpace: "nowrap" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981", animation: "sidebarPulse 2s ease-in-out infinite" }}></span>
            NOC ONLINE
          </span>
          <span style={{ color: "rgba(245,234,216,0.45)", fontWeight: 600, whiteSpace: "nowrap" }}>DPSP HUB</span>
        </div>

        {/* Grouped Tool Navigation */}
        <nav style={{ flex: 1, padding: isCollapsed ? "12px 6px" : "12px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  color: "rgba(245,234,216,0.35)",
                  padding: "0 8px 4px 8px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: isCollapsed ? 0 : 1,
                  maxHeight: isCollapsed ? 0 : "16px",
                  overflow: "hidden",
                  display: "block",
                  transition: "opacity 0.15s ease, max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                {group.title}
              </span>

              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    title={isCollapsed ? item.label : ""}
                    onClick={() => {
                      setActiveTab(item.id);
                      onClose();
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "rgba(245,234,216,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = item.isHighlight ? "rgba(16, 185, 129, 0.12)" : "transparent";
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "space-between",
                      padding: isCollapsed ? "10px" : "8px 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: isActive
                        ? "linear-gradient(90deg, rgba(200,55,45,0.3) 0%, rgba(200,55,45,0.08) 100%)"
                        : item.isHighlight
                        ? "rgba(16, 185, 129, 0.12)"
                        : "transparent",
                      color: isActive
                        ? "var(--text-on-chrome)"
                        : item.isUrgent
                        ? "#f2867d"
                        : item.isHighlight
                        ? "#34d399"
                        : "rgba(245,234,216,0.55)",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.83rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.18s ease, color 0.18s ease, border-left-color 0.18s ease, transform 0.15s ease",
                      borderLeft: isActive ? "3px solid #e2574c" : "3px solid transparent",
                      position: "relative",
                      width: "100%"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: isCollapsed ? "0 0 auto" : "1 1 auto" }}>
                      <Icon
                        size={isCollapsed ? 20 : 17}
                        style={{
                          color: isActive ? "#e2574c" : item.isUrgent ? "#f2867d" : "inherit",
                          flexShrink: 0,
                          transition: "color 0.18s ease",
                          animation: item.isUrgent && !isActive ? "sidebarPulse 1.8s ease-in-out infinite" : "none"
                        }}
                      />
                      <span
                        style={{
                          opacity: isCollapsed ? 0 : 1,
                          maxWidth: isCollapsed ? 0 : "100%",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          transition: "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexShrink: 0,
                        opacity: isCollapsed ? 0 : 1,
                        maxWidth: isCollapsed ? 0 : "160px",
                        overflow: "hidden",
                        transition: "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4, 0, 0.2, 1)"
                      }}
                    >
                      {item.badge && (
                        <span
                          style={{
                            padding: "1px 6px",
                            borderRadius: "99px",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            backgroundColor: item.badgeColor ? "var(--accent-red-deep)" : "#e2574c",
                            color: "#ffffff",
                            whiteSpace: "nowrap",
                            animation: item.badgeColor ? "sidebarPulse 1.8s ease-in-out infinite" : "none"
                          }}
                        >
                          {item.badge}
                        </span>
                      )}

                      {item.isNew && (
                        <span style={{ fontSize: "0.58rem", fontWeight: 800, padding: "1px 5px", borderRadius: "4px", backgroundColor: "#8b5cf6", color: "#fff", whiteSpace: "nowrap" }}>
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Tooltip Badge on Collapsed Dock */}
                    {isCollapsed && item.badge && (
                      <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.badgeColor ? "var(--accent-red-deep)" : "#e2574c", animation: "sidebarPulse 1.8s ease-in-out infinite" }}></span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Footer Profile */}
        <div style={{ padding: isCollapsed ? "12px 8px" : "14px 16px", borderTop: "1px solid rgba(245,234,216,0.1)", display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "10px", backgroundColor: "var(--chrome-2)", transition: "padding 0.22s ease" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "var(--chrome-3)", border: "2px solid #e2574c", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, transition: "transform 0.18s ease" }}>
            JC
          </div>
          <div
            style={{
              flex: isCollapsed ? "0" : "1",
              minWidth: 0,
              opacity: isCollapsed ? 0 : 1,
              maxWidth: isCollapsed ? 0 : "160px",
              overflow: "hidden",
              transition: "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4, 0, 0.2, 1), flex 0.22s ease"
            }}
          >
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-on-chrome)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              João Carlos
            </p>
            <p style={{ fontSize: "0.68rem", color: "rgba(245,234,216,0.45)", whiteSpace: "nowrap" }}>Operador N3 / NOC</p>
          </div>
        </div>
      </aside>
    </>
  );
};
