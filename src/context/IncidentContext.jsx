import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_INCIDENTS, SYSTEM_CATALOG, PHRASE_LIBRARY, CARD_TEMPLATES, TEAMS_LIST } from "../data/mockData";

const IncidentContext = createContext(null);

export const IncidentProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedIncidentId, setSelectedIncidentId] = useState("INC-20260915-001");

  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem("comando_incidents");
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [communications, setCommunications] = useState(() => {
    const saved = localStorage.getItem("comando_communications");
    if (saved) return JSON.parse(saved);
    return INITIAL_INCIDENTS.flatMap(i => i.communications || []);
  });

  const [catalog] = useState(SYSTEM_CATALOG);
  const [phrases, setPhrases] = useState(PHRASE_LIBRARY);
  const [templates] = useState(CARD_TEMPLATES);
  const [teams] = useState(TEAMS_LIST);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardDraft, setActiveCardDraft] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem("comando_audit_logs");
    return saved ? JSON.parse(saved) : [
      { id: "log-1", time: "15:45:10", user: "João Carlos (Operador NOC)", action: "Atualização de Status", target: "INC-20260915-001", detail: "Status alterado para Investigação" },
      { id: "log-2", time: "14:42:00", user: "Central de Comando", action: "Publicação de Comunicado", target: "COM-001", detail: "Card de Indisponibilidade publicado via WhatsApp" },
      { id: "log-3", time: "14:10:00", user: "Sistema NOC", action: "Criação de Incidente", target: "INC-20260915-001", detail: "Incidente gerado via alerta automatizado" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("comando_incidents", JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem("comando_communications", JSON.stringify(communications));
  }, [communications]);

  useEffect(() => {
    localStorage.setItem("comando_audit_logs", JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addAuditLog = (action, target, detail) => {
    const newLog = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString("pt-BR"),
      user: "João Carlos (Operador NOC)",
      action,
      target,
      detail
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const getSelectedIncident = () => {
    return incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  };

  const createIncident = (incidentData) => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSeq = String(incidents.length + 1).padStart(3, "0");
    const newId = `INC-${dateStr}-${randomSeq}`;
    
    const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const newIncident = {
      id: newId,
      ...incidentData,
      status: incidentData.status || "investigacao",
      startAt: incidentData.startAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: `evt-${Date.now()}`,
          time: nowTime,
          type: "criacao",
          title: "Incidente Registrado na Central de Comando",
          description: incidentData.description || "Registro inicial do evento.",
          author: "Operador NOC"
        }
      ],
      communications: []
    };

    setIncidents(prev => [newIncident, ...prev]);
    addAuditLog("Criação de Incidente", newId, `Criado incidente ${incidentData.system} - ${incidentData.title}`);
    showToast(`Incidente ${newId} criado com sucesso!`);
    setSelectedIncidentId(newId);
    setActiveTab("incident-detail");
    return newId;
  };

  const addTimelineEvent = (incidentId, event) => {
    const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const newEvt = {
      id: `evt-${Date.now()}`,
      time: nowTime,
      type: event.type || "atualizacao",
      title: event.title,
      description: event.description,
      author: event.author || "Operador NOC"
    };

    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          updatedAt: new Date().toISOString(),
          timeline: [...inc.timeline, newEvt]
        };
      }
      return inc;
    }));

    addAuditLog("Evento na Timeline", incidentId, event.title);
    showToast("Evento registrado na timeline!");
  };

  const updateIncidentStatus = (incidentId, newStatus, newSeverity) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const updated = { ...inc, status: newStatus, updatedAt: new Date().toISOString() };
        if (newSeverity) updated.severity = newSeverity;
        return updated;
      }
      return inc;
    }));

    const statusMap = {
      investigacao: "🔴 Investigação",
      acompanhamento: "🟡 Em Acompanhamento",
      normalizado: "🟢 Normalizado"
    };

    addTimelineEvent(incidentId, {
      type: newStatus === "normalizado" ? "normalizacao" : "atualizacao",
      title: `Status alterado para: ${statusMap[newStatus] || newStatus}`,
      description: `Atualização de status operacional realizada pelo operador.`,
      author: "Central de Comando"
    });

    addAuditLog("Mudança de Status", incidentId, `Status alterado para ${newStatus}`);
    showToast(`Status do incidente alterado para ${newStatus}`);
  };

  const createCommunicationCard = (commData) => {
    const newComm = {
      id: `COM-${String(communications.length + 1).padStart(3, "0")}`,
      publishedAt: new Date().toISOString(),
      ...commData
    };

    setCommunications(prev => [newComm, ...prev]);

    if (commData.incidentId) {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === commData.incidentId) {
          return {
            ...inc,
            communications: [...(inc.communications || []), newComm]
          };
        }
        return inc;
      }));

      addTimelineEvent(commData.incidentId, {
        type: "comunicado",
        title: `Comunicado Emitido: ${commData.type ? commData.type.toUpperCase() : "CARD"}`,
        description: commData.title,
        author: "Central de Comando"
      });
    }

    addAuditLog("Publicação de Card", newComm.id, `Card de ${commData.type} publicado.`);
    showToast("Comunicado registrado com sucesso!");
    return newComm;
  };

  const parseNotesWithAi = (textNote) => {
    const textLower = textNote.toLowerCase();
    
    let system = "SAP ERP & Logística";
    if (textLower.includes("rede") || textLower.includes("vivo") || textLower.includes("link")) system = "Rede / Telecom";
    else if (textLower.includes("wms")) system = "SAP Logística (WMS)";
    else if (textLower.includes("tef") || textLower.includes("pdv") || textLower.includes("caixa")) system = "Sistemas de Loja";
    else if (textLower.includes("oracle") || textLower.includes("banco")) system = "Cloud AWS & Banco de Dados";

    let service = "Integração / Operação Geral";
    if (textLower.includes("peoplesoft") || textLower.includes("ewm")) service = "Integração PeopleSoft e EWM";
    else if (textLower.includes("pedido")) service = "Processamento de Pedidos";
    else if (textLower.includes("link")) service = "Link Corporativo Loja";
    else if (textLower.includes("tef")) service = "Autorizador TEF Sitef";

    const scope = [];
    if (textLower.includes("cdsp") || textLower.includes("sao paulo") || textLower.includes("sp")) scope.push("CDSP - São Paulo");
    if (textLower.includes("cdmg") || textLower.includes("minas")) scope.push("CDMG - Minas Gerais");
    if (textLower.includes("cdrj") || textLower.includes("rio")) scope.push("CDRJ - Rio de Janeiro");
    if (textLower.includes("matriz")) scope.push("Matriz Corporativa");
    if (textLower.includes("loja") || textLower.includes("filiais")) scope.push("Lojas (Regional SP/RJ)");
    if (scope.length === 0) scope.push("CDSP - São Paulo");

    let responsible = "Wipro Tech Support";
    if (textLower.includes("vivo")) responsible = "Vivo Empresas";
    else if (textLower.includes("sap")) responsible = "Equipe Basis SAP";
    else if (textLower.includes("sitef")) responsible = "TI Varejo & Sitef";

    let severity = "alta";
    if (textLower.includes("critico") || textLower.includes("parou") || textLower.includes("caiu")) severity = "critica";
    else if (textLower.includes("oscilacao") || textLower.includes("lentidao")) severity = "media";

    return {
      title: textNote.slice(0, 65) + (textNote.length > 65 ? "..." : ""),
      system,
      service,
      components: textNote.includes("peoplesoft") ? ["PeopleSoft", "EWM"] : ["Módulo Afetado"],
      scope,
      responsible,
      severity,
      status: "investigacao",
      description: textNote,
      impact: `Ocorrência registrada no ambiente ${scope.join(", ")}. Equipe acionada.`
    };
  };

  const addPhrase = (category, phraseText) => {
    setPhrases(prev => prev.map(p => {
      if (p.category === category) {
        return { ...p, phrases: [...p.phrases, phraseText] };
      }
      return p;
    }));
    showToast("Nova frase adicionada à biblioteca!");
  };

  return (
    <IncidentContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedIncidentId,
        setSelectedIncidentId,
        incidents,
        communications,
        catalog,
        phrases,
        templates,
        teams,
        searchQuery,
        setSearchQuery,
        auditLogs,
        activeCardDraft,
        setActiveCardDraft,
        toastMessage,
        showToast,
        getSelectedIncident,
        createIncident,
        addTimelineEvent,
        updateIncidentStatus,
        createCommunicationCard,
        parseNotesWithAi,
        addPhrase,
        addAuditLog
      }}
    >
      {children}
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", backgroundColor: "#0f172a", border: "1px solid #3b82f6", color: "#fff", padding: "12px 20px", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", fontWeight: 600 }} className="animate-fade-in">
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }}></span>
          {toastMessage.msg}
        </div>
      )}
    </IncidentContext.Provider>
  );
};

export const useIncidentContext = () => useContext(IncidentContext);
