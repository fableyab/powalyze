import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  Edit, Trash2, ExternalLink, ArrowUpDown, MoreHorizontal, 
  Calendar, Building2, Wallet 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectsTable = ({ projects, onEdit, onDelete, onView }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sorting Logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = React.useMemo(() => {
    if (!projects) return [];
    let sortableItems = [...projects];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [projects, sortConfig]);

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-10 text-center bg-[#111]">
        <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
          <Building2 size={24} />
        </div>
        <h3 className="text-white font-bold text-lg mb-1">No Projects Found</h3>
        <p className="text-gray-400 text-sm">Create your first project to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#111]">
      <Table>
        <TableHeader className="bg-[#1A1A1A]">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="w-[300px] text-gray-400 font-bold uppercase text-xs cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
              <div className="flex items-center gap-1">Project Name <ArrowUpDown size={12} /></div>
            </TableHead>
            <TableHead className="text-gray-400 font-bold uppercase text-xs cursor-pointer hover:text-white" onClick={() => handleSort('client')}>
               <div className="flex items-center gap-1">Client <ArrowUpDown size={12} /></div>
            </TableHead>
            <TableHead className="text-gray-400 font-bold uppercase text-xs">Status</TableHead>
            <TableHead className="text-gray-400 font-bold uppercase text-xs text-right cursor-pointer hover:text-white" onClick={() => handleSort('budget')}>
               <div className="flex items-center gap-1 justify-end">Budget <ArrowUpDown size={12} /></div>
            </TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow key={project.id} className="border-white/5 hover:bg-white/5 transition-colors group">
              <TableCell className="font-medium text-white">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{project.name}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar size={10} /> 
                    {project.startDate || 'No Date'}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building2 size={14} className="text-[#BFA76A]" />
                  {project.client}
                </div>
              </TableCell>
              
              <TableCell>
                 <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    project.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                    project.status === 'On Hold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                 }`}>
                    {project.status}
                 </span>
              </TableCell>
              
              <TableCell className="text-right text-gray-300 font-mono">
                 {project.budget ? `€${Number(project.budget).toLocaleString()}` : '-'}
              </TableCell>
              
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onView(project)} className="cursor-pointer hover:bg-white/10">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(project)} className="cursor-pointer hover:bg-white/10">
                      <Edit className="mr-2 h-4 w-4" /> Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={() => onDelete(project.id)} className="cursor-pointer text-red-500 hover:bg-red-900/20 hover:text-red-400 focus:text-red-400">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;