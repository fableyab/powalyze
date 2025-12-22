import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Video, Phone, Briefcase, Target, Zap, Edit,
  Trash2, MoreHorizontal, Bell, Check
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Sprint Review - Migration Azure",
    type: "meeting",
    date: "2025-01-20",
    startTime: "10:00",
    endTime: "11:30",
    project: "Migration Cloud Azure",
    attendees: ["Marc Dubois", "Sophie Laurent", "Jean Petit"],
    location: "Salle Genève",
    color: "#3b82f6",
    description: "Revue du sprint 8 avec démonstration des nouvelles fonctionnalités"
  },
  {
    id: 2,
    title: "Workshop Power BI",
    type: "workshop",
    date: "2025-01-20",
    startTime: "14:00",
    endTime: "17:00",
    project: "Dashboard Power BI Finance",
    attendees: ["Sophie Laurent", "Anna Martin", "Client: M. Dupont"],
    location: "Teams",
    isOnline: true,
    color: "#8b5cf6",
    description: "Atelier de co-création des visualisations avec le client"
  },
  {
    id: 3,
    title: "Daily Standup",
    type: "standup",
    date: "2025-01-21",
    startTime: "09:00",
    endTime: "09:15",
    project: "Refonte ERP SAP",
    attendees: ["Marc Dubois", "Jean Petit", "Luc Bernard", "Pierre Keller"],
    location: "Teams",
    isOnline: true,
    color: "#22c55e",
    recurring: "Quotidien"
  },
  {
    id: 4,
    title: "Comité de pilotage",
    type: "steering",
    date: "2025-01-22",
    startTime: "15:00",
    endTime: "16:30",
    project: "Migration Cloud Azure",
    attendees: ["Marc Dubois", "Direction IT Swiss Bank", "Sponsors"],
    location: "Salle Direction",
    color: "#BFA76A",
    description: "Point d'avancement mensuel avec la direction"
  },
  {
    id: 5,
    title: "Formation SAP S/4HANA",
    type: "training",
    date: "2025-01-23",
    startTime: "09:00",
    endTime: "12:00",
    project: "Refonte ERP SAP",
    attendees: ["Anna Martin", "Équipe Finance", "Consultant SAP"],
    location: "Salle Formation",
    color: "#f59e0b",
    description: "Session de formation pour les key users Finance"
  },
  {
    id: 6,
    title: "Code Review Session",
    type: "review",
    date: "2025-01-23",
    startTime: "14:00",
    endTime: "15:30",
    project: "Data Lake Implementation",
    attendees: ["Pierre Keller", "Sophie Laurent", "Luc Bernard"],
    location: "Teams",
    isOnline: true,
    color: "#ec4899",
    description: "Revue du code des pipelines ETL"
  },
  {
    id: 7,
    title: "Weekly PMO Sync",
    type: "meeting",
    date: "2025-01-24",
    startTime: "11:00",
    endTime: "12:00",
    project: "PMO",
    attendees: ["Marc Dubois", "Sophie Laurent", "Anna Martin", "Claire Fischer"],
    location: "Salle PMO",
    color: "#06b6d4",
    recurring: "Hebdomadaire"
  },
  {
    id: 8,
    title: "Démo Client - Dashboard",
    type: "demo",
    date: "2025-01-24",
    startTime: "14:00",
    endTime: "15:00",
    project: "Dashboard Power BI Finance",
    attendees: ["Sophie Laurent", "Client: Nestlé CFO"],
    location: "Teams",
    isOnline: true,
    color: "#8b5cf6",
    description: "Présentation de la version beta au client"
  }
];

const EventTypeBadge = ({ type }) => {
  const config = {
    meeting: { label: 'Réunion', bg: 'bg-blue-500/20 text-blue-400' },
    workshop: { label: 'Workshop', bg: 'bg-purple-500/20 text-purple-400' },
    standup: { label: 'Standup', bg: 'bg-green-500/20 text-green-400' },
    steering: { label: 'COPIL', bg: 'bg-[#BFA76A]/20 text-[#BFA76A]' },
    training: { label: 'Formation', bg: 'bg-yellow-500/20 text-yellow-400' },
    review: { label: 'Review', bg: 'bg-pink-500/20 text-pink-400' },
    demo: { label: 'Démo', bg: 'bg-cyan-500/20 text-cyan-400' }
  };
  const { label, bg } = config[type] || config.meeting;
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${bg}`}>
      {label}
    </span>
  );
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 20)); // Jan 20, 2025
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('week'); // 'week' or 'day' or 'month'

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 to 19:00

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-CH', { weekday: 'short', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date(2025, 0, 20); // Simulated today
    return date.toDateString() === today.toDateString();
  };

  const stats = {
    total: events.length,
    today: events.filter(e => e.date === '2025-01-20').length,
    thisWeek: events.length,
    meetings: events.filter(e => e.type === 'meeting').length
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/pmo-workspace" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-black text-black">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">Calendrier</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Planning & événements</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white/5 rounded-lg p-1">
                {['Jour', 'Semaine', 'Mois'].map((v, i) => (
                  <button
                    key={v}
                    onClick={() => setView(['day', 'week', 'month'][i])}
                    className={`px-4 py-1.5 rounded text-sm transition-all ${
                      view === ['day', 'week', 'month'][i] 
                        ? 'bg-[#BFA76A] text-black font-bold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
                <Plus size={16} />
                Nouvel Événement
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-gray-500">Événements total</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-[#BFA76A]/30">
              <div className="text-2xl font-bold text-[#BFA76A]">{stats.today}</div>
              <div className="text-xs text-gray-500">Aujourd'hui</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold">{stats.thisWeek}</div>
              <div className="text-xs text-gray-500">Cette semaine</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold">{stats.meetings}</div>
              <div className="text-xs text-gray-500">Réunions</div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6 bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-bold">
                {currentDate.toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' })}
              </h2>
              <button 
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date(2025, 0, 20))}
              className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Aujourd'hui
            </button>
          </div>

          {/* Week View */}
          <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-white/10">
              <div className="p-4 text-xs text-gray-500"></div>
              {weekDays.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 text-center border-l border-white/10 ${
                    isToday(day) ? 'bg-[#BFA76A]/10' : ''
                  }`}
                >
                  <div className={`text-xs uppercase ${isToday(day) ? 'text-[#BFA76A]' : 'text-gray-500'}`}>
                    {day.toLocaleDateString('fr-CH', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold mt-1 ${
                    isToday(day) 
                      ? 'w-8 h-8 bg-[#BFA76A] text-black rounded-full flex items-center justify-center mx-auto' 
                      : ''
                  }`}>
                    {day.getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b border-white/5 h-24">
                  <div className="p-2 text-xs text-gray-500 text-right pr-4 pt-0 -mt-2">
                    {hour}:00
                  </div>
                  {weekDays.map((day, idx) => {
                    const dayEvents = getEventsForDate(day).filter(e => {
                      const eventHour = parseInt(e.startTime.split(':')[0]);
                      return eventHour === hour;
                    });
                    
                    return (
                      <div 
                        key={idx} 
                        className={`border-l border-white/5 relative ${
                          isToday(day) ? 'bg-[#BFA76A]/5' : ''
                        }`}
                      >
                        {dayEvents.map(event => {
                          const startHour = parseInt(event.startTime.split(':')[0]);
                          const endHour = parseInt(event.endTime.split(':')[0]);
                          const duration = endHour - startHour;
                          
                          return (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={() => setSelectedEvent(event)}
                              className="absolute inset-x-1 top-1 rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
                              style={{ 
                                backgroundColor: event.color + '20',
                                borderLeft: `3px solid ${event.color}`,
                                height: `${duration * 96 - 8}px`
                              }}
                            >
                              <div className="text-xs font-medium text-white line-clamp-1">{event.title}</div>
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                {event.startTime} - {event.endTime}
                              </div>
                              {event.isOnline && (
                                <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                                  <Video size={10} /> En ligne
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Event Detail Modal */}
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#111] rounded-2xl border border-white/10 max-w-lg w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="h-2" style={{ backgroundColor: selectedEvent.color }}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <EventTypeBadge type={selectedEvent.type} />
                      <h2 className="text-xl font-bold mt-2">{selectedEvent.title}</h2>
                      <p className="text-sm text-[#BFA76A]">{selectedEvent.project}</p>
                    </div>
                    <button className="text-gray-500 hover:text-white" onClick={() => setSelectedEvent(null)}>✕</button>
                  </div>

                  {selectedEvent.description && (
                    <p className="text-gray-400 mb-4">{selectedEvent.description}</p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-gray-500" />
                      <span>{selectedEvent.date} • {selectedEvent.startTime} - {selectedEvent.endTime}</span>
                      {selectedEvent.recurring && (
                        <span className="px-2 py-0.5 bg-white/10 rounded text-xs">{selectedEvent.recurring}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {selectedEvent.isOnline ? (
                        <>
                          <Video size={16} className="text-gray-500" />
                          <span>{selectedEvent.location}</span>
                          <button className="ml-auto px-3 py-1 bg-blue-500 rounded text-xs font-bold">
                            Rejoindre
                          </button>
                        </>
                      ) : (
                        <>
                          <MapPin size={16} className="text-gray-500" />
                          <span>{selectedEvent.location}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Users size={16} className="text-gray-500 mt-0.5" />
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.attendees.map((attendee, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <Edit size={16} /> Modifier
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-red-400">
                      <Trash2 size={16} /> Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] rounded-full text-black text-sm font-bold shadow-lg">
          <Zap size={16} />
          Mode Démo Live
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
