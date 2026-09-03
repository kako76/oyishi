import React, { useState, useEffect } from 'react';
import { menuData, categories } from '../data/oyishi';
import { Plus, Search, X, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidFoodImage } from '../utils/imageUtils';
import { useSEO } from '../hooks/useSEO';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';
import { KanjiWatermark, WashiOverlay } from '../components/JapaneseElements';

/** Helper to format raw category names into clean editorial titles */
function formatCategoryTitle(cat: string): string {
  if (!cat) return '';
  const map: Record<string, string> = {
    'ROLL(8PIEZAS)': 'Rolls (8 piezas)',
    'ROLL(8 PIEZAS)': 'Rolls (8 piezas)',
    'NIGIRI(2PIEZAS)': 'Nigiris (2 piezas)',
    'NIGIRI(2 PIEZAS)': 'Nigiris (2 piezas)',
    'MAKI(8PIEZAS)': 'Makis (8 piezas)',
    'MAKI(8 PIEZAS)': 'Makis (8 piezas)',
    'SASHIMI(5PIEZAS)': 'Sashimi (5 piezas)',
    'SASHIMI(5 PIEZAS)': 'Sashimi (5 piezas)',
    'BANDEJAS Y COMBINADOS': 'Bandejas & Combinados',
    'BANDEJAS': 'Bandejas & Combinados',
    'MENÚ DEL DÍA': 'Menú del Día',
    'MENÚS': 'Menús Especiales',
    'POSTRES': 'Postres Artesanales',
    'BEBIDAS': 'Bebidas & Sakes',
    'EXCLUSIVOS TARTAS': 'Tartar Especiales',
  };
  let formatted = cat;
  if (map[cat.toUpperCase()]) {
    formatted = map[cat.toUpperCase()];
  } else if (cat === cat.toUpperCase()) {
    formatted = cat.charAt(0) + cat.slice(1).toLowerCase();
  }
  
  // Fix missing spaces before parentheses and format pieces
  return formatted
    .replace(/([^\s])\(/g, '$1 (')
    .replace(/(\d+)\s*(piezas|pieza)/gi, '$1 piezas');
}

export const CartaPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'destacado' | 'vegetariano' | 'sin_gluten' | 'nigiris'>('all');
  const [visibleCount, setVisibleCount] = useState(24);
  const { addToCart } = useCart();
  const isReduced = useIsReducedMotion();

  useSEO({
    title: 'Carta | OYISHI Fuenlabrada',
    description: 'Explora nuestra carta completa de gastronomía japonesa. Sushi, maki, nigiri, sashimi, platos calientes y combinados.',
    path: '/carta'
  });

  const syncCategoryFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    if (catParam && categories.includes(catParam)) {
      setActiveCategory(catParam);
    } else if (!catParam) {
      setActiveCategory('Todos');
    }
  };

  useEffect(() => {
    syncCategoryFromUrl();
    window.addEventListener('popstate', syncCategoryFromUrl);
    return () => window.removeEventListener('popstate', syncCategoryFromUrl);
  }, []);

  const allCategories = ['Todos', ...categories];

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesQuickFilter = true;
    if (quickFilter === 'destacado') {
      matchesQuickFilter = item.verified && item.imageStatus === 'official';
    } else if (quickFilter === 'vegetariano') {
      const nonVegAllergens = ['Pescado', 'Crustáceos', 'Moluscos'];
      const hasNonVegAllergens = item.allergens.some(a => nonVegAllergens.includes(a));
      const text = `${item.name} ${item.description || ''}`.toLowerCase();
      matchesQuickFilter = !hasNonVegAllergens || text.includes('vegetal') || text.includes('aguacate') || text.includes('edamame');
    } else if (quickFilter === 'sin_gluten') {
      matchesQuickFilter = !item.allergens.includes('Gluten');
    } else if (quickFilter === 'nigiris') {
      matchesQuickFilter = item.category.toUpperCase().includes('NIGIRI') || item.name.toLowerCase().includes('nigiri');
    }

    return matchesCategory && matchesSearch && matchesQuickFilter;
  });

  const visibleMenu = filteredMenu.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMenu.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  return (
    <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text relative overflow-hidden pb-24 md:pb-0">
      <WashiOverlay />
      <KanjiWatermark char="味" className="absolute right-10 top-24 text-9xl font-display text-white/[0.02] select-none pointer-events-none font-bold hidden md:block" />
      {/* Header & Filter Bar */}
      <section className="py-12 border-b border-oyishi-border/60 bg-oyishi-bgSec/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <span className="text-xs font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase mb-2 block">Catálogo Gastronómico</span>
            <h1 className="text-4xl md:text-6xl font-display text-oyishi-text mb-3 tracking-tight">LA CARTA</h1>
            <p className="text-oyishi-textSec text-base md:text-lg max-w-lg mx-auto font-light">
              Explora nuestras {categories.length} familias de cocina tradicional y contemporánea nipona.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-oyishi-textSec pointer-events-none" size={19} />
            <input
              type="text"
              placeholder="Buscar por nombre de plato o ingrediente..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full bg-oyishi-bg border border-oyishi-border/80 rounded-sm pl-14 pr-12 py-3.5 text-oyishi-text placeholder:text-oyishi-textSec/60 focus-ring focus:border-oyishi-gold/80 transition-all duration-300 text-sm md:text-base min-h-[44px]"
              aria-label="Buscar un plato"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVisibleCount(24);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-oyishi-textSec hover:text-white p-2.5 rounded-sm hover:bg-oyishi-card transition-colors focus-ring"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Quick Filters Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            <button
              onClick={() => setQuickFilter(quickFilter === 'destacado' ? 'all' : 'destacado')}
              className={`px-4 py-2 rounded-sm text-xs font-sans font-medium tracking-wider uppercase min-h-[44px] flex items-center gap-1.5 transition-all focus-ring ${
                quickFilter === 'destacado'
                  ? 'bg-oyishi-gold text-[#120E0C] font-semibold shadow-md'
                  : 'bg-oyishi-card border border-oyishi-border/80 text-oyishi-text hover:border-oyishi-gold/60'
              }`}
            >
              <span>⭐ Destacado</span>
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'vegetariano' ? 'all' : 'vegetariano')}
              className={`px-4 py-2 rounded-sm text-xs font-sans font-medium tracking-wider uppercase min-h-[44px] flex items-center gap-1.5 transition-all focus-ring ${
                quickFilter === 'vegetariano'
                  ? 'bg-emerald-600 text-white font-semibold shadow-md'
                  : 'bg-oyishi-card border border-oyishi-border/80 text-oyishi-text hover:border-emerald-500/60'
              }`}
            >
              <span>🌱 Vegetariano</span>
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'sin_gluten' ? 'all' : 'sin_gluten')}
              className={`px-4 py-2 rounded-sm text-xs font-sans font-medium tracking-wider uppercase min-h-[44px] flex items-center gap-1.5 transition-all focus-ring ${
                quickFilter === 'sin_gluten'
                  ? 'bg-amber-600 text-white font-semibold shadow-md'
                  : 'bg-oyishi-card border border-oyishi-border/80 text-oyishi-text hover:border-amber-500/60'
              }`}
            >
              <span>🌾 Sin Gluten</span>
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'nigiris' ? 'all' : 'nigiris')}
              className={`px-4 py-2 rounded-sm text-xs font-sans font-medium tracking-wider uppercase min-h-[44px] flex items-center gap-1.5 transition-all focus-ring ${
                quickFilter === 'nigiris'
                  ? 'bg-oyishi-coral text-white font-semibold shadow-md'
                  : 'bg-oyishi-card border border-oyishi-border/80 text-oyishi-text hover:border-oyishi-coral/60'
              }`}
            >
              <span>🍣 Nigiris</span>
            </button>
            {quickFilter !== 'all' && (
              <button
                onClick={() => setQuickFilter('all')}
                className="px-3 py-2 rounded-sm text-[11px] font-sans text-oyishi-textSec underline hover:text-white transition-colors min-h-[44px]"
              >
                Limpiar filtro
              </button>
            )}
          </div>

          {/* Filters Pills with active category pill indicator */}
          <div className="relative max-w-7xl mx-auto">
            <div className="pointer-events-none absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-oyishi-bg to-transparent z-10 hidden sm:block" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-r from-transparent to-oyishi-bg z-10 hidden sm:block" />
            <div className="flex overflow-x-auto pb-3 scrollbar-hide gap-2.5 justify-start md:justify-center items-center px-1">
              {allCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      const newUrl = new URL(window.location.href);
                      if (cat === 'Todos') {
                        newUrl.searchParams.delete('categoria');
                      } else {
                        newUrl.searchParams.set('categoria', cat);
                      }
                      window.history.pushState({}, '', newUrl);
                    }}
                    className={`relative whitespace-nowrap px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-sm font-sans text-xs tracking-wider uppercase transition-colors focus-ring ${
                      isActive
                        ? 'text-[#120E0C] font-semibold'
                        : 'bg-oyishi-card/80 text-oyishi-textSec hover:text-white hover:bg-oyishi-card border border-oyishi-border/60'
                    }`}
                  >
                    {isActive && !isReduced && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-oyishi-gold rounded-sm shadow-[0_0_18px_rgba(216,179,106,0.35)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && isReduced && (
                      <div className="absolute inset-0 bg-oyishi-gold rounded-sm shadow-md" />
                    )}
                    <span className="relative z-10">{cat === 'Todos' ? 'Todos' : formatCategoryTitle(cat)}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8 flex justify-between items-center text-xs font-sans text-oyishi-textSec uppercase tracking-widest border-b border-oyishi-border/30 pb-4">
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-oyishi-gold" />
              Mostrando {visibleMenu.length} de {filteredMenu.length} {filteredMenu.length === 1 ? 'producto' : 'productos'}
            </span>
            {activeCategory !== 'Todos' && (
              <span className="text-oyishi-gold font-medium">Filtro: {formatCategoryTitle(activeCategory)}</span>
            )}
          </div>

          {/* Grid */}
          <motion.div
            layout={!isReduced}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {visibleMenu.map((item) => {
                const hasValidPhoto = isValidFoodImage(item.imageUrl);

                return (
                  <motion.div
                    key={item.id}
                    layout={!isReduced}
                    initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    whileHover={isReduced ? undefined : { y: -6, scale: 1.01 }}
                    transition={{ duration: 0.35, ease: LUXE_EASE }}
                    className="group relative bg-oyishi-card border border-oyishi-border/80 rounded-lg overflow-hidden hover:border-oyishi-gold/60 hover:shadow-[0_16px_45px_rgba(216,179,106,0.15)] transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Marco Fotográfico Unificado — Fondo Degradado Radial Piedra Sumi */}
                    {hasValidPhoto ? (
                      <div className="w-full aspect-[4/3] relative overflow-hidden border-b border-oyishi-border/60 bg-gradient-to-b from-[#251D18] via-[#1A1410] to-[#120E0C] flex items-center justify-center p-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#1E1714] to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] relative overflow-hidden border-b border-oyishi-border/60 bg-[#1A1513] flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-10 h-10 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-lg mb-2">
                          和
                        </div>
                        <span className="font-sans text-[10px] tracking-[0.25em] text-oyishi-gold uppercase">OYISHI GASTRONOMÍA</span>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-3">
                          <h3 className="font-display text-lg text-oyishi-text group-hover:text-oyishi-gold transition-colors leading-snug flex items-start gap-2">
                            <span className="flex-1">
                              {item.reference ? `${item.reference} — ` : ''}{item.name}
                            </span>
                          </h3>
                          <span className="font-mono text-base font-semibold text-oyishi-gold whitespace-nowrap">
                            {item.price.toFixed(2)} €
                          </span>
                        </div>

                        {item.pieces && (
                          <span className="inline-block text-[10px] font-sans font-medium text-oyishi-gold/90 bg-oyishi-gold/10 px-2 py-0.5 rounded-sm border border-oyishi-gold/20 mb-3 tracking-wider uppercase">
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
                              <span key={idx} className="px-1.5 py-0.5 border border-oyishi-border/40 bg-oyishi-bg/80 rounded-sm text-[9px] text-oyishi-textSec font-sans uppercase tracking-wider">
                                {alg}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="pt-4 border-t border-oyishi-border/40">
                          <button
                            onClick={() => addToCart(item)}
                            className="w-full min-h-[44px] py-2.5 bg-oyishi-coral hover:bg-oyishi-coralHover text-white rounded-sm flex items-center justify-center gap-2 font-sans text-[10px] tracking-widest font-semibold uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(232,93,78,0.2)] focus-ring"
                          >
                            <Plus size={14} className="text-white" />
                            <span>AÑADIR A LA COMANDA</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty Search Results State */}
          {visibleMenu.length === 0 && (
            <div className="text-center py-20 bg-oyishi-card border border-oyishi-border rounded-lg">
              <p className="text-lg text-oyishi-text font-display mb-2">No se encontraron productos</p>
              <p className="text-oyishi-textSec text-sm font-light mb-6">Prueba con otro término de búsqueda o selecciona otra categoría.</p>
              <button
                onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }}
                className="px-6 py-3 bg-oyishi-gold text-[#120E0C] font-sans font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-white transition-all"
              >
                Restablecer Filtros
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="btn-shimmer focus-ring px-8 py-3.5 border border-oyishi-gold/60 text-oyishi-gold hover:bg-oyishi-gold hover:text-[#120E0C] font-sans text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg min-h-[44px]"
              >
                Cargar Más Productos ({filteredMenu.length - visibleCount} restantes)
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default CartaPage;
