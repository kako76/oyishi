import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useIsReducedMotion } from '../utils/motionVariants';
import { EnsoAccent, KanjiWatermark, WashiOverlay } from './JapaneseElements';

// Animación de entrada para las letras de OYISHI
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVisibleVariant: any = {
  hidden: { y: 40, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
  visible: {
    y: 0,
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [heroContent, setHeroContent] = useState({
    title: "Japón, servido en Fuenlabrada.",
    subtitle: "Sushi y cocina japonesa para disfrutar pieza a pieza.",
    buttonMenuText: "VER CARTA",
    buttonReserveText: "RESERVAR MESA",
    buttonOrderText: "PEDIR PARA LLEVAR",
    showButtonMenu: true,
    showButtonReserve: true,
    showButtonOrder: false // Default to false to preserve exact current visual if API fails
  });

  useEffect(() => {
    fetch('/api/web-content')
      .then(res => res.json())
      .then(data => {
        if (data && data.hero) {
          setHeroContent({
            title: data.hero.title || "Japón, servido en Fuenlabrada.",
            subtitle: data.hero.subtitle || "Sushi y cocina japonesa para disfrutar pieza a pieza.",
            buttonMenuText: data.hero.buttonMenuText || "VER CARTA",
            buttonReserveText: data.hero.buttonReserveText || "RESERVAR MESA",
            buttonOrderText: data.hero.buttonOrderText || "PEDIR PARA LLEVAR",
            showButtonMenu: data.hero.showButtonMenu !== false,
            showButtonReserve: data.hero.showButtonReserve !== false,
            showButtonOrder: data.hero.showButtonOrder === true
          });
        }
      })
      .catch(err => {
        console.error('Error fetching hero content, using fallback:', err);
      });
  }, []);

  const isReduced = useIsReducedMotion();

  const { scrollY } = useScroll();
  const yScroll = useTransform(scrollY, [0, 500], [0, 70]);
  const opacityScroll = useTransform(scrollY, [0, 400], [1, 0]);
  const textYScroll = useTransform(scrollY, [0, 400], [0, -50]);
  const videoYScroll = useTransform(scrollY, [0, 400], [0, 80]);

  // Scroll animations specific to OYISHI text
  const oyishiColorScroll = useTransform(scrollY, [0, 250, 500], ['#F6F1E8', '#E8C982', '#D8B36A']);
  const oyishiXScroll = useTransform(scrollY, [0, 500], [0, -60]);
  const oyishiScaleScroll = useTransform(scrollY, [0, 500], [1, 0.94]);
  const oyishiOpacityScroll = useTransform(scrollY, [0, 500], [1, 0.90]);

  // Disable scroll parallax when reduced motion is preferred
  const y = isReduced ? 0 : yScroll;
  const opacity = isReduced ? 1 : opacityScroll;
  const textY = isReduced ? 0 : textYScroll;
  const videoY = isReduced ? 0 : videoYScroll;
  const textColor = isReduced ? '#F6F1E8' : oyishiColorScroll;
  const oyishiX = isReduced ? 0 : oyishiXScroll;
  const oyishiScale = isReduced ? 1 : oyishiScaleScroll;
  const oyishiOpacity = isReduced ? 1 : oyishiOpacityScroll;

  const word = "OYISHI";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col lg:flex-row items-center justify-center overflow-hidden pt-24 lg:pt-0"
      style={{
        background: `
          radial-gradient(circle at 72% 40%, rgba(112, 54, 32, 0.35), transparent 45%),
          radial-gradient(circle at 25% 55%, rgba(96, 38, 29, 0.22), transparent 50%),
          linear-gradient(135deg, #16100E 0%, #201511 42%, #110D0B 100%)
        `
      }}
    >
      <WashiOverlay />
      {/* ANILLO ENSŌ VISIBLE Y ROTATORIO */}
      <EnsoAccent className="absolute right-[-2%] top-[10%] pointer-events-none z-10 hidden lg:block" size={440} opacity={0.45} />
      {/* MARCA DE AGUA KANJI "和" VISIBLE */}
      <KanjiWatermark char="和" className="absolute left-8 bottom-12 text-9xl font-display text-white/[0.08] select-none pointer-events-none font-bold hidden md:block tracking-widest drop-shadow-md z-10" />

      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Iluminación Ambiental Suave Detrás del Sushi */}
        <motion.div
          animate={isReduced ? { opacity: 0.6 } : { opacity: [0.55, 0.8, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] right-[10%] lg:right-[15%] w-[80vw] h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full blur-[140px] -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse, rgba(216, 179, 106, 0.22) 0%, transparent 65%)'
          }}
        ></motion.div>
      </div>

      {/* Degradado continuo inferior de transición entre secciones */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-oyishi-bg via-oyishi-bg/70 to-transparent z-30 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 w-full max-w-[1920px] mx-auto h-full flex flex-col lg:flex-row items-center justify-between"
      >
        {/* IZQUIERDA: CONTENIDO Y MARCA EDITORIAL (40%-50%) */}
        <motion.div
          style={{ y: textY }}
          className="w-full lg:w-[50%] flex flex-col justify-center px-6 lg:px-16 xl:px-24 xl:pl-32 mb-8 lg:mb-0 z-30 pt-8 lg:pt-0"
        >
          <div className="flex flex-col relative w-full">

            {/* OYISHI GIGANTE CON ANIMACIÓN DE COLOR Y SCROLL */}
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              style={{ x: oyishiX, scale: oyishiScale, opacity: oyishiOpacity }}
              className="relative -ml-1 md:-ml-2 overflow-visible origin-left"
            >
              <h1 className="text-[clamp(4.5rem,10.5vw,12.5rem)] leading-[0.8] font-serif flex overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] tracking-[-0.03em]">
                {word.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={isReduced ? undefined : letterVisibleVariant}
                    className="inline-block"
                    style={{
                      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                      fontWeight: letter === 'O' || letter === 'S' ? 400 : 300,
                      color: textColor
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Claim y Copy */}
            <div className="mt-8 lg:mt-12 space-y-4">
              <motion.h2
                initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl text-[#E8E4DF] font-serif italic tracking-wide"
              >
                {heroContent.title}
              </motion.h2>

              <motion.p
                initial={isReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="text-[#AFA79E] text-sm md:text-base font-light leading-relaxed max-w-[380px] drop-shadow-sm pt-2"
              >
                {heroContent.subtitle}
              </motion.p>
            </div>

            {/* Botones */}
            <motion.div
              initial={isReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-4 sm:gap-4 mt-10"
            >
              {heroContent.showButtonMenu && (
                <a
                  href="/carta"
                  className="group btn-shimmer focus-ring relative px-6 py-[16px] bg-oyishi-coral text-white font-bold tracking-[0.2em] text-[11px] uppercase overflow-hidden rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(232,93,78,0.25)] hover:shadow-[0_8px_35px_rgba(232,93,78,0.45)] hover:-translate-y-[2px] active:scale-95 text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {heroContent.buttonMenuText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
              )}
              {heroContent.showButtonReserve && (
                <a
                  href="/reservas"
                  className="group focus-ring px-6 py-[16px] border border-oyishi-gold/40 text-[#E8E4DF] font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-300 hover:bg-oyishi-gold hover:text-[#120E0C] hover:border-oyishi-gold hover:shadow-[0_4px_20px_rgba(216,179,106,0.3)] hover:-translate-y-[2px] active:scale-95 flex items-center justify-center gap-3 text-center bg-transparent backdrop-blur-sm rounded-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <CalendarCheck size={14} className="text-oyishi-gold group-hover:text-[#120E0C] transition-colors" />
                    {heroContent.buttonReserveText}
                  </span>
                </a>
              )}
              {heroContent.showButtonOrder && (
                <a
                  href="/carta"
                  className="group focus-ring px-6 py-[16px] border border-oyishi-border text-oyishi-textSec font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:-translate-y-[2px] active:scale-95 flex items-center justify-center gap-3 text-center bg-transparent backdrop-blur-sm rounded-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {heroContent.buttonOrderText}
                  </span>
                </a>
              )}
            </motion.div>

          </div>
        </motion.div>

        {/* DERECHA: VIDEO CINEMATOGRÁFICO (50-60%) */}
        <motion.div
          style={{ y: videoY }}
          className="w-[100vw] lg:w-[50%] xl:w-[60%] h-[50vh] lg:h-full relative flex items-center justify-center lg:justify-end lg:-ml-12 overflow-hidden"
        >
          <div className="relative w-full h-full lg:max-h-[100%] lg:w-[125%] flex items-center justify-center overflow-visible">
            <video
              src="/images/hero/oyishi-sushi-build.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero/oyishi-sushi-poster.webp"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
