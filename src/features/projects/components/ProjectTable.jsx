/**
 * PROJECT TABLE
 * Vue tableau des projets
 */

import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/components/ui/Table';
import { Badge } from '@/shared/components/ui/Badge';
import { Progress } from '@/shared/components/ui/Progress';
import { Button } from '@/shared/components/ui/Button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Dropdown } from '@/shared/components/ui/Dropdown';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PROJECT_STATUS } from '@/lib/constants';

export default function ProjectTable({ projects }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProjects = [...projects].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return aVal > bVal ? multiplier : -multiplier;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort('name')} className="cursor-pointer hover:text-white">
            Projet {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead>Code</TableHead>
          <TableHead onClick={() => handleSort('status')} className="cursor-pointer hover:text-white">
            Statut {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead onClick={() => handleSort('priority')} className="cursor-pointer hover:text-white">
            Priorité {sortBy === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead onClick={() => handleSort('progress')} className="cursor-pointer hover:text-white">
            Progression {sortBy === 'progress' && (sortOrder === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead onClick={() => handleSort('budget')} className="cursor-pointer hover:text-white">
            Budget {sortBy === 'budget' && (sortOrder === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead>Dates</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProjects.map(project => {
          const statusConfig = PROJECT_STATUS[project.status?.toUpperCase()?.replace('-', '_')];
          return (
            <TableRow key={project.id} onClick={() => console.log('Edit', project.id)}>
              <TableCell>
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-xs text-gray-400">{project.category}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">{project.code}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusConfig?.color}>{statusConfig?.label}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={project.priority === 'critical' ? 'error' : 'default'}>
                  {project.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Progress value={project.progress} className="min-w-[100px]" />
              </TableCell>
              <TableCell>{formatCurrency(project.budget)}</TableCell>
              <TableCell>
                <div className="text-xs text-gray-400">
                  <div>{formatDate(project.start_date)}</div>
                  <div>{formatDate(project.end_date)}</div>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreVertical size={16} />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
