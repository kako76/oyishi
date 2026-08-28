import React from 'react';
import { motion } from 'framer-motion';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';
import { JapaneseVerticalDivider, KanjiWatermark, WashiOverlay } from './JapaneseElements';

export const AnatomyOfFlavor: React.FC = () => {
  const isReduced = useIsReducedMotion();


  return (
    <section id="filosofia" className="py-28 bg-oyishi-bgSec relative overflow-hidden border-b border-oyishi-border/60">
      <WashiOverlay />
      <KanjiWatermark char="匠" className="absolute right-12 top-16 text-9xl font-display text-white/[0.025] select-none pointer-events-none font-bold hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: LUXE_EASE }}
          className="text-center mb-16"
        >
          <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.35em] uppercase mb-3 block">
            Filosofía Gastronómica
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">
            EL RESPETO POR EL PRODUCTO
          </h2>
          <p className="text-oyishi-textSec max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Seleccionamos cada pieza con el máximo rigor nipón. Sin atajos: desde la precisión de corte hasta el equilibrio exacto del sazonado.
          </p>
        </motion.div>

        {/* MÓDULO CINEMATOGRÁFICO DE VÍDEO "TRADICIÓN ITAMAE" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">

          {/* Columna Izquierda: VÍDEO CINEMATOGRÁFICO */}
          <div className="lg:col-span-7">
            <motion.div
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: LUXE_EASE }}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-oyishi-border/80 group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src="/images/hero/Eliminar_letras_y_completar_sushi_202608282022.mp4"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="text-xs font-sans text-oyishi-gold tracking-[0.2em] uppercase font-medium bg-oyishi-bg/85 px-4 py-1.5 rounded-full border border-oyishi-gold/30 backdrop-blur-md shadow-md">
                  Tradición Itamae
                </span>
                <span className="text-[11px] font-mono text-oyishi-textSec tracking-widest uppercase">
                  Fuenlabrada • Madrid
                </span>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha de Puntos Editoriales */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pl-0 lg:pl-6">
            <JapaneseVerticalDivider height="h-10" className="self-start hidden lg:flex my-0 mb-4" />

            <div className="border-l-2 border-oyishi-gold/40 pl-6 space-y-2">
              <span className="text-xs font-sans text-oyishi-gold uppercase tracking-[0.25em] font-medium">01 • Calidad de Origen</span>
              <h3 className="text-2xl font-display text-oyishi-text">Pescado Seleccionado</h3>
              <p className="text-oyishi-textSec text-sm font-light leading-relaxed">
                Salmón noruego de textura mantecosa y atún de pesca sostenible, preparados diariamente antes de cada servicio.
              </p>
            </div>

            <div className="border-l-2 border-oyishi-gold/40 pl-6 space-y-2">
              <span className="text-xs font-sans text-oyishi-gold uppercase tracking-[0.25em] font-medium">02 • Equilibrio del Shari</span>
              <h3 className="text-2xl font-display text-oyishi-text">Arroz Sazonado con Vinagre Noble</h3>
              <p className="text-oyishi-textSec text-sm font-light leading-relaxed">
                Cocinamos nuestro arroz en grano corto a la temperatura corporal justa, sazonado con nuestra receta propia de vinagre de arroz y sal pura.
              </p>
            </div>

            <div className="border-l-2 border-oyishi-gold/40 pl-6 space-y-2">
              <span className="text-xs font-sans text-oyishi-gold uppercase tracking-[0.25em] font-medium">03 • Presentación Ceremonial</span>
              <h3 className="text-2xl font-display text-oyishi-text">Detalle y Armonía</h3>
              <p className="text-oyishi-textSec text-sm font-light leading-relaxed">
                Emplatado minimalista pensado para deleitar la vista antes de conquistar el paladar.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
