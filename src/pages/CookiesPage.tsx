import React from 'react';
import { useSEO } from '../hooks/useSEO';

export const CookiesPage: React.FC = () => {
  useSEO({
    title: 'Política de Cookies | OYISHI',
    description: 'Información sobre el uso de cookies en OYISHI Gastronomía Japonesa.',
    path: '/cookies'
  });

  return (
    <main className="pt-28 pb-20 bg-oyishi-bg min-h-screen text-oyishi-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">
          <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Uso de Cookies</span>
          <h1 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4">POLÍTICA DE COOKIES</h1>
          <div className="w-16 h-0.5 bg-oyishi-gold mx-auto opacity-80" />
        </div>

        <div className="bg-oyishi-card border border-oyishi-border/80 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8 text-sm md:text-base font-light leading-relaxed text-oyishi-textSec">

          <section>
            <h2 className="text-xl font-display text-oyishi-text mb-3">1. ¿Qué es una Cookie?</h2>
            <p>
              Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita nuestro sitio web. Sirve para recordar sus preferencias de navegación y garantizar el correcto funcionamiento técnico de la aplicación.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">2. Cookies Utilizadas en la Web</h2>
            <p>
              En el sitio web de OYISHI utilizamos exclusivamente cookies técnicas y de almacenamiento local estrictamente necesarias para mantener el estado del carrito de compras y la navegación del usuario.
            </p>
            <ul className="mt-3 space-y-2 font-mono text-xs text-oyishi-text">
              <li className="p-3 bg-oyishi-bg rounded border border-oyishi-border">
                <strong>Almacenamiento del Carrito:</strong> Mantiene la lista de productos seleccionados durante su sesión actual.
              </li>
            </ul>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">3. Configuración del Navegador</h2>
            <p>
              Puede deshabilitar o bloquear las cookies en las opciones de configuración de su navegador. Tenga en cuenta que desactivar las cookies esenciales puede afectar al correcto funcionamiento del carrito de selección de productos.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
};

export default CookiesPage;
