import React from "react";
import { AlertTriangle, CheckCircle2, Store, Truck, Wrench, ShieldAlert, Calendar, Grid3x3, ListChecks } from "lucide-react";

const MODE_TAGS = {
  loja: "🏪 OPERAÇÃO DE LOJAS",
  cds: "📦 CENTROS DE DISTRIBUIÇÃO",
  executivo: "👔 BRIEFING EXECUTIVO",
  manutencao: "🔧 MANUTENÇÃO TÉCNICA",
  flash: "⚡ FLASH DE VENDAS",
  malha: "🗺️ MALHA OPERACIONAL",
  "malha-lojas": "🗺️ MALHA DE PREÇOS — LOJAS"
};

export const InstitutionalCardCanvas = ({ cardData, canvasRef }) => {
  const {
    generatorMode = "cds", // 'loja', 'cds', 'executivo', 'manutencao'
    type = "atualizacao", // indisponibilidade, atualizacao, normalizacao, manutencao
    headerTag,
    title = "INTEGRAÇÃO PEOPLESOFT E EWM",
    paragraphs = [],
    affectedStores = "Todas as Filiais - Regionais SP e RJ",
    storeActionGuide = "Solicitamos efetuar o registro de contingência caso ocorra travamento no caixa.",
    affectedCDs = ["CDSP - São Paulo", "CDMG - Minas Gerais"],
    cdProcess = "Processo WMS & Faturamento de Esteira",
    executiveImpact = "Impacto moderado na expedição de pedidos da regional Sudeste.",
    executiveRootCause = "Trava de locks de sessão no banco Oracle do ambiente SAP.",
    executiveEta = "16:30 (Previsão de Solução)",
    maintenanceWindow = "16/09/2026 das 02:00h às 04:30h",
    maintenanceImpact = "Indisponibilidade temporária de acesso ao SAP ERP durante a janela.",
    maintenanceClosing = "Manutenção concluída com sucesso. Todos os sistemas foram validados e liberados.",
    flashDate = new Date().toLocaleDateString("pt-BR"),
    malhaRows = [],
    malhaLojasCount = 0,
    malhaLojasChecklist = [],
    closingText = "Agradecemos a compreensão.",
    signature = "CENTRAL DE COMANDO",
    // Color Palette Props
    palettePreset = "default",
    customBadgeBg = null,
    customSupportBg = null,
    customSupportTextColor = null,
    customCardOuterBg = null,
    contactPhone = "(11) 5529-6003",
    // Brand Footer Props & Image Upload Support
    footerPreset = "tperto",
    customFooterLeft = "T.+PERTO",
    customFooterRight = "GRUPO DPSP",
    showDivider = true,
    leftLogoImage = null,
    rightLogoImage = null,
    fullFooterImage = null,
    footerLogoHeight = 42
  } = cardData || {};

  // Dynamic Type Configuration for Colors & Icons (Nunito Typography & Brand Palette)
  const getTypeStyle = () => {
    // Brand Presets
    if (palettePreset === "brand_official" || palettePreset === "default") {
      switch (type) {
        case "indisponibilidade":
          return {
            bg: "#e75e65", // Coral Red
            shadow: "rgba(231, 94, 101, 0.45)",
            outerBg: "#2e3b5b", // Deep Navy Slate
            supportBg: "#e6f3fe", // Soft Ice Blue
            supportTextColor: "#2e3b5b",
            defaultTag: generatorMode === "loja" ? "INDISPONIBILIDADE EM LOJAS!" : generatorMode === "cds" ? "INDISPONIBILIDADE EM CDs!" : generatorMode === "executivo" ? "BRIEFING DE CRISE - INDISPONIBILIDADE" : "INDISPONIBILIDADE DE STATUS!",
            Icon: generatorMode === "loja" ? Store : generatorMode === "cds" ? Truck : generatorMode === "executivo" ? ShieldAlert : generatorMode === "flash" ? Calendar : generatorMode === "malha" ? Grid3x3 : generatorMode === "malha-lojas" ? ListChecks : AlertTriangle
          };
        case "atualizacao":
          return {
            bg: generatorMode === "executivo" ? "#e75e65" : "#e2ce76", // Coral Red or Warm Gold
            shadow: generatorMode === "executivo" ? "rgba(231, 94, 101, 0.45)" : "rgba(226, 206, 118, 0.45)",
            outerBg: "#2e3b5b",
            supportBg: "#e6f3fe",
            supportTextColor: "#2e3b5b",
            defaultTag: generatorMode === "loja" ? "ATUALIZAÇÃO DE STATUS - LOJAS!" : generatorMode === "cds" ? "ATUALIZAÇÃO LOGÍSTICA!" : generatorMode === "executivo" ? "BRIEFING EXECUTIVO DE INCIDENTE" : "ATUALIZAÇÃO DE STATUS!",
            Icon: generatorMode === "loja" ? Store : generatorMode === "cds" ? Truck : generatorMode === "executivo" ? ShieldAlert : generatorMode === "flash" ? Calendar : generatorMode === "malha" ? Grid3x3 : generatorMode === "malha-lojas" ? ListChecks : AlertTriangle
          };
        case "normalizacao":
          return {
            bg: "#16a34a",
            shadow: "rgba(22, 163, 74, 0.45)",
            outerBg: "#2e3b5b",
            supportBg: "#dcfce7",
            supportTextColor: "#14532d",
            defaultTag: generatorMode === "loja" ? "LOJAS NORMALIZADAS!" : generatorMode === "cds" ? "LOGÍSTICA NORMALIZADA!" : generatorMode === "executivo" ? "SERVIÇO EXECUTIVO NORMALIZADO!" : "SERVIÇO NORMALIZADO!",
            Icon: CheckCircle2
          };
        case "manutencao":
        case "informacao":
          return {
            bg: "#387fef", // Vibrant Blue
            shadow: "rgba(56, 127, 239, 0.45)",
            outerBg: "#2e3b5b",
            supportBg: "#e6f3fe",
            supportTextColor: "#2e3b5b",
            defaultTag: generatorMode === "loja" ? "MANUTENÇÃO PROGRAMADA LOJAS!" : generatorMode === "cds" ? "MANUTENÇÃO PROGRAMADA CDs!" : generatorMode === "executivo" ? "INFORMATIVO EXECUTIVO!" : "MANUTENÇÃO PROGRAMADA!",
            Icon: Wrench
          };
        default:
          return {
            bg: "#e75e65",
            shadow: "rgba(231, 94, 101, 0.45)",
            outerBg: "#2e3b5b",
            supportBg: "#e6f3fe",
            supportTextColor: "#2e3b5b",
            defaultTag: "ATUALIZAÇÃO DE STATUS!",
            Icon: AlertTriangle
          };
      }
    }

    if (palettePreset === "dsp") {
      return {
        bg: "#d91c24",
        shadow: "rgba(217, 28, 36, 0.45)",
        outerBg: "#2e3b5b",
        supportBg: "#e6f3fe",
        supportTextColor: "#2e3b5b",
        defaultTag: "COMUNICADO DROGARIA SÃO PAULO!",
        Icon: AlertTriangle
      };
    }
    if (palettePreset === "pacheco") {
      return {
        bg: "#e75e65",
        shadow: "rgba(231, 94, 101, 0.45)",
        outerBg: "#2e3b5b",
        supportBg: "#e2ce76",
        supportTextColor: "#78350f",
        defaultTag: "COMUNICADO DROGARIAS PACHECO!",
        Icon: AlertTriangle
      };
    }
    if (palettePreset === "executivo_dark") {
      return {
        bg: "#2e3b5b",
        shadow: "rgba(46, 59, 91, 0.5)",
        outerBg: "#111827",
        supportBg: "#e6f3fe",
        supportTextColor: "#2e3b5b",
        defaultTag: "BRIEFING EXECUTIVO DE CRISE",
        Icon: ShieldAlert
      };
    }
    if (palettePreset === "custom" && customBadgeBg) {
      return {
        bg: customBadgeBg,
        shadow: `${customBadgeBg}70`,
        outerBg: customCardOuterBg || "#2e3b5b",
        supportBg: customSupportBg || "#e6f3fe",
        supportTextColor: customSupportTextColor || "#2e3b5b",
        defaultTag: "COMUNICADO PERSONALIZADO",
        Icon: AlertTriangle
      };
    }

    return {
      bg: "#e75e65",
      shadow: "rgba(231, 94, 101, 0.45)",
      outerBg: "#2e3b5b",
      supportBg: "#e6f3fe",
      supportTextColor: "#2e3b5b",
      defaultTag: "ATUALIZAÇÃO DE STATUS!",
      Icon: AlertTriangle
    };
  };

  const styleConfig = getTypeStyle();
  const BadgeIconComponent = styleConfig.Icon;
  const activeHeaderTag = headerTag || styleConfig.defaultTag;

  // Render formatted text for *bold* (single or double asterisks - matching Java ImageGenerationService).
  // Content between markers excludes "*" and "." so a stray, unpaired asterisk (e.g. a bullet
  // or typo in free text) can't swallow the rest of the paragraph looking for a closing match.
  const renderFormattedText = (text) => {
    if (!text) return null;
    const pattern = /\*\*([^*]+?)\*\*|\*([^*\n.]+?)\*/;
    const nodes = [];
    let remaining = String(text);
    let key = 0;
    let guard = 0;
    while (remaining.length && guard++ < 500) {
      const match = pattern.exec(remaining);
      if (!match) {
        nodes.push(remaining);
        break;
      }
      if (match.index > 0) nodes.push(remaining.slice(0, match.index));
      const boldContent = match[1] !== undefined ? match[1] : match[2];
      nodes.push(<strong key={key++} style={{ fontWeight: 800, color: "#0f172a" }}>{boldContent}</strong>);
      remaining = remaining.slice(match.index + match[0].length);
    }
    return nodes;
  };

  // Tight Footer Logo Renderer (Images fill footer height cleanly without expanding card borders)
  const renderFooterLogos = () => {
    // 1. Full Image Banner Uploaded
    if (fullFooterImage) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <img
            src={fullFooterImage}
            alt="Banner Rodapé"
            style={{ height: "100%", width: "auto", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
      );
    }

    // Left Logo Element (Text or Image)
    const renderLeftLogoElement = () => {
      if (leftLogoImage) {
        return (
          <img
            src={leftLogoImage}
            alt="Logo Esquerda"
            style={{ height: "100%", width: "auto", maxWidth: "180px", objectFit: "contain" }}
          />
        );
      }
      if (footerPreset === "dsp") return <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.05rem" }}>DROGARIA SÃO PAULO</span>;
      if (footerPreset === "pacheco") return <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.05rem" }}>DROGARIAS PACHECO</span>;
      if (footerPreset === "comando") return <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.05rem", letterSpacing: "0.04em" }}>CENTRAL DE COMANDO</span>;
      if (footerPreset === "custom") return <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.05rem" }}>{customFooterLeft || "SUA MARCA"}</span>;

      // Default T.+PERTO Logo (Exact Match to Reference Image)
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.03em", fontFamily: "'Outfit', sans-serif" }}>T.</span>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "17px", height: "17px", backgroundColor: "#00a3e0", borderRadius: "3px", margin: "0 1px" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M2 6H10" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.02em", fontFamily: "'Outfit', sans-serif" }}>PERTO</span>
        </div>
      );
    };

    // Right Logo Element (Text or Image)
    const renderRightLogoElement = () => {
      if (rightLogoImage) {
        return (
          <img
            src={rightLogoImage}
            alt="Logo Direita"
            style={{ height: "100%", width: "auto", maxWidth: "180px", objectFit: "contain" }}
          />
        );
      }
      if (footerPreset === "comando") return <span style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.05rem" }}>DPSP NOC</span>;
      if (footerPreset === "custom") return <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.05rem" }}>{customFooterRight || "GRUPO DPSP"}</span>;

      // Default GRUPO DPSP Logo (Exact Match to Reference Image with Red/White/Blue Pill Icon)
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>GRUPO</span>
          <div style={{ width: "20px", height: "11px", borderRadius: "6px", backgroundColor: "#d91c24", display: "inline-flex", alignItems: "center", padding: "1px", boxSizing: "border-box", overflow: "hidden" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "4px 0 0 4px", backgroundColor: "#ffffff" }}></div>
            <div style={{ width: "9px", height: "9px", borderRadius: "0 4px 4px 0", backgroundColor: "#004899" }}></div>
          </div>
          <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.02em", fontFamily: "'Outfit', sans-serif" }}>DPSP</span>
        </div>
      );
    };

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", height: "100%" }}>
        {renderLeftLogoElement()}
        {showDivider && <div style={{ width: "1px", height: "20px", backgroundColor: "rgba(255, 255, 255, 0.3)" }}></div>}
        {renderRightLogoElement()}
      </div>
    );
  };

  return (
    <div
      ref={canvasRef}
      id="institutional-card-element"
      className="inst-card-canvas"
      style={{
        width: "430px",
        height: "fit-content",
        backgroundColor: styleConfig.outerBg || "#262d3d",
        padding: "24px 24px 16px 24px",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        fontFamily: "'Nunito', 'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        position: "relative",
        alignSelf: "flex-start",
        flexGrow: 0
      }}
    >
      {/* Top Floating Status Badge */}
      <div
        style={{
          width: "125px",
          height: "125px",
          borderRadius: "50%",
          backgroundColor: styleConfig.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "-62px",
          zIndex: 2,
          boxShadow: `0 8px 22px ${styleConfig.shadow}`,
          border: "4px solid #262d3d",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease"
        }}
      >
        <BadgeIconComponent size={60} color="#ffffff" strokeWidth={2.2} />
      </div>

      {/* Main White Card Box */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "76px 24px 20px 24px",
          boxSizing: "border-box",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
        }}
      >
        {/* Mode Tag */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: `${styleConfig.bg}18`,
            color: styleConfig.bg,
            border: `1px solid ${styleConfig.bg}40`,
            padding: "3px 12px",
            borderRadius: "99px",
            fontSize: "0.68rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px"
          }}
        >
          {MODE_TAGS[generatorMode] || "🔧 MANUTENÇÃO TÉCNICA"}
        </div>

        {/* Title Block */}
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: 900,
            color: "#0f172a",
            textTransform: "uppercase",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: "20px",
            fontFamily: "'Nunito', sans-serif"
          }}
        >
          <div style={{ color: styleConfig.bg }}>{activeHeaderTag}</div>
          <div style={{ marginTop: "4px", color: "#1e293b" }}>{title}</div>
        </h2>

        {/* MODE 1: LOJA BODY */}
        {generatorMode === "loja" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", borderLeft: `4px solid ${styleConfig.bg}` }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: styleConfig.bg, textTransform: "uppercase", display: "block" }}>📍 LOJAS AFETADAS / REGIONAL</span>
              <strong style={{ fontSize: "0.9rem", color: "#0f172a" }}>{affectedStores}</strong>
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}

            {storeActionGuide && (
              <div style={{ backgroundColor: "#fffbe6", padding: "12px", borderRadius: "8px", border: "1px solid #fef08a", color: "#854d0e", fontSize: "0.82rem" }}>
                <strong style={{ display: "block", color: "#a16207", marginBottom: "2px" }}>⚠️ ORIENTAÇÃO PARA A FRENTE DE LOJA:</strong>
                {storeActionGuide}
              </div>
            )}
          </div>
        )}

        {/* MODE 2: CDS BODY */}
        {generatorMode === "cds" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", borderTop: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", borderLeft: `3px solid ${styleConfig.bg}` }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: styleConfig.bg, textTransform: "uppercase", display: "block" }}>UNIDADES IMPACTADAS</span>
                <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                  {Array.isArray(affectedCDs) ? affectedCDs.join(", ") : affectedCDs}
                </strong>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", borderTop: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", borderLeft: `3px solid ${styleConfig.bg}` }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: styleConfig.bg, textTransform: "uppercase", display: "block" }}>PROCESSO LOGÍSTICO</span>
                <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>{cdProcess}</strong>
              </div>
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* MODE 3: EXECUTIVO BODY */}
        {generatorMode === "executivo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left", fontSize: "0.85rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#f1f5f9", padding: "12px", borderRadius: "8px", borderTop: "1px solid #cbd5e1", borderRight: "1px solid #cbd5e1", borderBottom: "1px solid #cbd5e1", borderLeft: `4px solid ${styleConfig.bg}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>IMPACTO DE NEGÓCIO</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: styleConfig.bg }}>ETA: {executiveEta}</span>
              </div>
              <strong style={{ fontSize: "0.88rem", color: "#0f172a" }}>{executiveImpact}</strong>
            </div>

            <div style={{ backgroundColor: "#fafafa", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>CAUSA RAIZ & DIAGNÓSTICO</span>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#334155" }}>{executiveRootCause}</p>
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* MODE 4: MANUTENÇÃO BODY — janela programada vs. conclusão (normalizada) */}
        {generatorMode === "manutencao" && type !== "normalizacao" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#eff6ff", padding: "12px", borderRadius: "8px", borderTop: "1px solid #bfdbfe", borderRight: "1px solid #bfdbfe", borderBottom: "1px solid #bfdbfe", borderLeft: `4px solid ${styleConfig.bg}`, textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#1d4ed8", textTransform: "uppercase", display: "block" }}>🗓️ JANELA DA MANUTENÇÃO PROGRAMADA</span>
              <strong style={{ fontSize: "0.95rem", color: "#1e40af" }}>{maintenanceWindow}</strong>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>IMPACTO PREVISTO DURANTE A JANELA</span>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#1e293b" }}>{maintenanceImpact}</p>
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {generatorMode === "manutencao" && type === "normalizacao" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#dcfce7", padding: "12px", borderRadius: "8px", border: "1px solid #86efac", textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase", display: "block" }}>✅ CONCLUSÃO DE MANUTENÇÃO PROGRAMADA</span>
              <strong style={{ fontSize: "0.95rem", color: "#14532d" }}>{maintenanceWindow}</strong>
            </div>

            <p style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
              {renderFormattedText(maintenanceClosing)}
            </p>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* MODE 5: FLASH DE VENDAS — checklist fixo de plantão por horário */}
        {generatorMode === "flash" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#ecfeff", padding: "10px", borderRadius: "8px", border: "1px solid #a5f3fc", textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#0891b2", textTransform: "uppercase", display: "block" }}>📅 DATA DO PLANTÃO</span>
              <strong style={{ fontSize: "0.95rem", color: "#0e7490" }}>{flashDate}</strong>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {["00h15", "02h15", "04h15", "06h15", "08h15", "10h15", "12h15", "14h15", "16h15", "18h15", "20h15", "22h15"].map(slot => (
                <div key={slot} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "5px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.72rem" }}>
                  <span style={{ fontWeight: 700, color: "#0891b2" }}>{slot}</span>
                  <span style={{ color: "#94a3b8" }}>—</span>
                </div>
              ))}
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* MODE 6: MALHA OPERACIONAL — tabela dinâmica horário -> status */}
        {generatorMode === "malha" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {malhaRows.map((row, idx) => {
                const isFinal = /finaliz/i.test(row.status || "");
                return (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ backgroundColor: styleConfig.bg, color: "#fff", fontWeight: 800, fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px", minWidth: "56px", textAlign: "center" }}>
                      {row.hora}
                    </span>
                    <span style={{ fontSize: "0.82rem", fontWeight: isFinal ? 800 : 500, color: isFinal ? "#15803d" : "#334155" }}>
                      {row.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* MODE 7: MALHA LOJAS — contador + checklist com status ✅/⌛ */}
        {generatorMode === "malha-lojas" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", fontSize: "0.88rem", color: "#334155" }}>
            <div style={{ backgroundColor: "#f0fdf4", padding: "12px", borderRadius: "8px", border: "1px solid #bbf7d0", textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase", display: "block" }}>🏬 LOJAS NA MALHA</span>
              <strong style={{ fontSize: "1.4rem", color: "#14532d" }}>{malhaLojasCount}</strong>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {malhaLojasChecklist.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a" }}>{item.label}</span>
                  <span style={{ fontSize: "1rem" }}>{item.done ? "✅" : "⌛"}</span>
                </div>
              ))}
            </div>

            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: 1.45, textAlign: "center" }}>
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        )}

        {/* Closing & Signature */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {closingText && <p style={{ margin: "0 0 4px 0", color: "#4a5568", fontSize: "0.88rem" }}>{closingText}</p>}
          {signature && (
            <p style={{ margin: 0, fontWeight: 900, fontSize: "1rem", color: "#0f172a", letterSpacing: "0.03em" }}>
              {signature}
            </p>
          )}
        </div>

        {/* Support Contact Box with Dynamic Palette Color */}
        <div
          style={{
            backgroundColor: styleConfig.supportBg || "#aee0fc",
            borderRadius: "14px",
            padding: "12px 16px",
            marginTop: "18px",
            fontSize: "0.84rem",
            color: styleConfig.supportTextColor || "#0f2942",
            fontWeight: 500,
            lineHeight: 1.38,
            textAlign: "center"
          }}
        >
          Em caso de dúvidas, entre em contato com o<br />
          Suporte Service Desk: <strong style={{ fontWeight: 800 }}>{contactPhone}</strong>
        </div>
      </div>

      {/* Tight Footer Logo Container (Perfect 16px Spacing Above & Below) */}
      <div
        style={{
          width: "100%",
          height: `${footerLogoHeight || 36}px`,
          marginTop: "16px",
          marginBottom: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {renderFooterLogos()}
      </div>
    </div>
  );
};
