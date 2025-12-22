/**
 * PMO CALENDAR PAGE
 * ==================
 * 
 * Calendrier interactif pour les événements PMO.
 * Utilise PMODataContext pour les données (vierge par défaut).
 * 
 * FONCTIONNALITÉS:
 * - Vue semaine avec navigation
 * - Ajout/modification/suppression d'événements
 * - Types d'événements variés
 * - Affichage par projet
 * 
 * @author POWALYZE
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Video, Phone, Briefcase, Target, Zap, Edit,
  Trash2, MoreHorizontal, Bell, Check, X, Save, Play
} from 'lucide-react';
import { usePMOData } from '@/context/PMODataContext';

// Legacy data - non utilisé
const legacyEvents = [
  {
    id: 1,
    title: "Sprint Review - Migration Azure",
    type: "meeting",
    date: "2025-01-20",
    startTime: "10:00",
    endTime: "11:30",
    project: "Migration Cloud Azure",
    attendees: ["Marc Dubois", "Sophie Laurent", "Jean Petit"],
    location: "Salle Geneve",
    color: "#3b82f6",
    description: "Revue du sprint 8 avec demonstration des nouvelles fonctionnalites"
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
    description: "Atelier de co-creation des visualisations avec le client"
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
    title: "Comite de pilotage",
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
    attendees: ["Anna Martin", "Equipe Finance", "Consultant SAP"],
    location: "Salle Formation",
    color: "#f59e0b",
    description: "Session de formation pour les key users Finance"
  }
];

const eventTypes = [
  { value: 'meeting', label: 'Reunion', color: '#3b82f6' },
  { value: 'workshop', label: 'Workshop', color: '#8b5cf6' },
  { value: 'standup', label: 'Standup', color: '#22c55e' },
  { value: 'steering', label: 'Comite', color: '#BFA76A' },
  { value: 'training', label: 'Formation', color: '#f59e0b' },
  { value: 'review', label: 'Review', color: '#ec4899' },
  { value: 'deadline', label: 'Deadline', color: '#ef4444' }
];

const projects = [
  "Migration Cloud Azure",
  "Dashboard Power BI Finance",
  "Refonte ERP SAP",
  "Data Lake Implementation",
  "PMO",
  "Autre"
];

const PMOCalendarPage = () => {
  // Utilisation du contexte PMO
  const { events: contextEvents, updateEvents, loadDemoData } = usePMOData();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Synchroniser avec le contexte
  useEffect(() => {
    setEvents(contextEvents);
  }, [contextEvents]);

  // Mettre à jour le contexte
  useEffect(() => {
    if (events.length > 0 || contextEvents.length > 0) {
      updateEvents(events);
    }
  }, [events]);
  
  // Form state for new/edit event
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'meeting',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    project: 'PMO',
    location: '',
    isOnline: false,
    description: '',
    attendees: []
  });

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Get days for current week
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Format date for comparison
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get events for a specific day
  const getEventsForDay = (date) => {
    const dateKey = formatDateKey(date);
    return events.filter(event => event.date === dateKey);
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  // Add new event
  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date) {
      showNotification('Veuillez remplir le titre et la date', 'error');
      return;
    }

    const eventType = eventTypes.find(t => t.value === eventForm.type);
    const newEvent = {
      ...eventForm,
      id: Date.now(),
      color: eventType?.color || '#3b82f6',
      attendees: eventForm.attendees.length > 0 ? eventForm.attendees : ['Vous']
    };

    setEvents([...events, newEvent]);
    setShowAddModal(false);
    resetForm();
    showNotification('Evenement ajoute avec succes!');
  };

  // Update event
  const handleUpdateEvent = () => {
    if (!eventForm.title || !eventForm.date) {
      showNotification('Veuillez remplir le titre et la date', 'error');
      return;
    }

    const eventType = eventTypes.find(t => t.value === eventForm.type);
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id 
        ? { ...eventForm, id: event.id, color: eventType?.color || event.color }
        : event
    );

    setEvents(updatedEvents);
    setShowEventModal(false);
    setSelectedEvent(null);
    resetForm();
    showNotification('Evenement mis a jour!');
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
    showNotification('Evenement supprime!');
  };

  // Reset form
  const resetForm = () => {
    setEventForm({
      title: '',
      type: 'meeting',
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      project: 'PMO',
      location: '',
      isOnline: false,
      description: '',
      attendees: []
    });
  };

  // Open edit modal
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      type: event.type,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      project: event.project || 'PMO',
      location: event.location || '',
      isOnline: event.isOnline || false,
      description: event.description || '',
      attendees: event.attendees || []
    });
    setShowEventModal(true);
  };

  // Open add modal with date
  const openAddModalForDate = (date) => {
    setEventForm({
      ...eventForm,
      date: formatDateKey(date)
    });
    setShowAddModal(true);
  };

  // Filter events
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const weekDays = getWeekDays();
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 - 19:00

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/pmo-workspace" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="text-[#BFA76A]" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Calendrier PMO</h1>
            <p className="text-gray-400">Gerez vos evenements et reunions</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] w-48"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            <Plus size={20} />
            Nouvel Evenement
          </motion.button>
        </div>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-xl"
        >
          <div className="w-24 h-24 rounded-full bg-[#BFA76A]/10 flex items-center justify-center mb-6">
            <CalendarIcon className="text-[#BFA76A]" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucun evenement</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Votre calendrier est vide. Planifiez votre premier evenement ou chargez les donnees de demonstration.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus size={20} />
              Planifier un evenement
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadDemoData}
              className="flex items-center gap-2 px-6 py-3 border border-[#BFA76A] text-[#BFA76A] font-semibold rounded-lg hover:bg-[#BFA76A]/10 transition-colors"
            >
              <Play size={20} />
              Charger Demo
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Calendar Navigation - Only show if events exist */}
      {events.length > 0 && (
      <>
      <div className="flex items-center justify-between mb-6 bg-white/5 border border-white/10 rounded-xl p-4">
        <button
          onClick={() => navigateWeek(-1)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {weekDays[0].toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h2>
          <p className="text-gray-400 text-sm">
            Semaine du {weekDays[0].getDate()} au {weekDays[6].getDate()}
          </p>
        </div>

        <button
          onClick={() => navigateWeek(1)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Week View */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b border-white/10">
          <div className="p-4 text-center text-gray-500 text-sm">Heure</div>
          {weekDays.map((day, idx) => {
            const isToday = formatDateKey(day) === formatDateKey(new Date());
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={idx}
                className={`p-4 text-center border-l border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                  isToday ? 'bg-[#BFA76A]/10' : ''
                }`}
                onClick={() => openAddModalForDate(day)}
              >
                <p className="text-gray-400 text-xs uppercase">
                  {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </p>
                <p className={`text-2xl font-bold ${isToday ? 'text-[#BFA76A]' : ''}`}>
                  {day.getDate()}
                </p>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center gap-1 mt-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time Grid */}
        <div className="max-h-[600px] overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-white/5 min-h-[80px]">
              <div className="p-2 text-center text-gray-500 text-sm border-r border-white/10">
                {hour}:00
              </div>
              {weekDays.map((day, dayIdx) => {
                const dayEvents = getEventsForDay(day).filter(event => {
                  const eventHour = parseInt(event.startTime.split(':')[0]);
                  return eventHour === hour;
                });
                return (
                  <div
                    key={dayIdx}
                    className="border-l border-white/10 p-1 hover:bg-white/5 cursor-pointer relative"
                    onClick={() => openAddModalForDate(day)}
                  >
                    {dayEvents.map(event => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(event);
                        }}
                        className="p-2 rounded-lg text-xs cursor-pointer mb-1"
                        style={{ backgroundColor: event.color + '30', borderLeft: `3px solid ${event.color}` }}
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {event.startTime} - {event.endTime}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Tous les evenements</h3>
          <div className="space-y-3">
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#BFA76A]/50 transition-colors cursor-pointer"
                onClick={() => openEditModal(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1.5"
                      style={{ backgroundColor: event.color }}
                    />
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-gray-400 text-sm">{event.project}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={14} />
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {event.startTime} - {event.endTime}
                        </span>
                        {event.isOnline && (
                          <span className="flex items-center gap-1 text-[#BFA76A]">
                            <Video size={14} />
                            En ligne
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event.id);
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div>
          <h3 className="text-xl font-bold mb-4">Types d'evenements</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            {eventTypes.map(type => (
              <div key={type.value} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: type.color }}
                />
                <span>{type.label}</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Cette semaine</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total evenements</span>
                <span className="font-bold text-[#BFA76A]">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reunions</span>
                <span>{events.filter(e => e.type === 'meeting').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Workshops</span>
                <span>{events.filter(e => e.type === 'workshop').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )}

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Nouvel Evenement</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Titre *</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="Titre de l'evenement"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-[#1A1A1A]">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Projet</label>
                    <select
                      value={eventForm.project}
                      onChange={(e) => setEventForm({ ...eventForm, project: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {projects.map(project => (
                        <option key={project} value={project} className="bg-[#1A1A1A]">
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date *</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Heure debut</label>
                    <input
                      type="time"
                      value={eventForm.startTime}
                      onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Heure fin</label>
                    <input
                      type="time"
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Lieu</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="Salle ou lien Teams"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isOnline"
                    checked={eventForm.isOnline}
                    onChange={(e) => setEventForm({ ...eventForm, isOnline: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10"
                  />
                  <label htmlFor="isOnline" className="text-sm">Reunion en ligne (Teams/Zoom)</label>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                    placeholder="Details de l'evenement..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Modifier Evenement</h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Titre *</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-[#1A1A1A]">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Projet</label>
                    <select
                      value={eventForm.project}
                      onChange={(e) => setEventForm({ ...eventForm, project: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {projects.map(project => (
                        <option key={project} value={project} className="bg-[#1A1A1A]">
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date *</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Heure debut</label>
                    <input
                      type="time"
                      value={eventForm.startTime}
                      onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Heure fin</label>
                    <input
                      type="time"
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Lieu</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isOnlineEdit"
                    checked={eventForm.isOnline}
                    onChange={(e) => setEventForm({ ...eventForm, isOnline: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10"
                  />
                  <label htmlFor="isOnlineEdit" className="text-sm">Reunion en ligne</label>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="px-4 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Supprimer
                  </button>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleUpdateEvent}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PMOCalendarPage;
