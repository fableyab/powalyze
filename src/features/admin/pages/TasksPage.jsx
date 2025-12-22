import React from 'react';
import { useWorkspace } from '@/features/workspace/context/WorkspaceContext';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';

const TasksPage = () => {
  const { state } = useWorkspace();

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tâches - Vue Admin</h1>
        <p className="text-gray-400">Suivi et supervision des tâches</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {state.tasks.map(task => (
          <Card key={task.id} className="bg-neutral-950 border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{task.name}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              <Badge variant={task.status === 'done' ? 'success' : task.status === 'in-progress' ? 'warning' : 'secondary'}>{task.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
