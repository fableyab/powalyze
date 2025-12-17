/**
 * ProjectTaskList Component
 * Main task management view with filtering, sorting, and quick actions
 * Mobile-first responsive design
 */

import React, { useState } from 'react';
import { Plus, Search, Filter, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useProjectTasks, useUpdateTask, useProjectStats } from '@/hooks/useProjects';

const ProjectTaskList = ({ projectId, onTaskSelect }) => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('all');

  // Apply search filter
  const searchFilters = {
    ...filters,
    search: searchQuery,
    status: viewMode === 'all' ? filters.status : [viewMode],
  };

  const { tasks, loading, error } = useProjectTasks(projectId, searchFilters);
  const { stats } = useProjectStats(projectId);
  const { updateTask } = useUpdateTask();

  const handleTaskUpdate = async (updates) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, updates);
      setSelectedTask(null);
    }
  };

  const handleTaskDelete = async (taskId) => {
    // Delete implementation would go here
    console.log('Delete task:', taskId);
  };

  // Group tasks by status for better visualization
  const groupedTasks = {
    done: tasks.filter(t => t.status === 'done'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    blocked: tasks.filter(t => t.status === 'blocked'),
    todo: tasks.filter(t => t.status === 'todo'),
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tasks</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
            <p className="text-xs text-blue-700 font-semibold">Total</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total_tasks}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
            <p className="text-xs text-green-700 font-semibold">Done</p>
            <p className="text-2xl font-bold text-green-900">{stats.completed_tasks}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
            <p className="text-xs text-orange-700 font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-orange-900">{stats.in_progress_tasks}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
            <p className="text-xs text-red-700 font-semibold">Overdue</p>
            <p className="text-2xl font-bold text-red-900">{stats.overdue_tasks}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center sm:justify-start"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Filters</span>
        </button>

        {/* New task button */}
        <Button
          onClick={() => setShowNewTaskModal(true)}
          className="w-full sm:w-auto gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* View filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'in_progress', 'done', 'blocked'].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              viewMode === mode
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {mode === 'in_progress' ? 'In Progress' : mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Advanced filters (when shown) */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Priority</label>
              <select
                multiple
                value={filters.priority || []}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priority: Array.from(e.target.selectedOptions, option => option.value),
                  })
                }
                className="w-full text-sm border border-gray-300 rounded p-2"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Status</label>
              <select
                multiple
                value={filters.status || []}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: Array.from(e.target.selectedOptions, option => option.value),
                  })
                }
                className="w-full text-sm border border-gray-300 rounded p-2"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sort || 'due_date'}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="w-full text-sm border border-gray-300 rounded p-2"
              >
                <option value="due_date">Due Date</option>
                <option value="created_at">Created</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tasks list */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-6">
          Error loading tasks: {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <ListFilter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-2">No tasks yet</p>
          <p className="text-sm text-gray-500 mb-4">Create your first task to get started</p>
          <Button onClick={() => setShowNewTaskModal(true)} variant="outline" size="sm">
            Create Task
          </Button>
        </div>
      ) : (
        <div>
          {/* Show tasks grouped by status if not viewing specific status */}
          {viewMode === 'all' ? (
            <>
              {['in_progress', 'blocked', 'todo', 'done'].map(status => {
                const statusTasks = groupedTasks[status];
                if (statusTasks.length === 0) return null;

                const statusLabels = {
                  in_progress: '🚀 In Progress',
                  blocked: '🚫 Blocked',
                  todo: '📋 To Do',
                  done: '✅ Done',
                };

                return (
                  <div key={status} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      {statusLabels[status]}
                      <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {statusTasks.length}
                      </span>
                    </h3>
                    <div>
                      {statusTasks.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClick={() => {
                            setSelectedTask(task);
                            onTaskSelect?.(task);
                          }}
                          onUpdate={handleTaskUpdate}
                          onDelete={handleTaskDelete}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => {
                    setSelectedTask(task);
                    onTaskSelect?.(task);
                  }}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <TaskModal
          projectId={projectId}
          isOpen={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          onSuccess={() => {
            setShowNewTaskModal(false);
          }}
        />
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal
          projectId={projectId}
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onSuccess={() => {
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default ProjectTaskList;
