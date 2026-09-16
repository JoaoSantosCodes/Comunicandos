# 🕒 Timeline Operacional Global (`TimelineView.jsx`)

A aba Timeline Operacional Global é a visão cronológica unificada de todos os eventos registrados pela equipe de NOC e pela Central de Comando.

## 1. Estrutura e Apresentação Visual

A interface utiliza o conceito de trilha vertical contínua para facilitar a leitura da sequência dos acontecimentos:

- **Trilha Conectora (Vertical Track):** Uma linha vertical que percorre toda a página conectando os marcos operacionais. Nós de indicação (bullet points) sinalizam a hora exata de cada atualização.
- **Detalhamento do Card de Evento:**
  - Horário (Destaque): Exibição do horário em formato `HH:MM` (ex: 15:45).
  - Título do Evento: Ação realizada (ex: "Incidente Registrado na Central de Comando", "Status alterado para Normalizado", "Comunicado Emitido: INDISPONIBILIDADE").
  - Vínculo do Incidente: Exibe o ID (ex: `INC-20260915-001`) e o Sistema (SAP, TEF, Telecom).
  - Caixa de Descrição: Balão com a explicação técnica ou nota operacional.
  - Autor do Registro: Identificação de quem publicou o evento (ex: Operador NOC, Central de Comando).

## 2. Lógica de Funcionamento e Código (React Data Mapping)

A aba consome a lista completa de incidentes do `IncidentContext`, realiza o achatamento (flattening) dos eventos de todos os incidentes em uma lista única e **ordena por horário, do mais recente para o mais antigo**:

```javascript
export const TimelineView = () => {
  const { incidents } = useIncidentContext();

  // flatMap agrupa os eventos por incidente; o .sort() é o que garante
  // uma timeline global de verdade, misturando eventos de incidentes
  // diferentes na ordem cronológica correta.
  const allEvents = incidents
    .flatMap(i => (i.timeline || []).map(t => ({
      ...t,
      incidentId: i.id,
      system: i.system,
      incidentTitle: i.title
    })))
    .sort((a, b) => b.time.localeCompare(a.time));

  return (
    // Renderização com linha vertical decorativa e nós interativos
  );
};
```

> **Nota de correção:** a versão inicial usava apenas `flatMap` sem ordenar — isso concatenava os eventos por incidente (na ordem em que os incidentes aparecem no array, não por tempo real), então eventos de um incidente criado mais tarde apareciam antes de eventos cronologicamente anteriores de outro incidente. O `.sort()` foi adicionado tanto aqui quanto no feed "Atividade Recente" do Dashboard, que tinha o mesmo problema.

## 💡 Destaques da Timeline

- **Rastreabilidade Total:** Qualquer mudança de status, adição de nota técnica ou emissão de comunicado gera um evento automático nesta linha do tempo.
- **Leitura Sequencial:** Permite entender rapidamente o histórico dos fatos em caso de auditorias técnicas ou reuniões de causa raiz (RCA / Post-Mortem) — agora com a ordem cronológica real garantida entre incidentes diferentes.
