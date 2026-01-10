import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Briefcase, BarChart3, Bell, 
  Users, MessageSquare, FileText, Settings, Plug 
} from 'lucide-react';

const DashboardNew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentActivity = [
    {
      project: "Cloud Migration Program",
      text: "Budget updated by CFO",
      badge: "Budget",
      badgeType: "warning",
      time: "12 min ago"
    },
    {
      project: "AI Customer Insights",
      text: "Phase 2 approved",
      badge: "Value",
      badgeType: "positive",
      time: "43 min ago"
    },
    {
      project: "ERP Modernization",
      text: "Risk status downgraded to Medium",
      badge: "Risk",
      badgeType: "neutral",
      time: "Today · 09:24"
    },
    {
      project: "Portfolio Governance",
      text: "Executive review scheduled",
      badge: "Governance",
      badgeType: "neutral",
      time: "Yesterday"
    }
  ];

  return (
    <main className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">P</span>
          <span className="logo-text">Powalyze</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-label">Pilotage</div>
            <div className="sidebar-link sidebar-link-active" onClick={() => navigate('/app/dashboard')}>
              <LayoutDashboard className="w-4 h-4 inline mr-2" />
              Dashboard
            </div>
            <div className="sidebar-link" onClick={() => navigate('/app/portfolio')}>
              <FolderKanban className="w-4 h-4 inline mr-2" />
              Portfolio
            </div>
            <div className="sidebar-link" onClick={() => navigate('/app/projects')}>
              <Briefcase className="w-4 h-4 inline mr-2" />
              Projects
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Analyse</div>
            <div className="sidebar-link" onClick={() => navigate('/app/alerts')}>
              <Bell className="w-4 h-4 inline mr-2" />
              Alerts
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Collaboration</div>
            <div className="sidebar-link" onClick={() => navigate('/app/team')}>
              <Users className="w-4 h-4 inline mr-2" />
              Team
            </div>
            <div className="sidebar-link" onClick={() => navigate('/app/messages')}>
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Messages
            </div>
            <div className="sidebar-link" onClick={() => navigate('/app/documents')}>
              <FileText className="w-4 h-4 inline mr-2" />
              Documents
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Administration</div>
            <div className="sidebar-link" onClick={() => navigate('/app/settings')}>
              <Settings className="w-4 h-4 inline mr-2" />
              Settings
            </div>
            <div className="sidebar-link" onClick={() => navigate('/app/integrations')}>
              <Plug className="w-4 h-4 inline mr-2" />
              Integrations
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-header">
          <div className="header-titles">
            <h1 className="header-title">Executive Portfolio Dashboard</h1>
            <p className="header-subtitle">
              Powalyze analyse 27 projets actifs. Votre portefeuille est performant, avec un alignement stratégique élevé
              et un risque global faible.
            </p>
          </div>

          <div className="header-user">
            <div className="user-meta">
              <span className="user-label">Connected as</span>
              <span className="user-name">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
            </div>
            <button className="user-cta">Switch portfolio</button>
          </div>
        </header>

        {/* Executive ribbon */}
        <section className="executive-ribbon">
          <div className="ribbon-item">
            <span className="ribbon-label">Current quarter</span>
            <span className="ribbon-value">Q1 2026</span>
          </div>
          <div className="ribbon-item">
            <span className="ribbon-label">Active projects</span>
            <span className="ribbon-value">27</span>
          </div>
          <div className="ribbon-item">
            <span className="ribbon-label">Critical projects</span>
            <span className="ribbon-value ribbon-warning">3</span>
          </div>
          <div className="ribbon-item">
            <span className="ribbon-label">Next portfolio review</span>
            <span className="ribbon-value">12 January 2026</span>
          </div>
        </section>

        {/* Strategic overview + Next best action */}
        <section className="overview-grid">
          <div className="card strategic-overview">
            <div className="card-header">
              <h2 className="card-title">Strategic overview</h2>
              <span className="card-badge">Q1 2026</span>
            </div>
            <p className="card-lead">
              Votre portefeuille est en trajectoire optimale, avec une marge d'optimisation sur l'allocation budgétaire
              et les projets IA.
            </p>

            <div className="kpi-grid">
              <button className="kpi-card">
                <div className="kpi-label">Strategic alignment</div>
                <div className="kpi-value">94%</div>
                <div className="kpi-trend kpi-trend-positive">+2% vs last quarter</div>
              </button>

              <button className="kpi-card">
                <div className="kpi-label">Budget utilization</div>
                <div className="kpi-value">88%</div>
                <div className="kpi-trend kpi-trend-neutral">+5% vs plan</div>
              </button>

              <button className="kpi-card">
                <div className="kpi-label">Risk exposure</div>
                <div className="kpi-value">Low</div>
                <div className="kpi-trend kpi-trend-stable">Stable</div>
              </button>

              <button className="kpi-card">
                <div className="kpi-label">Portfolio health</div>
                <div className="kpi-value">9.0 / 10</div>
                <div className="kpi-trend kpi-trend-positive">+0.2 vs last quarter</div>
              </button>
            </div>
          </div>

          <div className="card next-best-action">
            <div className="card-header">
              <h2 className="card-title">Next best action</h2>
            </div>
            <p className="card-lead">
              Valider le budget du programme <strong>Cloud Migration</strong> avant le 12 janvier pour maintenir la
              trajectoire de valeur.
            </p>
            <div className="nba-actions">
              <button className="btn-primary" onClick={() => navigate('/app/portfolio')}>
                Open Cloud Migration program
              </button>
              <button className="btn-ghost" onClick={() => navigate('/app/portfolio')}>
                View financial impact
              </button>
            </div>
          </div>
        </section>

        {/* Actionable recommendations */}
        <section className="card recommendations">
          <div className="card-header">
            <h2 className="card-title">AI-powered portfolio recommendations</h2>
            <span className="card-meta">Updated 5 minutes ago</span>
          </div>

          <div className="recommendations-grid">
            <article className="recommendation-card">
              <div className="recommendation-header">
                <span className="recommendation-label">Investment focus</span>
                <span className="recommendation-pill recommendation-pill-positive">Opportunity</span>
              </div>
              <h3 className="recommendation-title">Increase allocation on AI initiatives</h3>
              <p className="recommendation-text">
                Les projets IA présentent un ROI projeté supérieur à la moyenne du portefeuille. Renforcer leur
                financement permettrait d'augmenter la valeur globale à court terme.
              </p>
              <div className="recommendation-footer">
                <button className="btn-outline" onClick={() => navigate('/app/projects')}>
                  View AI projects
                </button>
                <span className="recommendation-meta">Impact: High · Effort: Medium</span>
              </div>
            </article>

            <article className="recommendation-card">
              <div className="recommendation-header">
                <span className="recommendation-label">Budget control</span>
                <span className="recommendation-pill recommendation-pill-warning">Watch</span>
              </div>
              <h3 className="recommendation-title">Monitor Cloud Migration budget</h3>
              <p className="recommendation-text">
                Le programme Cloud Migration consomme le budget plus rapidement que prévu, sans dérive critique à ce
                stade. Une revue ciblée évite un dépassement en fin de trimestre.
              </p>
              <div className="recommendation-footer">
                <button className="btn-outline" onClick={() => navigate('/app/portfolio')}>
                  Open budget view
                </button>
                <span className="recommendation-meta">Impact: Medium · Effort: Low</span>
              </div>
            </article>

            <article className="recommendation-card">
              <div className="recommendation-header">
                <span className="recommendation-label">Governance</span>
                <span className="recommendation-pill recommendation-pill-neutral">Routine</span>
              </div>
              <h3 className="recommendation-title">Plan an executive portfolio review</h3>
              <p className="recommendation-text">
                Une revue exécutive structurée permet de valider les arbitrages clés, d'aligner les sponsors et de
                sécuriser les engagements pour le trimestre suivant.
              </p>
              <div className="recommendation-footer">
                <button className="btn-outline" onClick={() => navigate('/app/calendar')}>
                  Schedule review session
                </button>
                <span className="recommendation-meta">Impact: High · Effort: Low</span>
              </div>
            </article>
          </div>
        </section>

        {/* Portfolio stats + activity */}
        <section className="lower-grid">
          <div className="card portfolio-stats">
            <div className="card-header">
              <h2 className="card-title">Portfolio key figures</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total projects</div>
                <div className="stat-value">42</div>
                <div className="stat-meta stat-meta-positive">+3 vs last month</div>
                <button className="stat-cta" onClick={() => navigate('/app/portfolio')}>
                  Open portfolio
                </button>
              </div>

              <div className="stat-card">
                <div className="stat-label">Open tasks</div>
                <div className="stat-value">386</div>
                <div className="stat-meta stat-meta-neutral">+12 vs last week</div>
                <button className="stat-cta" onClick={() => navigate('/app/tasks')}>
                  View tasks
                </button>
              </div>

              <div className="stat-card">
                <div className="stat-label">Documents</div>
                <div className="stat-value">129</div>
                <div className="stat-meta stat-meta-neutral">Audit-ready</div>
                <button className="stat-cta" onClick={() => navigate('/app/documents')}>
                  Browse documents
                </button>
              </div>

              <div className="stat-card">
                <div className="stat-label">Messages</div>
                <div className="stat-value">58</div>
                <div className="stat-meta stat-meta-warning">3 require attention</div>
                <button className="stat-cta" onClick={() => navigate('/app/messages')}>
                  Open inbox
                </button>
              </div>
            </div>
          </div>

          <div className="card recent-activity">
            <div className="card-header">
              <h2 className="card-title">Recent portfolio activity</h2>
            </div>
            <ul className="activity-list">
              {recentActivity.map((activity, idx) => (
                <li key={idx} className="activity-item">
                  <div className="activity-main">
                    <span className="activity-project">{activity.project}</span>
                    <span className="activity-text">{activity.text}</span>
                  </div>
                  <div className="activity-meta">
                    <span className={`activity-badge activity-badge-${activity.badgeType}`}>
                      {activity.badge}
                    </span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
};

export default DashboardNew;
