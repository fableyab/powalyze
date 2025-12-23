import React, { useState } from 'react';
import { FiCheckSquare, FiSquare, FiPlus, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TachesPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revue architecture cloud', project: 'Migration Azure', priority: 'Critique', status: 'todo', dueDate: '2025-12-26', assignee: 'Marie Dubois' },
    { id: 2, title: 'Tests intégration paiement', project: 'E-commerce B2B', priority: 'Haute', status: 'in-progress', dueDate: '2025-12-28', assignee: 'Thomas Martin' },
    { id: 3, title: 'Audit sécurité infrastructure', project: 'ISO 27001', priority: 'Critique', status: 'todo', dueDate: '2025-12-24', assignee: 'Sophie Laurent' },
    { id: 4, title: 'Design maquettes mobile', project: 'App Mobile B2C', priority: 'Moyenne', status: 'in-progress', dueDate: '2025-12-30', assignee: 'Lucas Bernard' },
    { id: 5, title: 'Configuration pipelines CI/CD', project: 'DevOps CI/CD', priority: 'Haute', status: 'done', dueDate: '2025-12-20', assignee: 'Hugo Moreau' },
    { id: 6, title: 'Analyse données ventes Q4', project: 'Data Warehouse', priority: 'Moyenne', status: 'in-progress', dueDate: '2025-12-29', assignee: 'Emma Petit' },
  ]);

  const [filter, setFilter] = useState('all');

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: task.status === 'done' ? 'todo' : 'done' } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Tâches</h1>
          <p className="text-gray-400">Gestion et suivi des tâches projet</p>
        </div>
        <button className="flex items-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-6 py-3 rounded-lg font-medium transition-all">
          <FiPlus size={20} />
          Nouvelle Tâche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-gray-400 mb-1">{stats.todo}</div>
          <div className="text-sm text-gray-400">À faire</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-blue-400 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-gray-400">En cours</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-green-400 mb-1">{stats.done}</div>
          <div className="text-sm text-gray-400">Terminées</div>
        </Card>
      </div>

      <div className="flex gap-2">
        {['all', 'todo', 'in-progress', 'done'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
            }`}
          >
            {status === 'all' ? 'Toutes' : status === 'todo' ? 'À faire' : status === 'in-progress' ? 'En cours' : 'Terminées'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <Card key={task.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all">
            <div className="flex items-start gap-4">
              <button onClick={() => toggleTask(task.id)} className="mt-1">
                {task.status === 'done' ? (
                  <FiCheckSquare className="text-green-400" size={24} />
                ) : (
                  <FiSquare className="text-gray-400" size={24} />
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-semibold ${task.status === 'done' ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <Badge className={task.priority === 'Critique' ? 'bg-red-500/20 text-red-400 border-red-500/50' : task.priority === 'Haute' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'}>
                    {task.priority}
                  </Badge>
                  {task.status === 'in-progress' && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">En cours</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{task.project}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={14} />
                    <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Assigné à: {task.assignee}</span>
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

export default TachesPage;