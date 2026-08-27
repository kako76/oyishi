import React from 'react';
import { menuData, categories } from '../data/oyishi';
import { ArrowRight, Plus, Sparkles, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { motion } from 'framer-motion';
import { isValidFoodImage } from '../utils/imageUtils';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const FeaturedProductsSection: React.FC = () => {
  const { addToCart } = useCart();

  // 8 productos destacados reales (con imagen de plato válida)
  const selectionProducts = menuData.filter(p => isValidFoodImage(p.imageUrl)).slice(0, 8);

  // 2 bandejas reales para composición asimétrica
  const bandejasProducts = menuData.filter(p => p.category.toUpperCase().includes('BANDEJAS') && isValidFoodImage(p.imageUrl)).slice(0, 2);

  // Menús del día
  const menuDiaProducts = menuData.filter(p => p.category.toUpperCase().includes('MENÚ')).slice(0, 2);

  return (
    <>
      {/* 1. EXPLORA OYISHI (Categorías Editoriales en 4 columnas amplias) */}
      <section className="py-24 bg-oyishi-bg border-b border-oyishi-border/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-3 block">Categorías</span>
            <h2 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">EXPLORA OYISHI</h2>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-xl mx-auto font-light">
              Gastronomía nipona organizada con precisión y maestría.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.slice(0, 8).map(cat => {
              const catProduct = menuData.find(p => p.category === cat && isValidFoodImage(p.imageUrl));
              const hasValidPhoto = isValidFoodImage(catProduct?.imageUrl);
              
              return (
                <motion.a 
                  key={cat}
                  variants={fadeInUp}
                  href={`/carta?categoria=${encodeURIComponent(cat)}`}
                  className="group focus-ring relative h-64 bg-oyishi-card border border-oyishi-border/60 rounded-xl overflow-hidden block transition-all duration-500 hover:border-oyishi-gold/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
                >
                  {hasValidPhoto && catProduct?.imageUrl ? (
                    <img 
                      src={catProduct.imageUrl} 
                      alt={cat} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1A1513] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-xl mb-3 shadow-[0_0_20px_rgba(216,179,106,0.2)]">
                        和
                      </div>
                      <span className="font-mono text-[11px] tracking-[0.25em] text-oyishi-gold uppercase">OYISHI GASTRONOMÍA</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/40 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                    <div>
                      <span className="text-[10px] font-mono text-oyishi-gold/80 tracking-widest uppercase block mb-1">Familia</span>
                      <span className="font-mono text-sm md:text-base tracking-wider text-oyishi-text uppercase font-semibold group-hover:text-oyishi-gold transition-colors">
                        {cat}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-oyishi-bg/80 border border-oyishi-border/80 flex items-center justify-center text-oyishi-gold group-hover:bg-oyishi-gold group-hover:text-[#120E0C] group-hover:border-oyishi-gold transition-all duration-300">
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 2. SELECCIÓN OYISHI (Productos Destacados con Superficie Editorial Refinada) */}
      <section className="py-24 bg-oyishi-bgSec border-b border-oyishi-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-3 block flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-oyishi-gold" /> Carta Destacada
            </span>
            <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">SELECCIÓN OYISHI</h3>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-xl mx-auto font-light">
              Una selección representativa de la propuesta gastronómica de OYISHI.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {selectionProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group relative bg-oyishi-card border border-oyishi-border/70 rounded-xl overflow-hidden hover:border-oyishi-gold/50 transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)] flex flex-col h-full"
              >
                {/* Superficie Piedra Japonesa / Marfil Cálido (#F7F3EE -> #EDE7DF) */}
                {item.imageUrl && (
                  <div className="w-full h-52 relative overflow-hidden border-b border-oyishi-border/40 bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] flex items-center justify-center p-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out" 
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
                        className="w-full min-h-[44px] py-2.5 bg-oyishi-bgSec border border-oyishi-border/80 rounded flex items-center justify-center gap-2 text-oyishi-text hover:border-oyishi-gold hover:text-oyishi-gold transition-all duration-300 group/btn focus-ring"
                      >
                        <Plus size={15} className="group-hover/btn:rotate-90 transition-transform duration-300 text-oyishi-gold" />
                        <span className="font-mono text-xs tracking-widest uppercase font-medium">Añadir</span>
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
              className="btn-shimmer focus-ring px-10 py-4 bg-oyishi-coral text-white font-bold tracking-[0.2em] text-xs uppercase rounded transition-all duration-300 shadow-[0_4px_20px_rgba(232,93,78,0.25)] hover:shadow-[0_8px_35px_rgba(232,93,78,0.45)] hover:-translate-y-0.5"
            >
              VER CARTA COMPLETA
            </a>
            <span className="text-oyishi-textSec text-xs font-mono tracking-wide">
              Explora los {menuData.length} productos de OYISHI.
            </span>
          </div>
        </div>
      </section>

      {/* 4. BANDEJAS Y COMBINADOS (Composición Editorial Asimétrica: Protagonista 65% / Secundario 35%) */}
      {bandejasProducts.length > 0 && (
        <section className="py-24 bg-oyishi-bg border-b border-oyishi-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Para Compartir</span>
                <h3 className="text-3xl md:text-5xl font-display text-oyishi-text tracking-tight">BANDEJAS Y COMBINADOS</h3>
              </div>
              <a 
                href="/carta?categoria=BANDEJAS"
                className="group focus-ring flex items-center gap-2 text-oyishi-gold font-mono tracking-widest text-xs uppercase hover:text-white transition-colors py-2"
              >
                Ver todas las bandejas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Bandeja Protagonista (7 cols en lg = 58-60%) */}
              {bandejasProducts[0] && (
                <div className="lg:col-span-7 relative min-h-[460px] rounded-2xl overflow-hidden group border border-oyishi-border hover:border-oyishi-gold/50 transition-all duration-500 shadow-2xl flex flex-col justify-end">
                  {bandejasProducts[0].imageUrl && (
                    <img 
                      src={bandejasProducts[0].imageUrl} 
                      alt={bandejasProducts[0].name} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/75 to-transparent"></div>
                  <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 self-start uppercase mb-3 backdrop-blur-sm">
                      Bandeja Protagonista
                    </span>
                    <h4 className="font-display text-3xl md:text-4xl text-white mb-3">{bandejasProducts[0].name}</h4>
                    {bandejasProducts[0].description && (
                      <p className="text-oyishi-textSec text-sm md:text-base mb-6 max-w-xl font-light leading-relaxed">
                        {bandejasProducts[0].description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <span className="font-mono text-3xl font-semibold text-oyishi-gold">{bandejasProducts[0].price.toFixed(2)}€</span>
                      <button 
                        onClick={() => addToCart(bandejasProducts[0])}
                        className="btn-shimmer focus-ring px-8 py-3.5 bg-oyishi-coral text-white font-mono tracking-widest text-xs uppercase rounded transition-all duration-300 hover:bg-oyishi-coralHover shadow-lg"
                      >
                        Añadir a la comanda
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bandeja Secundaria (5 cols en lg = 40-42%) */}
              {bandejasProducts[1] && (
                <div className="lg:col-span-5 relative min-h-[460px] rounded-2xl overflow-hidden group border border-oyishi-border hover:border-oyishi-gold/50 transition-all duration-500 shadow-2xl flex flex-col justify-end">
                  {bandejasProducts[1].imageUrl && (
                    <img 
                      src={bandejasProducts[1].imageUrl} 
                      alt={bandejasProducts[1].name} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/75 to-transparent"></div>
                  <div className="relative z-10 p-8 flex flex-col justify-end">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 self-start uppercase mb-3 backdrop-blur-sm">
                      Combinado Selección
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl text-white mb-2">{bandejasProducts[1].name}</h4>
                    {bandejasProducts[1].description && (
                      <p className="text-oyishi-textSec text-sm mb-6 font-light leading-relaxed line-clamp-3">
                        {bandejasProducts[1].description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="font-mono text-2xl font-semibold text-oyishi-gold">{bandejasProducts[1].price.toFixed(2)}€</span>
                      <button 
                        onClick={() => addToCart(bandejasProducts[1])}
                        className="btn-shimmer focus-ring px-6 py-3 bg-oyishi-coral text-white font-mono tracking-widest text-xs uppercase rounded transition-all duration-300 hover:bg-oyishi-coralHover shadow-lg"
                      >
                        Añadir a la comanda
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. MENÚ DEL DÍA (Composición Compacta en 2 Columnas) */}
      {menuDiaProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-oyishi-bgSec border-b border-oyishi-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-oyishi-card border border-oyishi-border rounded-2xl p-8 md:p-12 shadow-2xl">
              
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oyishi-gold/10 border border-oyishi-gold/30 text-oyishi-gold text-xs font-mono uppercase tracking-widest mb-4 self-start">
                  <UtensilsCrossed size={14} /> Fórmula Mediodía
                </div>
                <h3 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4 tracking-tight">MENÚ DEL DÍA</h3>
                <p className="text-oyishi-textSec text-sm md:text-base font-light leading-relaxed mb-6">
                  Fórmulas completas y equilibradas elaboradas a diario con pescado fresco e ingredientes seleccionados.
                </p>

                <ul className="space-y-2.5 mb-8 text-xs font-mono text-oyishi-textSec">
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
                    className="btn-shimmer focus-ring inline-flex items-center gap-3 px-8 py-3.5 border border-oyishi-gold/60 text-oyishi-gold hover:bg-oyishi-gold hover:text-[#120E0C] font-mono tracking-widest text-xs uppercase transition-all duration-300 rounded"
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
                <span className="font-mono text-xs text-oyishi-gold tracking-[0.2em] uppercase mb-1">Tradición Diaria</span>
                <p className="font-serif italic text-oyishi-textSec text-sm max-w-xs mb-4">
                  "Equilibrio, frescura y sabor nipón en cada servicio de mediodía."
                </p>
                <span className="text-[11px] font-mono text-oyishi-textSec/70 bg-oyishi-bg/80 px-3 py-1 rounded border border-oyishi-border/50 uppercase tracking-wider">
                  De Lunes a Viernes (Laborables)
                </span>
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedProductsSection;
