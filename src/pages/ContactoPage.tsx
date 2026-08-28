import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { restaurantInfo } from '../data/oyishi/restaurant';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export const ContactoPage: React.FC = () => {
  useSEO({
    title: 'Contacto | OYISHI Fuenlabrada',
    description: 'Contacta con OYISHI Fuenlabrada. Encuentra nuestro teléfono, email, horario de apertura y dirección para visitarnos o hacer consultas.',
    path: '/contacto'
  });

  return (
    <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text">

      {/* HERO SECTION */}
      <section className="py-16 md:py-20 bg-oyishi-bgSec/40 border-b border-oyishi-border/60 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #D8B36A 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">
              Atención al Cliente
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-oyishi-text mb-4 tracking-tight">
              CONTACTO
            </h1>
            <div className="w-16 h-0.5 bg-oyishi-gold mx-auto mb-6 opacity-80" />
            <p className="text-oyishi-textSec text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              Ponte en contacto con OYISHI Fuenlabrada para cualquier duda, reserva o consulta sobre nuestro servicio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT DETAILS & CARDS */}
      <section className="py-20 bg-oyishi-bg border-b border-oyishi-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/* Phone Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 shadow-xl hover:border-oyishi-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <Phone size={22} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-2">TELÉFONOS</h3>
                <p className="text-oyishi-textSec text-xs font-sans uppercase tracking-wider mb-4 font-medium">Líneas Directas</p>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-oyishi-text"><a href="tel:+34918626221" className="hover:text-oyishi-gold transition-colors">918 626 221</a></p>
                  <p className="text-oyishi-text"><a href="tel:+34699365212" className="hover:text-oyishi-gold transition-colors">699 365 212</a></p>
                </div>
              </div>
              <div className="pt-6 border-t border-oyishi-border/40 mt-6">
                <a
                  href="tel:+34918626221"
                  className="btn-shimmer focus-ring w-full py-3 bg-oyishi-coral text-white font-sans text-xs uppercase tracking-wider rounded-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-oyishi-coralHover transition-all min-h-[44px]"
                >
                  <Phone size={14} />
                  <span>LLAMAR AHORA</span>
                </a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 shadow-xl hover:border-oyishi-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <Mail size={22} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-2">EMAIL</h3>
                <p className="text-oyishi-textSec text-xs font-sans uppercase tracking-wider mb-4 font-medium">Correo Electrónico</p>
                <p className="font-mono text-sm text-oyishi-text"><a href="mailto:info@oyishi.es" className="hover:text-oyishi-gold transition-colors">info@oyishi.es</a></p>
              </div>
              <div className="pt-6 border-t border-oyishi-border/40 mt-6">
                <a
                  href="mailto:info@oyishi.es"
                  className="btn-shimmer focus-ring w-full py-3 border border-oyishi-gold/50 text-oyishi-gold font-sans text-xs uppercase tracking-wider rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-oyishi-gold hover:text-[#120E0C] transition-all min-h-[44px]"
                >
                  <Send size={14} />
                  <span>ENVIAR MENSAJE</span>
                </a>
              </div>
            </motion.div>

            {/* Ubicación Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 shadow-xl hover:border-oyishi-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <MapPin size={22} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-2">DIRECCIÓN</h3>
                <p className="text-oyishi-textSec text-xs font-sans uppercase tracking-wider mb-4 font-medium">Fuenlabrada</p>
                <p className="text-oyishi-text text-sm font-light leading-relaxed">
                  Calle Leganés 42<br />
                  28945 Fuenlabrada, Madrid
                </p>
              </div>
              <div className="pt-6 border-t border-oyishi-border/40 mt-6">
                <a
                  href={restaurantInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer focus-ring w-full py-3 border border-oyishi-border text-oyishi-text font-sans text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 hover:border-oyishi-gold hover:text-oyishi-gold transition-all min-h-[44px]"
                >
                  <MapPin size={14} />
                  <span>VER MAPA</span>
                </a>
              </div>
            </motion.div>

          </div>

          {/* MAPA EMBED */}
          <div className="bg-[#1A1513] border border-oyishi-border/80 rounded-xl overflow-hidden shadow-2xl p-4">
            <div className="flex items-center gap-3 p-4 border-b border-oyishi-border/40 font-sans text-xs text-oyishi-gold font-medium">
              <Clock size={16} />
              <span>HORARIO DE ATENCIÓN: DE LUNES A DOMINGO (12:00-16:30 | 19:30-24:00)</span>
            </div>
            <div className="h-80 w-full relative">
              <iframe
                title="Ubicación de OYISHI Fuenlabrada"
                src="https://maps.google.com/maps?q=Calle%20Legan%C3%A9s%2042,%2028945%20Fuenlabrada,%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 contrast-[1.05] brightness-[0.85] grayscale-[0.8] invert-[0.9] hue-rotate-[180deg] opacity-85 hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default ContactoPage;
