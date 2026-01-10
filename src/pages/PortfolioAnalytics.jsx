import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { portfolioSegments, portfolioProjects } from '../data/portfolioData';

const PortfolioAnalytics = () => {
  // Value Distribution by Category
  const valueDistribution = portfolioSegments.map(segment => {
    const projects = portfolioProjects.filter(p => p.segment === segment.id);
    const totalValue = projects.reduce((sum, p) => sum + (p.value * p.budget / 10), 0);
    return {
      name: segment.name,
      value: Math.round(totalValue / 1000000),
      color: segment.color,
    };
  });

  // Budget Allocation
  const budgetAllocation = portfolioSegments.map(segment => {
    const projects = portfolioProjects.filter(p => p.segment === segment.id);
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    return {
      name: segment.name,
      budget: Math.round(totalBudget / 1000000),
      color: segment.color,
    };
  });

  // Risk Heatmap Data
  const riskHeatmap = [
    { risk: 'High', impact: 'High', count: portfolioProjects.filter(p => p.risk > 7 && p.value > 7).length },
    { risk: 'High', impact: 'Med', count: portfolioProjects.filter(p => p.risk > 7 && p.value >= 4 && p.value <= 7).length },
    { risk: 'High', impact: 'Low', count: portfolioProjects.filter(p => p.risk > 7 && p.value < 4).length },
    { risk: 'Med', impact: 'High', count: portfolioProjects.filter(p => p.risk >= 4 && p.risk <= 7 && p.value > 7).length },
    { risk: 'Med', impact: 'Med', count: portfolioProjects.filter(p => p.risk >= 4 && p.risk <= 7 && p.value >= 4 && p.value <= 7).length },
    { risk: 'Med', impact: 'Low', count: portfolioProjects.filter(p => p.risk >= 4 && p.risk <= 7 && p.value < 4).length },
    { risk: 'Low', impact: 'High', count: portfolioProjects.filter(p => p.risk < 4 && p.value > 7).length },
    { risk: 'Low', impact: 'Med', count: portfolioProjects.filter(p => p.risk < 4 && p.value >= 4 && p.value <= 7).length },
    { risk: 'Low', impact: 'Low', count: portfolioProjects.filter(p => p.risk < 4 && p.value < 4).length },
  ];

  // Strategic Alignment Radar
  const alignmentData = [
    { axis: 'Innovation', value: 7.5 },
    { axis: 'Digital Transform', value: 8.8 },
    { axis: 'Customer Focus', value: 8.2 },
    { axis: 'Operational Excellence', value: 6.5 },
    { axis: 'Financial Performance', value: 7.8 },
    { axis: 'Sustainability', value: 6.0 },
  ];

  // Timeline Data (projects by quarter)
  const timelineData = [
    { quarter: 'Q1 2026', projects: portfolioProjects.filter(p => p.deadline && p.deadline <= '2026-03-31').length },
    { quarter: 'Q2 2026', projects: portfolioProjects.filter(p => p.deadline && p.deadline > '2026-03-31' && p.deadline <= '2026-06-30').length },
    { quarter: 'Q3 2026', projects: portfolioProjects.filter(p => p.deadline && p.deadline > '2026-06-30' && p.deadline <= '2026-09-30').length },
    { quarter: 'Q4 2026', projects: portfolioProjects.filter(p => p.deadline && p.deadline > '2026-09-30').length },
  ];

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
              <h1 className="header-title">Portfolio Analytics</h1>
              <p className="header-subtitle">
                Vision macro, comparative et visuelle de votre portefeuille
              </p>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn-secondary">
            <TrendingUp className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </header>

      {/* Charts Grid */}
      <div className="analytics-grid">
        {/* Value Distribution */}
        <section className="card analytics-card">
          <h2 className="card-title">Value Distribution by Segment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={valueDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: $${entry.value}M`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {valueDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/* Budget Allocation */}
        <section className="card analytics-card">
          <h2 className="card-title">Budget Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetAllocation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: '1px solid #333' }}
                formatter={(value) => [`$${value}M`, 'Budget']}
              />
              <Bar dataKey="budget" radius={[8, 8, 0, 0]}>
                {budgetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Risk Heatmap */}
        <section className="card analytics-card-wide">
          <h2 className="card-title">Risk Heatmap — Probability × Impact</h2>
          <div className="heatmap-grid">
            <div className="heatmap-label heatmap-label-y">High Impact</div>
            <div className="heatmap-label heatmap-label-y" style={{ top: '40%' }}>Med Impact</div>
            <div className="heatmap-label heatmap-label-y" style={{ top: '73%' }}>Low Impact</div>
            
            <div className="heatmap-label heatmap-label-x" style={{ left: '20%' }}>Low Risk</div>
            <div className="heatmap-label heatmap-label-x" style={{ left: '48%' }}>Med Risk</div>
            <div className="heatmap-label heatmap-label-x" style={{ left: '76%' }}>High Risk</div>

            {riskHeatmap.map((cell, idx) => {
              let color = '#00FF88';
              if (cell.risk === 'Med' && cell.impact === 'High') color = '#FFD700';
              if (cell.risk === 'High' && cell.impact === 'Med') color = '#FFD700';
              if (cell.risk === 'High' && cell.impact === 'High') color = '#FF0066';
              if (cell.risk === 'Med' && cell.impact === 'Med') color = '#FF6B00';

              const row = cell.impact === 'High' ? 0 : cell.impact === 'Med' ? 1 : 2;
              const col = cell.risk === 'Low' ? 0 : cell.risk === 'Med' ? 1 : 2;

              return (
                <div
                  key={idx}
                  className="heatmap-cell"
                  style={{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                    backgroundColor: `${color}30`,
                    borderColor: color,
                  }}
                >
                  <span className="heatmap-count" style={{ color }}>{cell.count}</span>
                  <span className="heatmap-label-mini">projects</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Strategic Alignment Radar */}
        <section className="card analytics-card">
          <h2 className="card-title">Strategic Alignment Radar</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={alignmentData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="axis" stroke="#888" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#888" />
              <Radar
                name="Alignment Score"
                dataKey="value"
                stroke="#4A9EFF"
                fill="#4A9EFF"
                fillOpacity={0.3}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: '1px solid #333' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </section>

        {/* Timeline */}
        <section className="card analytics-card">
          <h2 className="card-title">Project Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="quarter" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: '1px solid #333' }}
                formatter={(value) => [`${value} projects`, 'Timeline']}
              />
              <Bar dataKey="projects" fill="#4A9EFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </main>
  );
};

export default PortfolioAnalytics;
