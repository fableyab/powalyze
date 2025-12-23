import React, { useState } from 'react';
import { FiCheckSquare, FiSquare, FiPlus, FiCalendar, FiAlertCircle, FiFilter } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminTachesPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revue architecture cloud', project: 'Migration Azure', assignee: 'Marie Dubois', priority: 'Critique', status: 'todo', dueDate: '2025-12-26' },
    { id: 2, title: 'Tests intégration paiement', project: 'E-commerce B2B', assignee: 'Thomas Martin', priority: 'Haute', status: 'in-progress', dueDate: '2025-12-28' },
    { id: 3, title: 'Audit sécurité infrastructure', project: 'ISO 27001', assignee: 'Sophie Laurent', priority: 'Critique', status: 'todo', dueDate: '2025-12-24' },
    { id: 4, title: 'Design maquettes mobile', project: 'App Mobile B2C', assignee: 'Lucas Bernard', priority: 'Moyenne', status: 'in-progress', dueDate: '2025-12-30' },
    { id: 5, title: 'Configuration pipelines CI/CD', project: 'DevOps CI/CD', assignee: 'Hugo Moreau', priority: 'Haute', status: 'done', dueDate: '2025-12-20' },
    { id: 6, title: 'Analyse données ventes Q4', project: 'Data Warehouse', assignee: 'Emma Petit', priority: 'Moyenne', status: 'in-progress', dueDate: '2025-12-29' },
    { id: 7, title: 'Migration base de données', project: 'Migration Azure', assignee: 'Marie Dubois', priority: 'Critique', status: 'todo', dueDate: '2025-12-25' },
    { id: 8, title: 'Tests charge serveur', project: 'E-commerce B2B', assignee: 'Thomas Martin', priority: 'Haute', status: 'todo', dueDate: '2025-12-29' },
  ]);

  const stats = {
    total: tasks.length,
    critical: tasks.filter(t => t.priority === 'Critique' && t.status !== 'done').length,
    late: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Supervision Tâches</h1>
          <p className="text-gray-400">Vue globale et gestion de toutes les tâches</p>
        </div>
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all">
          <FiPlus size={20} />
          Nouvelle Tâche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
          <div className="text-sm text-gray-400">Total Tâches</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-red-400 mb-1">{stats.critical}</div>
          <div className="text-sm text-gray-400">Critiques</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-orange-400 mb-1">{stats.late}</div>
          <div className="text-sm text-gray-400">En Retard</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-blue-400 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-gray-400">En Cours</div>
        </Card>
      </div>

      <Card className="bg-[#111] border-white/10 p-4">
        <div className="flex items-center gap-4">
          <FiFilter className="text-gray-400" size={20} />
          <input type="text" placeholder="Rechercher..." className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:outline-none" />
          <select className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none">
            <option>Toutes les priorités</option>
            <option>Critique</option>
            <option>Haute</option>
            <option>Moyenne</option>
          </select>
        </div>
      </Card>

      <div className="space-y-3">
        {tasks.map(task => (
          <Card key={task.id} className="bg-[#111] border-white/10 p-6 hover:border-red-500/50 transition-all">
            <div className="flex items-center gap-4">
              <button>{task.status === 'done' ? <FiCheckSquare className="text-green-400" size={24} /> : <FiSquare className="text-gray-400" size={24} />}</button>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-semibold ${task.status === 'done' ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</h3>
                  <Badge className={task.priority === 'Critique' ? 'bg-red-500/20 text-red-400 border-red-500/50' : task.priority === 'Haute' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'}>
                    {task.priority}
                  </Badge>
                  {task.status === 'in-progress' && <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">En cours</Badge>}
                  {new Date(task.dueDate) < new Date() && task.status !== 'done' && <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Retard</Badge>}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{task.project}</span>
                  <span>•</span>
                  <span>Assigné à: {task.assignee}</span>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <FiCalendar size={14} />
                    <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTachesPage;