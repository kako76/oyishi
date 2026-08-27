import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';

// Animación de entrada para las letras de OYISHI
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVisibleVariant: any = {
  hidden: { y: 60, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
  visible: {
    y: 0,
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animación de color continuo
const colorAnimation: any = {
  animate: {
    color: ['#F6F1E8', '#D8B36A', '#E67A61', '#F6F1E8'],
    transition: {
      duration: 12,
      ease: "linear",
      repeat: Infinity,
    }
  }
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -60]);

  const handleCanPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      await video.play();
    } catch (error) {
      console.error("OYISHI HERO VIDEO PLAY ERROR", error);
    }
  };

  const word = "OYISHI";

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col lg:flex-row items-center justify-center overflow-hidden pt-24 lg:pt-0"
      style={{
        background: `
          radial-gradient(circle at 72% 40%, rgba(112, 54, 32, 0.32), transparent 42%),
          radial-gradient(circle at 25% 55%, rgba(96, 38, 29, 0.18), transparent 48%),
          linear-gradient(135deg, #191310 0%, #241713 42%, #14100e 100%)
        `
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Iluminación Ambiental Suave Detrás del Sushi */}
        <motion.div 
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] right-[10%] lg:right-[15%] w-[80vw] h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full blur-[140px] -translate-y-1/2"
          style={{ 
            background: 'radial-gradient(ellipse, rgba(198, 132, 69, 0.15) 0%, transparent 60%)' 
          }}
        ></motion.div>

        {/* Textura ambiental: grano cinematográfico sutil */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

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
            
            {/* OYISHI GIGANTE CON ANIMACIÓN DE COLOR */}
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              className="relative -ml-1 md:-ml-2 overflow-visible"
            >
              <h1 className="text-[clamp(4.5rem,10.5vw,12.5rem)] leading-[0.8] font-serif flex overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] tracking-[-0.03em]">
                {word.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVisibleVariant}
                    className="inline-block"
                    style={{
                      fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                      fontWeight: letter === 'O' || letter === 'S' ? 400 : 300,
                    }}
                  >
                    <motion.span
                      variants={colorAnimation}
                      animate="animate"
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Claim y Copy */}
            <div className="mt-8 lg:mt-12 space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="text-2xl md:text-3xl text-[#E8E4DF] font-serif italic tracking-wide"
              >
                Japón, servido en Fuenlabrada.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="text-[#AFA79E] text-sm md:text-base font-light leading-relaxed max-w-[380px] drop-shadow-sm pt-2"
              >
                Sushi y cocina japonesa para disfrutar pieza a pieza.
              </motion.p>
            </div>

            {/* Botones */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mt-10"
            >
              <a 
                href="/carta"
                className="group btn-shimmer focus-ring relative px-8 py-[18px] bg-oyishi-coral text-white font-bold tracking-[0.2em] text-[11px] uppercase overflow-hidden rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(232,93,78,0.25)] hover:shadow-[0_8px_35px_rgba(232,93,78,0.45)] hover:-translate-y-[2px] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  VER CARTA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              <a 
                href="/reservas"
                className="group focus-ring px-8 py-[18px] border border-oyishi-gold/40 text-[#E8E4DF] font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-300 hover:bg-oyishi-gold hover:text-[#120E0C] hover:border-oyishi-gold hover:shadow-[0_4px_20px_rgba(216,179,106,0.3)] hover:-translate-y-[2px] flex items-center justify-center gap-3 text-center bg-transparent backdrop-blur-sm rounded-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <CalendarCheck size={14} className="text-oyishi-gold group-hover:text-[#120E0C] transition-colors" />
                  RESERVAR MESA
                </span>
              </a>
            </motion.div>

          </div>
        </motion.div>

        {/* DERECHA: VIDEO CINEMATOGRÁFICO (50-60%) */}
        <motion.div 
          className="w-[100vw] lg:w-[50%] xl:w-[60%] h-[50vh] lg:h-full relative flex items-center justify-center lg:justify-end lg:-ml-12"
        >
          <div className="relative w-full h-full lg:max-h-[100%] lg:w-[125%] flex items-center justify-center overflow-visible pointer-events-none">
            
            {/* Máscara suave lateral izquierda (gradient) para fundir el borde del vídeo con el fondo */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#17110e] via-[#17110e]/60 to-transparent z-10 opacity-80 pointer-events-none"></div>

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              loop={false}
              onCanPlay={handleCanPlay}
              poster="/images/hero/oyishi-sushi-poster.webp"
              className="w-full h-full object-cover object-[center_35%] scale-[1.17] lg:scale-[1.18] transform-gpu mix-blend-lighten opacity-95"
              style={{ 
                maskImage: 'radial-gradient(ellipse at 65% 50%, black 45%, transparent 80%)', 
                WebkitMaskImage: 'radial-gradient(ellipse at 65% 50%, black 45%, transparent 80%)' 
              }}
            >
              <source src="/images/hero/oyishi-sushi-build.mp4" type="video/mp4" />
            </video>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
