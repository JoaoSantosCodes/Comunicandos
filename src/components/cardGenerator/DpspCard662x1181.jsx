import React from "react";

/**
 * Componente DpspCard662x1181
 * Modelo Oficial Vetorial 1:1 Central de Comando DPSP (662 x 1181 px).
 */
export default function DpspCard662x1181({
  date = "20/08",
  headerTag = "MANUTENÇÃO PROGRAMADA",
  system = "XXXXXX",
  day = "XX/XX (dia da semana)",
  start = "XXh",
  endDate = "XX/XX (dia da semana)",
  end = "XXh",
  impact = "XXXXX",
  phone = "(11) 5529-6003",
  type = "manutencao",
  closingText = "Agradecemos a compreensão,",
  signature = "CENTRAL DE COMANDO",
  paragraphs,
  canvasRef
}) {
  const isRedTheme = type === "indisponibilidade";
  const themeColor = isRedTheme ? "#E66F7C" : "#293044";
  const headerNavyColor = "#292631";

  // Formatação de parágrafos com negrito (**texto**)
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
      nodes.push(<strong key={key++} style={{ fontWeight: 900, color: "#0f172a" }}>{boldContent}</strong>);
      remaining = remaining.slice(match.index + match[0].length);
    }
    return nodes;
  };

  // 1. Etiqueta de data expansível (nunca corta o texto "17/09/2026")
  const dateStr = String(date || "20/08");
  const dateBadgeWidth = Math.max(120, dateStr.length * 13 + 24);
  const dateBadgeX = 135 - dateBadgeWidth / 2;

  // 2. Tamanho dinâmico da tag secundária (evita cortar sob o oval)
  const tagStr = String(headerTag || "MANUTENÇÃO PROGRAMADA");
  const tagFontSize = tagStr.length > 22 ? "15" : tagStr.length > 16 ? "17" : "20";

  // 3. Tamanho dinâmico do título do sistema
  const systemStr = String(system || "XXXXXX");
  const systemFontSize = systemStr.length > 24 ? "20" : systemStr.length > 16 ? "24" : "30";

  // 4. Tamanho/espaçamento dinâmico do corpo de texto — modos com muitas linhas (Flash de
  // Vendas com 12 checkpoints, Crise com timeline) não cabem no espaço fixo de 520px no
  // tamanho padrão de 21px; reduz fonte e espaçamento entre linhas conforme a quantidade.
  const paragraphCount = Array.isArray(paragraphs) ? paragraphs.length : 0;
  const bodyFontSize = paragraphCount > 10 ? 14 : paragraphCount > 6 ? 16 : paragraphCount > 4 ? 18 : 21;
  const bodyGap = paragraphCount > 10 ? 6 : paragraphCount > 6 ? 9 : paragraphCount > 4 ? 12 : 16;

  return (
    <div
      ref={canvasRef}
      id="dpsp-card-662x1181-element"
      style={{
        width: "662px",
        height: "1181px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
        fontFamily: "'Nunito', Arial, Helvetica, sans-serif",
        userSelect: "none",
        backgroundColor: "#F1F5F9",
        boxSizing: "border-box"
      }}
    >
      <svg
        width="662"
        height="1181"
        viewBox="0 0 662 1181"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
      >
        {/* ========================================
            1. FUNDO BASE E DECORAÇÕES GEOMÉTRICAS SUAVES
        ======================================== */}
        <rect width="662" height="1181" fill="#F1F5F9" />

        {/* Faixa Coral / Vermelha Larga de Fundo */}
        <path d="M -20 -100 L 160 -100 L 660 900 L 480 900 Z" fill="#E66F7C" opacity="0.18" />
        <path d="M 450 -80 L 590 -80 L 950 720 L 810 720 Z" fill="#E66F7C" opacity="0.15" />

        {/* Faixa Azul-Clara Larga de Fundo */}
        <path d="M 180 -50 L 320 -50 L 820 950 L 680 950 Z" fill="#8FC9E8" opacity="0.22" />
        <path d="M 480 180 L 620 180 L 1020 980 L 880 980 Z" fill="#8FC9E8" opacity="0.18" />

        {/* Luz Translúcida */}
        <path d="M 120 40 L 300 40 L 900 1050 L 720 1050 Z" fill="#FFFFFF" opacity="0.35" />

        {/* ========================================
            2. CABEÇALHO DA CENTRAL DE COMANDO
        ======================================== */}
        {/* Faixa Superior Principal (Pílula Azul-Marinho Escura) */}
        <path
          d="M 200 115 L 590 115 A 50 50 0 0 1 640 165 A 50 50 0 0 1 590 215 L 200 215 Z"
          fill={headerNavyColor}
        />
        <text x="435" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="900" fontFamily="Nunito, sans-serif" letterSpacing="1">
          CENTRAL DE
        </text>
        <text x="435" y="193" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="900" fontFamily="Nunito, sans-serif" letterSpacing="1">
          COMANDO
        </text>

        {/* Sub-faixa Secundaria (Categoria / Tag) */}
        <path
          d="M 210 222 L 610 222 A 24 24 0 0 1 634 246 A 24 24 0 0 1 610 270 L 210 270 Z"
          fill={themeColor}
        />
        <text x="435" y="254" textAnchor="middle" fill="#FFFFFF" fontSize={tagFontSize} fontWeight="800" fontFamily="Nunito, sans-serif" letterSpacing="0.8">
          {tagStr}
        </text>

        {/* ========================================
            3. OVAL DO LOGO DO GRUPO DPSP
        ======================================== */}
        {/* Sombra suave do oval */}
        <ellipse cx="135" cy="175" rx="100" ry="145" fill="rgba(0,0,0,0.14)" />
        {/* Borda Azul-Marinho Externa */}
        <ellipse cx="135" cy="175" rx="100" ry="145" fill="#FFFFFF" stroke={themeColor} strokeWidth="7" />
        {/* Anel interno acinzentado */}
        <ellipse cx="135" cy="175" rx="87" ry="132" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="8" />

        {/* Texto e Ícone do Logo DPSP */}
        <text x="135" y="138" textAnchor="middle" fill="#192F55" fontSize="19" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="1">
          GRUPO
        </text>
        {/* Cápsula Bicolor de Ícone do Logo DPSP */}
        <g transform="translate(113, 148)">
          <rect width="44" height="18" rx="9" fill="none" stroke="#192F55" strokeWidth="2.5" />
          <path d="M 1.25 9 A 7.75 7.75 0 0 1 9 1.25 L 22 1.25 L 22 16.75 L 9 16.75 A 7.75 7.75 0 0 1 1.25 9 Z" fill="#E66F7C" />
          <path d="M 22 1.25 L 35 1.25 A 7.75 7.75 0 0 1 42.75 9 A 7.75 7.75 0 0 1 35 16.75 L 22 16.75 Z" fill="#00A3E0" />
        </g>
        <text x="135" y="210" textAnchor="middle" fill="#192F55" fontSize="45" fontWeight="900" fontFamily="Outfit, sans-serif" letterSpacing="-2">
          DPSP
        </text>

        {/* ========================================
            4. ETIQUETA DA DATA (AUTO-EXPANSÍVEL E CENTRALIZADA)
        ======================================== */}
        <rect x={dateBadgeX} y="325" width={dateBadgeWidth} height="48" rx="14" fill={themeColor} />
        <text x="135" y="357" textAnchor="middle" fill="#FFFFFF" fontSize="21" fontWeight="900" fontFamily="Nunito, sans-serif">
          {dateStr}
        </text>

        {/* ========================================
            5. TÍTULO DO SISTEMA E DIVISOR CENTRALIZADO
        ======================================== */}
        <text
          x="331"
          y="415"
          textAnchor="middle"
          fill="#0F172A"
          fontSize={systemFontSize}
          fontWeight="900"
          fontFamily="Nunito, sans-serif"
          letterSpacing="0.5"
        >
          SISTEMA: <tspan fontWeight="900" fill="#0F172A">{systemStr}</tspan>
        </text>

        {/* Pílula divisora CENTRALIZADA abaixo do título */}
        <rect x="286" y="438" width="90" height="14" rx="7" fill={themeColor} />

        {/* ========================================
            6. MOLDURA BRANCA DE CONTEÚDO
        ======================================== */}
        {/* Moldura branca limpa e sólida */}
        <rect x="66" y="472" width="530" height="565" rx="24" ry="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

        {/* Pílula decorativa CENTRALIZADA na borda inferior da moldura */}
        <rect x="286" y="1030" width="90" height="14" rx="7" fill={themeColor} />

        {/* ========================================
            7. RODAPÉ DE LARGURA TOTAL (0 a 662px)
        ======================================== */}
        <path d="M 0 1105 L 0 1181 L 662 1181 L 662 1105 Q 662 1085 642 1085 L 20 1085 Q 0 1085 0 1105 Z" fill={themeColor} />
        <text x="331" y="1128" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="600" fontFamily="Nunito, sans-serif">
          Em caso de dúvidas, entre em contato com o
        </text>
        <text x="331" y="1156" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="Nunito, sans-serif">
          Suporte Service Desk: {phone}
        </text>
      </svg>

      {/* ========================================
          8. CONTEÚDO DE TEXTO DINÂMICO (FLUXO CONTÍNUO)
      ======================================== */}
      <div
        style={{
          position: "absolute",
          top: "495px",
          left: "86px",
          width: "490px",
          height: "520px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Nunito', Arial, sans-serif",
          fontSize: `${bodyFontSize}px`,
          lineHeight: "1.35",
          color: "#1e293b",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: `${bodyGap}px`, flexGrow: 1, textAlign: "left" }}>
          {paragraphs && paragraphs.length > 0 ? (
            paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {renderFormattedText(p)}
              </p>
            ))
          ) : (
            <>
              <p style={{ margin: 0 }}>
                Informamos que será realizada uma manutenção programada no(s) sistema(s) <strong>{systemStr}</strong>.
              </p>

              <p style={{ margin: 0 }}>
                A atividade tem como objetivo implementar melhorias e atualizações no serviço.
              </p>

              <div style={{ marginTop: "4px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div>
                  <strong>Data:</strong> {day}, às {start}
                </div>
                <div>
                  <strong>Término previsto:</strong> {endDate}, às {end}
                </div>
                <div>
                  <strong>Impacto:</strong> {impact}.
                </div>
              </div>

              <p style={{ margin: 0 }}>
                Não é necessária a abertura de chamados relacionados à indisponibilidade durante a janela de manutenção.
              </p>
            </>
          )}
        </div>

        {/* Mensagem de agradecimento e assinatura */}
        <div style={{ textAlign: "center", marginTop: "auto", paddingBottom: "10px" }}>
          <div style={{ fontSize: "21px", fontWeight: 700, color: "#475569" }}>
            {closingText}
          </div>
          <strong style={{ display: "block", fontSize: "25px", fontWeight: 900, color: "#0f172a", marginTop: "2px", letterSpacing: "0.02em" }}>
            {signature}
          </strong>
        </div>
      </div>
    </div>
  );
}
