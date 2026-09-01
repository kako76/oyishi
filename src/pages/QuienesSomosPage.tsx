import React from 'react';
import { useCatalog } from '../hooks/useCatalog';
import { restaurantInfo } from '../data/oyishi/restaurant';
import { ArrowRight, Sparkles, CalendarCheck, Utensils, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWebContent } from '../hooks/useWebContent';
import { useSEO } from '../hooks/useSEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const QuienesSomosPage: React.FC = () => {
  const { menuData } = useCatalog();
  const { config } = useWebContent();
  
  const title = config?.about?.title || "QUIÉNES SOMOS";
  const mainText = config?.about?.mainText || "Filosofía & Esencia";
  const secondaryText = config?.about?.secondaryText || "En <strong class=\"text-oyishi-text font-medium\">OYISHI</strong> combinamos la disciplina de la cocina tradicional japonesa con el rigor en la selección del producto. Ubicados en <strong class=\"text-oyishi-text font-medium\">Fuenlabrada (Calle Leganés 42)</strong>, nuestro compromiso es ofrecer una propuesta gastronómica honesta, fresca y equilibrada para cada ocasión.";
  const showSection = config?.about?.showSection !== false;

  useSEO({
    title: 'Quiénes Somos | OYISHI Fuenlabrada',
    description: 'Conoce la filosofía, la dedicación y la historia detrás de OYISHI. Nuestra misión es ofrecer gastronomía japonesa auténtica en el sur de Madrid.',
    path: '/quienes-somos'
  });

  // Selección de imágenes oficiales reales para los bloques visuales
  const featuredBandeja = menuData.find(p => p.category.toUpperCase().includes('BANDEJAS') && p.imageUrl);
  const featuredNigiri = menuData.find(p => p.category.toUpperCase().includes('NIGIRI') && p.imageUrl);
  const featuredSashimi = menuData.find(p => p.category.toUpperCase().includes('SASHIMI') && p.imageUrl);

  if (!showSection) {
    return (
      <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text flex items-center justify-center">
        <h1 className="text-2xl font-display tracking-widest text-oyishi-textSec uppercase">Sección no disponible</h1>
      </main>
    );
  }

  return (
    <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text">

      {/* 1. HERO / INTRODUCCIÓN EDITORIAL */}
      <section className="py-16 md:py-24 border-b border-oyishi-border/60 bg-oyishi-bgSec/40 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #D8B36A 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">
              {mainText}
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-oyishi-text mb-6 tracking-tight">
              {title}
            </h1>
            <div className="w-16 h-0.5 bg-oyishi-gold mx-auto mb-8 opacity-80" />

            {/* We use dangerouslySetInnerHTML safely only for the bold formatting that might be there natively or just render raw text */}
            <p className="text-oyishi-textSec text-base md:text-xl font-light leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: secondaryText.replace(/\n/g, '<br />') }} />
          </motion.div>
        </div>
      </section>

      {/* 2. BLOQUE VISUAL (Fotografías Oficiales del Catálogo) */}
      <section className="py-20 bg-oyishi-bg border-b border-oyishi-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Foto 1 */}
            {featuredBandeja?.imageUrl && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative h-80 rounded-lg overflow-hidden border border-oyishi-border bg-oyishi-card shadow-xl"
              >
                <img
                  src={featuredBandeja.imageUrl}
                  alt="Gastronomía OYISHI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-sans font-medium text-oyishi-gold uppercase tracking-widest block">Elaboración Diaria</span>
                  <p className="text-sm font-display text-oyishi-text">Combinados y Bandejas Especiales</p>
                </div>
              </motion.div>
            )}

            {/* Foto 2 */}
            {featuredNigiri?.imageUrl && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative h-80 rounded-lg overflow-hidden border border-oyishi-border bg-oyishi-card shadow-xl"
              >
                <img
                  src={featuredNigiri.imageUrl}
                  alt="Corte y Técnica"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-sans font-medium text-oyishi-gold uppercase tracking-widest block">Técnica de Corte</span>
                  <p className="text-sm font-display text-oyishi-text">Nigiris Tradicionales</p>
                </div>
              </motion.div>
            )}

            {/* Foto 3 */}
            {featuredSashimi?.imageUrl && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative h-80 rounded-lg overflow-hidden border border-oyishi-border bg-oyishi-card shadow-xl"
              >
                <img
                  src={featuredSashimi.imageUrl}
                  alt="Materia Prima"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-sans font-medium text-oyishi-gold uppercase tracking-widest block">Pescado Fresco</span>
                  <p className="text-sm font-display text-oyishi-text">Sashimi y Cortes Puros</p>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* 3. FILOSOFÍA DE COCINA (3 PILARES FUNDAMENTALES) */}
      <section className="py-24 bg-oyishi-bgSec border-b border-oyishi-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">Nuestros Valores</span>
            <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">FILOSOFÍA DE TRABAJO</h2>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-xl mx-auto font-light">
              Tres pilares editoriales que guían nuestra labor diaria en cocina y servicio.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Pilar 1: Producto */}
            <motion.div
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 hover:border-oyishi-gold/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-3">01. PRODUCTO</h3>
                <p className="text-oyishi-textSec text-sm leading-relaxed font-light mb-4">
                  Selección rigurosa de materias primas y pescado fresco. Garantizamos trazabilidad y frescura en cada pieza servida a nuestros comensales.
                </p>
              </div>
              <span className="text-[11px] font-sans text-oyishi-gold/80 tracking-widest uppercase block pt-4 border-t border-oyishi-border/40 font-medium">
                Calidad Garantizada
              </span>
            </motion.div>

            {/* Pilar 2: Precisión */}
            <motion.div
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 hover:border-oyishi-gold/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <Utensils size={24} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-3">02. PRECISIÓN</h3>
                <p className="text-oyishi-textSec text-sm leading-relaxed font-light mb-4">
                  Respeto absoluto por las proporciones, el sazonado exacto del arroz de sushi (shari) y los cortes limpios para preservar la textura de cada ingrediente.
                </p>
              </div>
              <span className="text-[11px] font-sans text-oyishi-gold/80 tracking-widest uppercase block pt-4 border-t border-oyishi-border/40 font-medium">
                Técnica Tradicional
              </span>
            </motion.div>

            {/* Pilar 3: Experiencia */}
            <motion.div
              variants={fadeInUp}
              className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 hover:border-oyishi-gold/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-display text-2xl text-oyishi-text mb-3">03. EXPERIENCIA</h3>
                <p className="text-oyishi-textSec text-sm leading-relaxed font-light mb-4">
                  Tanto en nuestro acogedor comedor de Fuenlabrada como en servicio para llevar, nos esmeramos en ofrecer una atención cercana y rápida.
                </p>
              </div>
              <span className="text-[11px] font-sans text-oyishi-gold/80 tracking-widest uppercase block pt-4 border-t border-oyishi-border/40 font-medium">
                Atención Cercana
              </span>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* 4. PROPUESTA GASTRONÓMICA */}
      <section className="py-24 bg-oyishi-bg border-b border-oyishi-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">Nuestra Oferta</span>
              <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-6 tracking-tight">VARIEDAD DE LA CARTA</h2>
              <p className="text-oyishi-textSec text-sm md:text-base font-light leading-relaxed mb-6">
                Nuestra carta abarca más de 150 especialidades clasificadas en familias gastronómicas tradicionales y contemporáneas:
              </p>

              <div className="flex flex-col gap-3 font-sans text-xs text-oyishi-textSec mb-8">
                <div className="flex items-center gap-3 p-3 bg-oyishi-card rounded-sm border border-oyishi-border/50">
                  <span className="w-2 h-2 rounded-full bg-oyishi-gold shrink-0"></span>
                  <span><strong className="text-oyishi-text">Sushi, Nigiri, Uramaki & Maki:</strong> Variedad de pescados y toppings.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-oyishi-card rounded-sm border border-oyishi-border/50">
                  <span className="w-2 h-2 rounded-full bg-oyishi-gold shrink-0"></span>
                  <span><strong className="text-oyishi-text">Sashimi & Tartar:</strong> Cortes limpios de salmón, atún y pescado blanco.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-oyishi-card rounded-sm border border-oyishi-border/50">
                  <span className="w-2 h-2 rounded-full bg-oyishi-gold shrink-0"></span>
                  <span><strong className="text-oyishi-text">Platos Calientes:</strong> Gyozas, Ramen, Tempuras y Teppanyaki.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-oyishi-card rounded-sm border border-oyishi-border/50">
                  <span className="w-2 h-2 rounded-full bg-oyishi-gold shrink-0"></span>
                  <span><strong className="text-oyishi-text">Bandejas & Menú del Día:</strong> Fórmulas ideales para compartir o almorzar.</span>
                </div>
              </div>

              <a
                href="/carta"
                className="btn-shimmer focus-ring inline-flex items-center gap-3 px-8 py-3.5 bg-oyishi-coral text-white font-sans font-semibold text-xs uppercase tracking-widest rounded-sm shadow-lg hover:bg-oyishi-coralHover transition-all duration-300 min-h-[44px]"
              >
                EXPLORAR CARTA COMPLETA <ArrowRight size={15} />
              </a>
            </div>

            <div className="lg:col-span-7 bg-[#1A1513] border border-oyishi-border/80 rounded-xl p-8 md:p-12 shadow-2xl relative">
              <div className="absolute top-6 right-6 w-10 h-10 rounded-sm border border-oyishi-gold/40 bg-oyishi-gold/10 text-oyishi-gold flex items-center justify-center font-display text-lg font-bold">
                和
              </div>

              <span className="text-[10px] font-sans text-oyishi-gold tracking-[0.25em] uppercase font-medium block mb-2">Compromiso OYISHI</span>
              <h3 className="text-2xl md:text-3xl font-display text-oyishi-text mb-4">Cocina Honesta en Fuenlabrada</h3>
              <p className="text-oyishi-textSec text-sm md:text-base font-light leading-relaxed mb-8">
                Preparamos cada comanda al momento garantizando la textura adecuada del arroz y el maridaje de salsas tradicionales.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-oyishi-border/60 font-sans text-xs text-oyishi-text">
                <div>
                  <span className="text-oyishi-gold font-medium block mb-1">UBICACIÓN</span>
                  <span>Calle Leganés 42, Fuenlabrada</span>
                </div>
                <div>
                  <span className="text-oyishi-gold font-medium block mb-1">RESERVAS Y CONTACTO</span>
                  <span className="font-mono">{restaurantInfo.phones[0]}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CTA Y RESERVAS */}
      <section className="py-20 bg-oyishi-bgSec">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-8 md:p-12 shadow-2xl">
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-3 block">Te Esperamos</span>
            <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">VIVE LA EXPERIENCIA OYISHI</h2>
            <p className="text-oyishi-textSec text-sm md:text-base font-light max-w-lg mx-auto mb-8">
              Reserva tu mesa en nuestro restaurante de Fuenlabrada o realiza tu pedido online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/carta"
                className="btn-shimmer focus-ring px-8 py-3.5 border border-oyishi-gold/60 text-oyishi-gold hover:bg-oyishi-gold hover:text-[#120E0C] font-sans text-xs tracking-widest uppercase rounded-sm font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                VER LA CARTA
              </a>

              <a
                href={restaurantInfo.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer focus-ring px-8 py-3.5 bg-oyishi-coral text-white font-sans text-xs tracking-widest uppercase rounded-sm font-bold shadow-lg hover:bg-oyishi-coralHover transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <CalendarCheck size={16} />
                <span>RESERVAR MESA (SISTEMA OFICIAL)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default QuienesSomosPage;
