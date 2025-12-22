import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { projects } from '../data/demoData';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  // Aggregate all milestones from all projects
  const allMilestones = projects.flatMap(project => 
    project.milestones.map(milestone => ({
      ...milestone,
      projectName: project.name,
      projectId: project.id
    }))
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const today = new Date();
  const currentMonth = today.toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'in-progress': return 'border-blue-500 bg-blue-50';
      case 'delayed': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✓';
      case 'in-progress': return '⏳';
      case 'delayed': return '⚠';
      default: return '○';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendrier"
        subtitle="Vue chronologique des jalons et événements"
      />

      {/* Month Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 capitalize">{currentMonth}</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Jalons à venir ({allMilestones.length})
        </h3>

        <div className="space-y-4">
          {allMilestones.map(milestone => {
            const milestoneDate = new Date(milestone.date);
            const isPast = milestoneDate < today;
            const daysUntil = Math.ceil((milestoneDate - today) / (1000 * 60 * 60 * 24));

            return (
              <div 
                key={`${milestone.projectId}-${milestone.id}`}
                className={`border-l-4 ${getStatusColor(milestone.status)} p-4 rounded-r-lg hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getStatusIcon(milestone.status)}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.projectName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 ml-11">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {milestoneDate.toLocaleDateString('fr-CH', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      {!isPast && daysUntil > 0 && (
                        <span className={`font-semibold ${
                          daysUntil <= 7 ? 'text-red-600' : 
                          daysUntil <= 30 ? 'text-amber-600' : 
                          'text-gray-600'
                        }`}>
                          Dans {daysUntil} jours
                        </span>
                      )}
                      {isPast && milestone.status !== 'completed' && (
                        <span className="font-semibold text-red-600">
                          Retard de {Math.abs(daysUntil)} jours
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                    milestone.status === 'completed' ? 'bg-green-500 text-white' :
                    milestone.status === 'in-progress' ? 'bg-blue-500 text-white' :
                    milestone.status === 'delayed' ? 'bg-red-500 text-white' :
                    'bg-gray-400 text-white'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
