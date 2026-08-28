import React from 'react';
import { ShoppingBag, Utensils, CalendarCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const StickyMobileCTA: React.FC = () => {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();

  // If cart modal is currently open, hide the sticky bar to prevent visual collision
  if (isCartOpen) return null;

  return (
    <aside
      aria-label="Navegación y acciones rápidas móviles"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120E0C]/95 backdrop-blur-md border-t border-oyishi-border/80 px-4 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <a
          href="/carta"
          className="flex-1 min-h-[44px] px-3 py-2.5 bg-oyishi-card border border-oyishi-border hover:border-oyishi-gold text-oyishi-text font-sans text-[11px] font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Utensils size={14} className="text-oyishi-gold" />
          <span>VER CARTA</span>
        </a>

        {totalItems > 0 ? (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 min-h-[44px] px-3 py-2.5 bg-oyishi-coral text-white font-sans text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(232,93,78,0.3)] active:scale-[0.98]"
          >
            <ShoppingBag size={14} />
            <span>MI COMANDA ({totalItems})</span>
          </button>
        ) : (
          <a
            href="/reservas"
            className="flex-1 min-h-[44px] px-3 py-2.5 bg-oyishi-coral text-white font-sans text-[11px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(232,93,78,0.3)] active:scale-[0.98]"
          >
            <CalendarCheck size={14} />
            <span>RESERVAR MESA</span>
          </a>
        )}
      </div>
    </aside>
  );
};
