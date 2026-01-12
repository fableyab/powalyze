import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from 'lucide-react';
import { LogoWithText } from '@/components/LogoPowalyze';

export default function Manifesto() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#020713] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/">
              <LogoWithText size="default" />
            </Link>
            <div className="flex items-center gap-10">
              <Link to="/" className="text-xs text-white/50 hover:text-white transition-all duration-500 font-light tracking-[0.15em] uppercase">
                Home
              </Link>
              <Link to="/contact" className="text-xs text-white/50 hover:text-white transition-all duration-500 font-light tracking-[0.15em] uppercase">
                Contact
              </Link>
              <Link to="/login" className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-medium hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
            <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </div>
          <h1 className="text-5xl font-extralight mb-6 tracking-tight">Le Manifeste Powalyze</h1>
          <p className="text-base text-white/50 max-w-2xl mx-auto font-light tracking-[0.02em] mb-12">
            Découvrez notre vision révolutionnaire du pilotage stratégique et de la gouvernance d'entreprise.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-4 group">
            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-[2px] overflow-hidden">
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-contain"
                poster="/powalyze-manifesto-poster.jpg"
              >
                <source src="/videos/powalyze-manifeste.mp4" type="video/mp4" />
                {/* Instructions pour l'utilisateur */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white p-8">
                  <div className="text-center max-w-md">
                    <p className="text-sm mb-4">
                      ⚠️ Vidéo non trouvée. Veuillez copier votre fichier:<br />
                      <code className="text-xs bg-white/10 px-2 py-1 rounded mt-2 inline-block">
                        C:\Users\fabri\OneDrive\Images\Powalyze _ Le Manifeste.mp4
                      </code>
                    </p>
                    <p className="text-xs text-white/60">
                      Vers: <code className="bg-white/10 px-2 py-1 rounded">public/videos/powalyze-manifeste.mp4</code>
                    </p>
                  </div>
                </div>
              </video>

              {/* Play/Pause Overlay */}
              <div 
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20"
              >
                {!isPlaying && (
                  <div className="w-20 h-20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center backdrop-blur-xl bg-[#D4AF37]/10">
                    <Play className="w-8 h-8 text-[#D4AF37] ml-1" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>

            {/* Custom Controls */}
            <div className="mt-4 space-y-3">
              {/* Progress Bar */}
              <div 
                onClick={handleSeek}
                className="w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden group/progress"
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FDE68A] transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="w-3 h-3 bg-white rounded-full float-right -mt-0.5 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 transition-all duration-500 group/btn"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors" />
                    ) : (
                      <Play className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors ml-0.5" />
                    )}
                  </button>

                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 transition-all duration-500 group/btn"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors" />
                    )}
                  </button>

                  {/* Time */}
                  <div className="text-xs text-white/40 font-mono tracking-wider">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download */}
                  <a
                    href="/videos/powalyze-manifeste.mp4"
                    download
                    className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 transition-all duration-500 group/btn"
                  >
                    <Download className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors" />
                  </a>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center hover:border-[#D4AF37]/30 transition-all duration-500 group/btn"
                  >
                    <Maximize className="w-4 h-4 text-white/60 group-hover/btn:text-[#D4AF37] transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-8">
            <h2 className="text-2xl font-light mb-4 tracking-tight">Notre Vision</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
                Dans un monde où la complexité stratégique ne cesse de croître, où les décisions doivent être prises plus rapidement que jamais,
                et où la transparence gouvernance est devenue un impératif, Powalyze s'impose comme la solution de référence pour les dirigeants visionnaires.
              </p>
              <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
                Notre manifeste révèle comment nous transformons le pilotage stratégique grâce à l'intelligence artificielle, la précision suisse,
                et une approche révolutionnaire de la gouvernance d'entreprise.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-2">
                  <h3 className="text-base font-light text-[#D4AF37]">Swiss Precision</h3>
                  <p className="text-xs text-white/50 font-light">Excellence et fiabilité horlogère appliquées au pilotage stratégique</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-light text-[#D4AF37]">AI-Powered Intelligence</h3>
                  <p className="text-xs text-white/50 font-light">Prédictions et insights pilotés par l'intelligence artificielle</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-light text-[#D4AF37]">Executive Governance</h3>
                  <p className="text-xs text-white/50 font-light">Transparence et traçabilité totale des décisions stratégiques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[2px] p-12 text-center">
            <h2 className="text-3xl font-light mb-4 tracking-tight">Ready to Transform Your Strategy?</h2>
            <p className="text-base text-white/50 mb-8 font-light">
              Join the Swiss revolution in strategic portfolio management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3.5 bg-[#D4AF37] text-black rounded-[2px] text-sm font-medium hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.15em] uppercase"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-transparent border border-white/10 rounded-[2px] text-sm font-light text-white hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all duration-500 tracking-[0.15em] uppercase"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-white/30 tracking-[0.2em] uppercase">
            Powalyze • Swiss Precision Portfolio Management
          </p>
        </div>
      </footer>
    </div>
  );
}
