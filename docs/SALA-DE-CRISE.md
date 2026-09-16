# 🚨 Sala de Crise / War Room (`CrisisRoomView.jsx`)

A Sala de Crise (War Room) é o ambiente operacional de alto impacto dedicado ao acompanhamento e resolução de incidentes graves de Severidade P1 (Crítica).

Por decisão de design, a Sala de Crise mantém a estética escura "War Room" (`#232a3d`), diferente do restante do app (tema claro/creme), garantindo alto contraste e foco total para os operadores do NOC e gestores.

## 1. Estrutura Visual

A tela é organizada em 3 áreas funcionais principais:

**🔹 Cabeçalho de Alerta & Cronômetro SLA**
- Banner de Alerta Pulsante: ícone de chama animado (`Flame`) indicando crise ativa, com o ID e título da ocorrência P1.
- Cronômetro SLA em Tempo Real: relógio digital `HH:MM:SS` que contabiliza o tempo decorrido desde a abertura da tela.
- 📺 Botão Modo TV / Fullscreen: alterna o sistema para tela cheia (`document.documentElement.requestFullscreen()`) com 1 clique, para exibição em videowalls.

**🔹 Painel Esquerdo — Ponte Técnica (Roster de Equipes)**

Lista as equipes técnicas e fornecedores conectados no war room técnico:

| Equipe | Líder / Contato | Status |
|---|---|---|
| Equipe SAP Basis & Dev | Carlos Silva (Líder SAP) | Conectado |
| Wipro N3 Support | Consultor Sr. Wipro | Conectado |
| Redes & Telecom DPSP | Eng. Telecom | Conectado |
| Gerência dos CDs | Gerente CDSP/CDMG | Conectado |
| Central de Comando NOC | João Carlos (NOC) | **Facilitador** |

> O último item do roster tem status "Facilitador", não "Conectado" — ele representa quem está coordenando a ponte, não uma equipe técnica externa conectada.

**🔹 Painel Direito — Decisões & Plano de Ação**

Feed com o histórico de deliberações e ações executadas durante a crise, com horário e descrição técnica das manobras de TI (ex: "15:20 — Aprovada manobra de reinício controlado do pool de instâncias do serviço EWM").

## 2. Ações Rápidas de 1 Clique

**📢 Publicar Comunicado de Crise (`handleCreateUpdateCard`)**
- Preenche automaticamente um rascunho de comunicado com o título `ATUALIZAÇÃO DE CRISE: {sistema}`, abrangência e detalhes da ponte.
- Redireciona imediatamente para o Gerador de Cards para disparo no WhatsApp e Teams.

**🟢 Normalizar & Encerrar Crise (`handleNormalizeAndExit`)**
- Altera o status do incidente para `normalizado` (via `updateIncidentStatus`).
- Registra o evento de normalização na Timeline Global e salva o registro na Trilha de Auditoria.
- Notifica o operador via Toast.
- **Sai da Sala de Crise**, redirecionando para o Detalhe do Incidente já resolvido.
- O botão fica desabilitado se o incidente já estiver normalizado, evitando reenvio duplicado.

> **Nota de correção:** a versão inicial só chamava `updateIncidentStatus` e não navegava para lugar nenhum — o operador continuava vendo o banner vermelho "CRISE ATIVA" e o cronômetro SLA seguia contando indefinidamente mesmo com o incidente já resolvido. Agora `handleNormalizeAndExit` encadeia `updateIncidentStatus` com `setActiveTab("incident-detail", incident.id)`, fechando o ciclo corretamente.

## 3. Lógica do Código (React Hooks)

```javascript
export const CrisisRoomView = () => {
  const { getSelectedIncident, updateIncidentStatus, setActiveTab, setActiveCardDraft } = useIncidentContext();
  const incident = getSelectedIncident();

  const [seconds, setSeconds] = useState(1420);
  const [isKiosk, setIsKiosk] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
      setIsKiosk(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsKiosk(false);
    }
  };

  const handleNormalizeAndExit = () => {
    updateIncidentStatus(incident.id, "normalizado");
    setActiveTab("incident-detail", incident.id);
  };
};
```
