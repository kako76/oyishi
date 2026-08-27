import React, { useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CartModal: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

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

  const handleWhatsAppOrder = () => {
    const phone = "34699365212";
    let text = "Hola OYISHI, me gustaría realizar el siguiente pedido:\n\n";
    
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)}€)\n`;
    });
    
    text += `\nTotal: ${totalPrice.toFixed(2)}€\n\n¿Podrían confirmarme el tiempo estimado? ¡Gracias!`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
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
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Sidebar Modal */}
          <motion.div 
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-oyishi-bg border-l border-oyishi-bgSec shadow-2xl z-[70] flex flex-col focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-oyishi-bgSec">
              <h2 id="cart-title" className="font-display text-2xl text-oyishi-gold">Tu Comanda</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-oyishi-textSec hover:text-white transition-colors rounded-full hover:bg-oyishi-bgSec focus-ring"
                aria-label="Cerrar comanda"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-oyishi-textSec space-y-4">
                  <div className="w-16 h-16 rounded-full bg-oyishi-bgSec flex items-center justify-center">
                    <span className="text-3xl">🥢</span>
                  </div>
                  <p>Tu comanda está vacía.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-oyishi-bgSec border border-[#2D2D36]">
                    <div className="flex-1">
                      <h3 className="font-display text-lg">{item.name}</h3>
                      <p className="font-mono text-oyishi-gold mt-1">{item.price.toFixed(2)}€</p>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center bg-oyishi-bg rounded-lg border border-[#2D2D36]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-oyishi-text hover:text-oyishi-gold transition-colors focus-ring"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-oyishi-textSec hover:text-oyishi-coral transition-colors focus-ring"
                          aria-label={`Eliminar ${item.name} de la comanda`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-lg pt-1">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-oyishi-bgSec bg-oyishi-bg/95 backdrop-blur-md">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-oyishi-textSec uppercase tracking-widest text-sm">Total a pagar</span>
                  <span className="font-mono text-3xl font-bold text-oyishi-gold">{totalPrice.toFixed(2)}€</span>
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full min-h-[44px] py-4 bg-oyishi-wasabi hover:bg-[#689f33] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 focus-ring"
                >
                  <span>Enviar Pedido por WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

