/**
 * PROJECT MODAL
 * Formulaire création/édition projet
 */

import React, { useState } from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Select } from '@/shared/components/ui/Select';
import { Button } from '@/shared/components/ui/Button';
import { Check } from 'lucide-react';

const CATEGORIES = [
  { value: 'IT', label: 'IT' },
  { value: 'Digital', label: 'Digital' },
  { value: 'Sécurité', label: 'Sécurité' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data', label: 'Data' },
  { value: 'CRM', label: 'CRM' },
  { value: 'ERP', label: 'ERP' },
  { value: 'Infrastructure', label: 'Infrastructure' },
];

const PRIORITIES = [
  { value: 'low', label: 'Basse' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'high', label: 'Haute' },
  { value: 'critical', label: 'Critique' },
];

export default function ProjectModal({ isOpen, onClose, onSubmit, project = null }) {
  const [formData, setFormData] = useState(project || {
    name: '',
    code: '',
    description: '',
    category: 'IT',
    priority: 'medium',
    status: 'planning',
    budget: '',
    start_date: '',
    end_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Le nom et le code sont obligatoires');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Éditer le projet' : 'Nouveau projet'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du projet <span className="text-red-400">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Migration Cloud Azure"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code <span className="text-red-400">*</span>
            </label>
            <Input
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="Ex: AZ-001"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description du projet..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
            <Select
              value={formData.category}
              onChange={(value) => handleChange('category', value)}
              options={CATEGORIES}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priorité</label>
            <Select
              value={formData.priority}
              onChange={(value) => handleChange('priority', value)}
              options={PRIORITIES}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Budget (€)</label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="450000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date début</label>
            <Input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date fin</label>
            <Input
              type="date"
              value={formData.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" variant="primary" className="flex-1 gap-2">
            <Check size={16} />
            {project ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
