import React, { useState, useEffect } from 'react';
import { menuData, categories } from '../data/oyishi';
import { Plus, Search, X, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidFoodImage } from '../utils/imageUtils';
import { useSEO } from '../hooks/useSEO';

export const CartaPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const { addToCart } = useCart();

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
    return matchesCategory && matchesSearch;
  });

  const visibleMenu = filteredMenu.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMenu.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  // Reset limit when filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, searchQuery]);

  return (
    <main className="pt-24 bg-oyishi-bg min-h-screen text-oyishi-text">
      {/* Header & Filter Bar */}
      <section className="py-12 border-b border-oyishi-border/60 bg-oyishi-bgSec/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Catálogo Gastronómico</span>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-oyishi-bg border border-oyishi-border rounded-lg pl-14 pr-12 py-3.5 text-oyishi-text placeholder:text-oyishi-textSec/60 focus-ring transition-all duration-300 text-sm md:text-base shadow-inner"
              aria-label="Buscar un plato"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-oyishi-textSec hover:text-white p-2.5 rounded-full hover:bg-oyishi-card transition-colors focus-ring"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filters Pills with lateral fade overlay & proper padding */}
          <div className="relative max-w-7xl mx-auto">
            <div className="pointer-events-none absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-oyishi-bg to-transparent z-10 hidden sm:block" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-r from-transparent to-oyishi-bg z-10 hidden sm:block" />
            <div className="flex overflow-x-auto pb-3 scrollbar-hide gap-2.5 justify-start md:justify-center items-center px-1">
              {allCategories.map((cat) => (
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
                  className={`whitespace-nowrap px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 focus-ring ${
                    activeCategory === cat 
                    ? 'bg-oyishi-gold text-[#120E0C] shadow-[0_0_18px_rgba(216,179,106,0.35)] font-semibold border border-oyishi-gold' 
                    : 'bg-oyishi-card/80 text-oyishi-textSec hover:text-white hover:bg-oyishi-cardHover border border-oyishi-border/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex justify-between items-center text-xs font-mono text-oyishi-textSec uppercase tracking-widest border-b border-oyishi-border/30 pb-4">
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-oyishi-gold" />
              Mostrando {visibleMenu.length} de {filteredMenu.length} {filteredMenu.length === 1 ? 'producto' : 'productos'}
            </span>
            {activeCategory !== 'Todos' && (
              <span className="text-oyishi-gold font-medium">Filtro: {activeCategory}</span>
            )}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {visibleMenu.map((item) => {
                const hasValidPhoto = isValidFoodImage(item.imageUrl);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group relative bg-oyishi-card border border-oyishi-border rounded-xl overflow-hidden hover:border-oyishi-gold/50 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex flex-col h-full"
                  >
                    {/* Photo Pedestal - Warm Japanese Stone (#F7F3EE -> #EDE7DF) or Editorial Brand Frame */}
                    {hasValidPhoto ? (
                      <div className="w-full h-48 relative overflow-hidden border-b border-oyishi-border/40 bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] flex items-center justify-center p-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out" 
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 relative overflow-hidden border-b border-oyishi-border/60 bg-[#1A1513] flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-xl mb-2 shadow-[0_0_15px_rgba(216,179,106,0.2)]">
                          和
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.25em] text-oyishi-gold uppercase">OYISHI GASTRONOMÍA</span>
                        <span className="text-[11px] text-oyishi-textSec/80 font-serif italic mt-1">Especialidad Tradicional</span>
                      </div>
                    )}
                    
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-3">
                          <h3 className="font-display text-lg text-oyishi-text group-hover:text-oyishi-gold transition-colors leading-snug">
                            {item.name}
                          </h3>
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
                        {/* Allergens discretos */}
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
                            <span className="font-mono text-xs tracking-widest uppercase font-medium">Añadir a la comanda</span>
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
            <div className="text-center py-20 bg-oyishi-card border border-oyishi-border rounded-xl">
              <p className="text-lg text-oyishi-text font-display mb-2">No se encontraron productos</p>
              <p className="text-oyishi-textSec text-sm font-light mb-6">Prueba con otro término de búsqueda o selecciona otra categoría.</p>
              <button 
                onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }}
                className="px-6 py-2.5 bg-oyishi-gold text-[#120E0C] font-mono text-xs tracking-wider uppercase rounded font-semibold hover:bg-white transition-colors"
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
                className="btn-shimmer focus-ring px-8 py-3.5 border border-oyishi-gold text-oyishi-gold hover:bg-oyishi-gold hover:text-[#120E0C] font-mono text-xs tracking-widest uppercase rounded transition-all duration-300 shadow-lg font-semibold"
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
