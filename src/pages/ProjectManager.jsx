/**
 * ProjectManager Page
 * Main entry point for project management features
 * Integrated into client portal/dashboard
 */

import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, List, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProjectTaskList from '@/components/projects/ProjectTaskList';

const ProjectManager = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');

  if (!projectId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <h1 className="text-xl font-bold text-gray-900 mb-4">No project selected</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const viewModes = [
    { id: 'list', name: 'List', icon: <List className="w-4 h-4" /> },
    { id: 'board', name: 'Board', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'timeline', name: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Back button + Title */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Manager</h1>
          </div>

          {/* View toggle */}
          <div className="flex gap-2 border-b border-gray-200 pb-4">
            {viewModes.map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  viewMode === mode.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode.icon}
                {mode.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main>
        {viewMode === 'list' && <ProjectTaskList projectId={projectId} />}

        {viewMode === 'board' && (
          <div className="flex items-center justify-center min-h-[60vh] p-4">
            <div className="text-center">
              <LayoutGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Board view coming soon</h2>
              <p className="text-gray-600 mb-6">
                Drag and drop tasks between columns with Kanban-style board view
              </p>
              <Button variant="outline" onClick={() => setViewMode('list')}>
                Use List View
              </Button>
            </div>
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="flex items-center justify-center min-h-[60vh] p-4">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Timeline view coming soon</h2>
              <p className="text-gray-600 mb-6">
                Visualize tasks on a Gantt-style timeline with dependencies
              </p>
              <Button variant="outline" onClick={() => setViewMode('list')}>
                Use List View
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectManager;
