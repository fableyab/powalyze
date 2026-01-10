import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ProjectNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    status: 'IN_PROGRESS',
    deadline: '',
    budget: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create a new project in the database
    toast({
      title: 'Success',
      description: 'Project created successfully',
    });
    navigate('/app/projects');
  };

  return (
    <main className="project-edit-layout">
      <header className="project-edit-header">
        <div>
          <h1 className="header-title">New project</h1>
          <p className="header-subtitle">
            Créez un nouveau projet et positionnez-le immédiatement dans votre portefeuille.
          </p>
        </div>
        <Link to="/app/projects" className="btn-secondary">
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
            placeholder="Project name"
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
            placeholder="0"
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
            placeholder="Décrivez le contexte, les objectifs et les enjeux du projet."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary" type="submit">
          Create project
        </button>
      </form>
    </main>
  );
};

export default ProjectNew;
