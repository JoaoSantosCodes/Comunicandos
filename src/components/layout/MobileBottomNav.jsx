import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import {
  LayoutDashboard,
  AlertTriangle,
  Palette,
  Flame,
  Bot
} from "lucide-react";

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, incidents } = useIncidentContext();

  const criticalCount = incidents.filter(i => i.severity === "critica" && i.status !== "normalizado").length;

  const navItems = [
    { id: "dashboard", label: "NOC", icon: LayoutDashboard },
    { id: "incidents", label: "Incidentes", icon: AlertTriangle },
    { id: "card-generator", label: "Cards", icon: Palette, isHighlight: true },
    { id: "crisis-room", label: "Crise", icon: Flame, isUrgent: criticalCount > 0 },
    { id: "ai-assistant", label: "IA Ops", icon: Bot }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`mobile-nav-item ${isActive ? "active" : ""}`}
          >
            <div style={{ position: "relative" }}>
              <Icon size={20} color={isActive ? "#e2574c" : item.isUrgent ? "#f2867d" : "rgba(245,234,216,0.55)"} />
              {item.isUrgent && (
                <span className="mobile-badge-dot"></span>
              )}
            </div>
            <span style={{ fontSize: "0.68rem", fontWeight: isActive ? 800 : 500, color: isActive ? "var(--text-on-chrome)" : "rgba(245,234,216,0.55)" }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
