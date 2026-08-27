import React from 'react';
import { CalendarCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { restaurantInfo } from '../data/oyishi/restaurant';

export const ReservationForm: React.FC = () => {
  return (
    <section id="reservas" className="py-24 bg-oyishi-bgSec relative overflow-hidden border-b border-oyishi-border/60">
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at right, #D8B36A 0%, transparent 65%)' }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-oyishi-card border border-oyishi-border rounded-2xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center">
          <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-3 block">Experiencia Ceremonial</span>
          <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4">RESERVAR UNA MESA</h3>
          <p className="text-oyishi-textSec text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
            Disfruta de la auténtica gastronomía japonesa en nuestro restaurante en Fuenlabrada. Realiza tu reserva en tiempo real a través del sistema oficial OYISHI.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-lg mx-auto mb-4">
            <a 
              href={restaurantInfo.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer focus-ring w-full sm:w-auto px-8 py-4 bg-oyishi-gold text-[#120E0C] font-mono font-semibold tracking-[0.15em] text-xs uppercase rounded transition-all duration-300 shadow-[0_4px_20px_rgba(216,179,106,0.3)] flex items-center justify-center gap-2"
            >
              <CalendarCheck size={16} />
              <span>RESERVAR MESA (SISTEMA OFICIAL)</span>
              <ExternalLink size={14} className="opacity-80" />
            </a>

            <a 
              href={`tel:+34${restaurantInfo.phones[0].replace(/\s+/g, '')}`}
              className="focus-ring w-full sm:w-auto px-6 py-4 border border-oyishi-border hover:border-oyishi-gold text-oyishi-text flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase rounded transition-colors"
            >
              <PhoneCall size={15} className="text-oyishi-gold" />
              <span>Llamar: {restaurantInfo.phones[0]}</span>
            </a>
          </div>

          <p className="text-[11px] font-mono text-oyishi-textSec/70 tracking-wider uppercase mb-10">
            Reserva a través del sistema oficial de OYISHI
          </p>

          <div className="pt-8 border-t border-oyishi-border/40 text-xs font-mono text-oyishi-textSec flex flex-wrap justify-center gap-6">
            <span>Tel. Fijo: <a href={`tel:+34${restaurantInfo.phones[0].replace(/\s+/g, '')}`} className="text-oyishi-text hover:text-oyishi-gold transition-colors">{restaurantInfo.phones[0]}</a></span>
            <span>·</span>
            <span>Móvil: <a href={`tel:+34${restaurantInfo.phones[1].replace(/\s+/g, '')}`} className="text-oyishi-text hover:text-oyishi-gold transition-colors">{restaurantInfo.phones[1]}</a></span>
            <span>·</span>
            <span>Dirección: Calle Leganés 42, Fuenlabrada</span>
          </div>
        </div>
      </div>
    </section>
  );
};
