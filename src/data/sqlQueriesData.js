// Dedicated SQL Query library for NOC & Command Center DPSP operations (P2K, Syncros, Base Pendentes, Campanhas NP)

export const SQL_QUERIES_CATALOG = [
  {
    id: "query-01",
    title: "Lojas Desatualizadas + IP SP (Filtro Base < 48366)",
    category: "P2K / Base Pendentes",
    database: "Oracle DB (DBCSI_DSP)",
    description: "Consulta filiais com base de dados desatualizada (UBA_HOJE < 48366) e cruza com a tabela de estabelecimentos para obter o IP da loja e lote atual.",
    sql: `SELECT codigo as loja, e.num_ip_sp_establ, uba_hoje as "BASE", nl.DATA_HORA_ALTR as "BASE data", nl.ULA_HOJE as "Lote"
FROM DBCSI_DSP.numeracao_lote NL
JOIN DBCSI_DSP.estabelecimento e ON e.NUMERO_LOJA = NL.CODIGO
WHERE nl.uba_hoje < 48366 AND nl.codigo IN (
  SELECT DISTINCT tp.numero_loja
  FROM DBCSI_DSP.transacao_p2k tp
  WHERE tp.DATA_TRANSACAO >= to_char(sysdate - 1, 'dd-mm-yy')
    AND tp.TIPO_TRANSACAO = 10 
    AND tp.STATUS = 'processada'
) 
ORDER BY nl.codigo;`,
    explanation: "Obtém a lista de lojas pendentes de atualização de lote com transações P2K válidas nas últimas 24 horas, incluindo o IP fixo de São Paulo."
  },
  {
    id: "query-02",
    title: "Consulta do Histórico do Syncros (Preço em Tempo Real)",
    category: "Syncros / Malha de Preços",
    database: "PostgreSQL / MySQL (dpsp_price_process)",
    description: "Verifica as 3 últimas execuções da rotina de preços no Syncros para identificar atrasos ou travamentos em processamento.",
    sql: `SELECT * FROM dpsp_price_process.PROCESS_HISTORIC ph ORDER BY id DESC LIMIT 3;`,
    explanation: "Mostra o status atual, horário de início e término dos últimos lotes de precificação distribuídos pelo Syncros."
  },
  {
    id: "query-03",
    title: "Lojas Desatualizadas + IP SP (Filtro Base < 47286 - Histórico D-2)",
    category: "P2K / Base Pendentes",
    database: "Oracle DB (DBCSI_DSP)",
    description: "Consulta acumulada dos últimos 2 dias (D-2) para identificar filiais isoladas ou com atraso grave na carga de base.",
    sql: `SELECT codigo as loja, e.num_ip_sp_establ, uba_hoje as "BASE", nl.DATA_HORA_ALTR as "BASE data", nl.ULA_HOJE as "Lote"
FROM DBCSI_DSP.numeracao_lote NL
JOIN DBCSI_DSP.estabelecimento e ON e.NUMERO_LOJA = NL.CODIGO
WHERE nl.uba_hoje < 47286 AND nl.codigo IN (
  SELECT DISTINCT tp.numero_loja
  FROM DBCSI_DSP.transacao_p2k tp
  WHERE tp.DATA_TRANSACAO >= to_char(sysdate - 2, 'dd-mm-yy')
    AND tp.TIPO_TRANSACAO = 10 
    AND tp.STATUS = 'processada'
) 
ORDER BY nl.codigo;`,
    explanation: "Filtra lojas com atraso superior a 48h para intervenção presencial de Field ou envio manual de arquivo."
  },
  {
    id: "query-04",
    title: "Verificação de Registros Não Processados ('NP') de Campanhas P2K",
    category: "Campanhas & Promoções",
    database: "Oracle DB (DBCSI_DSP)",
    description: "Union das 7 tabelas de campanhas e promoções para identificar pendências de sincronização com os caixas das lojas.",
    sql: `SELECT 'CAMPANHA' as TABELA, count(*) FROM dbcsi_dsp.p2k_campanha WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_LOJA' as TABELA, count(*) FROM dbcsi_dsp.p2k_campanha_loja WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_PROD' as TABELA, count(*) FROM dbcsi_dsp.p2k_campanha_produto WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_PROD_CESTA' as TABELA, count(*) FROM dbcsi_dsp.p2k_campanha_produto_cesta WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_DIA_MES' as TABELA, count(*) FROM dbcsi_dsp.p2k_camp_dia_fixo_mes WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_DIAS_SEMANA' as TABELA, count(*) FROM dbcsi_dsp.p2k_camp_dias_sem WHERE status_registro = 'NP'
UNION
SELECT 'CAMPANHA_GRUPO' as TABELA, count(*) FROM dbcsi_dsp.p2k_campanha_GRUPO WHERE status_registro = 'NP';`,
    explanation: "Se a contagem de registros 'NP' (Não Processado) for maior que zero em alguma tabela, indica que os descontos da promoção não foram baixados aos PDVs."
  },
  {
    id: "query-05",
    title: "Lojas Faltantes com Base Abaixo da Moda Estatística (STATS_MODE)",
    category: "P2K / Base Pendentes",
    database: "Oracle DB (DBCSI_DSP)",
    description: "Utiliza a função STATS_MODE para calcular dinamicamente a versão de base predominante do dia e listar apenas as lojas abaixo do padrão.",
    sql: `SELECT CODIGO AS "LOJA", UBA_HOJE AS "BASE ATUAL", DATA_HORA_ALTR AS "BASE DATA", ULA_HOJE AS "LOTE ATUAL" 
FROM DBCSI_DSP.NUMERACAO_LOTE
WHERE UBA_HOJE < (
  SELECT STATS_MODE(UBA_HOJE)
  FROM DBCSI_DSP.NUMERACAO_LOTE
  WHERE TO_CHAR(DATA_HORA_ALTR, 'DD-MM-YYYY') = TO_CHAR(SYSDATE, 'DD-MM-YYYY')
)
AND CODIGO IN (
  SELECT DISTINCT NUMERO_LOJA
  FROM DBCSI_DSP.TRANSACAO_P2K
  WHERE DATA_TRANSACAO >= TO_CHAR(SYSDATE - 1) 
    AND TIPO_TRANSACAO = 10 
    AND STATUS = 'processada'
)
ORDER BY CODIGO;`,
    explanation: "Esta é a query oficial de fechamento de lote para identificar com 100% de precisão as filiais que precisam de atuação do NOC."
  }
];
