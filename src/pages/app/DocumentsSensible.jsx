import { useState } from "react";
import { FileText, Folder, Search, Download, Eye } from "lucide-react";

export default function DocumentsSensible() {
  const [filter, setFilter] = useState("all");

  const documents = [
    {
      id: "1",
      name: "Plan stratégique 2025-2027.pdf",
      folder: "Stratégie",
      size: "2.4 MB",
      date: "12 Jan 2025",
      type: "pdf",
      downloads: 156,
    },
    {
      id: "2",
      name: "Business Case Migration Cloud.xlsx",
      folder: "Projets",
      size: "890 KB",
      date: "10 Jan 2025",
      type: "excel",
      downloads: 43,
    },
    {
      id: "3",
      name: "Comité transformation Q4-2024.pptx",
      folder: "Gouvernance",
      size: "12.1 MB",
      date: "08 Jan 2025",
      type: "pptx",
      downloads: 87,
    },
    {
      id: "4",
      name: "Rapport risques cyber Q1.docx",
      folder: "Risques",
      size: "1.2 MB",
      date: "05 Jan 2025",
      type: "word",
      downloads: 72,
    },
  ];

  const stats = {
    total: documents.length,
    folders: 4,
    storage: "16.5 GB",
    shared: 142,
  };

  return (
    <div className="min-h-screen bg-[#020713] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.20),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] text-xs font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.9)]">
              PZ
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
                Powalyze
              </div>
              <div className="text-[11px] text-white/60">Bibliothèque</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton href="/app/cockpit">Vue d&apos;ensemble</NavButton>
            <NavButton href="/app/projets-sensible">Projets</NavButton>
            <NavButton href="/app/portfolio-sensible">Portfolio</NavButton>
            <NavButton href="/app/alertes-sensible">Alertes</NavButton>
            <NavButton href="/app/equipe-sensible">Équipe</NavButton>
            <NavButton active>Documents</NavButton>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/50">
            {stats.storage} utilisés
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-5 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#D4AF37]" />
                  Bibliothèque documentaire
                </h1>
                <p className="text-xs lg:text-sm text-white/60">Tous vos documents stratégiques</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#D4AF37]/40 focus:bg-white/10 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <StatCard
                label="Documents"
                value={stats.total}
                color="from-fuchsia-400 to-fuchsia-600"
                icon={<FileText className="h-4 w-4" />}
              />
              <StatCard
                label="Dossiers"
                value={stats.folders}
                color="from-sky-400 to-sky-600"
                icon={<Folder className="h-4 w-4" />}
              />
              <StatCard
                label="Stockage"
                value={stats.storage}
                color="from-emerald-400 to-emerald-600"
                icon={<Download className="h-4 w-4" />}
              />
              <StatCard
                label="Partagés"
                value={stats.shared}
                color="from-amber-400 to-amber-600"
                icon={<Eye className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ href, children, active }) {
  return (
    <a
      href={href}
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition text-xs",
        active ? "bg-white/10 text-white" : "",
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70" />
      <span>{children}</span>
    </a>
  );
}

function StatCard({ label, value, color, icon }) {
  const handleClick = () => {
    if (label.toLowerCase().includes('document') || label.toLowerCase().includes('dossier')) {
      window.location.href = '/app/documents-sensible';
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 cursor-pointer hover:scale-[1.02] hover:border-white/20 transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</div>
        <div className={`p-2 rounded-xl bg-gradient-to-r ${color}`}>{icon}</div>
      </div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}

function DocumentCard({ doc }) {
  const typeColors = {
    pdf: "from-rose-400 to-rose-600",
    excel: "from-emerald-400 to-emerald-600",
    pptx: "from-amber-400 to-amber-600",
    word: "from-sky-400 to-sky-600",
  };

  const handleClick = () => {
    // Navigation vers le détail du document
    window.location.href = `/app/documents-sensible?doc=${doc.id}`;
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-5 hover:bg-white/5 hover:scale-[1.01] transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-r ${typeColors[doc.type]} flex items-center justify-center`}>
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-sm font-semibold">{doc.name}</div>
          <div className="flex items-center gap-3 text-[10px] text-white/50">
            <span>{doc.folder}</span>
            <span>•</span>
            <span>{doc.size}</span>
            <span>•</span>
            <span>{doc.date}</span>
            <span>•</span>
            <span>{doc.downloads} téléchargements</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert('Prévisualisation du document : ' + doc.name);
            }}
            className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert('Téléchargement de : ' + doc.name);
            }}
            className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
