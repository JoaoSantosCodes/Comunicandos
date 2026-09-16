# 🆕 Fluxo de Registro de Novo Incidente

O registro de um Novo Incidente na Central de Comando DPSP foi desenhado para ser rápido, estruturado e padronizado. O sistema oferece duas formas de criar um novo incidente.

## 🛠️ 1. Registro Guiado por Modal (Wizard em 4 Passos)

Ao clicar no botão "+ Novo Incidente" no topo da página ou no menu lateral, o sistema abre um assistente de 4 etapas:

**Passo 1 — Identificação do Serviço**
- Sistema Atingido: Seleção do sistema principal (SAP ERP & Logística, Rede/Telecom, Sistemas de Loja & PDV, Cloud AWS & Banco de Dados, etc.).
- Serviço/Processo: Detalhamento do processo afetado (ex: Integração PeopleSoft e EWM, Link 4G Loja).
- Título Institucional: Nome claro e objetivo do incidente para os relatórios.

**Passo 2 — Impacto & Abrangência**
- Severidade Operacional: Seleção visual entre:
  - 🔴 Crítica (P1): Parada total / impacto grave nos CDs ou Lojas.
  - 🟠 Alta (P2): Impacto parcial grave.
  - 🟡 Média (P3): Lentidão / workaround ativo.
  - 🟢 Baixa (P4): Sem impacto operacional direto.
- Abrangência Regional (Tags): Seleção dos locais impactados (CDSP - São Paulo, CDMG - Minas, CDRJ - Rio, Lojas SP, Matriz, etc.).
- Descrição Resumida: Histórico inicial da falha informado pelo NOC.

**Passo 3 — Equipes & Responsáveis**
- Equipes Acionadas: Seleção das frentes técnicas convocadas (Equipe SAP, Wipro, Telecom, TI Varejo, Central de Comando).
- Responsável Técnico Principal: Nome do fornecedor ou líder da tratativa (ex: Wipro Tech Support, Vivo Empresas, Equipe Basis SAP).

**Passo 4 — Revisão & Confirmação**
- Exibição do resumo executivo das informações.
- Botão "Criar Incidente & Abrir Painel" que finaliza o cadastro.

## 🤖 2. Registro Automático por Parser de IA

Na aba "Parser de Anotações IA", o operador pode apenas colar notas brutas de um chat ou chamado (ex: "instabilidade no autorizador sitef afetando vendas de cartao nas lojas de sp e rj, ti varejo e suporte sitef acionados emergencialmente").

O parser analisa o texto por palavras-chave e identifica automaticamente:
- **Sistema:** Sistemas de Loja
- **Serviço:** Autorizador TEF Sitef
- **Severidade:** Média (P3) — acionada pela palavra "instabilidade"
- **Abrangência:** Lojas SP, Lojas RJ
- **Responsável:** TI Varejo & Sitef

O operador apenas clica em "Criar Incidente com IA" para concluir sem precisar preencher formulários manualmente.

> **Nota de precisão:** o parser é baseado em correspondência de palavras-chave (não é um modelo de IA generativa), então a extração depende do vocabulário presente no texto colado. A lógica de abrangência distingue explicitamente "Loja" de "CD" pelo contexto (ex: "lojas de sp" → `Lojas SP`, enquanto "cdsp" isolado → `CDSP - São Paulo`), e usa limite de palavra (`\bsp\b`) para não confundir a sigla do estado com substrings de outras palavras.

## ⚡ O que acontece no sistema ao criar um incidente?

Quando o incidente é criado (seja via Wizard ou IA), o `IncidentContext.jsx` executa a seguinte lógica:

1. **Geração de ID Automático:** Cria o código no padrão de data (ex: `INC-20260916-003`).
2. **Criação da Linha do Tempo:** Insere o 1º evento automático na timeline: "Incidente Registrado na Central de Comando".
3. **Registro de Log de Auditoria:** Salva uma entrada auditável em `comando_audit_logs` com horário e operador responsável.
4. **Notificação & Redirecionamento:** Exibe o Toast de Sucesso e redireciona a tela do usuário para a aba de Detalhes do Incidente recém-criado.
