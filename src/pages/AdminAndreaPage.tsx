import React from 'react';

export const AdminAndreaPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-display text-oyishi-text mb-2 tracking-tight">Panel de Agente Andrea</h1>
      <p className="text-oyishi-textSec mb-8">Monitorización e información del agente de Retell AI.</p>
      <div className="bg-oyishi-card border border-oyishi-border p-8 rounded-xl flex items-center justify-center text-oyishi-textSec italic">
        Módulo informativo en primera fase. No modifica el webhook de Retell.
      </div>
    </div>
  );
};
