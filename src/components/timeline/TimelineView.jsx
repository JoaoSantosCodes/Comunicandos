import React from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { Clock } from "lucide-react";

export const TimelineView = () => {
  const { incidents } = useIncidentContext();
  // Ordena por horário (mais recente primeiro) em vez de apenas concatenar por incidente,
  // já que flatMap por si só agrupa os eventos por incidente e não produz uma timeline global.
  const allEvents = incidents
    .flatMap(i => (i.timeline || []).map(t => ({ ...t, incidentId: i.id, system: i.system, incidentTitle: i.title })))
    .sort((a, b) => b.time.localeCompare(a.time));

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Clock style={{ color: "#387fef" }} />
          TIMELINE OPERACIONAL GLOBAL
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Registro cronológico em tempo real de todos os eventos da operação.
        </p>
      </div>

      <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", paddingLeft: "32px" }}>
        <div style={{ position: "absolute", left: "15px", top: "20px", bottom: "20px", width: "2px", backgroundColor: "var(--border-hover)" }}></div>

        {allEvents.map(evt => (
          <div key={evt.id} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ position: "absolute", left: "-24px", top: "4px", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#387fef", border: "3px solid var(--paper)" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: 800, color: "#2f6ea8", fontSize: "0.9rem" }}>{evt.time}</span>
              <span style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>{evt.title}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>• {evt.incidentId} ({evt.system})</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", backgroundColor: "var(--bg-dark-hover)", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", marginTop: "4px" }}>
              {evt.description}
            </p>
            <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Por {evt.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
