import React, { lazy, Suspense } from "react";
import { IncidentProvider, useIncidentContext } from "./context/IncidentContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { MobileBottomNav } from "./components/layout/MobileBottomNav";

// Dynamic Lazy Loading para otimização de bundle e inicialização rápida
const DashboardView = lazy(() => import("./components/dashboard/DashboardView").then(m => ({ default: m.DashboardView })));
const IncidentsView = lazy(() => import("./components/incidents/IncidentsView").then(m => ({ default: m.IncidentsView })));
const IncidentWizardModal = lazy(() => import("./components/incidents/IncidentWizardModal").then(m => ({ default: m.IncidentWizardModal })));
const IncidentDetailView = lazy(() => import("./components/incidents/IncidentDetailView").then(m => ({ default: m.IncidentDetailView })));
const TimelineView = lazy(() => import("./components/timeline/TimelineView").then(m => ({ default: m.TimelineView })));
const CommunicationsView = lazy(() => import("./components/communications/CommunicationsView").then(m => ({ default: m.CommunicationsView })));
const CardGeneratorView = lazy(() => import("./components/cardGenerator/CardGeneratorView").then(m => ({ default: m.CardGeneratorView })));
const PublishingCentralView = lazy(() => import("./components/publishing/PublishingCentralView").then(m => ({ default: m.PublishingCentralView })));
const CrisisRoomView = lazy(() => import("./components/crisis/CrisisRoomView").then(m => ({ default: m.CrisisRoomView })));
const HistoryView = lazy(() => import("./components/history/HistoryView").then(m => ({ default: m.HistoryView })));
const TemplatesView = lazy(() => import("./components/templates/TemplatesView").then(m => ({ default: m.TemplatesView })));
const PhrasesView = lazy(() => import("./components/phrases/PhrasesView").then(m => ({ default: m.PhrasesView })));
const CatalogView = lazy(() => import("./components/catalog/CatalogView").then(m => ({ default: m.CatalogView })));
const TeamsView = lazy(() => import("./components/teams/TeamsView").then(m => ({ default: m.TeamsView })));
const ReportsView = lazy(() => import("./components/reports/ReportsView").then(m => ({ default: m.ReportsView })));
const AiAssistantView = lazy(() => import("./components/ai/AiAssistantView").then(m => ({ default: m.AiAssistantView })));
const AuditView = lazy(() => import("./components/audit/AuditView").then(m => ({ default: m.AuditView })));
const SettingsView = lazy(() => import("./components/settings/SettingsView").then(m => ({ default: m.SettingsView })));

const LoadingFallback = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", gap: "16px", color: "var(--text-muted)" }}>
    <div style={{ width: "38px", height: "38px", border: "4px solid rgba(200, 55, 45, 0.2)", borderTopColor: "var(--accent-red)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
    <span style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-sans)" }}>Carregando módulo...</span>
  </div>
);

const MainLayout = () => {
  const { activeTab } = useIncidentContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
      case "notifications":
        return <DashboardView />;
      case "incidents":
        return <IncidentsView />;
      case "wizard":
        return <IncidentWizardModal />;
      case "incident-detail":
        return <IncidentDetailView />;
      case "timeline":
        return <TimelineView />;
      case "communications":
        return <CommunicationsView />;
      case "card-generator":
        return <CardGeneratorView />;
      case "publishing":
        return <PublishingCentralView />;
      case "crisis-room":
        return <CrisisRoomView />;
      case "history":
        return <HistoryView />;
      case "templates":
        return <TemplatesView />;
      case "phrases":
        return <PhrasesView />;
      case "catalog":
        return <CatalogView />;
      case "teams":
        return <TeamsView />;
      case "reports":
        return <ReportsView />;
      case "ai-assistant":
        return <AiAssistantView />;
      case "audit":
        return <AuditView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="main-content">
        <Header onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />
        <main className="page-body">
          <Suspense fallback={<LoadingFallback />}>
            {renderTabContent()}
          </Suspense>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <IncidentProvider>
      <MainLayout />
    </IncidentProvider>
  );
}

