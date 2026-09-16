import React, { useState, useMemo } from "react";
import { STORES_DATA } from "../../data/storesData";
import { 
  Search, Store, User, Mail, X, Plus, Copy, Check, Phone, MapPin, 
  Clock, ShieldAlert, Cpu, ExternalLink, Filter, Building2, CheckCircle2 
} from "lucide-react";

const norm = (value) => (value || "").toString().toLowerCase().trim();

export const StoreLookupModal = ({ isOpen, onClose, onSelectStore }) => {
  const [query, setQuery] = useState("490"); // Default to store 490 as shown in screenshot
  const [userName, setUserName] = useState("João");
  const [filterMode, setFilterMode] = useState("vd_desig");
  const [selectedVd, setSelectedVd] = useState("490");
  const [copiedField, setCopiedField] = useState(null);
  const [techInfo, setTechInfo] = useState("");

  // Search logic supporting VD, Nome, Designação, GGL, GR, Cidade
  const filteredStores = useMemo(() => {
    const q = norm(query);
    if (!q) return STORES_DATA.slice(0, 50);

    return STORES_DATA.filter((st) => {
      const matchVd = norm(st.vd).includes(q);
      const matchNome = norm(st.nome).includes(q);
      const matchGgl = norm(st.ggl).includes(q);
      const matchGr = norm(st.gr).includes(q);
      const matchCidade = norm(st.cidade).includes(q);
      const matchEndereco = norm(st.endereco).includes(q);
      
      const matchDesignacao = st.designacoes && st.designacoes.some(d => 
        norm(d.numero).includes(q) || norm(d.operadora).includes(q) || norm(d.tipo).includes(q)
      );

      return matchVd || matchNome || matchGgl || matchGr || matchCidade || matchEndereco || matchDesignacao;
    }).slice(0, 100);
  }, [query]);

  // Active store object
  const activeStore = useMemo(() => {
    return STORES_DATA.find((s) => s.vd === selectedVd) || filteredStores[0] || STORES_DATA[0];
  }, [selectedVd, filteredStores]);

  if (!isOpen) return null;

  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmSelect = (store) => {
    if (onSelectStore) {
      onSelectStore(store);
    }
    onClose();
  };

  // Generate Email Text for Technical Link Maintenance
  const generatedEmailText = activeStore
    ? `@${activeStore.email || "loja@dpsp.com.br"}, Olá loja tudo bem?\nPor favor, liberem o acesso para que o(s) técnicos possa(m) reparar link de internet em sua loja. Abaixo, informo os dados dos técnicos para validação.${techInfo ? `\n\nTécnico: ${techInfo}` : ""}`
    : "";

  // Separate main chamados designacoes (MPLS / DEDICADO) vs outras designacoes (MONITORADA / ISP)
  const mainDesignacoes = activeStore?.designacoes?.filter(d => 
    norm(d.tipo).includes("mpls") || norm(d.tipo).includes("dedicado")
  ) || activeStore?.designacoes?.slice(0, 2) || [];

  const outrasDesignacoes = activeStore?.designacoes?.filter(d => 
    !mainDesignacoes.includes(d)
  ) || [];

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(10, 15, 26, 0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
      className="animate-fade-in"
    >
      <div 
        className="panel-card" 
        style={{ 
          width: "100%", 
          maxWidth: "1280px", 
          maxHeight: "92vh", 
          display: "flex", 
          flexDirection: "column",
          gap: "14px",
          padding: "20px 24px",
          backgroundColor: "#161b26",
          border: "1px solid rgba(245,234,216,0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          color: "var(--text-on-chrome)",
          overflow: "hidden"
        }}
      >
        {/* Top Header Controls Bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--accent-red)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Store size={20} color="#fff" />
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "#fff" }}>
                Consulta de Lojas
              </h2>
            </div>
            
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "6px" }}>
              <X size={22} />
            </button>
          </div>

          {/* Search Bar & User Input row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              style={{
                backgroundColor: "#1e2638",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "0.82rem",
                cursor: "pointer"
              }}
            >
              <option value="vd_desig">VD/Designação</option>
              <option value="nome_ggl">Nome / GGL / GR</option>
              <option value="cidade">Cidade / Estado</option>
            </select>

            <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
              <input 
                type="text"
                className="form-input"
                style={{ 
                  paddingLeft: "36px", 
                  backgroundColor: "#0d111a", 
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  height: "38px",
                  fontSize: "0.85rem"
                }}
                placeholder="Qual a VD/Designação da loja? (ex: 490, 110003966086891, Casa Verde)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "200px" }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", whitespace: "nowrap" }}>Qual o seu nome?</span>
              <input 
                type="text"
                className="form-input"
                style={{ 
                  backgroundColor: "#0d111a", 
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  height: "38px",
                  fontSize: "0.85rem"
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                if (filteredStores.length > 0) setSelectedVd(filteredStores[0].vd);
              }}
              style={{ height: "38px", backgroundColor: "#3b82f6", border: "none", padding: "0 18px", fontWeight: 600 }}
            >
              Buscar
            </button>

            {onSelectStore && activeStore && (
              <button 
                className="btn btn-sm"
                onClick={() => handleConfirmSelect(activeStore)}
                style={{ height: "38px", backgroundColor: "var(--accent-red)", color: "#fff", border: "none", padding: "0 18px", fontWeight: 600 }}
              >
                Vincular ao Incidente
              </button>
            )}
          </div>
        </div>

        {/* Quick Search Selector List if searching */}
        {query && filteredStores.length > 1 && (
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px" }}>
            {filteredStores.slice(0, 10).map((st) => (
              <button
                key={st.vd}
                onClick={() => setSelectedVd(st.vd)}
                style={{
                  backgroundColor: activeStore?.vd === st.vd ? "var(--accent-red)" : "#1e2638",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                VD {st.vd} - {st.nome}
              </button>
            ))}
          </div>
        )}

        {/* Store Detail Content Grid (Matching User Screenshot Layout) */}
        {activeStore ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto", paddingRight: "4px", flex: 1 }}>
            
            {/* Store Title Banner */}
            <div style={{ 
              backgroundColor: "#111622", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: "8px", 
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Building2 size={22} color="var(--accent-red)" />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#fff", letterSpacing: "0.5px" }}>
                  {activeStore.nome}
                </h3>
              </div>
              <span style={{ 
                backgroundColor: "#2d3748", 
                color: "#60a5fa", 
                fontSize: "0.85rem", 
                fontWeight: 800, 
                padding: "4px 12px", 
                borderRadius: "6px",
                border: "1px solid rgba(96, 165, 250, 0.3)"
              }}>
                VD {activeStore.vd}
              </span>
            </div>

            {/* Main 2-Column Split Layout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              
              {/* Left Column: Full Details Table */}
              <div style={{ backgroundColor: "#111622", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "12px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)", width: "35%" }}>🔹 VD da loja</td>
                      <td style={{ padding: "7px 10px", color: "#fff", fontWeight: 700 }}>{activeStore.vd}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📍 Nome da loja</td>
                      <td style={{ padding: "7px 10px", color: "#fff", fontWeight: 600 }}>{activeStore.nome}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📱 Celular</td>
                      <td style={{ padding: "7px 10px", color: "#60a5fa", fontFamily: "monospace" }}>
                        {activeStore.celular}
                        {activeStore.celular !== "N/A" && (
                          <button onClick={() => handleCopy(activeStore.celular, "celular")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", marginLeft: "6px", cursor: "pointer" }}>
                            <Copy size={11} />
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📞 Telefones</td>
                      <td style={{ padding: "7px 10px", color: "#fff" }}>{activeStore.telefones}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>✉️ E-Mail</td>
                      <td style={{ padding: "7px 10px", color: "#38bdf8" }}>{activeStore.email}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>🏠 Endereço</td>
                      <td style={{ padding: "7px 10px", color: "#fff" }}>{activeStore.endereco}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>🏛️ Estado</td>
                      <td style={{ padding: "7px 10px", color: "#fff" }}>{activeStore.estado}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>🌐 Região</td>
                      <td style={{ padding: "7px 10px", color: "#fff" }}>{activeStore.regiao}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>⏰ Horário (2ª-6ª)</td>
                      <td style={{ padding: "7px 10px", color: "#4ade80" }}>{activeStore.horario}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📅 Sábado</td>
                      <td style={{ padding: "7px 10px", color: "#4ade80" }}>{activeStore.sabado}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📅 Domingo</td>
                      <td style={{ padding: "7px 10px", color: "#4ade80" }}>{activeStore.domingo}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>⚡ Funcionamento</td>
                      <td style={{ padding: "7px 10px", color: "#facc15" }}>{activeStore.funcionamento}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>💳 CNPJ</td>
                      <td style={{ padding: "7px 10px", color: "#fff", fontFamily: "monospace" }}>{activeStore.cnpj}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.6)" }}>📮 CEP</td>
                      <td style={{ padding: "7px 10px", color: "#fff", fontFamily: "monospace" }}>{activeStore.cep}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right Column: GGL/GR Cards, Email Generator, Designações Chamado */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                
                {/* Top Row: GGL & GR Contact Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* GGL Card */}
                  <div style={{ backgroundColor: "#111622", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#60a5fa", fontWeight: 700, marginBottom: "4px" }}>
                      🧑‍💼 GGL (Gerente Geral)
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      {activeStore.ggl}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#38bdf8", fontFamily: "monospace" }}>
                      {activeStore.gglPhone || "Sem telefone"}
                      {activeStore.gglPhone && (
                        <button onClick={() => handleCopy(activeStore.gglPhone, "ggl")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", marginLeft: "6px", cursor: "pointer" }}>
                          <Copy size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* GR Card */}
                  <div style={{ backgroundColor: "#111622", border: "1px solid rgba(168, 85, 247, 0.3)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#c084fc", fontWeight: 700, marginBottom: "4px" }}>
                      👤 GR (Gerente Regional)
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      {activeStore.gr}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#c084fc", fontFamily: "monospace" }}>
                      {activeStore.grPhone || "Sem telefone"}
                      {activeStore.grPhone && (
                        <button onClick={() => handleCopy(activeStore.grPhone, "gr")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", marginLeft: "6px", cursor: "pointer" }}>
                          <Copy size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Generator Box for Link Repairs */}
                <div style={{ backgroundColor: "#111622", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                      ✉️ Email para envio (Liberação de Técnico)
                    </span>
                    <button 
                      onClick={() => handleCopy(generatedEmailText, "emailText")}
                      style={{ 
                        fontSize: "0.72rem", 
                        backgroundColor: copiedField === "emailText" ? "#22c55e" : "#1e293b", 
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "4px",
                        padding: "3px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      {copiedField === "emailText" ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedField === "emailText" ? "Copiado!" : "Copiar Texto"}</span>
                    </button>
                  </div>

                  <div style={{
                    backgroundColor: "#090d14",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "0.78rem",
                    color: "#f1f5f9",
                    lineHeight: "1.4",
                    fontFamily: "sans-serif",
                    whiteSpace: "pre-line"
                  }}>
                    {generatedEmailText}
                  </div>
                </div>

                {/* Designações Chamado Box */}
                <div style={{ backgroundColor: "#111622", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                    🔌 Designações Chamado
                  </div>

                  <div style={{ overflowY: "auto", flex: 1 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", textAlign: "left" }}>
                          <th style={{ padding: "6px" }}>Número (Designação)</th>
                          <th style={{ padding: "6px" }}>Operadora</th>
                          <th style={{ padding: "6px" }}>Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mainDesignacoes.map((d, idx) => (
                          <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <td style={{ padding: "8px 6px", color: "#60a5fa", fontWeight: 700, fontFamily: "monospace" }}>
                              {d.numero}
                              <button onClick={() => handleCopy(d.numero, `desig_${idx}`)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", marginLeft: "6px", cursor: "pointer" }}>
                                <Copy size={11} />
                              </button>
                            </td>
                            <td style={{ padding: "8px 6px", color: "#e2e8f0" }}>{d.operadora}</td>
                            <td style={{ padding: "8px 6px" }}>
                              <span style={{ 
                                fontSize: "0.68rem", 
                                fontWeight: 800, 
                                padding: "2px 6px", 
                                borderRadius: "4px",
                                backgroundColor: d.tipo.includes("MPLS") ? "rgba(59, 130, 246, 0.2)" : "rgba(168, 85, 247, 0.2)",
                                color: d.tipo.includes("MPLS") ? "#60a5fa" : "#c084fc",
                                border: d.tipo.includes("MPLS") ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid rgba(168, 85, 247, 0.4)"
                              }}>
                                {d.tipo} {d.velocidade ? `(${d.velocidade})` : ""}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {mainDesignacoes.length === 0 && (
                          <tr>
                            <td colSpan={3} style={{ padding: "12px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                              Nenhuma designação cadastrada para esta VD.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Outras Designações if present */}
                {outrasDesignacoes.length > 0 && (
                  <div style={{ backgroundColor: "#111622", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                      📞 Outras Designações
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {outrasDesignacoes.map((od, i) => (
                        <div key={i} style={{ backgroundColor: "#0d111a", padding: "4px 8px", borderRadius: "4px", fontSize: "0.72rem", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <span style={{ color: "#60a5fa", fontWeight: 700 }}>{od.numero}</span> ({od.operadora} - {od.tipo})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)" }}>
            Nenhuma loja encontrada para o termo "{query}".
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
            Base DPSP: 2.085 Lojas Ativas • Sincronizado com Relação de Lojas e Inventário de Links
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn btn-sm"
              onClick={onClose}
              style={{ backgroundColor: "#1e2638", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
            >
              Fechar
            </button>
            {activeStore && onSelectStore && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleConfirmSelect(activeStore)}
                style={{ backgroundColor: "var(--accent-red)", border: "none" }}
              >
                Vincular ao Incidente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
