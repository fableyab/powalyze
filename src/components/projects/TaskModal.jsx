/**
 * TaskModal Component
 * Create or edit task with full details, subtasks, and comments
 * Mobile-optimized modal with responsive layout
 */

import React, { useState, useEffect } from 'react';
import { X, Plus, Send, Clock, AlertCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskCommentFeed from './TaskCommentFeed';
import { useCreateTask, useUpdateTask, useTaskComments, useAddComment } from '@/hooks/useProjects';

const TaskModal = ({ projectId, task, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    due_date: '',
    assigned_to: '',
  });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const { createTask, loading: creating } = useCreateTask();
  const { updateTask, loading: updating } = useUpdateTask();
  const { comments } = useTaskComments(task?.id || null);
  const { addComment } = useAddComment();

  // Initialize form with task data or reset
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        due_date: task.due_date?.split('T')[0] || '',
        assigned_to: task.assigned_to || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        due_date: '',
        assigned_to: '',
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      alert('Task title is required');
      return;
    }

    if (task?.id) {
      // Update existing task
      await updateTask(task.id, formData);
    } else {
      // Create new task
      await createTask(projectId, formData);
    }

    onSuccess?.();
    onClose();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !task?.id) return;

    await addComment(task.id, newComment, 'current-user-id'); // Get actual user ID from auth
    setNewComment('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal container - Full height on mobile, centered on desktop */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
        <div
          className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-lg shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {task ? 'Edit Task' : 'New Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50 flex sticky top-0 z-10">
              {['details', 'comments', 'subtasks'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'comments' && comments.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 rounded-full">
                      {comments.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {activeTab === 'details' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Design homepage mockups"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add task details and notes..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority || 'medium'}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status || 'todo'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="blocked">Blocked</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.due_date || ''}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Assign To
                    </label>
                    <select
                      value={formData.assigned_to || ''}
                      onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Unassigned</option>
                      <option value="user-1">John Doe</option>
                      <option value="user-2">Jane Smith</option>
                      <option value="user-3">Bob Johnson</option>
                    </select>
                  </div>
                </form>
              )}

              {activeTab === 'comments' && (
                <div className="space-y-4">
                  {task && <TaskCommentFeed taskId={task.id} />}
                  {!task && (
                    <p className="text-gray-600 text-center py-8">
                      Save the task first to add comments
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'subtasks' && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Subtasks help break down complex work into manageable pieces
                  </p>
                  {task?.subtask_count && task.subtask_count > 0 ? (
                    <div className="space-y-2">
                      {/* Subtasks will be loaded here */}
                      <p className="text-sm text-gray-700">
                        {task.subtask_count} subtasks
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No subtasks yet</p>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Subtask
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={creating || updating}
            >
              Cancel
            </Button>
            {activeTab === 'details' && (
              <Button
                onClick={handleSubmit}
                className="flex-1"
                loading={creating || updating}
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
