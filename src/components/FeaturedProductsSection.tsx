import React from 'react';
import { menuData, categories } from '../data/oyishi';
import { ArrowRight, Plus, Sparkles, UtensilsCrossed, CheckCircle2, Award } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion } from 'framer-motion';
import { isValidFoodImage } from '../utils/imageUtils';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';
import { EnsoAccent, JapaneseVerticalDivider, KanjiWatermark, WashiOverlay } from './JapaneseElements';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: LUXE_EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const FeaturedProductsSection: React.FC = () => {
  const { addToCart } = useCart();
  const isReduced = useIsReducedMotion();

  // 8 productos destacados reales (con imagen de plato válida)
  const selectionProducts = menuData.filter(p => isValidFoodImage(p.imageUrl)).slice(0, 8);

  // Producto estrella para romper la retícula (Break the grid)
  const heroDish = selectionProducts[0] || menuData[0];
  const secondaryDishes = selectionProducts.slice(1, 3);

  // 2 bandejas reales para composición asimétrica
  const bandejasProducts = menuData.filter(p => p.category.toUpperCase().includes('BANDEJAS') && isValidFoodImage(p.imageUrl)).slice(0, 2);

  // Menús del día
  const menuDiaProducts = menuData.filter(p => p.category.toUpperCase().includes('MENÚ')).slice(0, 2);

  return (
    <>
      {/* 1. EXPLORA OYISHI (Categorías con Sensación de Objeto Físico y Fondo Sumi) */}
      <section className="py-24 bg-oyishi-bg border-b border-oyishi-border/60 relative overflow-hidden">
        <WashiOverlay />
        <EnsoAccent className="absolute left-[-4%] top-[20%] pointer-events-none z-0 hidden lg:block opacity-20" size={380} />
        <KanjiWatermark char="和" className="absolute right-10 top-12 text-9xl font-display text-white/[0.02] select-none pointer-events-none font-bold hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={isReduced ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.35em] uppercase mb-3 block">
              Familias Gastronómicas
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">
              EXPLORA OYISHI
            </h2>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-xl mx-auto font-light">
              Gastronomía nipona organizada con precisión y maestría.
            </p>
          </motion.div>

          <motion.div
            initial={isReduced ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={isReduced ? undefined : staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.slice(0, 8).map(cat => {
              const catProduct = menuData.find(p => p.category === cat && isValidFoodImage(p.imageUrl))
                || menuData.find(p => p.category.toUpperCase().includes('MENÚ') && isValidFoodImage(p.imageUrl));
              const hasValidPhoto = isValidFoodImage(catProduct?.imageUrl);

              return (
                <motion.a
                  key={cat}
                  variants={isReduced ? undefined : fadeInUp}
                  href={`/carta?categoria=${encodeURIComponent(cat)}`}
                  className="group focus-ring relative h-72 bg-oyishi-card border border-oyishi-border/80 rounded-2xl overflow-hidden block transition-all duration-500 hover:border-oyishi-gold/80 hover:shadow-[0_20px_50px_rgba(216,179,106,0.18)] hover:-translate-y-1.5 shadow-xl"
                >
                  {hasValidPhoto && catProduct?.imageUrl ? (
                    <ImageWithSkeleton
                      src={catProduct.imageUrl}
                      alt={cat}
                      zoomOnHover={true}
                      containerClassName="absolute inset-0 w-full h-full"
                      className="opacity-55 group-hover:opacity-85 transition-opacity duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1A1513] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-xl mb-3 shadow-[0_0_20px_rgba(216,179,106,0.2)]">
                        和
                      </div>
                      <span className="font-sans text-[11px] tracking-[0.25em] text-oyishi-gold uppercase">OYISHI GASTRONOMÍA</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none group-hover:from-black transition-colors duration-500"></div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                    <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-[10px] font-sans font-medium text-oyishi-gold/80 tracking-widest uppercase block mb-1">Familia</span>
                      <span className="font-sans text-base md:text-lg tracking-wider text-oyishi-text uppercase font-semibold group-hover:text-oyishi-gold transition-colors drop-shadow-md">
                        {cat}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-oyishi-bg/80 border border-oyishi-border/80 flex items-center justify-center text-oyishi-gold group-hover:bg-oyishi-gold group-hover:text-[#120E0C] group-hover:border-oyishi-gold group-hover:shadow-[0_0_15px_rgba(216,179,106,0.5)] transition-all duration-300">
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 2. SECCIÓN DESTACADA (BREAK THE GRID - SELECCIÓN DE AUTOR) */}
      {heroDish && (
        <section className="py-24 bg-[#140F0C] border-b border-oyishi-border/60 relative overflow-hidden">
          <WashiOverlay />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <JapaneseVerticalDivider height="h-10" className="mb-6" />

            <div className="text-center mb-16">
              <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.35em] uppercase mb-3 block flex items-center justify-center gap-2">
                <Award size={15} className="text-oyishi-gold" /> Selección de Autor
              </span>
              <h3 className="text-3xl md:text-5xl font-display text-oyishi-text tracking-tight">
                CREACIÓN DESTACADA
              </h3>
            </div>

            {/* Asymmetric Editorial Showcase Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Main Large Hero Dish Card */}
              <motion.div
                initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: LUXE_EASE }}
                className="lg:col-span-7 bg-oyishi-card border border-oyishi-border rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group hover:border-oyishi-gold/50 transition-all duration-500"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] font-sans font-medium tracking-[0.25em] text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 uppercase">
                    Plato Insignia
                  </span>
                  <span className="font-mono text-xs text-oyishi-textSec uppercase tracking-widest">
                    {heroDish.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 order-2 md:order-1">
                    <h4 className="font-display text-2xl md:text-3xl text-oyishi-text mb-3 leading-snug">
                      {heroDish.name}
                    </h4>
                    {heroDish.description && (
                      <p className="text-oyishi-textSec text-sm font-light leading-relaxed mb-6">
                        {heroDish.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-oyishi-border/60">
                      <div>
                        <span className="text-[10px] font-sans font-medium text-oyishi-gold/80 block uppercase tracking-widest">Precio</span>
                        <span className="font-mono text-2xl font-bold text-oyishi-gold">{heroDish.price.toFixed(2)}€</span>
                      </div>
                      <button
                        onClick={() => addToCart(heroDish)}
                        className="btn-shimmer focus-ring px-6 py-3 bg-oyishi-coral text-white font-sans tracking-widest text-xs uppercase rounded-sm transition-all duration-300 hover:bg-oyishi-coralHover hover:-translate-y-0.5 active:scale-95 shadow-lg font-bold flex items-center gap-2"
                      >
                        <Plus size={15} />
                        <span>AÑADIR A LA COMANDA</span>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-6 order-1 md:order-2">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] p-4 border border-oyishi-border/40 shadow-inner flex items-center justify-center">
                      <img
                        src={heroDish.imageUrl}
                        alt={heroDish.name}
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Stacked Dishes Column */}
              <div className="lg:col-span-5 space-y-6">
                {secondaryDishes.map((dish, idx) => (
                  <motion.div
                    key={dish.id}
                    initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: LUXE_EASE, delay: idx * 0.15 }}
                    className="bg-oyishi-card border border-oyishi-border/70 rounded-xl p-5 shadow-xl flex items-center gap-5 group hover:border-oyishi-gold/50 transition-all duration-300"
                  >
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] p-2 border border-oyishi-border/40 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans text-oyishi-gold uppercase tracking-wider block mb-1">{dish.category}</span>
                      <h5 className="font-display text-base text-oyishi-text truncate mb-1 group-hover:text-oyishi-gold transition-colors">{dish.name}</h5>
                      <span className="font-mono text-sm font-semibold text-oyishi-gold block mb-3">{dish.price.toFixed(2)}€</span>
                      <button
                        onClick={() => addToCart(dish)}
                        className="text-[11px] font-sans font-medium text-oyishi-textSec hover:text-oyishi-gold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Plus size={13} className="text-oyishi-gold" /> Añadir a comanda
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 3. SELECCIÓN OYISHI (Productos Destacados con Superficie Editorial Refinada) */}
      <section className="py-24 bg-oyishi-bgSec border-b border-oyishi-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={isReduced ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.3em] uppercase mb-3 block flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-oyishi-gold" /> Carta Destacada
            </span>
            <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">SELECCIÓN OYISHI</h3>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-xl mx-auto font-light">
              Una selección representativa de la propuesta gastronómica de OYISHI.
            </p>
          </motion.div>

          <motion.div
            initial={isReduced ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={isReduced ? undefined : staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {selectionProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={isReduced ? undefined : fadeInUp}
                className="group relative bg-oyishi-card border border-oyishi-border/70 rounded-xl overflow-hidden hover:border-oyishi-gold/50 transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Superficie Piedra Japonesa / Marfil Cálido */}
                {item.imageUrl && (
                  <div className="w-full h-52 relative overflow-hidden border-b border-oyishi-border/40 bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] flex items-center justify-center p-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <h4 className="font-display text-lg text-oyishi-text group-hover:text-oyishi-gold transition-colors leading-snug">
                        {item.name}
                      </h4>
                      <span className="font-mono text-base font-semibold text-oyishi-gold whitespace-nowrap">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>

                    {item.pieces && (
                      <span className="inline-block text-[10px] font-mono text-oyishi-gold/90 bg-oyishi-gold/10 px-2 py-0.5 rounded border border-oyishi-gold/20 mb-3 tracking-wider uppercase">
                        {item.pieces} {item.pieces === 1 ? 'Pieza' : 'Piezas'}
                      </span>
                    )}

                    {item.description && (
                      <p className="text-oyishi-textSec text-xs md:text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Alérgenos discretos */}
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.allergens.map((alg, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 border border-oyishi-border/40 bg-oyishi-bg/80 rounded text-[9px] text-oyishi-textSec font-mono uppercase tracking-wider">
                            {alg}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-oyishi-border/40">
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full min-h-[44px] py-2.5 bg-oyishi-bgSec border border-oyishi-border/80 rounded-sm flex items-center justify-center gap-2 text-oyishi-text hover:border-oyishi-gold hover:text-oyishi-gold hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group/btn focus-ring"
                      >
                        <Plus size={15} className="group-hover/btn:rotate-90 transition-transform duration-300 text-oyishi-gold" />
                        <span className="font-sans text-xs tracking-widest uppercase font-semibold">Añadir</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center flex flex-col items-center gap-3">
            <a
              href="/carta"
              className="btn-shimmer focus-ring px-10 py-4 bg-oyishi-coral text-white font-sans font-bold tracking-[0.2em] text-xs uppercase rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(232,93,78,0.25)] hover:shadow-[0_8px_35px_rgba(232,93,78,0.45)] hover:-translate-y-0.5 active:scale-95"
            >
              VER CARTA COMPLETA
            </a>
            <span className="text-oyishi-textSec text-xs font-sans tracking-wide">
              Explora los {menuData.length} productos de OYISHI.
            </span>
          </div>
        </div>
      </section>

      {/* 3. BANDEJAS Y COMBINADOS */}
      {bandejasProducts.length > 0 && (
        <section className="py-24 bg-oyishi-bg border-b border-oyishi-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: LUXE_EASE }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
            >
              <div>
                <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Para Compartir</span>
                <h3 className="text-3xl md:text-5xl font-display text-oyishi-text tracking-tight">BANDEJAS Y COMBINADOS</h3>
              </div>
              <a
                href="/carta?categoria=BANDEJAS"
                className="group focus-ring flex items-center gap-2 text-oyishi-gold font-sans font-medium tracking-widest text-xs uppercase hover:text-white transition-colors py-2"
              >
                Ver todas las bandejas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>

            <motion.div
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: LUXE_EASE, delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Bandeja Protagonista */}
              {bandejasProducts[0] && (
                <div className="lg:col-span-7 relative min-h-[460px] rounded-2xl overflow-hidden group border border-oyishi-border hover:border-oyishi-gold/50 transition-all duration-500 shadow-2xl flex flex-col justify-end">
                  {bandejasProducts[0].imageUrl && (
                    <ImageWithSkeleton
                      src={bandejasProducts[0].imageUrl}
                      alt={bandejasProducts[0].name}
                      zoomOnHover={true}
                      containerClassName="absolute inset-0 w-full h-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/75 to-transparent pointer-events-none"></div>
                  <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 uppercase backdrop-blur-sm">
                        Bandeja Protagonista
                      </span>
                      {bandejasProducts[0].pieces && (
                        <span className="text-[10px] font-sans font-semibold tracking-wider text-white bg-oyishi-coral/80 px-2.5 py-1 rounded-full uppercase backdrop-blur-sm">
                          {bandejasProducts[0].pieces} Piezas
                        </span>
                      )}
                      <span className="text-[10px] font-sans font-medium tracking-wider text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/30 uppercase backdrop-blur-sm">
                        Ideal para compartir
                      </span>
                    </div>

                    <h4 className="font-display text-3xl md:text-4xl text-white mb-3">{bandejasProducts[0].name}</h4>
                    {bandejasProducts[0].description && (
                      <p className="text-oyishi-textSec text-sm md:text-base mb-6 max-w-xl font-light leading-relaxed">
                        {bandejasProducts[0].description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-[10px] font-sans font-medium text-oyishi-gold/80 block uppercase tracking-widest">Precio total</span>
                        <span className="font-mono text-3xl font-bold text-oyishi-gold">{bandejasProducts[0].price.toFixed(2)}€</span>
                      </div>
                      <button
                        onClick={() => addToCart(bandejasProducts[0])}
                        className="btn-shimmer focus-ring min-h-[44px] px-8 py-3.5 bg-oyishi-coral text-white font-sans tracking-widest text-xs uppercase rounded-sm transition-all duration-300 hover:bg-oyishi-coralHover hover:-translate-y-0.5 active:scale-95 shadow-lg font-bold flex items-center gap-2"
                      >
                        <Plus size={16} />
                        <span>AÑADIR BANDEJA</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bandeja Secundaria */}
              {bandejasProducts[1] && (
                <div className="lg:col-span-5 relative min-h-[460px] rounded-2xl overflow-hidden group border border-oyishi-border hover:border-oyishi-gold/50 transition-all duration-500 shadow-2xl flex flex-col justify-end">
                  {bandejasProducts[1].imageUrl && (
                    <ImageWithSkeleton
                      src={bandejasProducts[1].imageUrl}
                      alt={bandejasProducts[1].name}
                      zoomOnHover={true}
                      containerClassName="absolute inset-0 w-full h-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/75 to-transparent pointer-events-none"></div>
                  <div className="relative z-10 p-8 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 uppercase backdrop-blur-sm">
                        Combinado Selección
                      </span>
                      {bandejasProducts[1].pieces && (
                        <span className="text-[10px] font-sans font-semibold tracking-wider text-white bg-oyishi-coral/80 px-2.5 py-1 rounded-full uppercase backdrop-blur-sm">
                          {bandejasProducts[1].pieces} Piezas
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-2xl md:text-3xl text-white mb-2">{bandejasProducts[1].name}</h4>
                    {bandejasProducts[1].description && (
                      <p className="text-oyishi-textSec text-sm mb-6 font-light leading-relaxed line-clamp-3">
                        {bandejasProducts[1].description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-[10px] font-sans font-medium text-oyishi-gold/80 block uppercase tracking-widest">Precio</span>
                        <span className="font-mono text-2xl font-bold text-oyishi-gold">{bandejasProducts[1].price.toFixed(2)}€</span>
                      </div>
                      <button
                        onClick={() => addToCart(bandejasProducts[1])}
                        className="btn-shimmer focus-ring min-h-[44px] px-6 py-3 bg-oyishi-coral text-white font-sans tracking-widest text-xs uppercase rounded-sm transition-all duration-300 hover:bg-oyishi-coralHover hover:-translate-y-0.5 active:scale-95 shadow-lg font-bold flex items-center gap-2"
                      >
                        <Plus size={15} />
                        <span>AÑADIR</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. MENÚ DEL DÍA */}
      {menuDiaProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-oyishi-bgSec border-b border-oyishi-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: LUXE_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-oyishi-card border border-oyishi-border rounded-2xl p-8 md:p-12 shadow-2xl"
            >

              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oyishi-gold/10 border border-oyishi-gold/30 text-oyishi-gold text-xs font-sans font-medium uppercase tracking-widest mb-4 self-start">
                  <UtensilsCrossed size={14} /> Fórmula Mediodía
                </div>
                <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">MENÚ DEL DÍA</h3>
                <p className="text-oyishi-textSec text-sm md:text-base font-light leading-relaxed mb-6">
                  Fórmulas completas y equilibradas elaboradas a diario con pescado fresco e ingredientes seleccionados.
                </p>

                <ul className="space-y-2.5 mb-8 text-xs font-sans text-oyishi-textSec">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-oyishi-gold shrink-0" />
                    <span>Primer plato + Segundo plato + Bebida y Postre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-oyishi-gold shrink-0" />
                    <span>Disponible en horario de almuerzo (12:00 – 16:30)</span>
                  </li>
                </ul>

                <div>
                  <a
                    href="/carta?categoria=MENÚ DEL DÍA"
                    className="btn-shimmer focus-ring inline-flex items-center gap-3 px-8 py-3.5 border border-oyishi-gold/60 text-oyishi-gold hover:bg-oyishi-gold hover:text-[#120E0C] font-sans font-semibold tracking-widest text-xs uppercase transition-all duration-300 hover:-translate-y-0.5 active:scale-95 rounded-sm"
                  >
                    CONSULTAR MENÚ DEL DÍA <ArrowRight size={15} />
                  </a>
                </div>
              </div>

              {/* Columna Derecha Editorial */}
              <div className="lg:col-span-5 bg-[#1A1513] border border-oyishi-border/60 rounded-xl p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
                <div className="w-12 h-12 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/30 text-oyishi-gold flex items-center justify-center font-display text-xl mb-3">
                  和
                </div>
                <span className="font-sans text-xs text-oyishi-gold tracking-[0.2em] uppercase mb-1 font-medium">Tradición Diaria</span>
                <p className="font-serif italic text-oyishi-textSec text-sm max-w-xs mb-4">
                  "Equilibrio, frescura y sabor nipón en cada servicio de mediodía."
                </p>
                <span className="text-[11px] font-sans text-oyishi-textSec/70 bg-oyishi-bg/80 px-3 py-1 rounded-sm border border-oyishi-border/50 uppercase tracking-wider">
                  De Lunes a Viernes (Laborables)
                </span>
              </div>

            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedProductsSection;
