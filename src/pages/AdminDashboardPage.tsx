import React from 'react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-display text-oyishi-text mb-2 tracking-tight">Panel de Control</h1>
      <p className="text-oyishi-textSec mb-8">Vista general del estado de OYISHI.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-oyishi-card border border-oyishi-border p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-sans font-medium text-oyishi-gold uppercase tracking-widest mb-1">Pedidos de hoy</h3>
          <span className="text-3xl font-mono text-white">No disponible</span>
        </div>
        <div className="bg-oyishi-card border border-oyishi-border p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-sans font-medium text-oyishi-gold uppercase tracking-widest mb-1">Reservas de hoy</h3>
          <span className="text-3xl font-mono text-white">No disponible</span>
        </div>
        <div className="bg-oyishi-card border border-oyishi-border p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-sans font-medium text-oyishi-gold uppercase tracking-widest mb-1">Estado Andrea</h3>
          <span className="text-lg font-sans text-emerald-400 font-bold mt-2 inline-block">Conectado</span>
        </div>
      </div>
    </div>
  );
};
