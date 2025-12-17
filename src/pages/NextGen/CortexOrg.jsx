import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Zap, AlertTriangle, TrendingUp, Users,
  Sparkles, Play, Pause, RotateCcw, ZoomIn, ZoomOut
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const CortexOrg = () => {
  const { language } = useLanguage();
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedLobe, setSelectedLobe] = useState(null);

  // Départements (lobes)
  const lobes = [
    {
      id: 'finance',
      name: { fr: 'Finance', en: 'Finance', de: 'Finanzen' },
      color: '#FFD60A',
      position: { x: 200, y: 150 },
      projects: 12,
      dependencies: 3,
      risks: 1,
      health: 85
    },
    {
      id: 'tech',
      name: { fr: 'Technologie', en: 'Technology', de: 'Technologie' },
      color: '#00D9FF',
      position: { x: 500, y: 150 },
      projects: 18,
      dependencies: 7,
      risks: 2,
      health: 72
    },
    {
      id: 'ops',
      name: { fr: 'Opérations', en: 'Operations', de: 'Betrieb' },
      color: '#00F744',
      position: { x: 350, y: 300 },
      projects: 8,
      dependencies: 4,
      risks: 1,
      health: 90
    },
    {
      id: 'marketing',
      name: { fr: 'Marketing', en: 'Marketing', de: 'Marketing' },
      color: '#FF006E',
      position: { x: 650, y: 300 },
      projects: 6,
      dependencies: 2,
      risks: 0,
      health: 95
    },
    {
      id: 'hr',
      name: { fr: 'Ressources Humaines', en: 'Human Resources', de: 'Personalwesen' },
      color: '#A855F7',
      position: { x: 200, y: 450 },
      projects: 4,
      dependencies: 1,
      risks: 0,
      health: 88
    }
  ];

  // Synapses (dépendances)
  const synapses = [
    { from: 'finance', to: 'tech', strength: 0.9, type: 'critical' },
    { from: 'tech', to: 'ops', strength: 0.7, type: 'normal' },
    { from: 'ops', to: 'marketing', strength: 0.5, type: 'normal' },
    { from: 'marketing', to: 'finance', strength: 0.6, type: 'normal' },
    { from: 'hr', to: 'ops', strength: 0.4, type: 'weak' },
    { from: 'tech', to: 'marketing', strength: 0.8, type: 'critical' },
    { from: 'finance', to: 'hr', strength: 0.3, type: 'weak' }
  ];

  const content = {
    fr: {
      badge: "Module Visionnaire",
      title: "Cortex Organisationnel",
      subtitle: "Voyez votre entreprise comme un cerveau vivant",
      description: "Une carte neuronale 3D de votre organisation. Chaque département pulse, chaque projet circule, chaque dépendance brille. Les risques deviennent visibles, les interactions évidentes.",
      play: "Activer",
      pause: "Pause",
      reset: "Réinitialiser",
      zoomIn: "Zoom +",
      zoomOut: "Zoom -",
      lobeDetails: "Détails du lobe",
      projects: "projets",
      dependencies: "dépendances",
      risks: "risques",
      health: "Santé",
      demoNotice: "🎬 Visualisation interactive - Données simulées"
    },
    en: {
      badge: "Visionary Module",
      title: "Organizational Cortex",
      subtitle: "See your company as a living brain",
      description: "A 3D neural map of your organization. Each department pulses, each project flows, each dependency shines. Risks become visible, interactions obvious.",
      play: "Play",
      pause: "Pause",
      reset: "Reset",
      zoomIn: "Zoom +",
      zoomOut: "Zoom -",
      lobeDetails: "Lobe details",
      projects: "projects",
      dependencies: "dependencies",
      risks: "risks",
      health: "Health",
      demoNotice: "🎬 Interactive visualization - Simulated data"
    },
    de: {
      badge: "Visionäres Modul",
      title: "Organisationskortex",
      subtitle: "Sehen Sie Ihr Unternehmen als lebendiges Gehirn",
      description: "Eine 3D-Nervenkarte Ihrer Organisation. Jede Abteilung pulsiert, jedes Projekt fließt, jede Abhängigkeit leuchtet. Risiken werden sichtbar, Interaktionen offensichtlich.",
      play: "Abspielen",
      pause: "Pause",
      reset: "Zurücksetzen",
      zoomIn: "Zoom +",
      zoomOut: "Zoom -",
      lobeDetails: "Lappen-Details",
      projects: "Projekte",
      dependencies: "Abhängigkeiten",
      risks: "Risiken",
      health: "Gesundheit",
      demoNotice: "🎬 Interaktive Visualisierung - Simulierte Daten"
    }
  };

  const text = content[language] || content.fr;

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    let animationFrame;
    let pulse = 0;

    const drawSynapse = (from, to, strength, type) => {
      const fromLobe = lobes.find(l => l.id === from);
      const toLobe = lobes.find(l => l.id === to);
      
      if (!fromLobe || !toLobe) return;

      ctx.beginPath();
      ctx.moveTo(fromLobe.position.x * zoom, fromLobe.position.y * zoom);
      ctx.lineTo(toLobe.position.x * zoom, toLobe.position.y * zoom);
      
      // Style based on type
      if (type === 'critical') {
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.3 + Math.sin(pulse) * 0.2})`;
        ctx.lineWidth = 3;
      } else if (type === 'normal') {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * strength})`;
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.lineWidth = 1;
      }
      
      ctx.stroke();

      // Animated particle on synapse
      if (isPlaying) {
        const t = (pulse % 100) / 100;
        const x = fromLobe.position.x + (toLobe.position.x - fromLobe.position.x) * t;
        const y = fromLobe.position.y + (toLobe.position.y - fromLobe.position.y) * t;
        
        ctx.beginPath();
        ctx.arc(x * zoom, y * zoom, 3, 0, Math.PI * 2);
        ctx.fillStyle = type === 'critical' ? '#00D9FF' : '#ffffff';
        ctx.fill();
      }
    };

    const drawLobe = (lobe) => {
      const { x, y } = lobe.position;
      const baseRadius = 40;
      const pulseRadius = baseRadius + Math.sin(pulse) * 5;

      // Glow
      const gradient = ctx.createRadialGradient(x * zoom, y * zoom, 0, x * zoom, y * zoom, pulseRadius * zoom);
      gradient.addColorStop(0, lobe.color + '80');
      gradient.addColorStop(0.5, lobe.color + '40');
      gradient.addColorStop(1, lobe.color + '00');
      
      ctx.beginPath();
      ctx.arc(x * zoom, y * zoom, pulseRadius * zoom * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Lobe body
      ctx.beginPath();
      ctx.arc(x * zoom, y * zoom, pulseRadius * zoom, 0, Math.PI * 2);
      ctx.fillStyle = lobe.color + '40';
      ctx.fill();
      ctx.strokeStyle = lobe.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Risk indicator
      if (lobe.risks > 0) {
        ctx.beginPath();
        ctx.arc(x * zoom + 30, y * zoom - 30, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#FF006E';
        ctx.fill();
      }

      // Selected indicator
      if (selectedLobe === lobe.id) {
        ctx.beginPath();
        ctx.arc(x * zoom, y * zoom, (pulseRadius + 10) * zoom, 0, Math.PI * 2);
        ctx.strokeStyle = '#00D9FF';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw synapses first
      synapses.forEach(synapse => {
        drawSynapse(synapse.from, synapse.to, synapse.strength, synapse.type);
      });

      // Draw lobes
      lobes.forEach(lobe => {
        drawLobe(lobe);
      });

      if (isPlaying) {
        pulse += 0.05;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPlaying, zoom, selectedLobe]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    // Check if clicked on a lobe
    const clicked = lobes.find(lobe => {
      const distance = Math.sqrt(
        Math.pow(x - lobe.position.x, 2) + Math.pow(y - lobe.position.y, 2)
      );
      return distance < 40;
    });

    setSelectedLobe(clicked ? clicked.id : null);
  };

  const selectedLobeData = lobes.find(l => l.id === selectedLobe);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <SEO 
        title={`${text.title} | Powalyze Next-Gen`}
        description={text.description}
      />
      <Navbar />

      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D9FF08_1px,transparent_1px),linear-gradient(to_bottom,#00D9FF08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 px-6 py-3 rounded-full mb-8">
              <Brain className="text-[#00D9FF]" size={16} />
              <span className="text-sm uppercase tracking-widest text-[#00D9FF] font-bold">
                {text.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {text.title}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {text.description}
            </p>

            <p className="text-sm text-gray-500">{text.demoNotice}</p>
          </motion.div>

          {/* Canvas container */}
          <div className="flex items-start gap-8">
            {/* Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-auto rounded-lg cursor-pointer"
                style={{ maxHeight: '600px' }}
              />

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 text-[#00D9FF] border border-[#00D9FF]/30"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button
                  onClick={() => { setZoom(Math.max(0.5, zoom - 0.1)); }}
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  <ZoomOut size={16} />
                </Button>
                <Button
                  onClick={() => { setZoom(Math.min(2, zoom + 0.1)); }}
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  <ZoomIn size={16} />
                </Button>
                <Button
                  onClick={() => { setZoom(1); setSelectedLobe(null); }}
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  <RotateCcw size={16} />
                </Button>
              </div>
            </motion.div>

            {/* Lobe details */}
            {selectedLobeData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-80 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedLobeData.color }}
                  />
                  {selectedLobeData.name[language]}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{text.projects}</span>
                    <span className="text-2xl font-bold">{selectedLobeData.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{text.dependencies}</span>
                    <span className="text-2xl font-bold">{selectedLobeData.dependencies}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{text.risks}</span>
                    <span className={`text-2xl font-bold ${
                      selectedLobeData.risks === 0 ? 'text-[#00F744]' : 'text-[#FF006E]'
                    }`}>
                      {selectedLobeData.risks}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">{text.health}</span>
                      <span className="text-2xl font-bold">{selectedLobeData.health}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00F744] to-green-400 transition-all"
                        style={{ width: `${selectedLobeData.health}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default CortexOrg;
