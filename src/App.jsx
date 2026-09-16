import React from "react";
import { IncidentProvider, useIncidentContext } from "./context/IncidentContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";

import { DashboardView } from "./components/dashboard/DashboardView";
import { IncidentsView } from "./components/incidents/IncidentsView";
import { IncidentWizardModal } from "./components/incidents/IncidentWizardModal";
import { IncidentDetailView } from "./components/incidents/IncidentDetailView";
import { TimelineView } from "./components/timeline/TimelineView";
import { CommunicationsView } from "./components/communications/CommunicationsView";
import { CardGeneratorView } from "./components/cardGenerator/CardGeneratorView";
import { PublishingCentralView } from "./components/publishing/PublishingCentralView";
import { CrisisRoomView } from "./components/crisis/CrisisRoomView";
import { HistoryView } from "./components/history/HistoryView";
import { TemplatesView } from "./components/templates/TemplatesView";
import { PhrasesView } from "./components/phrases/PhrasesView";
import { CatalogView } from "./components/catalog/CatalogView";
import { TeamsView } from "./components/teams/TeamsView";
import { ReportsView } from "./components/reports/ReportsView";
import { AiAssistantView } from "./components/ai/AiAssistantView";
import { AuditView } from "./components/audit/AuditView";
import { SettingsView } from "./components/settings/SettingsView";

import { MobileBottomNav } from "./components/layout/MobileBottomNav";

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
          {renderTabContent()}
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
