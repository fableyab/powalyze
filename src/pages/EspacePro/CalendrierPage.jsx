import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CalendrierPage = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Comité de pilotage', date: '2025-12-24', time: '10:00', type: 'meeting', project: 'Migration Azure' },
    { id: 2, title: 'Livraison Sprint 5', date: '2025-12-27', time: '17:00', type: 'delivery', project: 'E-commerce B2B' },
    { id: 3, title: 'Formation équipe DevOps', date: '2025-12-30', time: '14:00', type: 'training', project: 'DevOps CI/CD' },
    { id: 4, title: 'Revue budgétaire Q1', date: '2026-01-05', time: '09:00', type: 'meeting', project: 'Budget 2026' },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Calendrier</h1>
          <p className="text-gray-400">Planification et gestion des événements</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-6 py-3 rounded-lg font-medium transition-all">
          <FiPlus size={20} />
          Nouvel Événement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiCalendar className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{events.length}</p>
              <p className="text-sm text-gray-400">Événements</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiUsers className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{events.filter(e => e.type === 'meeting').length}</p>
              <p className="text-sm text-gray-400">Réunions</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiClock className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{events.filter(e => e.type === 'delivery').length}</p>
              <p className="text-sm text-gray-400">Livrables</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map(event => (
          <Card key={event.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
                  <FiCalendar className="text-[#BFA76A]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.project}</p>
                </div>
              </div>
              <Badge className={event.type === 'meeting' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : event.type === 'delivery' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-purple-500/20 text-purple-400 border-purple-500/50'}>
                {event.type === 'meeting' ? 'Réunion' : event.type === 'delivery' ? 'Livrable' : 'Formation'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <FiCalendar size={14} />
                <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock size={14} />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-sm transition-all">
                <FiEdit size={14} />
                Modifier
              </button>
              <button className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm transition-all">
                <FiTrash2 size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendrierPage;