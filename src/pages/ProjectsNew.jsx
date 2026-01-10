import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Share2, Search, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ProjectsPageNew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load projects" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => 
        (p.status || '').toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'budget':
        filtered.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'status':
        filtered.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
        break;
      case 'deadline':
      default:
        filtered.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, sortBy]);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'badge-progress';
      case 'completed':
        return 'badge-completed';
      case 'on hold':
        return 'badge-hold';
      case 'critical':
        return 'badge-critical';
      default:
        return 'badge-progress';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const criticalCount = projects.filter(p => p.status?.toLowerCase() === 'critical').length;
  const totalValue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

  return (
    <main className="projects-layout">
      {/* Header */}
      <header className="projects-header">
        <div className="header-titles">
          <h1 className="header-title">Projects overview</h1>
          <p className="header-subtitle">
            Suivez l'ensemble des projets actifs, identifiez les priorités et pilotez votre portefeuille avec précision.
          </p>
        </div>

        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => toast({ title: "Exporting...", description: "Portfolio export is being prepared." })}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export portfolio
          </button>
          <button 
            className="btn-secondary"
            onClick={() => toast({ title: "Sharing...", description: "Share view with your team." })}
          >
            <Share2 className="w-4 h-4 inline mr-2" />
            Share view
          </button>
          <button 
            className="btn-primary"
            onClick={() => navigate('/app/projects')}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            New project
          </button>
        </div>
      </header>

      {/* Executive ribbon */}
      <section className="executive-ribbon">
        <div className="ribbon-item">
          <span className="ribbon-label">Active projects</span>
          <span className="ribbon-value">{projects.length}</span>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-label">Critical</span>
          <span className="ribbon-value ribbon-warning">{criticalCount}</span>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-label">Portfolio value</span>
          <span className="ribbon-value">{formatCurrency(totalValue)}</span>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-label">Next review</span>
          <span className="ribbon-value">12 January 2026</span>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-bar">
        <div className="filter-search-wrapper" style={{ flex: 1, minWidth: '200px' }}>
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" style={{ pointerEvents: 'none' }} />
          <input 
            type="text" 
            className="filter-search" 
            placeholder="Search projects…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px' }}
          />
        </div>
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Status: All</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on hold">On Hold</option>
          <option value="critical">Critical</option>
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

      {/* Projects table */}
      <section className="card projects-table">
        <div className="card-header">
          <h2 className="card-title">Project list ({filteredProjects.length})</h2>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No projects found</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Budget</th>
                <th>Owner</th>
                <th style={{ width: '80px', textAlign: 'center' }}></th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="font-medium">{project.name}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                      {project.status || 'In Progress'}
                    </span>
                  </td>
                  <td>{formatDate(project.deadline)}</td>
                  <td>{formatCurrency(project.budget)}</td>
                  <td>{project.owner || '—'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn-table"
                      onClick={() => navigate(`/app/projects/${project.id}`)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default ProjectsPageNew;
