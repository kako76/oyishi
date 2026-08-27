import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

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
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-oyishi-bg/95 backdrop-blur-md border-b border-oyishi-border/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
          : 'bg-gradient-to-b from-[#120E0C]/95 via-[#120E0C]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="group flex items-center gap-3 focus-ring rounded-full p-1">
              <div className="w-10 h-10 rounded-full bg-oyishi-gold text-[#120E0C] flex items-center justify-center font-display text-xl font-bold shadow-[0_0_15px_rgba(216,179,106,0.3)] group-hover:scale-105 transition-transform duration-300">
                和
              </div>
              <div className="flex flex-col">
                <h1 className="font-display text-2xl font-bold tracking-widest text-oyishi-text group-hover:text-oyishi-gold transition-colors leading-none">
                  OYISHI
                </h1>
                <span className="text-[9px] font-mono tracking-[0.25em] text-oyishi-gold/90 uppercase mt-0.5">
                  Gastronomía Japonesa
                </span>
              </div>
            </a>
            
            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 ml-4 px-3.5 py-1.5 rounded-full bg-oyishi-card/80 border border-oyishi-border text-[11px] font-mono backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-oyishi-textSec">Abierto · 12:00-16:30 | 19:30-24:00</span>
            </div>
          </div>

          {/* Desktop Nav with slightly increased legibility (+10% size) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="focus-ring text-[13px] uppercase tracking-[0.18em] font-mono font-medium text-oyishi-text hover:text-oyishi-gold transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:+34918626221" 
              className="hidden sm:flex items-center gap-2 text-xs font-mono font-medium text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring px-3.5 py-2 rounded-full border border-oyishi-border/80 bg-oyishi-card/60"
              title="Llamar a OYISHI Fuenlabrada"
            >
              <PhoneCall size={14} className="text-oyishi-gold shrink-0" />
              <span className="tracking-wider">918 626 221</span>
            </a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring rounded-full bg-oyishi-card/80 border border-oyishi-border/80"
              aria-label={`Ver cesta con ${totalItems} productos`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-oyishi-coral rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-text hover:text-oyishi-gold focus-ring rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú de navegación"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-oyishi-card border-b border-oyishi-border backdrop-blur-xl shadow-2xl"
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
              <div className="flex items-center gap-3 mt-4 text-xs font-mono text-oyishi-textSec">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Horario: 12:00-16:30 | 19:30-24:00</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
