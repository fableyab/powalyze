import React from 'react';
import { tasks } from '../../data/demoData';
import { GripVertical } from 'lucide-react';

const TaskKanban = ({ projectId = null }) => {
  const filteredTasks = projectId 
    ? tasks.filter(t => t.projectId === projectId)
    : tasks;

  const columns = [
    { id: 'todo', title: 'À faire', color: 'gray' },
    { id: 'in-progress', title: 'En cours', color: 'blue' },
    { id: 'done', title: 'Terminé', color: 'green' }
  ];

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(t => t.status === status);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getColumnColor = (color) => {
    const colors = {
      gray: 'bg-gray-100 border-gray-300',
      blue: 'bg-blue-100 border-blue-300',
      green: 'bg-green-100 border-green-300'
    };
    return colors[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => (
        <div key={column.id} className="flex flex-col">
          <div className={`rounded-t-xl border-2 ${getColumnColor(column.color)} px-4 py-3`}>
            <h3 className="font-bold text-gray-900 flex items-center justify-between">
              {column.title}
              <span className="text-sm bg-white px-2 py-1 rounded-full">
                {getTasksByStatus(column.id).length}
              </span>
            </h3>
          </div>
          <div className="flex-1 bg-gray-50 rounded-b-xl border-2 border-t-0 border-gray-200 p-4 space-y-3 min-h-[400px]">
            {getTasksByStatus(column.id).map(task => (
              <div 
                key={task.id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-move"
              >
                <div className="flex items-start gap-2 mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="font-semibold text-gray-900 flex-1">{task.title}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-gray-600">{task.assignee}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Échéance: {new Date(task.dueDate).toLocaleDateString('fr-CH')}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskKanban;
