
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Calendar, Flag, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const ProjectKanban = ({ tasks, onDragEnd, onNewTask, onTaskClick, onTaskUpdate }) => {
  const columns = {
    'To Do': { id: 'To Do', title: 'To Do', color: 'border-slate-500' },
    'In Progress': { id: 'In Progress', title: 'In Progress', color: 'border-blue-500' },
    'Done': { id: 'Done', title: 'Done', color: 'border-green-500' }
  };

  const [selectedTask, setSelectedTask] = useState(null);

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
        {Object.values(columns).map((col) => (
          <div key={col.id} className="flex flex-col h-full bg-[#1A1A1A] rounded-xl border border-slate-800 overflow-hidden">
            <div className={`p-4 flex justify-between items-center border-t-4 ${col.color} bg-[#0F0F0F]`}>
              <h3 className="font-bold text-white">{col.title}</h3>
              <div className="flex gap-2 items-center">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-bold">
                  {getTasksByStatus(col.id).length}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white" onClick={() => onNewTask(col.id)}>
                   <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Droppable droppableId={col.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-3 flex-1 overflow-y-auto space-y-3 bg-[#121212]"
                >
                  {getTasksByStatus(col.id).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => { setSelectedTask(task); if(onTaskClick) onTaskClick(task); }}
                          className={`bg-[#1E1E1E] p-4 rounded-lg border border-slate-800 hover:border-[#4A9EFF] cursor-grab active:cursor-grabbing group transition-all shadow-sm ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-[#4A9EFF] rotate-1 z-50' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-white text-sm line-clamp-2">{task.name}</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                task.priority === 'High' ? 'border-red-900 bg-red-900/20 text-red-400' : 
                                task.priority === 'Medium' ? 'border-orange-900 bg-orange-900/20 text-orange-400' : 
                                'border-green-900 bg-green-900/20 text-green-400'
                              }`}>{task.priority}</span>
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-800 pt-3 mt-2">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                              <Calendar size={12} /> {task.due_date ? format(new Date(task.due_date), 'MMM d') : '-'}
                            </div>
                            <Avatar className="w-6 h-6 border-2 border-[#1E1E1E]">
                                <AvatarFallback className="text-[9px] bg-blue-900 text-white">U</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>

    <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
            <DialogHeader>
                <DialogTitle>Task Details</DialogTitle>
            </DialogHeader>
            {selectedTask && (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-500">Name</label>
                        <p className="font-medium">{selectedTask.name}</p>
                    </div>
                    <div>
                        <label className="text-xs text-slate-500">Description</label>
                        <p className="text-sm text-slate-300">{selectedTask.description || "No description provided."}</p>
                    </div>
                     <div>
                        <label className="text-xs text-slate-500">Status</label>
                         <p className="text-sm text-slate-300">{selectedTask.status}</p>
                    </div>
                    {/* Add edit functionality here later */}
                </div>
            )}
        </DialogContent>
    </Dialog>
    </>
  );
};

export default ProjectKanban;
