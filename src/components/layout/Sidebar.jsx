import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import {
  LayoutDashboard,
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
  ChevronRight,
  Sparkles,
  Layers,
  Wrench
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
        { id: "incidents", label: "Incidentes", icon: AlertTriangle, badge: criticalCount ? `${criticalCount} P1` : null, badgeColor: "bg-red-500" },
        { id: "wizard", label: "Novo Incidente", icon: PlusCircle, isHighlight: true },
        { id: "timeline", label: "Timeline", icon: Clock },
        { id: "crisis-room", label: "Sala de Crise", icon: Flame, isUrgent: criticalCount > 0 }
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
          className="mobile-backdrop"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open-mobile" : ""} ${isCollapsed ? "collapsed-dock" : ""}`}>
        {/* Photoshop Style Dock Header */}
        <div style={{ padding: "16px 14px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #003b71, #d91c24)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.1rem", boxShadow: "0 4px 12px rgba(217, 28, 36, 0.3)" }}>
              <Radio size={19} />
            </div>
            {!isCollapsed && (
              <div>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 800, color: "#fff", letterSpacing: "0.03em", lineHeight: 1.1 }}>
                  CENTRAL <span style={{ color: "#d91c24" }}>DE COMANDO</span>
                </h1>
                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  Photoshop Hub v2.5
                </p>
              </div>
            )}
          </div>

          {/* Dock Collapse Toggle Button (Photoshop Style << / >>) */}
          <button
            className="dock-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expandir Painel (Ctrl+B)" : "Recolher para Dock de Ícones"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Status Bar */}
        {!isCollapsed && (
          <div style={{ padding: "8px 16px", backgroundColor: "#090f1d", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.7rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontWeight: 600 }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
              NOC ONLINE
            </span>
            <span style={{ color: "var(--text-dim)", fontWeight: 600 }}>DPSP HUB</span>
          </div>
        )}

        {/* Grouped Tool Navigation */}
        <nav style={{ flex: 1, padding: isCollapsed ? "12px 6px" : "12px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {!isCollapsed && (
                <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#475569", padding: "0 8px 4px 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {group.title}
                </span>
              )}

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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isCollapsed ? "center" : "space-between",
                      padding: isCollapsed ? "10px" : "8px 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: isActive
                        ? "linear-gradient(90deg, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.08) 100%)"
                        : item.isHighlight
                        ? "rgba(16, 185, 129, 0.12)"
                        : "transparent",
                      color: isActive
                        ? "#60a5fa"
                        : item.isUrgent
                        ? "#f87171"
                        : item.isHighlight
                        ? "#34d399"
                        : "#9ca3af",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.83rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                      borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Icon size={isCollapsed ? 20 : 17} style={{ color: isActive ? "#3b82f6" : item.isUrgent ? "#ef4444" : "inherit" }} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        style={{
                          padding: "1px 6px",
                          borderRadius: "99px",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          backgroundColor: item.badgeColor ? "#ef4444" : "#2563eb",
                          color: "#ffffff"
                        }}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && item.isNew && (
                      <span style={{ fontSize: "0.58rem", fontWeight: 800, padding: "1px 5px", borderRadius: "4px", backgroundColor: "#8b5cf6", color: "#fff" }}>
                        PRO
                      </span>
                    )}

                    {/* Tooltip Badge on Collapsed Dock */}
                    {isCollapsed && item.badge && (
                      <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.badgeColor ? "#ef4444" : "#2563eb" }}></span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Footer Profile */}
        <div style={{ padding: isCollapsed ? "12px 8px" : "14px 16px", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "10px", backgroundColor: "#0a0e19" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#003b71", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
            JC
          </div>
          {!isCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f3f4f6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                João Carlos
              </p>
              <p style={{ fontSize: "0.68rem", color: "#6b7280" }}>Operador N3 / NOC</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
