import React from 'react';
import { CalendarCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { restaurantInfo } from '../data/oyishi/restaurant';
import { motion } from 'framer-motion';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';
import { KanjiWatermark, WashiOverlay } from './JapaneseElements';

export const ReservationForm: React.FC = () => {
  const isReduced = useIsReducedMotion();

  return (
    <section id="reservas" className="py-24 bg-oyishi-bgSec relative overflow-hidden border-b border-oyishi-border/60">
      <WashiOverlay />
      <KanjiWatermark char="席" className="absolute right-8 bottom-8 text-9xl font-display text-white/[0.02] select-none pointer-events-none font-bold hidden md:block" />
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at right, #D8B36A 0%, transparent 65%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: LUXE_EASE }}
          className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center"
        >
          <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">Experiencia Ceremonial</span>
          <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">RESERVAR UNA MESA</h3>
          <p className="text-oyishi-textSec text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
            Disfruta de la auténtica gastronomía japonesa en nuestro restaurante en Fuenlabrada. Realiza tu reserva en tiempo real a través del sistema oficial OYISHI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-4">
            <a
              href={restaurantInfo.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer focus-ring w-full sm:w-auto px-6 py-4 bg-oyishi-coral hover:bg-oyishi-coralHover text-white font-sans font-semibold tracking-[0.15em] text-xs uppercase rounded-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(232,93,78,0.35)] flex items-center justify-center gap-2 min-h-[44px]"
            >
              <CalendarCheck size={16} />
              <span>SISTEMA OFICIAL DE RESERVAS</span>
              <ExternalLink size={14} className="opacity-80" />
            </a>

            <a
              href={`https://wa.me/34699365212?text=${encodeURIComponent("Hola OYISHI, me gustaría reservar mesa...")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold text-xs tracking-wider uppercase rounded-sm transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-md min-h-[44px]"
            >
              <span>RESERVAR POR WHATSAPP</span>
            </a>

            <a
              href={`tel:+34${restaurantInfo.phones[0].replace(/\s+/g, '')}`}
              className="focus-ring w-full sm:w-auto px-6 py-4 border border-oyishi-border hover:border-oyishi-gold/60 hover:text-oyishi-gold text-oyishi-text flex items-center justify-center gap-2 font-sans font-semibold text-xs tracking-wider uppercase rounded-sm transition-all hover:-translate-y-0.5 active:scale-95 min-h-[44px]"
            >
              <PhoneCall size={15} className="text-oyishi-gold" />
              <span>{restaurantInfo.phones[0]}</span>
            </a>
          </div>

          <p className="text-[11px] font-sans text-oyishi-textSec/70 tracking-wider uppercase mb-10">
            Reserva directa confirmada a través del sistema oficial OYISHI
          </p>

          <div className="pt-8 border-t border-oyishi-border/40 text-xs font-sans text-oyishi-textSec flex flex-wrap justify-center gap-6">
            <span>Tel. Fijo: <a href={`tel:+34${restaurantInfo.phones[0].replace(/\s+/g, '')}`} className="text-oyishi-text hover:text-oyishi-gold transition-colors font-mono">{restaurantInfo.phones[0]}</a></span>
            <span>·</span>
            <span>Móvil: <a href={`tel:+34${restaurantInfo.phones[1].replace(/\s+/g, '')}`} className="text-oyishi-text hover:text-oyishi-gold transition-colors font-mono">{restaurantInfo.phones[1]}</a></span>
            <span>·</span>
            <span>Calle Leganés 42, Fuenlabrada</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationForm;
