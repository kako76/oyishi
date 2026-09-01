import React, { useState, useEffect } from 'react';
import { adminOrdersService } from '../services/adminOrdersService';
import { useSEO } from '../hooks/useSEO';
import { Save, Copy, Undo2, CheckCircle2, AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Schedule {
  day_id: number;
  day_name: string;
  is_closed: number;
  open_time_1: string | null;
  close_time_1: string | null;
  open_time_2: string | null;
  close_time_2: string | null;
}

export const AdminSchedulesPage: React.FC = () => {
  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useSEO({
    title: 'Panel de Horarios | OYISHI Administrador',
    description: 'Gestión de horarios de apertura OYISHI.',
    path: '/admin/horarios'
  });

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
  }, []);

  const loadSchedules = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/schedules');
      if (res.ok) {
        const data = await res.json();
        setOriginalSchedules(JSON.parse(JSON.stringify(data)));
        setSchedules(JSON.parse(JSON.stringify(data)));
      }
    } catch (err) {
      console.error('Error cargando horarios:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const hasUnsavedChanges = JSON.stringify(originalSchedules) !== JSON.stringify(schedules);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const token = adminOrdersService.getToken();
      const res = await fetch('/api/admin/schedules', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(schedules)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        setOriginalSchedules(JSON.parse(JSON.stringify(schedules)));
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Error al guardar los horarios');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error de conexión');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (dayId: number, field: keyof Schedule, value: any) => {
    setSchedules(prev => prev.map(s => s.day_id === dayId ? { ...s, [field]: value } : s));
  };

  const copyToAll = (sourceDayId: number) => {
    const sourceDay = schedules.find(s => s.day_id === sourceDayId);
    if (!sourceDay) return;

    if (!window.confirm(`¿Copiar el horario del ${sourceDay.day_name} a todos los demás días?`)) return;

    setSchedules(prev => prev.map(s => ({
      ...s,
      is_closed: sourceDay.is_closed,
      open_time_1: sourceDay.open_time_1,
      close_time_1: sourceDay.close_time_1,
      open_time_2: sourceDay.open_time_2,
      close_time_2: sourceDay.close_time_2
    })));
  };

  const restoreOriginal = () => {
    if (window.confirm('¿Descartar todos los cambios no guardados y restaurar el horario actual?')) {
      setSchedules(JSON.parse(JSON.stringify(originalSchedules)));
      setSaveError('');
      setSaveSuccess(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-oyishi-bg">
        <div className="text-oyishi-gold animate-pulse font-mono uppercase tracking-widest text-sm">
          Cargando horarios...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-oyishi-bg text-oyishi-text">
      {/* Header Fijo */}
      <div className="bg-[#140F0C] border-b border-oyishi-border/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-display text-oyishi-text tracking-tight flex items-center gap-3">
              <span className="text-oyishi-gold">Gestión de Horarios</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="text-amber-400 text-xs font-mono flex items-center gap-1.5 animate-pulse mr-2">
                <AlertTriangle size={14} /> Hay cambios sin guardar
              </span>
            )}
            <button 
              onClick={restoreOriginal} 
              disabled={!hasUnsavedChanges || isSaving}
              className="px-4 py-2 border border-oyishi-border text-oyishi-textSec hover:text-white rounded hover:bg-oyishi-card transition-colors text-xs font-sans uppercase tracking-widest disabled:opacity-30 flex items-center gap-1.5"
            >
              <Undo2 size={14} /> Deshacer
            </button>
            <button 
              onClick={handleSave} 
              disabled={!hasUnsavedChanges || isSaving}
              className="px-6 py-2 bg-oyishi-coral text-white rounded hover:bg-oyishi-coralHover transition-colors flex items-center gap-2 font-bold text-xs font-sans uppercase tracking-widest disabled:opacity-50 shadow-[0_0_15px_rgba(216,179,106,0.15)]"
            >
              {isSaving ? 'Guardando...' : <><Save size={16} /> Guardar Horarios</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {saveError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={18} /> {saveError}
          </div>
        )}
        
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle2 size={18} /> Horarios actualizados y publicados correctamente en la web.
          </motion.div>
        )}

        <div className="bg-oyishi-card border border-oyishi-border/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#1A1513] px-6 py-4 border-b border-oyishi-border/50 flex items-center gap-3">
            <Clock className="text-oyishi-gold" size={20} />
            <h2 className="text-lg font-display text-white">Semana Operativa</h2>
          </div>
          
          <div className="divide-y divide-oyishi-border/40">
            {schedules.map((day) => (
              <div key={day.day_id} className={`p-6 transition-colors ${day.is_closed ? 'bg-black/20' : 'hover:bg-black/10'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  
                  {/* Info del Día */}
                  <div className="w-full lg:w-48 flex items-center justify-between lg:justify-start gap-4">
                    <h3 className={`text-lg font-display ${day.is_closed ? 'text-oyishi-textSec/50' : 'text-oyishi-gold'}`}>
                      {day.day_name}
                    </h3>
                    
                    <button 
                      onClick={() => copyToAll(day.day_id)}
                      className="p-1.5 text-oyishi-textSec hover:text-white bg-black/30 rounded border border-oyishi-border/50 hover:border-oyishi-gold/50 transition-colors"
                      title="Copiar horario a todos los días"
                    >
                      <Copy size={14} />
                    </button>
                  </div>

                  {/* Estado (Abierto/Cerrado) */}
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={!day.is_closed}
                        onChange={(e) => handleChange(day.day_id, 'is_closed', e.target.checked ? 0 : 1)}
                      />
                      <div className="w-11 h-6 bg-red-900/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500/80 border border-oyishi-border/50"></div>
                      <span className={`ml-3 text-xs font-mono uppercase tracking-widest ${day.is_closed ? 'text-red-400' : 'text-emerald-400'}`}>
                        {day.is_closed ? 'CERRADO' : 'ABIERTO'}
                      </span>
                    </label>
                  </div>

                  {/* Horarios Tramo 1 */}
                  <div className={`flex-1 flex flex-wrap items-center gap-4 transition-opacity ${day.is_closed ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2 bg-[#1A1513] p-2 rounded-lg border border-oyishi-border/50">
                      <span className="text-[10px] text-oyishi-textSec uppercase tracking-wider font-medium w-12">Tramo 1</span>
                      <input 
                        type="time" 
                        value={day.open_time_1 || ''} 
                        onChange={(e) => handleChange(day.day_id, 'open_time_1', e.target.value)}
                        className="bg-transparent text-sm font-mono text-white focus:outline-none focus:text-oyishi-gold"
                      />
                      <span className="text-oyishi-textSec">-</span>
                      <input 
                        type="time" 
                        value={day.close_time_1 || ''} 
                        onChange={(e) => handleChange(day.day_id, 'close_time_1', e.target.value)}
                        className="bg-transparent text-sm font-mono text-white focus:outline-none focus:text-oyishi-gold"
                      />
                    </div>
                  </div>

                  {/* Horarios Tramo 2 */}
                  <div className={`flex-1 flex flex-wrap items-center gap-4 transition-opacity ${day.is_closed ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2 bg-[#1A1513] p-2 rounded-lg border border-oyishi-border/50">
                      <span className="text-[10px] text-oyishi-textSec uppercase tracking-wider font-medium w-12">Tramo 2</span>
                      <input 
                        type="time" 
                        value={day.open_time_2 || ''} 
                        onChange={(e) => handleChange(day.day_id, 'open_time_2', e.target.value)}
                        className="bg-transparent text-sm font-mono text-white focus:outline-none focus:text-oyishi-gold"
                      />
                      <span className="text-oyishi-textSec">-</span>
                      <input 
                        type="time" 
                        value={day.close_time_2 || ''} 
                        onChange={(e) => handleChange(day.day_id, 'close_time_2', e.target.value)}
                        className="bg-transparent text-sm font-mono text-white focus:outline-none focus:text-oyishi-gold"
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-[#1A1513] border border-oyishi-border/50 p-4 rounded-xl">
          <p className="text-xs text-oyishi-textSec flex items-start gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>Los tramos horarios pueden dejarse vacíos si el restaurante opera en horario continuo (ej. Tramo 1: 12:00 - 24:00, Tramo 2 vacío). La web pública mostrará "Abierto de Lunes a Domingo" agrupando los días idénticos automáticamente en futuras actualizaciones del frontend.</span>
          </p>
        </div>

      </div>
    </div>
  );
};
