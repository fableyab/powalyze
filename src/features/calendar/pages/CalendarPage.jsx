/**
 * CALENDAR PAGE
 * Gestion complète du calendrier avec création/édition/suppression d'événements
 * Sauvegarde automatique dans localStorage
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Tag, Trash2, Edit, X, Check
} from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Badge } from '@/shared/components/ui/Badge';
import { Card } from '@/shared/components/ui/Card';
import { Modal } from '@/shared/components/ui/Modal';
import { formatDate, cn } from '@/lib/utils';

const STORAGE_KEY = 'powalyze_calendar_events';

const EVENT_TYPES = [
  { id: 'meeting', label: 'Réunion', color: 'blue' },
  { id: 'deadline', label: 'Échéance', color: 'red' },
  { id: 'milestone', label: 'Jalon', color: 'purple' },
  { id: 'review', label: 'Revue', color: 'green' },
  { id: 'training', label: 'Formation', color: 'yellow' },
  { id: 'other', label: 'Autre', color: 'gray' },
];

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function CalendarPage() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    type: 'meeting',
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // === CALENDAR LOGIC ===
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    
    // Jours du mois précédent
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: '', isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // === EVENT HANDLERS ===
  const openCreateModal = (date) => {
    setEditingEvent(null);
    setSelectedDate(date);
    setFormData({
      title: '',
      description: '',
      date: date ? date.toISOString().split('T')[0] : '',
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      attendees: '',
      type: 'meeting',
    });
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date) {
      alert('Le titre et la date sont obligatoires');
      return;
    }

    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(ev =>
        ev.id === editingEvent.id ? { ...formData, id: editingEvent.id } : ev
      ));
    } else {
      // Create new event
      const newEvent = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setEvents(prev => [...prev, newEvent]);
    }

    setModalOpen(false);
    resetForm();
  };

  const handleDelete = (eventId) => {
    if (!confirm('Voulez-vous vraiment supprimer cet événement ?')) return;
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      type: 'meeting',
    });
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentDate);

  // Stats
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const todayEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Calendrier</h1>
          <p className="text-gray-400">Gestion des événements et jalons du projet</p>
        </div>

        <Button
          variant="primary"
          onClick={() => openCreateModal(new Date())}
          className="gap-2"
        >
          <Plus size={18} />
          Nouvel événement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <CalendarIcon className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{events.length}</p>
              <p className="text-xs text-gray-400">Total événements</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Clock className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{todayEvents}</p>
              <p className="text-xs text-gray-400">Aujourd'hui</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Tag className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{upcomingEvents}</p>
              <p className="text-xs text-gray-400">À venir</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToToday}>
              Aujourd'hui
            </Button>
            <Button variant="ghost" size="sm" onClick={goToNextMonth}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dayEvents = day.date ? getEventsForDate(day.date) : [];
            const isTodayDate = day.date && isToday(day.date);

            return (
              <motion.button
                key={idx}
                whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                onClick={() => day.isCurrentMonth && openCreateModal(day.date)}
                disabled={!day.isCurrentMonth}
                className={cn(
                  "min-h-[100px] p-2 rounded-lg border transition-all text-left relative",
                  day.isCurrentMonth
                    ? "bg-gray-800/50 border-gray-700 hover:border-brand-gold-500 cursor-pointer"
                    : "bg-transparent border-transparent cursor-not-allowed",
                  isTodayDate && "ring-2 ring-brand-gold-500 bg-brand-gold-500/10"
                )}
              >
                {day.day && (
                  <>
                    <div className={cn(
                      "text-sm font-semibold mb-1",
                      isTodayDate ? "text-brand-gold-500" : "text-white"
                    )}>
                      {day.day}
                    </div>

                    {dayEvents.length > 0 && (
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => {
                          const eventType = EVENT_TYPES.find(t => t.id === event.type);
                          return (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(event);
                              }}
                              className={cn(
                                "text-xs p-1 rounded truncate",
                                `bg-${eventType?.color}-500/20 text-${eventType?.color}-400`
                              )}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} autre(s)
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Event Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetForm();
        }}
        title={editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre <span className="text-red-400">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Réunion kick-off projet"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée de l'événement"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date <span className="text-red-400">*</span>
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent"
              >
                {EVENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Heure début</label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Heure fin</label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Lieu</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Salle de réunion, Visio, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Participants</label>
            <Input
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              placeholder="Séparer par des virgules"
            />
          </div>

          <div className="flex gap-3 pt-4">
            {editingEvent && (
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  handleDelete(editingEvent.id);
                  setModalOpen(false);
                  resetForm();
                }}
                className="gap-2"
              >
                <Trash2 size={16} />
                Supprimer
              </Button>
            )}
            <div className="flex-1" />
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setModalOpen(false);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" className="gap-2">
              <Check size={16} />
              {editingEvent ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
