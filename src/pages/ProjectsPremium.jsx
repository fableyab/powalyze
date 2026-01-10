import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

const ProjectsPremium = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Projects overview
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Suivez l'ensemble des projets actifs, identifiez les priorités et pilotez votre portefeuille.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link 
            to="/app/projects/new" 
            className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
          >
            New project
          </Link>
          <Link 
            to="/app/projects/kanban" 
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Kanban board
          </Link>
        </div>
      </header>

      {/* Filters */}
      <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 md:max-w-md"
        />

        <select 
          className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">Status: All</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </section>

      {/* Table */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Project list ({filteredProjects.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
                <th className="py-2">Project</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Budget</th>
                <th>Owner</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="py-3 font-medium text-slate-900">{project.name}</td>
                  <td>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      project.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700' :
                      project.status === 'CRITICAL' ? 'bg-red-50 text-red-700' :
                      project.status === 'ON_HOLD' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{project.deadline ?? '—'}</td>
                  <td>${project.budget?.toLocaleString('en-US') ?? '—'}</td>
                  <td>{project.owner}</td>
                  <td>
                    <Link 
                      to={`/app/projects/${project.id}`} 
                      className="text-xs font-medium text-slate-900 hover:underline"
                    >
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

export default ProjectsPremium;
