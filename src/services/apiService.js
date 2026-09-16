// Camada de integração HTTP REST com o backend Spring (AlertsController / MongoDB)
// Suporta fallback para localStorage quando o backend Spring não estiver acessível

// Porta real do backend Spring (server.port em application.properties do
// projeto "consulta lojas java"), não 8080.
const API_BASE_URL = "http://localhost:8081/api/alerts";

export const apiService = {
  // Carrega alertas executivos do Spring (/api/alerts/aexec)
  async getExecAlerts() {
    try {
      const res = await fetch(`${API_BASE_URL}/aexec`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      return { success: true, data: data.rows || [] };
    } catch {
      // Fallback para storage local
      const saved = localStorage.getItem("comando_incidents");
      return { success: false, fallback: true, data: saved ? JSON.parse(saved) : [] };
    }
  },

  // Salva alerta executivo no Spring (/api/alerts/aexec)
  async saveExecAlert(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/aexec`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Backend Spring inacessível. Salvo localmente.", err);
      return { success: true, localOnly: true };
    }
  },

  // Carrega alertas de gestão de crise do Spring (/api/alerts/gcrises)
  async getGcrisesAlerts() {
    try {
      const res = await fetch(`${API_BASE_URL}/gcrises`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      return { success: true, data: data.rows || [] };
    } catch {
      const saved = localStorage.getItem("comando_incidents");
      return { success: false, fallback: true, data: saved ? JSON.parse(saved) : [] };
    }
  },

  // Salva alerta de gestão de crise no Spring (/api/alerts/gcrises)
  async saveGcriseAlert(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/gcrises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Backend Spring inacessível. Salvo localmente.", err);
      return { success: true, localOnly: true };
    }
  }
};
