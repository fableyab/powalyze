import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import TaskKanban from '../components/tasks/TaskKanban';
import { Plus, LayoutGrid, List } from 'lucide-react';

const Tasks = () => {
  const [view, setView] = useState('kanban'); // 'kanban' or 'list'

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tâches"
        subtitle="Vue d'ensemble de toutes les tâches du portefeuille"
        action={
          <div className="flex gap-3">
            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('kanban')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  view === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nouvelle tâche
            </button>
          </div>
        }
      />

      {view === 'kanban' ? (
        <TaskKanban />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500">Vue liste à venir...</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
