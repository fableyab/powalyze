import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, DollarSign, AlertTriangle, Target, TrendingUp,
  BarChart3, Filter, Download
} from 'lucide-react';
import { portfolioSegments, portfolioProjects, getPortfolioKPIs } from '../data/portfolioData';

const PortfolioOverview = () => {
  const kpis = getPortfolioKPIs();
  const [selectedSegment, setSelectedSegment] = useState('ALL');

  const filteredProjects = selectedSegment === 'ALL' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.segment === selectedSegment);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="portfolio-layout">
      {/* Header */}
      <header className="portfolio-header">
        <div className="header-titles">
          <h1 className="header-title">Portfolio Overview</h1>
          <p className="header-subtitle">
            Vue exécutive instantanée de votre portefeuille de projets stratégiques
          </p>
        </div>

        <div className="header-actions">
          <Link to="/app/portfolio/analytics" className="btn-secondary">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Link>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="kpi-grid-5">
        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(0, 102, 255, 0.1)' }}>
            <Briefcase className="w-5 h-5 text-[#4A9EFF]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Active Projects</div>
            <div className="kpi-value">{kpis.activeProjects}</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}>
            <DollarSign className="w-5 h-5 text-[#FFD700]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Portfolio Value</div>
            <div className="kpi-value">{formatCurrency(kpis.portfolioValue)}</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(255, 0, 102, 0.1)' }}>
            <AlertTriangle className="w-5 h-5 text-[#FF0066]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Critical Projects</div>
            <div className="kpi-value">{kpis.criticalProjects}</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)' }}>
            <Target className="w-5 h-5 text-[#00FF88]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Strategic Alignment</div>
            <div className="kpi-value">{kpis.avgAlignment}/10</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(255, 107, 0, 0.1)' }}>
            <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Risk Exposure</div>
            <div className="kpi-value">{kpis.avgRisk}/10</div>
          </div>
        </div>
      </section>

      {/* Portfolio Segments */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Portfolio Segments</h2>
        </div>

        <div className="segment-grid">
          {portfolioSegments.map((segment) => {
            const segmentProjects = portfolioProjects.filter(p => p.segment === segment.id);
            const segmentBudget = segmentProjects.reduce((sum, p) => sum + p.budget, 0);

            return (
              <Link
                key={segment.id}
                to={`/app/portfolio/${segment.id}`}
                className="segment-card"
                style={{ borderColor: segment.color }}
              >
                <div className="segment-header">
                  <span className="segment-icon">{segment.icon}</span>
                  <span 
                    className="segment-badge"
                    style={{ backgroundColor: `${segment.color}20`, color: segment.color }}
                  >
                    {segmentProjects.length} projects
                  </span>
                </div>
                <h3 className="segment-name">{segment.name}</h3>
                <div className="segment-budget">{formatCurrency(segmentBudget)}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Portfolio Map (2x2) */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Portfolio Map — Value vs Risk</h2>
          <p className="card-subtitle">Taille = Budget | Couleur = Statut</p>
        </div>

        <div className="portfolio-map">
          {/* Axes labels */}
          <div className="map-label map-label-y">HIGH VALUE</div>
          <div className="map-label map-label-y-bottom">LOW VALUE</div>
          <div className="map-label map-label-x">LOW RISK</div>
          <div className="map-label map-label-x-right">HIGH RISK</div>

          {/* Grid lines */}
          <div className="map-grid-line map-grid-h" style={{ top: '50%' }}></div>
          <div className="map-grid-line map-grid-v" style={{ left: '50%' }}></div>

          {/* Projects bubbles */}
          <div className="map-canvas">
            {portfolioProjects.map((project) => {
              const size = Math.sqrt(project.budget) / 1000 + 20;
              const left = (project.risk * 10) + '%';
              const bottom = (project.value * 10) + '%';
              
              let statusColor = '#4A9EFF';
              if (project.status === 'CRITICAL') statusColor = '#FF0066';
              else if (project.status === 'ON_HOLD') statusColor = '#FFD700';
              else if (project.status === 'COMPLETED') statusColor = '#00FF88';

              return (
                <Link
                  key={project.id}
                  to={`/app/projects/${project.id}`}
                  className="map-bubble"
                  style={{
                    width: size,
                    height: size,
                    left,
                    bottom,
                    backgroundColor: statusColor,
                  }}
                  title={`${project.name} — Value: ${project.value}/10, Risk: ${project.risk}/10`}
                >
                  <span className="bubble-label">{project.name.slice(0, 3)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Best Action */}
      <section className="nba-card">
        <div className="nba-header">
          <div className="nba-icon">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="nba-title">Next Best Action</h3>
            <p className="nba-subtitle">Recommandation IA globale</p>
          </div>
        </div>
        <p className="nba-content">
          <strong>Prioriser le Cloud Migration Program :</strong> Projet critique avec deadline imminente (31 janvier). 
          Valeur stratégique élevée (9.2/10) mais risque significatif (8.8/10). Recommandation : organiser une revue 
          exécutive urgente pour débloquer les ressources et sécuriser le planning.
        </p>
        <div className="nba-actions">
          <Link to="/app/projects/3" className="btn-primary">
            Open Project
          </Link>
          <button className="btn-secondary">Dismiss</button>
        </div>
      </section>

      {/* Portfolio Table */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Portfolio Projects</h2>
          <div className="filter-inline">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              className="filter-select-inline"
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="ALL">All Segments</option>
              {portfolioSegments.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Value</th>
                <th>Risk</th>
                <th>Alignment</th>
                <th>Deadline</th>
                <th>Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => {
                const segment = portfolioSegments.find(s => s.id === project.segment);
                
                return (
                  <tr key={project.id}>
                    <td className="font-semibold text-white">{project.name}</td>
                    <td>
                      <span 
                        className="badge"
                        style={{ 
                          backgroundColor: `${segment.color}20`, 
                          color: segment.color 
                        }}
                      >
                        {segment.icon} {segment.name}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${project.status.toLowerCase().replace('_', '-')}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="font-mono text-[#FFD700]">{formatCurrency(project.budget)}</td>
                    <td>
                      <span className="score-badge score-value">{project.value}/10</span>
                    </td>
                    <td>
                      <span className="score-badge score-risk">{project.risk}/10</span>
                    </td>
                    <td>
                      <span className="score-badge score-alignment">{project.alignment}/10</span>
                    </td>
                    <td className="text-slate-400">{project.deadline}</td>
                    <td className="text-slate-300">{project.owner}</td>
                    <td>
                      <Link to={`/app/projects/${project.id}`} className="btn-table">
                        Open
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PortfolioOverview;
