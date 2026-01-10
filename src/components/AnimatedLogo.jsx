import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Logo from './Logo';

/**
 * Logo animé GSAP ultra-premium
 * 
 * Animations :
 * - Fade-in avec slide-up (y: -10 → 0)
 * - Scale subtil (0.96 → 1 → 1.04 pulsé)
 * - Blur dynamique (6px → 0px)
 * - Respiration lente (pulse toutes les 12s)
 * 
 * Easing : power3.out pour un rendu Swiss-grade
 */
const AnimatedLogo = ({ className, size = "default", textVisible = true }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    // 1. Animation d'entrée premium (fade + slide + scale + blur)
    gsap.fromTo(
      el,
      { 
        opacity: 0,
        y: -10, 
        scale: 0.96,
        filter: "blur(6px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // 2. Animation de respiration (pulse subtil toutes les 12s)
    gsap.to(el, {
      scale: 1.04,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.2
    });
  }, []);

  return (
    <Link to="/" className="block">
      <div
        ref={logoRef}
        className="select-none cursor-pointer opacity-100"
        style={{ willChange: 'transform' }}
      >
        <Logo 
          className={className} 
          size={size} 
          textVisible={textVisible} 
        />
      </div>
    </Link>
  );
};

export default AnimatedLogo;
