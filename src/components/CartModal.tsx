import React, { useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import type { CartItem } from '../store/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LUXE_EASE, useIsReducedMotion } from '../utils/motionVariants';
import { restaurantInfo } from '../data/oyishi/restaurant';

export const CartModal: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isReduced = useIsReducedMotion();

  useEffect(() => {
    if (isCartOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsCartOpen(false);
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const firstElement = focusables[0];
          const lastElement = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  const handleOfficialOrder = () => {
    window.open(restaurantInfo.orderUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Sidebar Drawer */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={isReduced ? { opacity: 0 } : { x: '100%' }}
            animate={isReduced ? { opacity: 1 } : { x: 0 }}
            exit={isReduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.4, ease: LUXE_EASE }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-oyishi-bg border-l border-oyishi-border shadow-2xl z-[70] flex flex-col focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-oyishi-border/60 bg-oyishi-bgSec/60">
              <div>
                <span className="text-[10px] font-sans font-medium text-oyishi-gold tracking-[0.25em] uppercase block mb-0.5">Cesta de Pedidos</span>
                <h2 id="cart-title" className="font-display text-2xl text-oyishi-text">Tu Comanda</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-textSec hover:text-white transition-colors rounded-full hover:bg-oyishi-card focus-ring active:scale-95"
                aria-label="Cerrar comanda"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-oyishi-textSec space-y-4">
                  <div className="w-16 h-16 rounded-full bg-oyishi-card border border-oyishi-border flex items-center justify-center text-oyishi-gold">
                    <span className="text-3xl">🥢</span>
                  </div>
                  <p className="font-serif italic text-sm">Tu comanda está vacía.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-oyishi-coral hover:bg-oyishi-coralHover text-white font-sans text-xs tracking-wider uppercase rounded-sm font-semibold transition-colors active:scale-95 shadow-md"
                  >
                    Ver la Carta
                  </button>
                </div>
              ) : (
                cart.map((item: CartItem) => (
                  <motion.div
                    key={item.id}
                    layout={!isReduced}
                    initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={isReduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: LUXE_EASE }}
                    className="flex gap-4 p-4 rounded-xl bg-oyishi-card border border-oyishi-border/80 hover:border-oyishi-gold/40 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-display text-base text-oyishi-text">{item.name}</h3>
                      <p className="font-mono text-oyishi-gold text-sm mt-1">{item.price.toFixed(2)}€</p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center bg-oyishi-bg rounded-lg border border-oyishi-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring active:scale-95"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring active:scale-95"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 text-oyishi-textSec hover:text-oyishi-coral transition-colors focus-ring active:scale-95"
                          aria-label={`Eliminar ${item.name} de la comanda`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-base text-oyishi-gold pt-1 whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-oyishi-border/60 bg-oyishi-bgSec/95 backdrop-blur-md">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-oyishi-textSec uppercase tracking-widest text-xs font-sans font-medium">Total a pagar</span>
                  <span className="font-mono text-3xl font-bold text-oyishi-gold">{totalPrice.toFixed(2)}€</span>
                </div>
                <p className="text-[10px] text-oyishi-textSec/70 mb-3 text-center uppercase tracking-wider font-sans">
                  Visualización de pedido. El pago se procesará en el sistema oficial.
                </p>
                <button
                  onClick={handleOfficialOrder}
                  className="btn-shimmer focus-ring w-full min-h-[44px] py-4 bg-oyishi-coral hover:bg-oyishi-coralHover text-white font-sans tracking-widest text-xs uppercase font-bold rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(232,93,78,0.35)] hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Realizar Pedido Oficial</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
