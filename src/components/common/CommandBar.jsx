import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  FolderKanban, 
  Plus, 
  FileText, 
  Users, 
  AlertTriangle,
  Calendar,
  ChevronRight,
  Command
} from 'lucide-react';

const CommandBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Commands/Actions disponibles
  const commands = [
    // Navigation
    { type: 'nav', icon: FolderKanban, label: 'Dashboard', path: '/app/dashboard', category: 'Navigation' },
    { type: 'nav', icon: FolderKanban, label: 'Projets', path: '/app/projects', category: 'Navigation' },
    { type: 'nav', icon: Users, label: 'Équipe', path: '/app/team', category: 'Navigation' },
    { type: 'nav', icon: Calendar, label: 'Calendrier', path: '/app/calendar', category: 'Navigation' },
    { type: 'nav', icon: FileText, label: 'Rapports', path: '/app/reports', category: 'Navigation' },
    
    // Actions PMO
    { type: 'action', icon: Plus, label: 'Créer un nouveau projet', action: 'create-project', category: 'Actions' },
    { type: 'action', icon: Plus, label: 'Ajouter une tâche', action: 'create-task', category: 'Actions' },
    { type: 'action', icon: FileText, label: 'Générer un rapport', action: 'generate-report', category: 'Actions' },
    { type: 'action', icon: AlertTriangle, label: 'Voir les risques critiques', action: 'view-critical-risks', category: 'Actions' },
    { type: 'action', icon: FileText, label: 'Exporter le portefeuille', action: 'export-portfolio', category: 'Actions' },
    
    // Recherche (exemples - à remplacer par vraies données)
    { type: 'search', icon: FolderKanban, label: 'Projet Alpha', path: '/app/projects/1', category: 'Projets' },
    { type: 'search', icon: FolderKanban, label: 'Projet Beta', path: '/app/projects/2', category: 'Projets' },
    { type: 'search', icon: Users, label: 'Jean Dupont', path: '/app/team', category: 'Équipe' },
  ];

  // Filtrer les commandes selon la query
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Grouper par catégorie
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Exécuter une commande
  const executeCommand = (cmd) => {
    if (cmd.type === 'nav' || cmd.type === 'search') {
      navigate(cmd.path);
    } else if (cmd.type === 'action') {
      // Placeholder pour actions futures
      console.log('Action:', cmd.action);
      alert(`Action "${cmd.label}" sera implémentée prochainement`);
    }
    onClose();
    setQuery('');
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          executeCommand(filteredCommands[activeIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200">
        {/* Input */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Taper une commande ou rechercher..."
            className="flex-1 text-lg outline-none placeholder-gray-400"
          />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Command className="w-3 h-3" />
            <span>+</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">K</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun résultat trouvé
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds], categoryIndex) => (
              <div key={category} className={categoryIndex > 0 ? 'border-t border-gray-100' : ''}>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                  {category}
                </div>
                {cmds.map((cmd, index) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => executeCommand(cmd)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                        globalIndex === activeIndex ? 'bg-blue-50 border-l-4 border-powalyze-blue' : ''
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${globalIndex === activeIndex ? 'text-powalyze-blue' : 'text-gray-400'}`} />
                      <span className={`flex-1 text-left font-medium ${globalIndex === activeIndex ? 'text-powalyze-blue' : 'text-gray-700'}`}>
                        {cmd.label}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${globalIndex === activeIndex ? 'text-powalyze-blue' : 'text-gray-300'}`} />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300">↑↓</kbd>
              Naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Enter</kbd>
              Sélectionner
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Esc</kbd>
              Fermer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
