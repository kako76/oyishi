import React from 'react';

export const AnatomyOfFlavor: React.FC = () => {
  return (
    <section id="filosofia" className="py-24 bg-oyishi-bgSec relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-4">Filosofía Oyishi</h2>
          <h3 className="text-4xl md:text-5xl font-display text-oyishi-text mb-6">El Respeto por el Producto</h3>
          <p className="text-oyishi-textSec max-w-2xl mx-auto">
            Seleccionamos cada ingrediente con el máximo rigor. 
            Sin atajos. Desde el corte del pescado hasta la temperatura exacta del arroz.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-20 relative">
          
          <div className="relative w-full max-w-2xl">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1200&auto=format&fit=crop" 
                alt="Elaboración de sushi premium" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-oyishi-bg border border-oyishi-gold/20 p-8 hidden md:flex flex-col justify-center">
              <span className="text-oyishi-gold font-mono text-sm tracking-widest uppercase mb-2">Técnica</span>
              <h4 className="text-xl font-display text-oyishi-text mb-4">
                Precisión en cada corte
              </h4>
              <p className="text-sm text-oyishi-textSec leading-relaxed">
                Nuestros itamae dedican años a perfeccionar la técnica de corte (sashimi-bōchō) para maximizar la textura y el sabor del pescado.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
