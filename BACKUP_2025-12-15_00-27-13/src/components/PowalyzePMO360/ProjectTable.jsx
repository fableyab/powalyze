import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowUpDown, Search, Filter, Download, MoreHorizontal, ExternalLink 
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ProjectTable = ({ projects }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState('');

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.client.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#151515]">
         <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
               <Input 
                 placeholder="Filter projects..." 
                 value={filter}
                 onChange={(e) => setFilter(e.target.value)}
                 className="bg-[#0A0A0A] border-white/10 pl-9 h-9 text-xs w-full focus:border-[#BFA76A]"
               />
            </div>
            <Button variant="outline" size="sm" className="border-white/10 h-9 px-3 text-gray-400 hover:text-white">
               <Filter size={14} />
            </Button>
         </div>
         <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-9">
            <Download size={14} className="mr-2" /> Export
         </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#1A1A1A]">
            <TableRow className="border-white/5 hover:bg-transparent">
              {['Project Name', 'Client', 'Status', 'Phase', 'Budget', 'ROI'].map((head, i) => (
                <TableHead 
                  key={i}
                  className="text-gray-400 font-bold uppercase text-[10px] tracking-wider cursor-pointer hover:text-white whitespace-nowrap" 
                  onClick={() => handleSort(head.toLowerCase().replace(' ', ''))}
                >
                  <div className="flex items-center gap-1">{head} <ArrowUpDown size={10} /></div>
                </TableHead>
              ))}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow key={project.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="font-bold text-white text-xs py-3">{project.name}</TableCell>
                <TableCell className="text-gray-400 text-xs py-3">{project.client}</TableCell>
                <TableCell className="py-3">
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      project.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      project.status === 'On Track' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      project.status === 'At Risk' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                   }`}>
                      {project.status}
                   </span>
                </TableCell>
                <TableCell className="text-gray-400 text-xs py-3">{project.phase}</TableCell>
                <TableCell className="text-white font-mono text-xs py-3">€{project.budget.toLocaleString()}</TableCell>
                <TableCell className="text-[#BFA76A] font-bold text-xs py-3">{project.roi}%</TableCell>
                <TableCell className="py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                         <ExternalLink className="mr-2 h-3 w-3" /> View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;