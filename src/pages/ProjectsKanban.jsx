import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

const ProjectsKanban = () => {
  const columns = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    REVIEW: 'Review',
    DONE: 'Completed',
  };

  return (
    <main className="kanban-layout">
      <header className="kanban-header">
        <div>
          <h1 className="header-title">Kanban board</h1>
          <p className="header-subtitle">
            Visualisez l'avancement des projets par statut et facilitez les arbitrages au fil de l'eau.
          </p>
        </div>
        <Link to="/app/projects" className="btn-secondary">
          Back to list
        </Link>
      </header>

      <section className="kanban-grid">
        {Object.entries(columns).map(([key, label]) => (
          <div key={key} className="kanban-column">
            <h2 className="kanban-title">{label}</h2>
            <div className="kanban-column-body">
              {projects
                .filter((p) => p.column === key)
                .map((project) => (
                  <Link
                    key={project.id}
                    to={`/app/projects/${project.id}`}
                    className="kanban-card"
                  >
                    <div className="kanban-card-title">{project.name}</div>
                    <div className="kanban-card-meta">
                      <span>{project.owner}</span>
                      {project.deadline && <span>{project.deadline}</span>}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProjectsKanban;
