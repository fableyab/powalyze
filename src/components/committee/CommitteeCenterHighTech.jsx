import { CalendarCheck, AlertTriangle, FileCheck, Users, Clock, Star } from "lucide-react";

export default function CommitteeCenterHighTech() {
  const committees = [
    {
      type: "Comité Stratégique",
      date: "12 Janvier 2026",
      time: "14:00 CET",
      critical: 3,
      decisions: 5,
      attendees: 12,
      priority: "high",
      location: "Genève",
    },
    {
      type: "Comité IT",
      date: "15 Janvier 2026",
      time: "10:00 CET",
      critical: 2,
      decisions: 4,
      attendees: 8,
      priority: "medium",
      location: "Zurich",
    },
  ];

  return (
    <section className="relative py-32 bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.06]" />
      
      {/* LUMIÈRE */}
      <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-blue-400 tracking-[0.2em] uppercase">Governance</span>
          </div>
          <h1 className="text-6xl font-light text-white tracking-tight">
            Committee <span className="font-semibold text-brand-gold">Hub</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {committees.map((c, i) => (
            <div
              key={i}
              className="
                group relative p-10 rounded-3xl 
                bg-gradient-to-br from-white/[0.07] to-white/[0.02]
                backdrop-blur-2xl 
                border border-white/[0.08]
                hover:border-brand-gold/30
                hover:scale-[1.01]
                transition-all duration-500
                overflow-hidden
              "
            >
              {/* PRIORITY BADGE */}
              <div className="absolute top-6 right-6">
                <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                  c.priority === 'high' 
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {c.priority}
                </div>
              </div>

              {/* HEADER */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <CalendarCheck size={22} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-white">{c.type}</h3>
                  </div>
                </div>
              </div>

              {/* DATE + TIME + LOCATION */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Date</p>
                  <p className="text-white text-sm font-light">{c.date}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Heure</p>
                  <p className="text-white text-sm font-light flex items-center gap-2">
                    <Clock size={14} className="text-brand-gold" strokeWidth={1.5} />
                    {c.time}
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Localisation</p>
                <p className="text-white text-sm font-light">{c.location}, Suisse</p>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <AlertTriangle size={16} className="text-rose-400" strokeWidth={1.5} />
                    <span className="text-2xl font-light text-white">{c.critical}</span>
                  </div>
                  <p className="text-white/40 text-xs">Critiques</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FileCheck size={16} className="text-brand-gold" strokeWidth={1.5} />
                    <span className="text-2xl font-light text-white">{c.decisions}</span>
                  </div>
                  <p className="text-white/40 text-xs">Décisions</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users size={16} className="text-blue-400" strokeWidth={1.5} />
                    <span className="text-2xl font-light text-white">{c.attendees}</span>
                  </div>
                  <p className="text-white/40 text-xs">Participants</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
