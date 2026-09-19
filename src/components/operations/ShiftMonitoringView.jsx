import React, { useState } from "react";
import { 
  ClipboardCheck, Clock, Server, Copy, Check, User, RefreshCw
} from "lucide-react";
import { useIncidentContext } from "../../context/useIncidentContext";

export const ShiftMonitoringView = () => {
  const { showToast, incidents } = useIncidentContext();
  const [activeSubTab, setActiveSubTab] = useState("daily"); // 'daily', 'madrugada', 'handover'
  const [copiedHandover, setCopiedHandover] = useState(false);

  // Daily Infrastructure Checklist State
  const [dailyChecklist, setDailyChecklist] = useState([
    { id: 1, category: "Firewall Lojas", name: "Fortinet FortiManager Lojas DPA & DSP", status: "OK", obs: "Sem alertas de indisponibilidade em massa." },
    { id: 2, category: "Links MPLS", name: "Circuito Principal Vivo (Regional Sudeste)", status: "OK", obs: "Latência média em 28ms." },
    { id: 3, category: "Links MPLS", name: "Circuito Redundante Embratel / Algar", status: "ATENCAO", obs: "Oscilação preventiva em 3 filiais do RJ." },
    { id: 4, category: "Internet ISP", name: "Links de Contingência ISP Lojas", status: "OK", obs: "Operando normalmente." },
    { id: 5, category: "Switches Lojas", name: "Switch Core & Acesso Filiais", status: "OK", obs: "Sem perdas de pacotes." },
    { id: 6, category: "Servidores NOC", name: "Desk-Server & Zabbix Lojas (PRD)", status: "OK", obs: "Uso de CPU 34%, RAM 48%." }
  ]);

  // 00h Routine Checklist State
  const [madrugadaRoutine, setMadrugadaRoutine] = useState([
    { id: 1, task: "Fim do processo Warley (FW) na retaguarda", done: true, time: "23:15" },
    { id: 2, task: "Execução do Script PowerShell (C:\\zabbix\\base\\monitor_vd_ping.ps1)", done: true, time: "23:45" },
    { id: 3, task: "Validação de IPs UP de todas as filiais", done: true, time: "00:05" },
    { id: 4, task: "Coleta dos prints pós-23h20 e pós-00h00", done: true, time: "00:10" },
    { id: 5, task: "Resposta à thread oficial de e-mail do NOC com evidências", done: false, time: "Pendente" }
  ]);

  // Shift Handover Form State
  const [handoverForm, setHandoverForm] = useState({
    outgoingOperator: "João Carlos",
    incomingOperator: "Fabio Santos",
    shiftTime: "Turno T2 (14h - 22h)",
    overallStatus: "Normal", // Normal, Atenção, Crítico
    openPendingItems: "Monitoramento do link Algar na loja VD 490 (em acompanhamento junto ao provedor).",
    activeEscalations: "Nenhum escalonamento P1 ativo no momento.",
    generalNotes: "Sistemas SAP e TEF operando dentro dos parâmetros de normalidade."
  });

  const toggleDailyStatus = (id) => {
    setDailyChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "OK" ? "ATENCAO" : item.status === "ATENCAO" ? "CRITICO" : "OK";
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const toggleMadrugadaTask = (id) => {
    setMadrugadaRoutine(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          done: !item.done,
          time: !item.done ? new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "Pendente"
        };
      }
      return item;
    }));
  };

  const formattedHandoverText = `📋 *PASSAGEM DE TURNO - CENTRAL DE COMANDO DPSP*
📅 *Data/Hora:* ${new Date().toLocaleDateString("pt-BR")} - ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
👤 *Operador Saindo:* ${handoverForm.outgoingOperator}
👤 *Operador Entrando:* ${handoverForm.incomingOperator}
⏰ *Turno:* ${handoverForm.shiftTime}
🟢 *Status Geral:* ${handoverForm.overallStatus.toUpperCase()}

🚨 *Incidentes Abertos:* ${incidents.filter(i => i.status !== "normalizado").length}
⚠️ *Pendências:* ${handoverForm.openPendingItems}
📞 *Escalonamentos Ativos:* ${handoverForm.activeEscalations}
📝 *Observações:* ${handoverForm.generalNotes}`;

  const handleCopyHandover = async () => {
    let success = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedHandoverText);
        success = true;
      }
    } catch {
      // Fallback para contextos onde a Clipboard API é bloqueada
    }

    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = formattedHandoverText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Erro ao copiar passagem de turno:", err);
      }
    }

    if (success) {
      setCopiedHandover(true);
      showToast("Passagem de turno copiada para a área de transferência!");
      setTimeout(() => setCopiedHandover(false), 2000);
    } else {
      showToast("Não foi possível copiar automaticamente.", "error");
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Banner */}
      <div className="panel-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <ClipboardCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
              Monitoramento Operacional & Plantão NOC
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
              Checklists de infraestrutura, rotina da madrugada (00h) e passagem oficial de turno da Central de Comando.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tabs Navigation */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "2px" }}>
        {[
          { id: "daily", label: "Checklist de Infraestrutura (Daily)", icon: Server },
          { id: "madrugada", label: "Rotina da Madrugada (00h00)", icon: Clock },
          { id: "handover", label: "Passagem de Turno (Shift Handover)", icon: User }
        ].map(tb => {
          const Icon = tb.icon;
          const isActive = activeSubTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveSubTab(tb.id)}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-dark-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                backgroundColor: isActive ? "rgba(16, 185, 129, 0.12)" : "transparent",
                color: isActive ? "#10b981" : "var(--text-muted)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #10b981" : "2px solid transparent",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isActive ? "translateY(-1px)" : "translateY(0)"
              }}
            >
              <Icon size={16} />
              <span>{tb.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DAILY INFRASTRUCTURE CHECKLIST */}
      {activeSubTab === "daily" && (
        <div key="daily" className="panel-card animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                Checklist Diário de Infraestrutura & Links
              </h3>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Clique no status para alternar entre OK, ATENÇÃO e CRÍTICO.
              </span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => showToast("Checklist de infraestrutura atualizado!")}>
              <RefreshCw size={14} />
              <span>Atualizar Status</span>
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-muted)" }}>
                  <th style={{ padding: "10px" }}>Categoria</th>
                  <th style={{ padding: "10px" }}>Equipamento / Serviço</th>
                  <th style={{ padding: "10px" }}>Status Operacional</th>
                  <th style={{ padding: "10px" }}>Observação / Ação</th>
                </tr>
              </thead>
              <tbody>
                {dailyChecklist.map((item, idx) => (
                  <tr key={item.id} className="animate-fade-in" style={{ borderBottom: "1px solid var(--border-color)", animationDelay: `${Math.min(idx * 0.05, 0.3)}s`, animationFillMode: "backwards" }}>
                    <td style={{ padding: "12px 10px", color: "var(--text-muted)", fontWeight: 600 }}>{item.category}</td>
                    <td style={{ padding: "12px 10px", color: "var(--text-main)", fontWeight: 700 }}>{item.name}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <button
                        onClick={() => toggleDailyStatus(item.id)}
                        style={{
                          borderRadius: "6px",
                          padding: "4px 12px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          backgroundColor: item.status === "OK" ? "rgba(34, 197, 94, 0.15)" : item.status === "ATENCAO" ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)",
                          color: item.status === "OK" ? "#22c55e" : item.status === "ATENCAO" ? "#f59e0b" : "#ef4444",
                          border: item.status === "OK" ? "1px solid rgba(34, 197, 94, 0.3)" : item.status === "ATENCAO" ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        {item.status === "OK" ? "🟢 OK" : item.status === "ATENCAO" ? "🟡 ATENÇÃO" : "🔴 CRÍTICO"}
                      </button>
                    </td>
                    <td style={{ padding: "12px 10px" }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ height: "32px", fontSize: "0.8rem" }}
                        value={item.obs}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDailyChecklist(prev => prev.map(i => i.id === item.id ? { ...i, obs: val } : i));
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ROTINA DA MADRUGADA (00h00) */}
      {activeSubTab === "madrugada" && (
        <div key="madrugada" className="panel-card animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={18} color="#f59e0b" />
                <span>Rotina Obrigatória do Plantão da Madrugada (00h00)</span>
              </h3>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Checklist de encerramento do expediente, execução do script de ping e envio de evidências por e-mail.
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {madrugadaRoutine.map((item, idx) => (
              <div
                key={item.id}
                className="animate-fade-in"
                onClick={() => toggleMadrugadaTask(item.id)}
                style={{
                  backgroundColor: item.done ? "rgba(16, 185, 129, 0.08)" : "var(--bg-dark-hover)",
                  border: item.done ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border-color)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.15s ease, border-color 0.2s ease",
                  animationDelay: `${Math.min(idx * 0.05, 0.3)}s`,
                  animationFillMode: "backwards"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ 
                    width: "24px", 
                    height: "24px", 
                    borderRadius: "6px", 
                    backgroundColor: item.done ? "#10b981" : "rgba(255,255,255,0.1)", 
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.8rem"
                  }}>
                    {item.done ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: item.done ? "#10b981" : "var(--text-main)" }}>
                    {item.task}
                  </span>
                </div>

                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: item.done ? "#10b981" : "var(--text-muted)", backgroundColor: "var(--paper)", padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                  {item.done ? `Concluído (${item.time})` : "Pendente"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#0d111a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px 16px", fontSize: "0.8rem", color: "#f1f5f9" }}>
            <span style={{ color: "#60a5fa", fontWeight: 700, display: "block", marginBottom: "4px" }}>💻 Comando PowerShell do Script 00h:</span>
            <code style={{ fontFamily: "monospace", color: "#4ade80" }}>
              powershell.exe -ExecutionPolicy Bypass -File "C:\zabbix\base\Projeto atualização (Power Shell)\monitor_vd_ping.ps1"
            </code>
          </div>
        </div>
      )}

      {/* TAB 3: SHIFT HANDOVER (PASSAGEM DE TURNO) */}
      {activeSubTab === "handover" && (
        <div key="handover" className="animate-fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          {/* Left: Handover Form */}
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
              Formulário de Passagem de Turno (Handover)
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Operador Saindo</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={handoverForm.outgoingOperator}
                  onChange={(e) => setHandoverForm({ ...handoverForm, outgoingOperator: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Operador Entrando</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={handoverForm.incomingOperator}
                  onChange={(e) => setHandoverForm({ ...handoverForm, incomingOperator: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Turno</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={handoverForm.shiftTime}
                  onChange={(e) => setHandoverForm({ ...handoverForm, shiftTime: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status Geral do Ambiente</label>
                <select 
                  className="form-select"
                  value={handoverForm.overallStatus}
                  onChange={(e) => setHandoverForm({ ...handoverForm, overallStatus: e.target.value })}
                >
                  <option value="Normal">🟢 Normal (Estável)</option>
                  <option value="Atenção">🟡 Atenção (Oscilação)</option>
                  <option value="Crítico">🔴 Crítico (Sala de Crise P1)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pendências / Lojas em Acompanhamento</label>
              <textarea 
                className="form-textarea" 
                rows={2}
                value={handoverForm.openPendingItems}
                onChange={(e) => setHandoverForm({ ...handoverForm, openPendingItems: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Escalonamentos Ativos / Fornecedores</label>
              <input 
                type="text" 
                className="form-input" 
                value={handoverForm.activeEscalations}
                onChange={(e) => setHandoverForm({ ...handoverForm, activeEscalations: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Observações Gerais para o Próximo Plantão</label>
              <textarea 
                className="form-textarea" 
                rows={2}
                value={handoverForm.generalNotes}
                onChange={(e) => setHandoverForm({ ...handoverForm, generalNotes: e.target.value })}
              />
            </div>
          </div>

          {/* Right: Format Preview & Copy for Teams */}
          <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                Resumo Formato Teams / WhatsApp
              </h3>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleCopyHandover}
                style={{ backgroundColor: copiedHandover ? "#22c55e" : "#3b82f6", border: "none" }}
              >
                {copiedHandover ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHandover ? "Copiado!" : "Copiar Resumo"}</span>
              </button>
            </div>

            <div style={{
              backgroundColor: "#0d111a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "16px",
              fontSize: "0.82rem",
              color: "#f1f5f9",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              flex: 1
            }}>
              {formattedHandoverText}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
