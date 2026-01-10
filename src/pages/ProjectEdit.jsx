import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projectsData';
import { useToast } from '@/components/ui/use-toast';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const project = projects.find((p) => p.id === id);

  const [formData, setFormData] = useState({
    name: project?.name || '',
    status: project?.status || 'IN_PROGRESS',
    deadline: project?.deadline || '',
    budget: project?.budget || '',
    description: project?.description || '',
  });

  if (!project) {
    return (
      <main className="project-edit-layout">
        <div className="card">
          <p>Project not found.</p>
          <Link to="/app/projects" className="btn-primary">
            Back to list
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the database
    toast({
      title: 'Success',
      description: 'Project updated successfully',
    });
    navigate(`/app/projects/${id}`);
  };

  return (
    <main className="project-edit-layout">
      <header className="project-edit-header">
        <div>
          <h1 className="header-title">Edit project</h1>
          <p className="header-subtitle">
            Modifiez les informations clés pour refléter les derniers arbitrages et décisions.
          </p>
        </div>
        <Link to={`/app/projects/${project.id}`} className="btn-secondary">
          Cancel
        </Link>
      </header>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="form-input"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            className="form-input"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Budget</label>
          <input
            type="number"
            name="budget"
            className="form-input"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-input"
            rows={5}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary" type="submit">
          Save changes
        </button>
      </form>
    </main>
  );
};

export default ProjectEdit;
