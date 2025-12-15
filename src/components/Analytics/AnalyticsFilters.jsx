import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AnalyticsFilters = ({ onDateChange, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-[#111] p-4 rounded-lg border border-white/10 mb-6">
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-[#BFA76A]" />
        <span className="text-sm font-medium text-white">Period:</span>
        <Select defaultValue="7d" onValueChange={onDateChange}>
          <SelectTrigger className="w-[140px] bg-black border-white/20">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>

      <div className="flex items-center gap-2">
        <Filter size={16} className="text-[#BFA76A]" />
        <span className="text-sm font-medium text-white">Segment:</span>
        <Select defaultValue="all" onValueChange={(val) => onFilterChange('segment', val)}>
          <SelectTrigger className="w-[140px] bg-black border-white/20">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="registered">Registered</SelectItem>
            <SelectItem value="anonymous">Anonymous</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="ml-auto">
        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsFilters;