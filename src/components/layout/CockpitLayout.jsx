/**
 * CockpitLayout - Conteneur simple pour les pages /app/*
 * La navigation (Sidebar + Topbar) est gérée par DesktopLayoutWrapper dans App.jsx
 * Ce composant ne fait que wrapper le contenu pour éviter la duplication
 */
export default function CockpitLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
