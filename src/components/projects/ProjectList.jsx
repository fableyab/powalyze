
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const ProjectList = ({ projects, onDelete, onEdit }) => {
  return (
    <div className="bg-[#1A1A1A] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-black text-slate-300 font-medium">
                <tr>
                    <th className="p-4">Project Name</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {projects.map(project => (
                    <tr key={project.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 font-medium text-white">{project.name}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                                project.status === 'Completed' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'
                            }`}>{project.status}</span>
                        </td>
                        <td className="p-4">{project.deadline || '-'}</td>
                        <td className="p-4">{project.budget ? `$${project.budget.toLocaleString()}` : '-'}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => onEdit && onEdit(project)} className="text-slate-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete && onDelete(project.id)} className="text-red-500 hover:text-red-400 hover:bg-red-900/20">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </td>
                    </tr>
                ))}
                {projects.length === 0 && (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">No projects found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
};

export default ProjectList;
