import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectsContext';
import { useDocuments } from '../../contexts/DocumentsContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Dashboard principal de l'espace client
 * Vue d'ensemble avec KPI et activité récente
 */
const Dashboard = () => {
  const { projects, getStats: getProjectStats } = useProjects();
  const { documents, getStats: getDocumentStats } = useDocuments();
  const { isMobile } = useResponsive();

  const projectStats = getProjectStats();
  const documentStats = getDocumentStats();

  // Projets récents (5 derniers)
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  // Documents récents (5 derniers)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Couleur du statut
  const getStatusColor = (status) => {
    const colors = {
      'en-cours': 'bg-blue-500',
      'termine': 'bg-green-500',
      'planification': 'bg-yellow-500',
      'en-pause': 'bg-orange-500',
      'annule': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Tableau de bord
        </h1>
        <p className="text-dark-300">
          Bienvenue sur votre espace Powalyze
        </p>
      </div>

      {/* KPI Cards */}
      <Card.Grid cols={{ xs: 1, sm: 2, lg: 4 }} gap="normal">
        <Card.Stat
          label="Projets actifs"
          value={projectStats.byStatus['en-cours'] || 0}
          icon={<span className="text-2xl">📊</span>}
          trend="up"
          trendValue="+2 ce mois"
          variant="elevated"
        />
        <Card.Stat
          label="Projets terminés"
          value={projectStats.byStatus['termine'] || 0}
          icon={<span className="text-2xl">✅</span>}
          variant="elevated"
        />
        <Card.Stat
          label="Documents"
          value={documentStats.total}
          icon={<span className="text-2xl">📄</span>}
          trend="up"
          trendValue={`+${recentDocuments.length} récents`}
          variant="elevated"
        />
        <Card.Stat
          label="Total projets"
          value={projectStats.total}
          icon={<span className="text-2xl">📁</span>}
          variant="elevated"
        />
      </Card.Grid>

      {/* Projets récents & Documents récents */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
        {/* Projets récents */}
        <Card
          title="Projets récents"
          padding="normal"
          footer={
            <Link to="/espace-client/projets">
              <Button variant="ghost" size="sm" fullWidth>
                Voir tous les projets →
              </Button>
            </Link>
          }
        >
          {recentProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark-300 mb-4">Aucun projet pour le moment</p>
              <Link to="/espace-client/projets/nouveau">
                <Button variant="primary">Créer un projet</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/espace-client/projets/${project.id}`}
                  className="block p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{project.name}</h4>
                    <span className={`px-2 py-0.5 ${getStatusColor(project.status)} text-white text-xs rounded-full`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-300">
                      Progression: {project.progress}%
                    </span>
                    <span className="text-dark-400 text-xs">
                      {formatDate(project.updatedAt)}
                    </span>
                  </div>
                  {/* Barre de progression */}
                  <div className="mt-2 w-full bg-dark-600 rounded-full h-1.5">
                    <div
                      className="bg-gold-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Documents récents */}
        <Card
          title="Documents récents"
          padding="normal"
          footer={
            <Link to="/espace-client/documents">
              <Button variant="ghost" size="sm" fullWidth>
                Voir tous les documents →
              </Button>
            </Link>
          }
        >
          {recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark-300 mb-4">Aucun document pour le moment</p>
              <Link to="/espace-client/documents">
                <Button variant="primary">Ajouter un document</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="text-xl">
                        {doc.type === 'pdf' ? '📕' :
                         doc.type === 'excel' ? '📊' :
                         doc.type === 'word' ? '📘' :
                         doc.type === 'image' ? '🖼️' : '📄'}
                      </span>
                      <h4 className="text-white text-sm font-medium truncate">
                        {doc.name}
                      </h4>
                    </div>
                    <span className="text-xs text-dark-400 ml-2 whitespace-nowrap">
                      v{doc.version}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-dark-300">
                    <span>{doc.category}</span>
                    <span>{formatDate(doc.uploadedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Actions rapides */}
      <Card title="Actions rapides" padding="normal">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-4 gap-4'}`}>
          <Link to="/espace-client/projets/nouveau">
            <Button variant="outline" fullWidth>
              <span className="mr-2">➕</span>
              Nouveau projet
            </Button>
          </Link>
          <Link to="/espace-client/documents">
            <Button variant="outline" fullWidth>
              <span className="mr-2">📤</span>
              Importer documents
            </Button>
          </Link>
          <Link to="/espace-client/power-bi">
            <Button variant="outline" fullWidth>
              <span className="mr-2">📈</span>
              Rapports Power BI
            </Button>
          </Link>
          <Link to="/espace-client/parametres">
            <Button variant="outline" fullWidth>
              <span className="mr-2">⚙️</span>
              Paramètres
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
