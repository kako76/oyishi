import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const NotFoundPage: React.FC = () => {
  useSEO({
    title: 'Página no encontrada | OYISHI',
    description: 'La página que buscas no existe o ha sido movida.',
    path: '/404'
  });

  return (
    <main className="pt-32 pb-24 bg-oyishi-bg min-h-[80vh] flex flex-col items-center justify-center text-center text-oyishi-text">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-4 block">
            Error 404
          </span>
          <h1 className="text-5xl md:text-7xl font-display mb-6 tracking-tight">
            PÁGINA NO ENCONTRADA
          </h1>
          <p className="text-oyishi-textSec text-lg font-light mb-10 max-w-xl mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. Puedes volver a explorar nuestra carta o regresar a la página principal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="btn-shimmer focus-ring px-8 py-4 bg-oyishi-coral text-white font-bold tracking-[0.2em] text-[11px] uppercase rounded-sm flex items-center justify-center gap-3 transition-all duration-300"
            >
              VOLVER AL INICIO
            </a>
            <a
              href="/carta"
              className="focus-ring px-8 py-4 border border-oyishi-gold/40 text-[#E8E4DF] font-bold tracking-[0.2em] text-[11px] uppercase rounded-sm flex items-center justify-center gap-3 hover:bg-oyishi-gold hover:text-[#120E0C] hover:border-oyishi-gold transition-all duration-300"
            >
              VER LA CARTA <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
