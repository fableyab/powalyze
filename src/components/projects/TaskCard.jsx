/**
 * TaskCard Component
 * Displays a single task with status, priority, and actions
 * Mobile-first responsive design
 */

import React, { useState } from 'react';
import { ChevronDown, Trash2, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaskCard = ({ task, onUpdate, onDelete, onClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[priority] || colors.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'done': <CheckCircle2 className="w-4 h-4 text-green-600" />,
      'in_progress': <Clock className="w-4 h-4 text-blue-600" />,
      'blocked': <AlertCircle className="w-4 h-4 text-red-600" />,
    };
    return icons[status] || null;
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
    >
      {/* Header: Title + Priority */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 break-words pr-2">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
          }}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Meta: Due date + Status */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          {task.due_date && (
            <span
              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                isOverdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Clock className="w-3 h-3" />
              {new Date(task.due_date).toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* Priority badge */}
        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Progress bar if has subtasks */}
      {task.subtask_count && task.subtask_count > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Subtasks</span>
            <span className="text-xs font-semibold text-gray-700">
              {task.completed_subtasks || 0}/{task.subtask_count}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: task.subtask_count > 0 
                  ? `${((task.completed_subtasks || 0) / task.subtask_count) * 100}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      )}

      {/* Assignee */}
      {task.assigned_user && (
        <div className="mb-3">
          <p className="text-xs text-gray-600">
            Assigned: <span className="font-semibold">{task.assigned_user.full_name}</span>
          </p>
        </div>
      )}

      {/* Options menu */}
      {showOptions && (
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex gap-2 flex-wrap">
            {task.status !== 'done' && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate?.({ ...task, status: 'done' });
                  setShowOptions(false);
                }}
                className="text-xs"
              >
                Mark Done
              </Button>
            )}
            {task.status !== 'in_progress' && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate?.({ ...task, status: 'in_progress' });
                  setShowOptions(false);
                }}
                className="text-xs"
              >
                Start
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(task.id);
                setShowOptions(false);
              }}
              className="text-xs gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
