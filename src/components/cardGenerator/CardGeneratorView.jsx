import React, { useState, useRef, useEffect } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { InstitutionalCardCanvas } from "./InstitutionalCardCanvas";
import { toPng } from "html-to-image";
import {
  Download,
  Copy,
  Send,
  MessageSquare,
  Sparkles,
  Check,
  Store,
  Truck,
  ShieldAlert,
  Wrench,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sliders,
  X,
  Maximize2,
  ChevronUp,
  ChevronDown
} from "lucide-react";

export const CardGeneratorView = () => {
  const {
    activeCardDraft,
    setActiveCardDraft,
    createCommunicationCard,
    phrases,
    setActiveTab,
    showToast
  } = useIncidentContext();

  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [generatorMode, setGeneratorMode] = useState("cds");
  const [viewDeviceMode, setViewDeviceMode] = useState("canvas"); // 'canvas' or 'smartphone'

  const [formData, setFormData] = useState({
    generatorMode: "cds",
    type: "atualizacao",
    headerTag: "ATUALIZAÇÃO LOGÍSTICA!",
    title: "INTEGRAÇÃO PEOPLESOFT E EWM",
    paragraphs: [
      "O fornecedor **SAP** permanece na investigação da causa do incidente e acionou sua própria equipe de Desenvolvimento para apoiar nas análises. A **DPSP** segue em acompanhamento junto à **SAP**.",
      "A **SAP** mantém os clientes informados sobre a evolução do evento, enquanto as equipes responsáveis permanecem atuando no acompanhamento.",
      "A **Central de Comando** segue acompanhando o incidente e atualizará as áreas envolvidas conforme houver novas informações."
    ],
    affectedStores: "Lojas SP, RJ e MG (Regional Sudeste)",
    storeActionGuide: "Frente de caixa operando em modo contingência TEF. Não reiniciar os caixas sem autorização.",
    affectedCDs: ["CDSP - São Paulo", "CDMG - Minas Gerais"],
    cdProcess: "Processo WMS & Sincronização de Esteira",
    executiveImpact: "Impacto moderado na expedição de pedidos da regional Sudeste.",
    executiveRootCause: "Trava de locks de sessão no banco Oracle do ambiente SAP.",
    executiveEta: "16:30 (Previsão de Solução)",
    maintenanceWindow: "16/09/2026 das 02:00h às 04:30h",
    maintenanceImpact: "Indisponibilidade temporária de acesso ao SAP ERP durante a janela programada.",
    closingText: "Agradecemos a compreensão.",
    signature: "CENTRAL DE COMANDO",
    contactPhone: "(11) 5529-6003",
    // Paletas de Cores & Customizador
    palettePreset: "default",
    customBadgeBg: null,
    customSupportBg: null,
    customSupportTextColor: null,
    customCardOuterBg: null,
    // Footer Brands & Logo Sizing
    footerPreset: "tperto",
    customFooterLeft: "T.+PERTO",
    customFooterRight: "GRUPO DPSP",
    showDivider: true,
    leftLogoImage: null,
    rightLogoImage: null,
    fullFooterImage: null,
    footerLogoHeight: 42 // Controlled footer logo height in px (25px to 70px)
  });

  // Consome o rascunho vindo da Sala de Crise, Dashboard ou tela de Comunicações
  // (aberto via setActiveCardDraft + navegação para esta aba) e popula o formulário.
  useEffect(() => {
    if (!activeCardDraft) return;

    if (activeCardDraft.paragraphs) {
      // Card já publicado (edição via tela de Comunicações): mesmo formato do formData.
      setGeneratorMode(activeCardDraft.generatorMode || "cds");
      setFormData(prev => ({ ...prev, ...activeCardDraft }));
    } else {
      // Rascunho rápido gerado a partir de um incidente (Dashboard / Sala de Crise).
      const scopeText = Array.isArray(activeCardDraft.scope)
        ? activeCardDraft.scope.join(", ")
        : activeCardDraft.scope;

      setGeneratorMode("cds");
      setFormData(prev => ({
        ...prev,
        generatorMode: "cds",
        type: activeCardDraft.type || prev.type,
        title: activeCardDraft.title || prev.title,
        cdProcess: activeCardDraft.process || prev.cdProcess,
        paragraphs: [
          `Sistema afetado: **${activeCardDraft.system}** (${activeCardDraft.process}). ${activeCardDraft.impact || ""}${scopeText ? ` Abrangência: ${scopeText}.` : ""}`,
          activeCardDraft.status ? `Status atual: ${activeCardDraft.status}` : prev.paragraphs[1],
          activeCardDraft.action || prev.paragraphs[2]
        ].filter(Boolean)
      }));
    }

    setActiveCardDraft(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardDraft]);

  const handleModeSwitch = (newMode) => {
    setGeneratorMode(newMode);
    let newHeader = formData.headerTag;
    let newTitle = formData.title;
    let newParagraphs = [...formData.paragraphs];

    if (newMode === "loja") {
      newHeader = "COMUNICADO PARA LOJAS!";
      newTitle = "INSTABILIDADE NO AUTORIZADOR TEF";
      newParagraphs = [
        "Informamos que identificamos instabilidade momentânea no autorizador de cartões TEF nas filiais.",
        "A equipe de **TI Varejo** e a operadora **Sitef** estão atuando na correção da comunicação.",
        "A **Central de Comando** manterá todas as gerências de loja atualizadas."
      ];
    } else if (newMode === "cds") {
      newHeader = "COMUNICADO CENTROS DE DISTRIBUIÇÃO!";
      newTitle = "INTEGRAÇÃO PEOPLESOFT E EWM";
      newParagraphs = [
        "O fornecedor **SAP** permanece na investigação da causa do incidente e acionou sua equipe para apoiar nas análises. A **DPSP** segue em acompanhamento.",
        "A **SAP** mantém os clientes informados sobre a evolução do evento, enquanto as equipes atuam no acompanhamento.",
        "A **Central de Comando** segue acompanhando o incidente e atualizará os CDs assim que houver novidades."
      ];
    } else if (newMode === "executivo") {
      newHeader = "BRIEFING EXECUTIVO DE INCIDENTE";
      newTitle = "SISTEMA SAP - INDISPONIBILIDADE DE PEDIDOS";
      newParagraphs = [
        "Incidente de **Severidade P1 (Crítica)** afetando o fluxo de faturamento logístico.",
        "Ponte técnica de crise estabelecida com diretores da **SAP** e consultoria **Wipro**.",
        "Próxima atualização executiva agendada para às 16h00."
      ];
    } else if (newMode === "manutencao") {
      newHeader = "MANUTENÇÃO PROGRAMADA";
      newTitle = "UPGRADE NO BANCO DE DADOS ORACLE SAP";
      newParagraphs = [
        "Comunicamos que será realizada manutenção preventiva programada na infraestrutura de banco de dados.",
        "Pedimos a gentileza de encerrar todas as sessões ativas no **SAP ERP** até às 01h55.",
        "Após o término da janela, os sistemas serão liberados automaticamente."
      ];
    }

    setFormData(prev => ({
      ...prev,
      generatorMode: newMode,
      headerTag: newHeader,
      title: newTitle,
      paragraphs: newParagraphs
    }));
  };

  const handleLeftLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, footerPreset: "custom", leftLogoImage: reader.result, fullFooterImage: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRightLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, footerPreset: "custom", rightLogoImage: reader.result, fullFooterImage: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, fullFooterImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImages = () => {
    setFormData(prev => ({ ...prev, leftLogoImage: null, rightLogoImage: null, fullFooterImage: null }));
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...formData.paragraphs];
    updated[index] = value;
    setFormData({ ...formData, paragraphs: updated });
  };

  const handleAddParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, "Nova atualização registrada pela equipe."]
    });
  };

  const handleRemoveParagraph = (index) => {
    const updated = formData.paragraphs.filter((_, idx) => idx !== index);
    setFormData({ ...formData, paragraphs: updated });
  };

  const handleMoveParagraphUp = (idx) => {
    if (idx === 0) return;
    setFormData(prev => {
      const updated = [...prev.paragraphs];
      const temp = updated[idx - 1];
      updated[idx - 1] = updated[idx];
      updated[idx] = temp;
      return { ...prev, paragraphs: updated };
    });
  };

  const handleMoveParagraphDown = (idx) => {
    if (idx === formData.paragraphs.length - 1) return;
    setFormData(prev => {
      const updated = [...prev.paragraphs];
      const temp = updated[idx + 1];
      updated[idx + 1] = updated[idx];
      updated[idx] = temp;
      return { ...prev, paragraphs: updated };
    });
  };

  const generateWhatsappFormattedText = () => {
    const icon = formData.type === "indisponibilidade" ? "🔴" : formData.type === "normalizacao" ? "🟢" : "🟡";
    const paragraphsClean = formData.paragraphs.map(p => p.replace(/\*\*/g, "*")).join("\n\n");

    return `${icon} *${formData.headerTag}*
*${formData.title}*

${paragraphsClean}

${formData.closingText}
*${formData.signature}*

📞 Em caso de dúvidas, entre em contato com o Suporte Service Desk: ${formData.contactPhone}`;
  };

  const handleCopyWhatsappText = async () => {
    const text = generateWhatsappFormattedText();
    let success = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback para navegadores com restrições de permissão de clipboard
    }

    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Erro ao copiar texto:", err);
      }
    }

    setCopied(true);
    if (showToast) showToast(success ? "Texto formatado para WhatsApp copiado com sucesso!" : "Não foi possível copiar automaticamente.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, { quality: 0.98, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `card-${generatorMode}-${formData.type}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem PNG:", err);
      alert("Não foi possível gerar a imagem PNG. Tente novamente.");
    }
  };

  const handlePublish = () => {
    createCommunicationCard({
      ...formData,
      publishedAt: new Date().toISOString()
    });
    setActiveTab("publishing");
  };

  const [showPhraseFlyout, setShowPhraseFlyout] = useState(false);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Header & Photoshop Floating Toolbar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)" }}>
              GERADOR DE CARDS OPERACIONAIS DPSP
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Selecione o modo do card, use a biblioteca de frases prontas e personalize a paleta e logos.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Phrase Library Quick Inserter Button */}
            <div style={{ position: "relative" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPhraseFlyout(!showPhraseFlyout)}
                style={{ border: showPhraseFlyout ? "1px solid #8b3fd1" : "1px solid var(--border-color)" }}
              >
                <MessageSquare size={16} style={{ color: "#7c3aed" }} />
                <span>Bibliot. Frases</span>
              </button>

              {/* Phrase Flyout Menu */}
              {showPhraseFlyout && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    width: "360px",
                    maxHeight: "380px",
                    backgroundColor: "var(--paper)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "16px",
                    padding: "12px",
                    boxShadow: "0 20px 40px rgba(32, 30, 29, 0.25)",
                    zIndex: 100,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#2f6ea8", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Sparkles size={14} /> Inserção Rápida de Frase
                    </span>
                    <button
                      onClick={() => setShowPhraseFlyout(false)}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {(phrases || []).map((ph, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            paragraphs: [...prev.paragraphs, ph.text || ph.content]
                          }));
                          setShowPhraseFlyout(false);
                        }}
                        style={{
                          backgroundColor: "var(--bg-dark-hover)",
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid var(--border-color)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          color: "var(--text-main)",
                          transition: "all 0.15s ease"
                        }}
                        className="hover:border-blue-500"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "#2f6ea8", fontWeight: 700, marginBottom: "2px" }}>
                          <span>{ph.category ? ph.category.toUpperCase() : "GERAL"}</span>
                          <span>+ Clique p/ Inserir</span>
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.35 }}>{ph.text || ph.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-secondary" onClick={handleCopyWhatsappText}>
              {copied ? <Check size={16} style={{ color: "#10b981" }} /> : <Copy size={16} />}
              <span>{copied ? "Texto Copiado!" : "Copiar Texto WhatsApp"}</span>
            </button>
            <button className="btn btn-primary" onClick={handleDownloadPng}>
              <Download size={16} />
              <span>Baixar PNG HD</span>
            </button>
          </div>
        </div>

        {/* 4 GENERATOR MODE TABS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {[
            { id: "loja", label: "1. LOJA", icon: Store, desc: "Para Operação de Varejo & Caixas", color: "#0284c7" },
            { id: "cds", label: "2. CENTROS DE DISTRIBUIÇÃO", icon: Truck, desc: "Para Logística, WMS & Esteira", color: "#059669" },
            { id: "executivo", label: "3. EXECUTIVO", icon: ShieldAlert, desc: "Para Diretoria & Briefing P1", color: "#dc2626" },
            { id: "manutencao", label: "4. MANUTENÇÃO", icon: Wrench, desc: "Para Janelas Programadas TI", color: "#2563eb" }
          ].map(m => {
            const IconComponent = m.icon;
            const isSel = generatorMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeSwitch(m.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: isSel ? `2px solid ${m.color}` : "1px solid var(--border-color)",
                  backgroundColor: isSel ? `${m.color}18` : "var(--bg-dark-hover)",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSel ? `0 4px 14px ${m.color}25` : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "0.9rem", color: isSel ? m.color : "var(--text-main)" }}>
                  <IconComponent size={18} />
                  <span>{m.label}</span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "3px" }}>{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Main Area */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 460px 300px", gap: "20px", alignItems: "start" }}>
        {/* COLUMN 1: DYNAMIC FORM PER MODE */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>
              Campos do Gerador de {generatorMode.toUpperCase()}
            </h3>
            <span style={{ fontSize: "0.7rem", color: "#2f6ea8", fontWeight: 700 }}>
              Modo {generatorMode.toUpperCase()} Ativo
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div className="form-group">
              <label className="form-label">Tipo / Cor do Alerta</label>
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => {
                  const newType = e.target.value;
                  const tagMap = {
                    indisponibilidade: generatorMode === "loja" ? "INDISPONIBILIDADE EM LOJAS!" : generatorMode === "cds" ? "INDISPONIBILIDADE EM CDs!" : generatorMode === "executivo" ? "BRIEFING DE CRISE - INDISPONIBILIDADE" : "INDISPONIBILIDADE DE STATUS!",
                    atualizacao: generatorMode === "loja" ? "ATUALIZAÇÃO DE STATUS - LOJAS!" : generatorMode === "cds" ? "ATUALIZAÇÃO LOGÍSTICA!" : generatorMode === "executivo" ? "BRIEFING EXECUTIVO DE INCIDENTE" : "ATUALIZAÇÃO DE STATUS!",
                    normalizacao: generatorMode === "loja" ? "LOJAS NORMALIZADAS!" : generatorMode === "cds" ? "LOGÍSTICA NORMALIZADA!" : generatorMode === "executivo" ? "SERVIÇO EXECUTIVO NORMALIZADO!" : "SERVIÇO NORMALIZADO!",
                    manutencao: generatorMode === "loja" ? "MANUTENÇÃO PROGRAMADA LOJAS!" : generatorMode === "cds" ? "MANUTENÇÃO PROGRAMADA CDs!" : generatorMode === "executivo" ? "INFORMATIVO EXECUTIVO!" : "MANUTENÇÃO PROGRAMADA!"
                  };
                  setFormData({
                    ...formData,
                    type: newType,
                    headerTag: tagMap[newType] || "ATUALIZAÇÃO DE STATUS!"
                  });
                }}
              >
                <option value="indisponibilidade">🔴 Indisponibilidade (Fundo Vermelho)</option>
                <option value="atualizacao">🟡 Atualização (Fundo Amarelo / Amber)</option>
                <option value="normalizacao">🟢 Normalização (Fundo Verde)</option>
                <option value="manutencao">🔵 Manutenção (Fundo Azul)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Telefone Service Desk</label>
              <input
                type="text"
                className="form-input"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cabeçalho (Tag Superior)</label>
            <input
              type="text"
              className="form-input"
              value={formData.headerTag}
              onChange={(e) => setFormData({ ...formData, headerTag: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Título Principal</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* MODE-SPECIFIC EXTRA FIELDS */}
          {generatorMode === "loja" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #0284c7" }}>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label className="form-label" style={{ color: "#0369a1" }}>Lojas / Regionais Afetadas</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.affectedStores}
                  onChange={(e) => setFormData({ ...formData, affectedStores: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "#0369a1" }}>Instrução Prática para a Loja</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.storeActionGuide}
                  onChange={(e) => setFormData({ ...formData, storeActionGuide: e.target.value })}
                />
              </div>
            </div>
          )}

          {generatorMode === "cds" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #059669" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "#0f7a56" }}>Processo Logístico / WMS</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.cdProcess}
                  onChange={(e) => setFormData({ ...formData, cdProcess: e.target.value })}
                />
              </div>
            </div>
          )}

          {generatorMode === "executivo" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #dc2626" }}>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label className="form-label" style={{ color: "#b3261e" }}>Resumo do Impacto de Negócio</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.executiveImpact}
                  onChange={(e) => setFormData({ ...formData, executiveImpact: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: "8px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: "var(--text-muted)" }}>Causa Raiz Técnica</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.executiveRootCause}
                    onChange={(e) => setFormData({ ...formData, executiveRootCause: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: "#b3261e" }}>ETA Solução</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.executiveEta}
                    onChange={(e) => setFormData({ ...formData, executiveEta: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {generatorMode === "manutencao" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #2563eb" }}>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label className="form-label" style={{ color: "#2f6ea8" }}>Janela de Horário Programada</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.maintenanceWindow}
                  onChange={(e) => setFormData({ ...formData, maintenanceWindow: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "#2f6ea8" }}>Impacto Previsto Durante a Janela</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.maintenanceImpact}
                  onChange={(e) => setFormData({ ...formData, maintenanceImpact: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* PARAGRAPHS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label className="form-label" style={{ margin: 0 }}>
                Parágrafos Informativos (Use **palavra** para negrito)
              </label>
              <button className="btn btn-secondary btn-sm" onClick={handleAddParagraph}>
                <Plus size={14} />
                <span>+ Parágrafo</span>
              </button>
            </div>

            {formData.paragraphs.map((para, idx) => (
              <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                <textarea
                  className="form-textarea"
                  rows={2}
                  style={{ fontSize: "0.83rem" }}
                  value={para}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveParagraphUp(idx)}
                    title="Mover parágrafo para cima"
                    style={{
                      backgroundColor: idx === 0 ? "var(--paper)" : "var(--bg-dark-hover)",
                      border: "1px solid var(--border-color)",
                      color: idx === 0 ? "var(--text-dim)" : "#2f6ea8",
                      borderRadius: "4px",
                      padding: "3px",
                      cursor: idx === 0 ? "not-allowed" : "pointer"
                    }}
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === formData.paragraphs.length - 1}
                    onClick={() => handleMoveParagraphDown(idx)}
                    title="Mover parágrafo para baixo"
                    style={{
                      backgroundColor: idx === formData.paragraphs.length - 1 ? "var(--paper)" : "var(--bg-dark-hover)",
                      border: "1px solid var(--border-color)",
                      color: idx === formData.paragraphs.length - 1 ? "var(--text-dim)" : "#2f6ea8",
                      borderRadius: "4px",
                      padding: "3px",
                      cursor: idx === formData.paragraphs.length - 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {formData.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(idx)}
                    title="Remover parágrafo"
                    style={{ backgroundColor: "rgba(200, 55, 45, 0.1)", border: "1px solid rgba(200, 55, 45, 0.25)", color: "#b3261e", borderRadius: "6px", padding: "8px", cursor: "pointer", height: "100%" }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: LIVE WYSIWYG CANVAS PREVIEW WITH SMARTPHONE MOCKUP */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", alignSelf: "flex-start", height: "fit-content" }}>
          {/* View Mode Switcher Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", backgroundColor: "var(--bg-dark-hover)", padding: "6px 12px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>Modo {generatorMode.toUpperCase()}</span>
              <span style={{ backgroundColor: "#10b981", color: "#fff", padding: "1px 6px", borderRadius: "4px", fontSize: "0.62rem" }}>
                HD Canvas
              </span>
            </div>

            {/* Toggle Canvas vs Smartphone */}
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => setViewDeviceMode("canvas")}
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: viewDeviceMode === "canvas" ? "var(--accent-red)" : "transparent",
                  color: viewDeviceMode === "canvas" ? "#fff" : "var(--text-muted)"
                }}
              >
                🖼️ Canvas
              </button>
              <button
                onClick={() => setViewDeviceMode("smartphone")}
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: viewDeviceMode === "smartphone" ? "#10b981" : "transparent",
                  color: viewDeviceMode === "smartphone" ? "#fff" : "var(--text-muted)"
                }}
              >
                📱 Mobile (WhatsApp)
              </button>
            </div>
          </div>

          {/* Standard Canvas View */}
          {viewDeviceMode === "canvas" ? (
            <InstitutionalCardCanvas cardData={formData} canvasRef={canvasRef} />
          ) : (
            /* Smartphone WhatsApp Mockup View */
            <div
              style={{
                width: "410px",
                borderRadius: "44px",
                border: "10px solid #1e293b",
                backgroundColor: "#0b141a", // WhatsApp dark wallpaper bg
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              {/* Top Notch / Dynamic Island */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px", backgroundColor: "#111b21" }}>
                <div style={{ width: "90px", height: "18px", backgroundColor: "#000000", borderRadius: "10px" }}></div>
              </div>

              {/* WhatsApp App Header Bar */}
              <div
                style={{
                  backgroundColor: "#111b21",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderBottom: "1px solid #222d34"
                }}
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#d91c24", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.75rem" }}>
                  NOC
                </div>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span style={{ color: "#e9edef", fontWeight: 700, fontSize: "0.88rem" }}>Central de Comando DPSP</span>
                  <span style={{ color: "#00a884", fontSize: "0.68rem" }}>online (Canal Oficial)</span>
                </div>
              </div>

              {/* WhatsApp Chat Area */}
              <div
                style={{
                  padding: "16px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundImage: "radial-gradient(#202c33 1px, transparent 1px)",
                  backgroundSize: "16px 16px"
                }}
              >
                {/* Chat Message Bubble */}
                <div
                  style={{
                    backgroundColor: "#202c33",
                    padding: "8px 8px 12px 8px",
                    borderRadius: "14px 14px 14px 2px",
                    maxWidth: "100%",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                    position: "relative"
                  }}
                >
                  <div style={{ transform: "scale(0.85)", transformOrigin: "top center", marginBottom: "-50px" }}>
                    <InstitutionalCardCanvas cardData={formData} canvasRef={canvasRef} />
                  </div>

                  {/* Message Timestamp & Double Checkmarks */}
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "4px", paddingRight: "8px", marginTop: "12px" }}>
                    <span style={{ fontSize: "0.65rem", color: "#8696a0" }}>21:28</span>
                    <span style={{ fontSize: "0.72rem", color: "#53bdeb", fontWeight: 800 }}>✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* COLUMN 3: BRAND, PALETTE & LOGO SIZE CUSTOMIZER */}
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sliders size={16} style={{ color: "#387fef" }} />
            Estilo, Cores & Marca
          </h3>

          {/* COLOR PALETTE PRESETS SELECTOR */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ color: "#8b3fd1" }}>🎨 Paleta de Cores do Card</label>
            <select
              className="form-select"
              value={formData.palettePreset}
              onChange={(e) => {
                const preset = e.target.value;
                let badge = formData.customBadgeBg;
                let support = formData.customSupportBg;
                let text = formData.customSupportTextColor;
                let outer = formData.customCardOuterBg;

                if (preset === "dsp") {
                  badge = "#d91c24";
                  support = "#dbeafe";
                  text = "#1e3a8a";
                  outer = "#002855";
                } else if (preset === "pacheco") {
                  badge = "#be123c";
                  support = "#fef3c7";
                  text = "#78350f";
                  outer = "#1c1917";
                } else if (preset === "executivo_dark") {
                  badge = "#334155";
                  support = "#e2e8f0";
                  text = "#0f172a";
                  outer = "#0f172a";
                }

                setFormData({
                  ...formData,
                  palettePreset: preset,
                  customBadgeBg: badge,
                  customSupportBg: support,
                  customSupportTextColor: text,
                  customCardOuterBg: outer
                });
              }}
            >
              <option value="default">Padrão Operacional (T.+PERTO / Service Desk)</option>
              <option value="dsp">Drogaria São Paulo (Azul & Vermelho DPSP)</option>
              <option value="pacheco">Drogarias Pacheco (Vermelho Carmim & Amarelo)</option>
              <option value="executivo_dark">Executivo VIP Dark (Grafite & Prata)</option>
              <option value="custom">🛠️ Personalizado (Pickers de Cores Hex)</option>
            </select>
          </div>

          {/* CUSTOM COLOR PICKERS IF CUSTOM PRESET */}
          {formData.palettePreset === "custom" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #a855f760", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.68rem", color: "#7c3aed" }}>Badge Superior</label>
                <input
                  type="color"
                  className="form-input"
                  style={{ height: "36px", padding: "2px", cursor: "pointer" }}
                  value={formData.customBadgeBg}
                  onChange={(e) => setFormData({ ...formData, customBadgeBg: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: "0.68rem", color: "#7c3aed" }}>Caixa Suporte</label>
                <input
                  type="color"
                  className="form-input"
                  style={{ height: "36px", padding: "2px", cursor: "pointer" }}
                  value={formData.customSupportBg}
                  onChange={(e) => setFormData({ ...formData, customSupportBg: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: "0.68rem", color: "#7c3aed" }}>Texto Suporte</label>
                <input
                  type="color"
                  className="form-input"
                  style={{ height: "36px", padding: "2px", cursor: "pointer" }}
                  value={formData.customSupportTextColor}
                  onChange={(e) => setFormData({ ...formData, customSupportTextColor: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: "0.68rem", color: "#7c3aed" }}>Fundo Externo</label>
                <input
                  type="color"
                  className="form-input"
                  style={{ height: "36px", padding: "2px", cursor: "pointer" }}
                  value={formData.customCardOuterBg}
                  onChange={(e) => setFormData({ ...formData, customCardOuterBg: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* DYNAMIC LOGO RESIZER SLIDER */}
          <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #3b82f640" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <label className="form-label" style={{ color: "#2f6ea8", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                <Maximize2 size={14} />
                Tamanho / Escala das Imagens
              </label>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-main)" }}>{formData.footerLogoHeight}px</span>
            </div>
            <input
              type="range"
              min={25}
              max={70}
              step={1}
              value={formData.footerLogoHeight}
              onChange={(e) => setFormData({ ...formData, footerLogoHeight: Number(e.target.value) })}
              style={{ width: "100%", cursor: "pointer", accentColor: "var(--accent-red)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-dim)", marginTop: "2px" }}>
              <span>Compacto (25px)</span>
              <span>Padrão (42px)</span>
              <span>Expandido (70px)</span>
            </div>
          </div>

          {/* Footer Preset Selector */}
          <div className="form-group">
            <label className="form-label">Modelo de Marca / Preset</label>
            <select
              className="form-select"
              value={formData.footerPreset}
              onChange={(e) => {
                const p = e.target.value;
                setFormData({
                  ...formData,
                  footerPreset: p
                });
              }}
            >
              <option value="tperto">T.+PERTO | GRUPO DPSP (Oficial Padrão)</option>
              <option value="dsp">Drogaria São Paulo | GRUPO DPSP</option>
              <option value="pacheco">Drogarias Pacheco | GRUPO DPSP</option>
              <option value="comando">Central de Comando | DPSP NOC</option>
              <option value="custom">🛠️ Personalizado (Texto ou Imagens Upload)</option>
            </select>
          </div>

          {/* Custom Footer Text Fields */}
          {formData.footerPreset === "custom" && (
            <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "#2f6ea8" }}>Marca Esquerda (Texto)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: T.+PERTO, DROGARIA SÃO PAULO..."
                  value={formData.customFooterLeft}
                  onChange={(e) => setFormData({ ...formData, customFooterLeft: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: "#2f6ea8" }}>Marca Direita (Texto)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: GRUPO DPSP, DPSP NOC..."
                  value={formData.customFooterRight}
                  onChange={(e) => setFormData({ ...formData, customFooterRight: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* IMAGE LOGO UPLOADERS SECTION */}
          <div style={{ backgroundColor: "var(--bg-dark-hover)", padding: "12px", borderRadius: "12px", border: "1px solid #8b5cf640", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", gap: "6px" }}>
              <ImageIcon size={14} />
              Upload de Logotipos em Imagem:
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Logo Esquerda (PNG/SVG):</label>
              <input type="file" accept="image/*" onChange={handleLeftLogoUpload} style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Logo Direita (PNG/SVG):</label>
              <input type="file" accept="image/*" onChange={handleRightLogoUpload} style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Ou Banner Rodapé Completo (Imagem Única):</label>
              <input type="file" accept="image/*" onChange={handleFullBannerUpload} style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
            </div>

            {(formData.leftLogoImage || formData.rightLogoImage || formData.fullFooterImage) && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleClearImages}
                style={{ marginTop: "4px", color: "#b3261e", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <X size={14} />
                <span>Remover Imagens Carregadas</span>
              </button>
            )}
          </div>

          {/* Divider Bar Toggle */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.showDivider}
              onChange={(e) => setFormData({ ...formData, showDivider: e.target.checked })}
            />
            Exibir barra divisória vertical (|) no rodapé
          </label>

          {/* Actions & Export */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
            <button className="btn btn-primary" onClick={handleDownloadPng} style={{ width: "100%" }}>
              <Download size={16} />
              <span>Gerar Imagem PNG HD</span>
            </button>
            <button className="btn btn-secondary" onClick={handleCopyWhatsappText} style={{ width: "100%" }}>
              <MessageSquare size={16} />
              <span>Copiar Texto Formatado</span>
            </button>
            <button className="btn btn-success" onClick={handlePublish} style={{ width: "100%", marginTop: "4px" }}>
              <Send size={16} />
              <span>Enviar p/ Central de Publicação</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
