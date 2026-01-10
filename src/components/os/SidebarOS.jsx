import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  FileCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SidebarOS({ tab, setTab }) {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { id: "cockpit", label: "Cockpit", icon: LayoutDashboard },
    { id: "portfolio", label: "Portefeuilles", icon: FolderKanban },
    { id: "committees", label: "Comités", icon: CalendarCheck },
    { id: "decisions", label: "Décisions", icon: FileCheck },
    { id: "risks", label: "Risques", icon: AlertTriangle },
  ];

  return (
    <aside
      className={`
        relative z-10 h-screen border-r border-white/10 
        bg-black/40 backdrop-blur-2xl 
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && (
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">
            Powalyze OS
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="px-3 py-6 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.45)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon size={20} strokeWidth={1.5} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
