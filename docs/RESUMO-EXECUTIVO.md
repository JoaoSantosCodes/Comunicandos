# 📌 Resumo Executivo — Central de Comando DPSP

A Central de Comando DPSP é um sistema web enterprise desenvolvido para a gestão de incidentes críticos de TI (NOC), condução de Salas de Crise (War Rooms) e geração/publicação acelerada de comunicados institucionais corporativos para o Grupo DPSP (Drogaria São Paulo e Drogarias Pacheco).

## 🎨 Identidade Visual (Design System Organic)

- **Paleta de Cores:** Fundo creme institucional (`#f5ead8`), superfícies chrome/sidebar escuras (`#232a3d`) e vermelho de marca DPSP (`#c8372d`).
- **Tipografia:** Caprasimo (títulos institucionais marcantes) e Figtree (leitura clara e moderna no corpo).
- **Exceções de Design:**
  - **Sala de Crise:** Mantém o tema escuro "War Room" para alto contraste operacional.
  - **Card Institucional:** Mantém a paleta própria de publicação da marca selecionada (Drogaria São Paulo ou Pacheco).

## 🛠️ Módulos e Funcionalidades Principais

### 1. 📊 Dashboard Operacional NOC
- Visão consolidada em tempo real de incidentes ativos por severidade (P1 Crítico, P2 Alto, P3 Médio).
- Indicadores de SLA, sistemas mais impactados e suporte a Modo TV (Fullscreen) para projeção em monitores da central de controle.

### 2. 🚨 Gestão de Incidentes & Sala de Crise (War Room)
- **Wizard de Incidentes:** Cadastro guiado com assistente de IA que interpreta notas brutas de incidentes (ex: "sap ewm parou no cdsp") e preenche automaticamente o sistema afetado, impacto e severidade.
- **Sala de Crise Ativa:** Cronômetro regressivo/decorrido de SLA, lista de equipes técnicas conectadas (SAP Basis, Wipro, Telecom) e registro de eventos em tempo real.

### 3. 🎨 Gerador de Cards Institucionais (Card Generator)
- **Canvas Interativo de Design:** Criação de cards visuais nos formatos CDS/Logística, Lojas/Varejo, Briefing Executivo e Manutenção Programada.
- **Personalização de Marcas:** Seletor entre Drogaria São Paulo e Drogarias Pacheco, upload de logotipos próprios e reordenação de parágrafos.
- **Preview em Smartphone:** Modo de pré-visualização realista de como o comunicado aparecerá no WhatsApp dos executivos e gerentes.
- **Exportação & Cópia:** Exportação em PNG HD em 1 clique e cópia de texto formatado com emojis e marcadores para WhatsApp/Teams.

### 4. 📢 Central de Publicação & Histórico
- Controle de comunicados disparados por canais corporativos (WhatsApp, Teams, E-mail, Intranet).
- Histórico auditável com filtro por data, tipo e sistema.

### 5. 📚 Catálogo de Sistemas & Biblioteca de Frases Padronizadas
- Cadastro e consulta de sistemas críticos (SAP ERP, WMS Logística, Autorizador TEF, Links Telecom, Cloud AWS).
- Biblioteca de frases homologadas pela comunicação corporativa para uso rápido durante crises.

### 6. 🤖 Assistente de IA & Log de Auditoria
- **Assistente IA:** Apoio na redação e ajuste de tom dos comunicados.
- **Trilha de Auditoria (Audit Log):** Registro automático de quem criou o incidente, quem alterou o status e quais comunicados foram emitidos.

## ⚡ Arquitetura Técnica

- **Core Stack:** React 19 + Vite 8 + CSS Vanilla Retokenizado.
- **Performance:** Code-Splitting dinâmico com `React.lazy` e `Suspense` (chunks leves carregados sob demanda).
- **Navegação:** Roteamento por URL Hash (`#dashboard`, `#incidents`, `#crisis-room`) permitindo Deep-Linking e compartilhamento direto de incidentes.
- **Qualidade:** Código validado sem erros com `oxlint` e compilação limpa via `vite build`.
