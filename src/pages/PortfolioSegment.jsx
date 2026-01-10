import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, DollarSign, TrendingUp, Target, AlertTriangle } from 'lucide-react';
import { portfolioSegments, getSegmentProjects, getSegmentStats } from '../data/portfolioData';

const PortfolioSegment = () => {
  const { segment: segmentId } = useParams();
  const segment = portfolioSegments.find(s => s.id === segmentId);
  const projects = getSegmentProjects(segmentId);
  const stats = getSegmentStats(segmentId);

  if (!segment) {
    return (
      <main className="portfolio-layout">
        <div className="card">
          <p>Segment not found.</p>
          <Link to="/app/portfolio" className="btn-primary">Back to Portfolio</Link>
        </div>
      </main>
    );
  }

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
          <div className="flex items-center gap-4">
            <Link to="/app/portfolio" className="back-button">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{segment.icon}</span>
                <h1 className="header-title">{segment.name}</h1>
              </div>
              <p className="header-subtitle">
                Vue détaillée de ce segment de portefeuille
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Segment KPIs */}
      <section className="kpi-grid-5">
        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(0, 102, 255, 0.1)' }}>
            <Briefcase className="w-5 h-5 text-[#4A9EFF]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Projects</div>
            <div className="kpi-value">{stats.count}</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}>
            <DollarSign className="w-5 h-5 text-[#FFD700]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Total Budget</div>
            <div className="kpi-value">{formatCurrency(stats.totalBudget)}</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)' }}>
            <TrendingUp className="w-5 h-5 text-[#00FF88]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Avg Value</div>
            <div className="kpi-value">{stats.avgValue}/10</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(255, 107, 0, 0.1)' }}>
            <AlertTriangle className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Avg Risk</div>
            <div className="kpi-value">{stats.avgRisk}/10</div>
          </div>
        </div>

        <div className="kpi-card-premium">
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)' }}>
            <Target className="w-5 h-5 text-[#00D4FF]" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Avg Alignment</div>
            <div className="kpi-value">{stats.avgAlignment}/10</div>
          </div>
        </div>
      </section>

      {/* Segment Map */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Segment Map — Value vs Risk</h2>
          <p className="card-subtitle">Projects in {segment.name}</p>
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
            {projects.map((project) => {
              const size = Math.sqrt(project.budget) / 1000 + 30;
              const left = (project.risk * 10) + '%';
              const bottom = (project.value * 10) + '%';
              
              let statusColor = segment.color;
              if (project.status === 'CRITICAL') statusColor = '#FF0066';
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

      {/* Projects in Segment */}
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Projects in this Segment</h2>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
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
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="font-semibold text-white">{project.name}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PortfolioSegment;
