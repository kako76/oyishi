CREATE TABLE IF NOT EXISTS schedules (
  day_id INTEGER PRIMARY KEY,
  day_name TEXT NOT NULL,
  is_closed INTEGER DEFAULT 0,
  open_time_1 TEXT,
  close_time_1 TEXT,
  open_time_2 TEXT,
  close_time_2 TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO schedules (day_id, day_name, is_closed, open_time_1, close_time_1, open_time_2, close_time_2) VALUES 
(1, 'Lunes', 0, '12:00', '16:30', '19:30', '24:00'),
(2, 'Martes', 0, '12:00', '16:30', '19:30', '24:00'),
(3, 'Miércoles', 0, '12:00', '16:30', '19:30', '24:00'),
(4, 'Jueves', 0, '12:00', '16:30', '19:30', '24:00'),
(5, 'Viernes', 0, '12:00', '16:30', '19:30', '24:00'),
(6, 'Sábado', 0, '12:00', '16:30', '19:30', '24:00'),
(7, 'Domingo', 0, '12:00', '16:30', '19:30', '24:00');
