import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCatalog } from '../hooks/useCatalog';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidFoodImage } from '../utils/imageUtils';

export const InteractiveMenu: React.FC = () => {
  const { menuData, categories } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'right' ? 200 : -200, behavior: 'smooth' });
  };

  const allCategories = ['Todos', ...categories];

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    
    if (!searchQuery.trim()) return matchesCategory;

    const searchLower = searchQuery.trim().toLowerCase();
    
    // Exact match for reference to avoid 41 matching 41A
    const matchesReference = item.reference && item.reference.toLowerCase() === searchLower;
    
    const matchesText = item.name.toLowerCase().includes(searchLower) ||
                        (item.description && item.description.toLowerCase().includes(searchLower));
                        
    return matchesCategory && (matchesReference || matchesText);
  });

  return (
    <section id="carta" className="py-24 bg-oyishi-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-4">Carta Oficial</h2>
          <h3 className="text-4xl md:text-5xl font-display text-oyishi-text mb-6">Pedido Online</h3>
          <p className="text-oyishi-textSec max-w-2xl mx-auto font-light">
            Selección gastronómica de OYISHI Fuenlabrada. Añade los platos a tu comanda para gestionar tu pedido.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre, ingrediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-oyishi-bgSec border border-[#2D2D36] rounded-md px-4 py-3 text-oyishi-text focus:outline-none focus:border-oyishi-gold transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="relative mb-12">
          {/* Left arrow */}
          <button
            aria-label="Desplazar categorías a la izquierda"
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-oyishi-bgSec border border-[#2D2D36] text-oyishi-textSec hover:text-oyishi-gold hover:border-oyishi-gold transition-all duration-300 shadow-lg ${
              canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Left gradient fade */}
          <div
            className="absolute left-0 top-0 bottom-4 w-14 z-[5] pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to right, var(--color-oyishi-bg, #0F0E0C) 0%, transparent 100%)',
              opacity: canScrollLeft ? 1 : 0,
            }}
          />

          {/* Scrollable list */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide gap-4 px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full font-mono text-sm transition-all duration-300 focus-ring ${
                  activeCategory === cat
                  ? 'bg-oyishi-gold text-oyishi-bg shadow-[0_0_15px_rgba(201,162,39,0.4)] font-semibold'
                  : 'bg-oyishi-bgSec text-oyishi-textSec hover:text-oyishi-text hover:bg-[#2D2D36]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right gradient fade */}
          <div
            className="absolute right-0 top-0 bottom-4 w-14 z-[5] pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to left, var(--color-oyishi-bg, #0F0E0C) 0%, transparent 100%)',
              opacity: canScrollRight ? 1 : 0,
            }}
          />

          {/* Right arrow */}
          <button
            aria-label="Desplazar categorías a la derecha"
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-oyishi-bgSec border border-[#2D2D36] text-oyishi-textSec hover:text-oyishi-gold hover:border-oyishi-gold transition-all duration-300 shadow-lg ${
              canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredMenu.map((item) => {
              const hasValidPhoto = isValidFoodImage(item.imageUrl);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-oyishi-bgSec border border-[#2D2D36] rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  {hasValidPhoto ? (
                    <div className="w-full h-48 relative overflow-hidden border-b border-[#2D2D36] bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] flex items-center justify-center p-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 relative overflow-hidden border-b border-[#2D2D36] bg-[#1A1513] flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-xl mb-2 shadow-[0_0_15px_rgba(216,179,106,0.2)]">
                        和
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-oyishi-gold uppercase">OYISHI GASTRONOMÍA</span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">

                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h4 className="font-display text-lg text-oyishi-text group-hover:text-oyishi-gold transition-colors select-all">
                        {item.reference && <span className="text-oyishi-gold font-bold">{item.reference}. </span>}
                        {item.name}
                      </h4>
                      <span className="font-mono text-lg text-oyishi-gold whitespace-nowrap">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>

                    {item.pieces && (
                      <span className="text-xs font-mono text-oyishi-textSec mb-2 uppercase tracking-widest">
                        {item.pieces} {item.pieces === 1 ? 'Pieza' : 'Piezas'}
                      </span>
                    )}

                    {item.description && (
                      <p className="text-oyishi-textSec text-sm mt-1 flex-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.allergens.map((alg, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 border border-[#2D2D36] bg-oyishi-bg rounded text-[9px] text-oyishi-textSec font-mono uppercase tracking-wider">
                            {alg}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-[#2D2D36]">
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full min-h-[44px] py-2.5 bg-oyishi-bg border border-[#2D2D36] rounded-md flex items-center justify-center gap-2 text-oyishi-text hover:border-oyishi-gold hover:text-oyishi-gold transition-colors group/btn focus-ring"
                      >
                        <Plus size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                        <span className="font-mono text-xs tracking-widest uppercase">Añadir</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
