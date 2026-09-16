# 🎨 Gerador de Cards Institucionais (`CardGeneratorView.jsx` + `InstitutionalCardCanvas.jsx`)

O Gerador de Cards Institucionais é o estúdio gráfico da Central de Comando DPSP. Ele permite criar, customizar e exportar comunicados visuais padronizados para divulgação corporativa nos canais de comunicação do Grupo DPSP (WhatsApp, Teams, E-mail e Intranet).

> **Nota de identidade visual:** diferente do restante do app (que usa o design system Organic com tipografia Caprasimo/Figtree e paleta creme/chrome), o card gerado por `InstitutionalCardCanvas.jsx` mantém sua própria identidade fixa — tipografia **Nunito** (nunca Caprasimo) e paleta própria por preset — porque ele representa o produto final publicado, não a UI administrativa.

## 1. Os 4 Presets de Comunicação (`generatorMode`)

O gerador adapta o layout e os campos de acordo com o público-alvo do comunicado:

- 🚚 **CDS & Logística:** Focado no impacto da esteira, expedição, faturamento WMS e operação nos Centros de Distribuição (CDSP, CDMG, CDRJ, CDGO).
- 🏪 **Lojas & Varejo:** Focado em contingência de PDV/Caixas, vendas de cartão (Sitef/TEF) e orientações operacionais para os gerentes de loja.
- 👔 **Briefing Executivo:** Formato condensado de alta visibilidade para diretores, destacando Causa Raiz, Impacto Financeiro/Operacional e ETA (Previsão de Solução).
- 🛠️ **Manutenção Programada:** Informativo preventivo com janela de manutenção (Data/Horário), instrução de encerramento de sessão no SAP e previsão de liberação.

## 2. Tipo de Evento (`type`) — Cores por Severidade

- 🔴 Indisponibilidade — Vermelho Coral (`#e75e65`)
- 🟡 Atualização — Dourado (`#e2ce76`) no modo padrão, mas Vermelho Coral no modo Executivo (crise)
- 🟢 Normalização — Verde Esmeralda (`#16a34a`)
- 🔵 Manutenção / Informativo — Azul Vibrante (`#387fef`)

## 3. Presets de Marca & Cores (`palettePreset`)

Os rótulos reais do seletor, com as cores efetivamente usadas em `InstitutionalCardCanvas.jsx`:

| Preset | Rótulo na UI | Cores reais |
|---|---|---|
| `default` | Padrão Operacional (T.+PERTO / Service Desk) | Badge conforme o tipo de evento + fundo externo navy (`#2e3b5b`) |
| `dsp` | Drogaria São Paulo (Azul & Vermelho DPSP) | Badge vermelho (`#d91c24`) + fundo externo navy (`#2e3b5b`) |
| `pacheco` | Drogarias Pacheco (Vermelho Carmim & Amarelo) | Badge coral (`#e75e65`) + caixa de suporte dourada (`#e2ce76`) |
| `executivo_dark` | Executivo VIP Dark (Grafite & Prata) | Badge grafite (`#2e3b5b`) + fundo externo escuro (`#111827`) |
| `custom` | 🛠️ Personalizado (Pickers de Cores Hex) | Cores individuais de badge, fundo e texto de suporte |

> Pacheco **não tem verde nem azul** — é vermelho coral + dourado, como o próprio rótulo da UI já indica. O preset "Executivo VIP Dark" é frequentemente esquecido em descrições porque não aparece nos 4 presets de comunicação (é uma dimensão separada: paleta de marca, não tipo de comunicado).

## 4. Recursos de Edição & Customização

- Upload de Logotipos & Banners: PNG/SVG para logo esquerda, logo direita ou banner único completo do rodapé.
- Gerenciador Dinâmico de Parágrafos: adicionar, editar, excluir e reordenar (▲/▼) parágrafos.
- Inserção de frases prontas da Biblioteca de Frases com 1 clique.

## 5. Visualização Dupla (Canvas HD vs. Mockup Smartphone)

- **Modo Canvas HD** (`InstitutionalCardCanvas`): renderização direta em escala real do card final, com badges dinâmicas conforme o tipo/preset.
- **Modo Smartphone / WhatsApp:** simula a tela de um celular exibindo a imagem do card dentro de um balão de mensagem formatado, para validar a leitura mobile antes do envio.

## 6. Ações de Exportação e Envio

```javascript
// 1. Exportação em PNG HD de Alta Resolução
const handleDownloadPng = async () => {
  const dataUrl = await toPng(canvasRef.current, { quality: 0.98, pixelRatio: 2 });
  // Baixa 'card-{modo}-{tipo}-{timestamp}.png'
};

// 2. Cópia de Texto Formatado para WhatsApp — com fallback em duas camadas
const handleCopyWhatsappText = async () => {
  const text = generateWhatsappFormattedText();
  let success = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      success = true;
    }
  } catch {
    // Contextos onde a Clipboard API é bloqueada (permissão negada, iframe, etc.)
  }
  if (!success) {
    // Fallback via textarea temporário + document.execCommand("copy")
  }
  // Feedback (ícone de check + toast) só é exibido como sucesso quando success === true;
  // em caso de falha, mostra um toast de erro em vez de uma confirmação falsa.
};

// 3. Envio para a Central de Publicação
const handlePublish = () => {
  createCommunicationCard({ ...formData, publishedAt: new Date().toISOString() });
  setActiveTab("publishing");
};
```

> **Nota de correção:** a versão anterior de `handleCopyWhatsappText` não tinha nenhum tratamento de erro — se a Clipboard API falhasse (permissão negada, contexto inseguro), a Promise rejeitava sem tratamento e a UI ainda mostrava "✓ Texto Copiado!" para o usuário, mascarando a falha. Agora há um fallback via `document.execCommand("copy")`, e o feedback de sucesso só aparece quando a cópia realmente funcionou.
