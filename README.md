# Central de Comando DPSP

Aplicação web para o NOC/Central de Comando do Grupo DPSP: gestão de incidentes operacionais e geração de comunicados institucionais (cards para WhatsApp, e-mail e publicação interna) com identidade visual padronizada.

## Funcionalidades

- **Dashboard** — visão geral dos incidentes ativos, críticos e comunicados recentes.
- **Incidentes** — abertura via wizard guiado, detalhe com timeline de eventos e mudança de status (investigação → acompanhamento → normalizado).
- **Sala de Crise** — modo dedicado para incidentes P1, com cronômetro de tempo decorrido, roster de equipes acionadas e atalho para publicar comunicado de crise.
- **Gerador de Cards** — criação de comunicados institucionais em 4 modos (Loja, Centros de Distribuição, Executivo, Manutenção), com preview ao vivo em canvas e em mockup de smartphone (WhatsApp), paletas de marca (DPSP, Pacheco, Executivo), upload de logos e exportação em PNG HD.
- **Central de Publicação** — envio/registro do comunicado nos canais (WhatsApp, e-mail, etc.).
- **Comunicações / Histórico** — listagem de comunicados e incidentes já publicados/encerrados, com opção de reabrir um card publicado para edição.
- **Biblioteca de Frases e Templates** — textos e modelos reutilizáveis para agilizar a redação.
- **Assistente IA (Parser)** — transforma anotações informais em campos estruturados (sistema, serviço, abrangência, responsável, severidade) para criação rápida de incidentes.
- **Catálogo, Equipes, Relatórios, Auditoria e Configurações** — telas de apoio operacional e trilha de auditoria das ações realizadas.

## Stack

- [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- [lucide-react](https://lucide.dev/) para ícones
- [html-to-image](https://github.com/bubkoo/html-to-image) para exportação dos cards em PNG
- [oxlint](https://oxc.rs/) para lint

## Como rodar

```bash
npm install
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em /dist
npm run preview   # servir o build de produção localmente
npm run lint       # checagem de lint (oxlint)
```

## Estrutura do projeto

```
src/
  components/       # uma pasta por módulo/tela (dashboard, incidents, crisis, cardGenerator, ...)
  context/           # IncidentContext: estado global de incidentes, comunicações, auditoria e UI
  data/               # mockData.js — dados iniciais/seed (incidentes, catálogo, frases, templates, equipes)
  App.jsx             # roteamento por aba (sidebar) e layout principal
  main.jsx            # bootstrap da aplicação
```

## Persistência

Os dados (incidentes, comunicações e logs de auditoria) são persistidos no `localStorage` do navegador — não há backend/API nesta versão. Limpar os dados do site reseta o estado para os dados iniciais de `src/data/mockData.js`.
