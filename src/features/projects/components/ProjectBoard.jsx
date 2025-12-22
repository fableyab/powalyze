/**
 * PROJECT BOARD
 * Vue Kanban des projets
 */

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Progress } from '@/shared/components/ui/Progress';
import { useWorkspace } from '@/features/workspace/context/WorkspaceContext';
import { PROJECT_STATUS } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

const STATUS_ORDER = ['planning', 'active', 'on-hold', 'completed', 'cancelled'];

export default function ProjectBoard({ projects }) {
  const { updateProject } = useWorkspace();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const project = projects.find(p => p.id === parseInt(draggableId));
    if (project) {
      updateProject({ ...project, status: destination.droppableId });
    }
  };

  const getProjectsByStatus = (status) => projects.filter(p => p.status === status);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS_ORDER.map(status => {
          const statusConfig = PROJECT_STATUS[status.toUpperCase().replace('-', '_')];
          const statusProjects = getProjectsByStatus(status);

          return (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[320px] w-1/5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{statusConfig?.label}</h3>
                    <Badge variant={statusConfig?.color} className="text-xs">
                      {statusProjects.length}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {statusProjects.length === 0 ? (
                      <Card className="p-4 text-center text-gray-500 text-sm">
                        Aucun projet
                      </Card>
                    ) : (
                      statusProjects.map((project, index) => (
                        <Draggable
                          key={project.id}
                          draggableId={String(project.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                className={cn(
                                  'p-4 cursor-move transition-all',
                                  snapshot.isDragging
                                    ? 'ring-2 ring-brand-gold-500 shadow-2xl scale-105'
                                    : 'hover:shadow-lg hover:border-brand-gold-500/50'
                                )}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-1">
                                      {project.name}
                                    </h4>
                                    <Badge variant="default" className="text-xs">
                                      {project.code}
                                    </Badge>
                                  </div>
                                </div>

                                <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                                  {project.description}
                                </p>

                                <div className="space-y-2">
                                  <Progress value={project.progress} showLabel />

                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">Budget</span>
                                    <span className="text-white font-medium">
                                      {formatCurrency(project.budget)}
                                    </span>
                                  </div>

                                  <div className="flex gap-2 flex-wrap">
                                    <Badge variant={project.priority === 'critical' ? 'error' : 'default'} className="text-xs">
                                      {project.priority}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {project.category}
                                    </Badge>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
