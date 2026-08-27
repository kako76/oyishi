import React from 'react';

import { useSEO } from '../hooks/useSEO';

export const AvisoLegalPage: React.FC = () => {
  useSEO({
    title: 'Aviso Legal | OYISHI',
    description: 'Información legal, titularidad del sitio web y condiciones de uso de OYISHI Gastronomía Japonesa.',
    path: '/aviso-legal'
  });

  return (
    <main className="pt-28 pb-20 bg-oyishi-bg min-h-screen text-oyishi-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Información Legal</span>
          <h1 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4">AVISO LEGAL</h1>
          <div className="w-16 h-0.5 bg-oyishi-gold mx-auto opacity-80" />
        </div>

        <div className="bg-oyishi-card border border-oyishi-border/80 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8 text-sm md:text-base font-light leading-relaxed text-oyishi-textSec">
          
          <section>
            <h2 className="text-xl font-display text-oyishi-text mb-3">1. Datos Identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), se exponen a continuación los datos identificativos de la entidad titular del servicio:
            </p>
            <ul className="mt-3 space-y-1 font-mono text-xs text-oyishi-text">
              <li><strong>Denominación comercial:</strong> OYISHI Gastronomía Japonesa</li>
              <li><strong>Dirección:</strong> Calle Leganés 42, 28945 Fuenlabrada, Madrid</li>
              <li><strong>Teléfono de contacto:</strong> 918 626 221 / 699 365 212</li>
              <li><strong>Email de contacto:</strong> info@oyishi.es</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">2. Objeto y Ámbito de Aplicación</h2>
            <p>
              El presente Aviso Legal regula el acceso y la utilización del sitio web de OYISHI Gastronomía Japonesa. El acceso al sitio web implica la aceptación sin reservas de las condiciones incluidas en este documento.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">3. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos de la web (textos, fotografías, gráficos, imágenes, tecnología, software, links y demás contenidos audiovisuales o sonoros) son propiedad exclusiva de OYISHI o de terceros que han autorizado su uso. Queda prohibida la reproducción total o parcial sin autorización expresa.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">4. Responsabilidad</h2>
            <p>
              OYISHI no se hace responsable de los daños o perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos o averías telefónicas en el funcionamiento operativo de este sistema electrónico.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
};

export default AvisoLegalPage;
