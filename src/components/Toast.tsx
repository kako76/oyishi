import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toastVariant, reducedMotionFade, useIsReducedMotion } from '../utils/motionVariants';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useCart();
  const isReduced = useIsReducedMotion();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          variants={isReduced ? reducedMotionFade : toastVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#1A1411]/95 border border-oyishi-gold/30 text-oyishi-text px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto"
          role="status"
          aria-live="polite"
        >
          <div className="w-6 h-6 rounded-full bg-oyishi-gold/20 flex items-center justify-center shrink-0 border border-oyishi-gold/40">
            <Check className="w-3.5 h-3.5 text-oyishi-gold" />
          </div>
          <span className="text-sm font-sans text-oyishi-text font-medium truncate">
            {toastMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
