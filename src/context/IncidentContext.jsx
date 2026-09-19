import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { INITIAL_INCIDENTS, SYSTEM_CATALOG, PHRASE_LIBRARY, CARD_TEMPLATES, TEAMS_LIST } from "../data/mockData";
import { NormalizeIncidentModal } from "../components/incidents/NormalizeIncidentModal";
import { IncidentContext } from "./incidentContextInstance";

// Carregado sob demanda: o catálogo oficial de lojas (storesData.js) tem ~640KB com
// as 1.670 lojas ativas, e ficava embutido no bundle principal (carregado em toda
// visita, mesmo sem abrir o modal) porque StoreLookupModal era importado direto aqui,
// que é montado globalmente. Com lazy(), esse peso só é buscado quando o modal abre.
const StoreLookupModal = lazy(() => import("../components/stores/StoreLookupModal").then(m => ({ default: m.StoreLookupModal })));

// Date.now() sozinho colide quando duas entradas (ex: evento de timeline + log de
// auditoria) são criadas na mesma sequência síncrona, dentro do mesmo milissegundo —
// gerando chaves React duplicadas. O sufixo aleatório garante unicidade.
const uniqueId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const IncidentProvider = ({ children }) => {
  // Inicialização de estado sincronizada com Hash da URL para Deep-Linking
  const parseInitialHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return { tab: "dashboard", incidentId: "INC-20260915-001" };
    if (hash.startsWith("incident-detail/")) {
      const parts = hash.split("/");
      return { tab: "incident-detail", incidentId: parts[1] || "INC-20260915-001" };
    }
    return { tab: hash, incidentId: "INC-20260915-001" };
  };

  const initialRoute = parseInitialHash();
  const [activeTab, setActiveTabState] = useState(initialRoute.tab);
  const [selectedIncidentId, setSelectedIncidentIdState] = useState(initialRoute.incidentId);

  // O 2º argumento permite passar o ID diretamente ao navegar para incident-detail,
  // evitando ler `selectedIncidentId` de uma closure que pode estar obsoleta quando
  // setSelectedIncidentId(id) e setActiveTab("incident-detail") são chamados em sequência
  // no mesmo handler (ex: ao criar um incidente e abrir o painel dele na sequência).
  const setActiveTab = (tab, incidentId) => {
    setActiveTabState(tab);
    const targetIncidentId = incidentId || selectedIncidentId;
    if (tab === "incident-detail" && targetIncidentId) {
      window.location.hash = `incident-detail/${targetIncidentId}`;
    } else {
      window.location.hash = tab;
    }
  };

  const setSelectedIncidentId = (id) => {
    setSelectedIncidentIdState(id);
    if (activeTab === "incident-detail") {
      window.location.hash = `incident-detail/${id}`;
    }
  };

  // Suporte a navegação por botões de voltar/avançar do navegador (hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const { tab, incidentId } = parseInitialHash();
      setActiveTabState(tab);
      if (incidentId) setSelectedIncidentIdState(incidentId);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
  const [toastLeaving, setToastLeaving] = useState(false);
  const toastTimersRef = useRef({ leave: null, remove: null });

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
    clearTimeout(toastTimersRef.current.leave);
    clearTimeout(toastTimersRef.current.remove);
    setToastLeaving(false);
    setToastMessage({ id: Date.now(), msg, type });
    // Anima a saída (fade + slide) antes de desmontar, em vez de sumir abruptamente.
    toastTimersRef.current.leave = setTimeout(() => setToastLeaving(true), 3250);
    toastTimersRef.current.remove = setTimeout(() => setToastMessage(null), 3500);
  };

  const dismissToast = () => {
    clearTimeout(toastTimersRef.current.leave);
    clearTimeout(toastTimersRef.current.remove);
    setToastLeaving(true);
    toastTimersRef.current.remove = setTimeout(() => setToastMessage(null), 220);
  };

  const addAuditLog = (action, target, detail) => {
    const newLog = {
      id: uniqueId("log"),
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

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const createIncident = (incidentData) => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSeq = String(incidents.length + 1).padStart(3, "0");
    const newId = `INC-${dateStr}-${randomSeq}`;
    const acnCode = incidentData.acn || `ACN-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const newIncident = {
      id: newId,
      acn: acnCode,
      analistaResponsavel: incidentData.analistaResponsavel || "João Carlos (Operador NOC)",
      ...incidentData,
      status: incidentData.status || "investigacao",
      startAt: incidentData.startAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: uniqueId("evt"),
          time: nowTime,
          type: "criacao",
          title: "Incidente Registrado na Central de Comando",
          description: incidentData.description || "Registro inicial do evento.",
          author: incidentData.analistaResponsavel || "Operador NOC"
        }
      ],
      communications: []
    };

    setIncidents(prev => [newIncident, ...prev]);
    addAuditLog("Criação de Incidente", newId, `Criado incidente ${incidentData.system} - ${incidentData.title} (ACN: ${acnCode})`);
    showToast(`Incidente ${newId} (ACN: ${acnCode}) criado com sucesso!`);
    setSelectedIncidentId(newId);
    setActiveTab("incident-detail", newId);
    return newId;
  };

  const addTimelineEvent = (incidentId, event) => {
    const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const newEvt = {
      id: uniqueId("evt"),
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

  const updateIncidentStatus = (incidentId, newStatus, newSeverity, extraData = {}) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const updated = { 
          ...inc, 
          status: newStatus, 
          updatedAt: new Date().toISOString(),
          ...extraData
        };
        if (newStatus === "normalizado") {
          updated.dataEncerramento = new Date().toISOString();
        }
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

    const desc = extraData.solucaoAplicada 
      ? `Normalização confirmada. Solução: ${extraData.solucaoAplicada}` 
      : "Atualização de status operacional realizada pelo operador.";

    addTimelineEvent(incidentId, {
      type: newStatus === "normalizado" ? "normalizacao" : "atualizacao",
      title: `Status alterado para: ${statusMap[newStatus] || newStatus}`,
      description: desc,
      author: "Central de Comando"
    });

    addAuditLog("Mudança de Status", incidentId, `Status alterado para ${newStatus}`);
    showToast(`Status do incidente alterado para ${newStatus}`);
  };

  const encerrarIncidente = (incidentId, solucaoAplicada, causaRaizResolvida) => {
    updateIncidentStatus(incidentId, "normalizado", null, {
      solucaoAplicada,
      causaRaizResolvida
    });
  };

  // Abre a modal de encerramento (Solução Aplicada / Causa Raiz) em vez de normalizar
  // direto — é o que efetivamente liga encerrarIncidente() à UI. `redirectToDetail`
  // é usado pela Sala de Crise, que precisa sair do war room após confirmar.
  const [normalizeModal, setNormalizeModal] = useState(null); // { incidentId, redirectToDetail }

  const requestNormalize = (incidentId, opts = {}) => {
    setNormalizeModal({ incidentId, redirectToDetail: !!opts.redirectToDetail });
  };

  const handleConfirmNormalize = (solucaoAplicada, causaRaizResolvida) => {
    if (!normalizeModal) return;
    const { incidentId, redirectToDetail } = normalizeModal;
    encerrarIncidente(incidentId, solucaoAplicada, causaRaizResolvida);
    setNormalizeModal(null);
    if (redirectToDetail) {
      setActiveTab("incident-detail", incidentId);
    }
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

    // Abrangência por região, distinguindo Loja (varejo) de CD (distribuição) pelo contexto do texto.
    // Usa \b (limite de palavra) para "sp"/"mg"/"rj"/"go" não casarem como substring de outras palavras.
    const isLojaContext = textLower.includes("loja") || textLower.includes("filiais") || textLower.includes("pdv");
    const mentionsSP = /\bsp\b/.test(textLower) || textLower.includes("sao paulo") || textLower.includes("cdsp");
    const mentionsMG = /\bmg\b/.test(textLower) || textLower.includes("minas") || textLower.includes("cdmg");
    const mentionsRJ = /\brj\b/.test(textLower) || /\brio\b/.test(textLower) || textLower.includes("cdrj") || textLower.includes("niteroi");
    const mentionsGO = /\bgo\b/.test(textLower) || textLower.includes("goias") || textLower.includes("cdgo");

    const scope = [];
    if (isLojaContext) {
      if (mentionsSP) scope.push("Lojas SP");
      if (mentionsRJ) scope.push("Lojas RJ");
      if (mentionsMG) scope.push("Lojas MG");
      if (mentionsGO) scope.push("Lojas GO");
    } else {
      if (mentionsSP) scope.push("CDSP - São Paulo");
      if (mentionsMG) scope.push("CDMG - Minas Gerais");
      if (mentionsRJ) scope.push("CDRJ - Rio de Janeiro");
      if (mentionsGO) scope.push("CDGO - Goiás");
    }
    if (textLower.includes("matriz")) scope.push("Matriz Corporativa");
    if (scope.length === 0) scope.push("CDSP - São Paulo");

    let responsible = "Wipro Tech Support";
    if (textLower.includes("vivo")) responsible = "Vivo Empresas";
    else if (textLower.includes("sap")) responsible = "Equipe Basis SAP";
    else if (textLower.includes("sitef")) responsible = "TI Varejo & Sitef";

    let severity = "alta";
    if (textLower.includes("critico") || textLower.includes("parou") || textLower.includes("caiu") || textLower.includes("indispon")) severity = "critica";
    else if (textLower.includes("oscilacao") || textLower.includes("lentidao") || textLower.includes("instabilidade") || textLower.includes("instavel")) severity = "media";

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
        addAuditLog,
        isStoreModalOpen,
        setIsStoreModalOpen,
        encerrarIncidente,
        requestNormalize
      }}
    >
      {children}

      {/* Modal de Encerramento (Solução Aplicada / Causa Raiz) antes de normalizar */}
      <NormalizeIncidentModal
        incident={normalizeModal ? incidents.find(i => i.id === normalizeModal.incidentId) : null}
        onCancel={() => setNormalizeModal(null)}
        onConfirm={handleConfirmNormalize}
      />

      {/* Modal Corporativo de Consulta de Lojas e VDs — só monta (e baixa o chunk
          lazy com as 1.670 lojas) quando o operador realmente abre o modal. */}
      {isStoreModalOpen && (
        <Suspense fallback={null}>
          <StoreLookupModal
            isOpen={isStoreModalOpen}
            onClose={() => setIsStoreModalOpen(false)}
            onSelectStore={(store) => {
              showToast(`Loja VD ${store.vd} (${store.nome}) selecionada!`);
            }}
          />
        </Suspense>
      )}

      {/* Toast Notification Banner Organic UI */}
      {toastMessage && (
        <div 
          style={{ 
            position: "fixed", 
            bottom: "28px", 
            right: "28px", 
            backgroundColor: "var(--chrome)",
            border: "1px solid rgba(245,234,216,0.15)",
            color: "var(--text-on-chrome)",
            padding: "14px 22px",
            borderRadius: "12px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.9rem",
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            opacity: toastLeaving ? 0 : 1,
            transform: toastLeaving ? "translateY(10px) scale(0.96)" : "translateY(0) scale(1)",
            transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: toastMessage.type === "error" ? "var(--accent-red)" : "#10b981",
              boxShadow: toastMessage.type === "error" ? "0 0 8px #c8372d" : "0 0 8px #10b981"
            }}
          ></span>
          <span>{toastMessage.msg}</span>
          <button
            onClick={dismissToast}
            style={{ background: "none", border: "none", color: "rgba(245,234,216,0.55)", cursor: "pointer", marginLeft: "12px", padding: "2px" }}
          >
            ✕
          </button>
        </div>
      )}
    </IncidentContext.Provider>
  );
};
