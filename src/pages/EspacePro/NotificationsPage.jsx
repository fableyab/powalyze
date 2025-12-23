import React from 'react';
import { FiBell, FiCheck, FiX, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';

function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Projet approuvé',
      message: 'Votre projet "Digital Transformation" a été approuvé par la direction.',
      time: 'Il y a 5 minutes',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Deadline approchante',
      message: 'Le projet "Cloud Migration" arrive à échéance dans 3 jours.',
      time: 'Il y a 1 heure',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveau document',
      message: 'Marie Dubois a partagé un nouveau document dans "AI Integration".',
      time: 'Il y a 2 heures',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      title: 'Échec de synchronisation',
      message: 'La synchronisation avec Azure DevOps a échoué. Vérifiez la connexion.',
      time: 'Il y a 3 heures',
      read: true,
    },
    {
      id: 5,
      type: 'success',
      title: 'Tâche complétée',
      message: 'Jean Martin a terminé la tâche "Configuration serveur".',
      time: 'Il y a 5 heures',
      read: true,
    },
  ];

  const getIcon = (type) => {
    const icons = {
      success: FiCheckCircle,
      warning: FiAlertCircle,
      info: FiInfo,
      error: FiX,
    };
    return icons[type] || FiInfo;
  };

  const getColors = (type) => {
    const colors = {
      success: {
        bg: 'from-green-500/10 to-green-600/5',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: 'bg-green-500/20',
      },
      warning: {
        bg: 'from-orange-500/10 to-orange-600/5',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: 'bg-orange-500/20',
      },
      info: {
        bg: 'from-blue-500/10 to-blue-600/5',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        icon: 'bg-blue-500/20',
      },
      error: {
        bg: 'from-red-500/10 to-red-600/5',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: 'bg-red-500/20',
      },
    };
    return colors[type] || colors.info;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-400 mt-2">
            {notifications.filter((n) => !n.read).length} notifications non lues
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] border border-[#BFA76A]/20 rounded-lg text-white hover:border-[#BFA76A]/50 transition-colors">
          <FiCheck className="w-5 h-5" />
          Tout marquer comme lu
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const colors = getColors(notification.type);

          return (
            <div
              key={notification.id}
              className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-6 ${
                !notification.read ? 'shadow-lg' : 'opacity-70'
              } transition-all hover:opacity-100`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${colors.icon}`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{notification.title}</h3>
                    {!notification.read && (
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#BFA76A] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BFA76A]"></span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{notification.time}</p>
                    <div className="flex gap-2">
                      <button className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationsPage;