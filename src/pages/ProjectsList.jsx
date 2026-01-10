import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('deadline');

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === 'budget') {
        return (b.budget || 0) - (a.budget || 0);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <main className="projects-layout">
      <header className="projects-header">
        <div className="header-titles">
          <h1 className="header-title">Projects overview</h1>
          <p className="header-subtitle">
            Suivez l'ensemble des projets actifs, identifiez les priorités et pilotez votre portefeuille avec précision.
          </p>
        </div>

        <div className="header-actions">
          <Link to="/app/projects/new" className="btn-primary">
            New project
          </Link>
          <Link to="/app/projects/kanban" className="btn-secondary">
            Kanban board
          </Link>
          <button className="btn-secondary">Export portfolio</button>
        </div>
      </header>

      <section className="filters-bar">
        <input
          type="text"
          className="filter-search"
          placeholder="Search projects…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">Status: All</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="deadline">Sort by: Deadline</option>
          <option value="budget">Sort by: Budget</option>
          <option value="status">Sort by: Status</option>
        </select>
      </section>

      <section className="card projects-table">
        <div className="card-header">
          <h2 className="card-title">Project list</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Budget</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>
                  <span className={`badge badge-${project.status.toLowerCase().replace('_', '-')}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
                <td>{project.deadline ?? '—'}</td>
                <td>{project.budget ? `$${project.budget.toLocaleString('en-US')}` : '—'}</td>
                <td>{project.owner}</td>
                <td>
                  <Link to={`/app/projects/${project.id}`} className="btn-table">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ProjectsList;
