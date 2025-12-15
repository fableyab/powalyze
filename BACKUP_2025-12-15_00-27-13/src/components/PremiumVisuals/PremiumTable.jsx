import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PremiumTable = ({ columns, data }) => {
  return (
    <div className="rounded-md border border-white/10 bg-[#1A1A1A]">
      <Table>
        <TableHeader className="bg-black/20">
          <TableRow className="border-white/5 hover:bg-transparent">
            {columns.map((col, index) => (
              <TableHead key={index} className="text-gray-400 font-medium">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-white/5 hover:bg-white/5">
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} className="text-white">
                  {col.render ? col.render(row) : row[col.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PremiumTable;