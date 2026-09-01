import { useState, useEffect } from 'react';
import { restaurantInfo } from '../data/oyishi/restaurant';

export interface Schedule {
  day_id: number;
  day_name: string;
  is_closed: number;
  open_time_1: string | null;
  close_time_1: string | null;
  open_time_2: string | null;
  close_time_2: string | null;
}

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedSchedule, setFormattedSchedule] = useState(restaurantInfo.schedule);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch('/api/schedules');
        if (res.ok) {
          const data: Schedule[] = await res.json();
          setSchedules(data);
          
          // Basic formatting logic for UI
          // If all days are the same, we can group them (De Lunes a Domingo: ...)
          const allSame = data.every(d => 
            d.is_closed === data[0].is_closed &&
            d.open_time_1 === data[0].open_time_1 &&
            d.close_time_1 === data[0].close_time_1 &&
            d.open_time_2 === data[0].open_time_2 &&
            d.close_time_2 === data[0].close_time_2
          );

          if (allSame && !data[0].is_closed) {
            let str = `De Lunes a Domingo: ${data[0].open_time_1}-${data[0].close_time_1}`;
            if (data[0].open_time_2 && data[0].close_time_2) {
              str += ` | ${data[0].open_time_2}-${data[0].close_time_2}`;
            }
            setFormattedSchedule(str);
          } else {
            // Complex grouping logic could be implemented here, 
            // but for now we fallback to the raw data representation or a general string.
            // A production version would group identical contiguous days.
            setFormattedSchedule('Consulta disponibilidad en el panel');
          }
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.error("Error al obtener horarios de D1, usando fallback estático", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  return { schedules, isLoading, formattedSchedule, isError };
}
