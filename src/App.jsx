import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages Client
import Dashboard from './pages/client/Dashboard';
import Projects from './pages/client/Projects';
import Documents from './pages/client/Documents';
import PowerBI from './pages/client/PowerBI';
import PowerBIComplete from './pages/client/PowerBIComplete';
import Tasks from './pages/client/Tasks';

// Pages Admin
import AdminClients from './pages/admin/Clients';
import AdminUsers from './pages/admin/Users';

// Placeholder pages
const Home = () => (
  <div className="min-h-screen bg-dark-primary flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Powalyze</h1>
      <p className="text-dark-300 mb-6">Plateforme de gestion de projets professionnelle</p>
      <a href="/espace-client" className="inline-block px-6 py-3 bg-gold-primary text-dark-primary font-semibold rounded-lg hover:bg-gold-secondary transition-colors">
        Accéder à l'espace client
      </a>
    </div>
  </div>
);

const Login = () => (
  <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
    <div className="bg-dark-800 p-8 rounded-lg shadow-2xl max-w-md w-full border border-dark-700">
      <h1 className="text-2xl font-bold text-white mb-6">Connexion</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-dark-200 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label className="block text-dark-200 mb-2">Mot de passe</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gold-primary text-dark-primary font-semibold rounded-lg hover:bg-gold-secondary transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
);

// Layout pour les pages avec Header/Footer
const PageLayout = ({ children }) => (
  <div className="min-h-screen bg-dark-primary flex flex-col">
    <Header isAuthenticated={true} user={{ firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@demo.com', role: 'responsible' }} />
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {children}
    </main>
    <Footer />
  </div>
);

// Layout Admin
const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-dark-primary flex flex-col">
    <Header isAuthenticated={true} user={{ firstName: 'Admin', lastName: 'Powalyze', email: 'admin@powalyze.com', role: 'powalyze-admin' }} />
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/demo" element={<Navigate to="/espace-client" replace />} />

      {/* Espace Client (Responsable + Partenaires) */}
      <Route path="/espace-client" element={<PageLayout><Dashboard /></PageLayout>} />
      <Route path="/espace-client/projets" element={<PageLayout><Projects /></PageLayout>} />
      <Route path="/espace-client/documents" element={<PageLayout><Documents /></PageLayout>} />
      <Route path="/espace-client/power-bi" element={<PageLayout><PowerBIComplete /></PageLayout>} />
      <Route path="/espace-client/power-bi-simple" element={<PageLayout><PowerBI /></PageLayout>} />
      <Route path="/espace-client/taches" element={<PageLayout><Tasks /></PageLayout>} />
      
      {/* Redirects legacy */}
      <Route path="/espace-client/parametres" element={<Navigate to="/espace-client" replace />} />
      <Route path="/espace-client/projets/nouveau" element={<Navigate to="/espace-client/projets" replace />} />

      {/* Espace Admin (Powalyze) */}
      <Route path="/admin" element={<Navigate to="/admin/clients" replace />} />
      <Route path="/admin/clients" element={<AdminLayout><AdminClients /></AdminLayout>} />
      <Route path="/admin/utilisateurs" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/clients/:clientId" element={<AdminLayout><div className="text-white">Client Detail (à créer)</div></AdminLayout>} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
