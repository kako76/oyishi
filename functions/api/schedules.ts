interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // Fallback in case D1 is not available or empty
  const fallbackSchedules = [
    { day_id: 1, day_name: 'Lunes', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 2, day_name: 'Martes', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 3, day_name: 'Miércoles', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 4, day_name: 'Jueves', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 5, day_name: 'Viernes', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 6, day_name: 'Sábado', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' },
    { day_id: 7, day_name: 'Domingo', is_closed: 0, open_time_1: '12:00', close_time_1: '16:30', open_time_2: '19:30', close_time_2: '24:00' }
  ];

  try {
    if (!env.DB) {
      return new Response(JSON.stringify(fallbackSchedules), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { results } = await env.DB.prepare('SELECT * FROM schedules ORDER BY day_id ASC').all();
    
    if (!results || results.length === 0) {
      return new Response(JSON.stringify(fallbackSchedules), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error fetching schedules:', err);
    return new Response(JSON.stringify(fallbackSchedules), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
