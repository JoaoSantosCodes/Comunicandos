# 🧙 Wizard de Novo Incidente (`IncidentWizardModal.jsx`)

A aba/modal Novo Incidente é o assistente guiado em 4 etapas responsável por registrar novas ocorrências operacionais de TI na Central de Comando de forma padronizada.

## 📋 1. As 4 Etapas do Wizard

A interface guia o operador passo a passo através de pílulas de progresso no topo.

**🔹 Etapa 1: Identificação do Serviço**
- Sistema Atingido (Select): Escolha do sistema afetado (SAP ERP & Logística, Rede / Conectividade / Telecom, Sistemas de Loja & PDV, Cloud AWS & Banco de Dados, etc.).
- Serviço/Processo Específico (Input): Detalhamento do módulo ou processo (ex: Integração PeopleSoft e EWM, Link 4G Loja).
- Título do Incidente (Input): Título institucional e objetivo da ocorrência.

**🔹 Etapa 2: Impacto & Abrangência**
- Severidade Operacional (Botões Selecionáveis):
  - 🔴 Crítica (P1): Parada total do serviço.
  - 🟠 Alta (P2): Impacto parcial grave.
  - 🟡 Média (P3): Lentidão ou workaround disponível.
  - 🟢 Baixa (P4): Ocorrência sem impacto direto.
- Abrangência Operacional (Chips Multi-seleção): Seleção dos locais impactados (CDSP, CDMG, CDRJ, CDGO, Matriz, Lojas SP, Lojas RJ, Lojas MG).
- Descrição Resumida (Textarea): Detalhamento inicial do evento fornecido pelo operador NOC.

**🔹 Etapa 3: Equipes & Responsáveis**
- Equipes Acionadas (Chips Multi-seleção): Seleção dos times convocados (Equipe SAP, Wipro, Equipe Redes, Telecom, TI Varejo, Central de Comando).
- Responsável Técnico Principal (Input): Nome do fornecedor ou consultor responsável (ex: Wipro / Equipe Basis SAP).

**🔹 Etapa 4: Revisão e Confirmação**
- Card de Resumo Executivo: Apresenta todas as informações preenchidas nos passos anteriores para conferência final.
- Botão "CRIAR INCIDENTE & ABRIR PAINEL": Dispara a criação no sistema.

## ⚙️ 2. Lógica de Funcionamento e Código (React State)

### A. Controle do Estado Local (`formData`)

O componente mantém o estado de cada campo à medida que o usuário avança entre as etapas:

```javascript
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  system: "SAP",
  service: "Integração de Pedidos",
  title: "",
  severity: "alta",
  description: "",
  scope: ["CDSP", "CDMG"],
  teams: ["Equipe SAP", "Wipro"],
  responsible: "Wipro Tech Support"
});
```

### B. Submissão e Acionamento do `IncidentContext`

Ao confirmar no Passo 4, a função `handleSubmit` valida o formulário e executa `createIncident`:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.title) {
    alert("Por favor informe o título do incidente.");
    return;
  }

  // Chama a função central do IncidentContext
  createIncident(formData);
};
```

## ⚡ 3. O que o `createIncident` faz automaticamente?

1. **Gera um ID Único:** Ex: `INC-20260916-003` (data atual + sequência).
2. **Inicializa a Linha do Tempo (Timeline):** Registra o 1º evento de criação ("Incidente Registrado na Central de Comando").
3. **Cria um Registro de Auditoria:** Salva a ação em `comando_audit_logs`.
4. **Notifica e Redireciona:** Exibe o Toast de Sucesso e abre automaticamente a tela do incidente recém-criado.

> **Nota de correção:** o passo 4 (redirecionamento para o incidente correto) depende de `setActiveTab("incident-detail", newId)` receber o ID explicitamente. Uma versão anterior lia o ID selecionado de uma closure que podia estar obsoleta no mesmo ciclo de criação, fazendo o sistema abrir o incidente errado. Isso foi corrigido e validado com testes end-to-end — o comportamento acima já reflete a versão corrigida.
