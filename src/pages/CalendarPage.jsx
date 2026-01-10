
import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  
  // Mock events
  const events = [
    { id: 1, title: 'SteerCo Meeting', time: '10:00', type: 'meeting', day: 15 },
    { id: 2, title: 'Project Review', time: '14:00', type: 'review', day: 15 },
    { id: 3, title: 'Sprint Planning', time: '09:00', type: 'planning', day: 18 },
    { id: 4, title: 'Client Demo', time: '11:30', type: 'demo', day: 22 },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-slate-500">Manage your schedule and milestones.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-[#141414] border border-slate-800 rounded-lg p-1 mr-4">
            <button className="p-1 hover:bg-slate-800 rounded"><ChevronLeft size={16} className="text-slate-400" /></button>
            <span className="px-4 text-sm font-medium text-white">January 2026</span>
            <button className="p-1 hover:bg-slate-800 rounded"><ChevronRight size={16} className="text-slate-400" /></button>
          </div>
          <Button className="bg-[#D4A574] text-black hover:bg-[#B5952F]">
            <Plus className="w-4 h-4 mr-2" /> New Event
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-[#141414] border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Header Days */}
        <div className="grid grid-cols-7 border-b border-slate-800">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-slate-500 border-r border-slate-800 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNum = i - 2; // Offset for start of month (mock)
            const dayEvents = events.filter(e => e.day === dayNum);
            const isToday = dayNum === 15; // Mock today

            return (
              <div key={i} className={`border-r border-b border-slate-800 p-2 min-h-[100px] relative group hover:bg-slate-900/50 transition-colors ${dayNum <= 0 ? 'bg-slate-900/20' : ''}`}>
                {dayNum > 0 && dayNum <= 31 && (
                  <>
                    <span className={`text-sm font-medium ${isToday ? 'bg-[#D4A574] text-black w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
                      {dayNum}
                    </span>
                    <div className="mt-2 space-y-1">
                      {dayEvents.map(event => (
                        <div key={event.id} className={`text-xs p-1.5 rounded border truncate cursor-pointer ${
                          event.type === 'meeting' ? 'bg-blue-900/30 border-blue-800 text-blue-300' :
                          event.type === 'review' ? 'bg-purple-900/30 border-purple-800 text-purple-300' :
                          'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                          <span className="font-bold mr-1">{event.time}</span>
                          {event.title}
                        </div>
                      ))}
                    </div>
                    <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-800 rounded text-slate-400">
                      <Plus size={14} />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
