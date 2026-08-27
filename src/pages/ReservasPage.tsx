import React from 'react';
import { Phone, MapPin, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { restaurantInfo } from '../data/oyishi/restaurant';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export const ReservasPage: React.FC = () => {
  useSEO({
    title: 'Reservas | OYISHI Fuenlabrada',
    description: 'Reserva tu mesa en OYISHI Fuenlabrada. Llámanos a nuestro teléfono de reservas y asegura tu espacio para disfrutar de nuestra gastronomía japonesa.',
    path: '/reservas'
  });

  return (
    <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text">
      
      {/* HEADER SECTION */}
      <section className="py-16 md:py-20 bg-oyishi-bgSec/40 border-b border-oyishi-border/60 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #D8B36A 0%, transparent 70%)' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-3 block">
              Atención Directa
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-oyishi-text mb-4 tracking-tight">
              RESERVAR MESA
            </h1>
            <div className="w-16 h-0.5 bg-oyishi-gold mx-auto mb-6 opacity-80" />
            <p className="text-oyishi-textSec text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              Atendemos las reservas por vía telefónica directamente en nuestro restaurante de Fuenlabrada para confirmar disponibilidad y mesa en tiempo real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RESERVATION OPTIONS & CARDS */}
      <section className="py-20 bg-oyishi-bg border-b border-oyishi-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Primary Phone Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-gold/40 rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:border-oyishi-gold transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-oyishi-gold/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <span className="text-[11px] font-mono text-oyishi-gold uppercase tracking-widest block mb-2">Teléfono Principal</span>
                <h3 className="font-display text-3xl text-oyishi-text mb-4">918 626 221</h3>
                <p className="text-oyishi-textSec text-sm font-light leading-relaxed mb-8">
                  Llámanos directamente para reservar tu mesa, solicitar trona para niños o consultar requerimientos especiales.
                </p>
              </div>

              <a 
                href="tel:+34918626221"
                className="btn-shimmer focus-ring w-full py-4 bg-oyishi-gold text-[#120E0C] font-mono font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-3 shadow-lg hover:bg-white transition-all duration-300"
              >
                <Phone size={16} />
                <span>LLAMAR AL 918 626 221</span>
              </a>
            </motion.div>

            {/* Secondary Phone Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:border-oyishi-gold/50 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-oyishi-card border border-oyishi-border text-oyishi-gold flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <span className="text-[11px] font-mono text-oyishi-gold uppercase tracking-widest block mb-2">Teléfono Móvil</span>
                <h3 className="font-display text-3xl text-oyishi-text mb-4">699 365 212</h3>
                <p className="text-oyishi-textSec text-sm font-light leading-relaxed mb-8">
                  Línea secundaria disponible durante el horario comercial para consultas de reservas y grupos.
                </p>
              </div>

              <a 
                href="tel:+34699365212"
                className="btn-shimmer focus-ring w-full py-4 border border-oyishi-gold/50 text-oyishi-gold font-mono font-semibold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-3 hover:bg-oyishi-gold hover:text-[#120E0C] transition-all duration-300"
              >
                <Phone size={16} />
                <span>LLAMAR AL 699 365 212</span>
              </a>
            </motion.div>

          </div>

          {/* INFORMACIÓN DE HORARIO Y UBICACIÓN */}
          <div className="bg-[#1A1513] border border-oyishi-border/80 rounded-2xl p-8 md:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-oyishi-card border border-oyishi-border rounded-lg text-oyishi-gold shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-mono text-xs text-oyishi-gold uppercase tracking-wider mb-2">HORARIO COMERCIAL</h4>
                <p className="text-oyishi-text font-medium mb-1">De Lunes a Domingo</p>
                <p className="text-oyishi-textSec font-mono text-xs">12:00 – 16:30 (Almuerzo)</p>
                <p className="text-oyishi-textSec font-mono text-xs mt-1">19:30 – 24:00 (Cena)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-oyishi-card border border-oyishi-border rounded-lg text-oyishi-gold shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-mono text-xs text-oyishi-gold uppercase tracking-wider mb-2">DIRECCIÓN</h4>
                <p className="text-oyishi-text font-medium leading-snug mb-1">Calle Leganés 42</p>
                <p className="text-oyishi-textSec font-mono text-xs">28945 Fuenlabrada, Madrid</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-oyishi-card border border-oyishi-border rounded-lg text-oyishi-gold shrink-0">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-mono text-xs text-oyishi-gold uppercase tracking-wider mb-2">RECOMENDACIÓN</h4>
                <p className="text-oyishi-textSec font-light leading-relaxed text-xs">
                  Para noches de fin de semana (viernes a domingo) recomendamos llamar con antelación para asegurar disponibilidad de sala.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* MAPA Y UBICACIÓN COMPACTA */}
      <section className="py-16 bg-oyishi-bgSec">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-3 block">¿Cómo Llegar?</span>
          <h2 className="text-2xl md:text-3xl font-display text-oyishi-text mb-6">NUESTRO RESTAURANTE EN FUENLABRADA</h2>
          
          <div className="rounded-2xl overflow-hidden border border-oyishi-border/80 h-72 shadow-2xl relative mb-8">
            <iframe 
              title="Ubicación OYISHI Fuenlabrada"
              src="https://maps.google.com/maps?q=Calle%20Legan%C3%A9s%2042,%2028945%20Fuenlabrada,%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
          </div>

          <div className="flex justify-center gap-4">
            <a 
              href={restaurantInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer focus-ring px-6 py-3 border border-oyishi-border bg-oyishi-card text-oyishi-text hover:border-oyishi-gold hover:text-oyishi-gold font-mono text-xs tracking-widest uppercase rounded transition-all duration-300 flex items-center gap-2"
            >
              <MapPin size={14} />
              <span>ABRIR EN GOOGLE MAPS</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ReservasPage;
