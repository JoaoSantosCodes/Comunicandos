import React from "react";
import "./maintenance.css";

export default function MaintenanceNotice({
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
  const themeClass = isRedTheme ? "theme-red" : "theme-navy";

  return (
    <div ref={canvasRef} id="maintenance-notice-element" className={`notice ${themeClass}`}>
      {/* Fundo decorativo */}
      <div className="background-shape shape-red red-1" />
      <div className="background-shape shape-blue blue-1" />
      <div className="background-shape shape-red red-2" />
      <div className="background-shape shape-blue blue-2" />
      <div className="background-shape shape-gray gray-1" />

      {/* Cabeçalho */}
      <header className="header-notice">
        <div className="logo-circle">
          <div className="logo">
            <span>GRUPO</span>
            <strong>DPSP</strong>
          </div>
        </div>

        <div className="header-title">
          <div className="main-title">
            CENTRAL DE<br />
            COMANDO
          </div>

          <div className="subtitle">
            {headerTag}
          </div>
        </div>

        <div className="date-badge">
          {date}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="content-notice">
        <h1>
          SISTEMA: <strong>{system}</strong>
        </h1>

        <div className="small-divider" />

        <section className="text-notice">
          {paragraphs && paragraphs.length > 0 ? (
            paragraphs.map((p, idx) => (
              <p key={idx}>{p.replace(/\*\*/g, "")}</p>
            ))
          ) : (
            <>
              <p>
                Informamos que será realizada uma manutenção
                programada no(s) sistema(s) <strong>{system}</strong>.
              </p>

              <p>
                A atividade tem como objetivo implementar
                melhorias e atualizações no serviço.
              </p>

              <p className="details">
                <strong>Data:</strong> {day}, às {start}
                <br />
                <strong>Término previsto:</strong> {endDate}, às {end}
                <br />
                <strong>Impacto:</strong> {impact}.
              </p>

              <p>
                Não é necessária a abertura de chamados
                relacionados à indisponibilidade durante a janela
                de manutenção.
              </p>
            </>
          )}
        </section>

        <div className="thanks">
          <div>{closingText}</div>
          <strong>{signature}</strong>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="footer-notice">
        <div>
          Em caso de dúvidas, entre em contato com o
        </div>
        <strong>
          Suporte Service Desk: {phone}
        </strong>
      </footer>
    </div>
  );
}
