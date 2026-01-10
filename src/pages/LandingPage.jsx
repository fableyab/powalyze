import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Zap, Shield, Database, Users, DollarSign, Activity, Sparkles, ArrowRight, Play, BarChart3, Clock, CheckCircle2, Layers } from 'lucide-react';

export default function LandingPageRevolution() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [liveData, setLiveData] = useState({
    revenue: 2847392,
    projects: 847,
    users: 12453,
    savings: 94.7
  });
  const [scrollY, setScrollY] = useState(0);
  const [roiInput, setRoiInput] = useState(100000);
  const [calculatedROI, setCalculatedROI] = useState(0);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(74, 158, 255, 0.3)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePosition]);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 10000 - 5000),
        projects: prev.projects + Math.floor(Math.random() * 3 - 1),
        users: prev.users + Math.floor(Math.random() * 20 - 10),
        savings: prev.savings + (Math.random() * 0.2 - 0.1)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ROI Calculator
  useEffect(() => {
    setCalculatedROI(roiInput * 3.27); // Average 327% ROI
  }, [roiInput]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-light">
            <span className="text-white">Pow</span>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">alyze</span>
          </Link>
          <div className="flex items-center gap-6 text-xs">
            <a href="#live" className="text-white/60 hover:text-white transition-colors">Live Demo</a>
            <a href="#roi" className="text-white/60 hover:text-white transition-colors">ROI Calculator</a>
            <Link to="/login" className="px-4 py-1.5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-xs font-medium rounded-full">
              Launch
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Living Dashboard */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-full mb-8">
              <div className="relative">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
              </div>
              <span className="text-xs text-white/80">Live Platform · {formatNumber(liveData.users)} Active Users</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-8 leading-[1.1]">
              <span className="block text-white mb-2">The Portfolio</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#4A9EFF] bg-clip-text text-transparent">
                That Predicts
              </span>
              <span className="block text-white/60 text-3xl md:text-5xl mt-4 font-light">
                Before You Decide
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto mb-12">
              AI-powered strategic intelligence that learns from your business patterns.
              <br />
              <span className="text-[#D4AF37]">See the future</span> of your portfolio in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo-mode"
                className="group relative px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#5AB0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch It Live
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Start Free Trial
                </span>
              </button>
            </div>
          </div>

          {/* Live Stats Grid - Morphing Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { icon: DollarSign, value: `$${formatNumber(liveData.revenue)}`, label: 'Revenue Tracked', color: 'from-emerald-500 to-green-600' },
              { icon: BarChart3, value: formatNumber(liveData.projects), label: 'Active Projects', color: 'from-blue-500 to-cyan-600' },
              { icon: Users, value: formatNumber(liveData.users), label: 'Team Members', color: 'from-purple-500 to-pink-600' },
              { icon: TrendingUp, value: `${liveData.savings.toFixed(1)}%`, label: 'Cost Savings', color: 'from-amber-500 to-orange-600' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-500"
                  style={{
                    transform: `translateY(${scrollY * 0.05 * (index + 1)}px) rotateX(${scrollY * 0.01}deg)`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  <Icon className="w-6 h-6 mb-3 text-white/60" />
                  <div className="text-3xl font-light text-white mb-1 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                  <div className="absolute bottom-2 right-2">
                    <Activity className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section id="roi" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight mb-4">
              <span className="text-white">Calculate Your </span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">ROI</span>
            </h2>
            <p className="text-white/60">See your potential returns in real-time</p>
          </div>

          <div className="relative p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl">
            {/* Holographic corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#4A9EFF]/50 rounded-br-3xl" />

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <label className="block text-sm text-white/60 mb-4">Your Current Budget</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-white/40">$</span>
                  <input
                    type="number"
                    value={roiInput}
                    onChange={(e) => setRoiInput(parseInt(e.target.value) || 0)}
                    className="w-full pl-14 pr-6 py-6 text-4xl font-light bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:border-[#D4AF37]/50 transition-all text-white"
                  />
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={roiInput}
                  onChange={(e) => setRoiInput(parseInt(e.target.value))}
                  className="w-full mt-6 accent-[#D4AF37]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-sm text-white/60 mb-2">Projected Annual Savings</div>
                <div className="text-6xl font-light bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent mb-4 tabular-nums">
                  ${formatNumber(calculatedROI)}
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-2xl font-light">+327% ROI</span>
                </div>
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">Break-even</span>
                    <span className="text-white">3.7 months</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">5-year value</span>
                    <span className="text-[#D4AF37] font-medium">${formatNumber(calculatedROI * 5)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Network Visualization */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight mb-4">
              <span className="text-white">AI That </span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">Learns</span>
            </h2>
            <p className="text-white/60">Neural network powered decision engine</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Predictive Analytics', desc: 'Forecast outcomes before they happen', delay: 0 },
              { icon: Shield, title: 'Risk Detection', desc: 'Identify threats in milliseconds', delay: 100 },
              { icon: Database, title: 'Pattern Recognition', desc: 'Learn from every decision', delay: 200 }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition-all duration-500"
                  style={{ animationDelay: `${feature.delay}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#4A9EFF]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#4A9EFF]/5 rounded-2xl transition-all duration-500" />
                  <Icon className="relative w-10 h-10 mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <h3 className="relative text-xl font-light text-white mb-3">{feature.title}</h3>
                  <p className="relative text-sm text-white/60 leading-relaxed">{feature.desc}</p>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#4A9EFF]/10 backdrop-blur-2xl border border-white/10 rounded-3xl">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-[#D4AF37]" />
            <h2 className="text-4xl md:text-6xl font-extralight mb-6">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">Transform?</span>
            </h2>
            <p className="text-white/70 mb-10 text-lg">
              Join 847 organizations already using Powalyze
            </p>
            <Link
              to="/demo-mode"
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-lg font-medium rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#D4AF37]/50"
            >
              Start Your Revolution
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/40">
            © 2025 Powalyze · Engineered in Switzerland
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
