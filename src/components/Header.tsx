import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurantInfo } from '../data/oyishi/restaurant';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, badgeAnimationKey } = useCart();
  const isReduced = useIsReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Carta', href: '/carta' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'Reservas', href: '/reservas' },
    { name: 'Puntos', href: restaurantInfo.pointsUrl },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-[#140F0C]/90 backdrop-blur-md border-b border-oyishi-border/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-gradient-to-b from-[#120E0C]/95 via-[#120E0C]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="group flex items-center gap-3 focus-ring rounded-sm p-1">
              <div className="w-9 h-9 rounded-sm border border-oyishi-gold/40 bg-oyishi-gold/10 text-oyishi-gold flex items-center justify-center font-display text-lg font-bold shadow-[0_0_12px_rgba(216,179,106,0.2)] group-hover:scale-105 transition-transform duration-300">
                和
              </div>
              <div className="flex flex-col">
                <h1 className="font-display text-2xl font-bold tracking-[0.25em] text-oyishi-text group-hover:text-oyishi-gold transition-colors leading-none">
                  OYISHI
                </h1>
                <span className="text-[9px] font-sans tracking-[0.25em] text-oyishi-textSec uppercase mt-1">
                  Gastronomía Japonesa
                </span>
              </div>
            </a>

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 rounded-sm bg-oyishi-card/60 border border-oyishi-border/80 text-[11px] font-sans backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90"></span>
              <span className="text-oyishi-textSec">Abierto · {restaurantInfo.schedule.replace('De Lunes a Domingo: ', '')}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative focus-ring text-[12px] uppercase tracking-[0.22em] font-sans font-medium text-oyishi-textSec hover:text-oyishi-text transition-colors py-1.5 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-oyishi-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:+34${restaurantInfo.phones[0].replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-2 text-xs font-sans font-medium text-oyishi-textSec hover:text-oyishi-text transition-all duration-300 focus-ring px-3.5 py-2 rounded-sm border border-oyishi-border/80 bg-oyishi-card/60 group hover:border-oyishi-gold/60 hover:shadow-[0_0_12px_rgba(216,179,106,0.15)]"
              title="Llamar a OYISHI Fuenlabrada"
            >
              <PhoneCall size={14} className="text-oyishi-gold shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span className="tracking-wider">{restaurantInfo.phones[0]}</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring rounded-sm bg-oyishi-card/80 border border-oyishi-border/80"
              aria-label={`Ver cesta con ${totalItems} productos`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  key={badgeAnimationKey}
                  initial={isReduced ? { scale: 1 } : { scale: 0.8 }}
                  animate={isReduced ? { scale: 1 } : { scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-oyishi-coral rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-text hover:text-oyishi-gold focus-ring rounded-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={isReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={isReduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={isReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: LUXE_EASE }}
            className="md:hidden bg-oyishi-card border-b border-oyishi-border backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 pt-4 pb-8 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-display tracking-wider text-oyishi-text hover:text-oyishi-gold transition-colors py-3.5 min-h-[44px] flex items-center border-b border-oyishi-border/40"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-4 text-xs font-sans text-oyishi-textSec">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90"></span>
                <span>Horario: {restaurantInfo.schedule.replace('De Lunes a Domingo: ', '')}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
