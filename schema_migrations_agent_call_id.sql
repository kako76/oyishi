-- Migración para añadir agent_call_id a la tabla reservations
-- Esto permite evitar duplicados en confirmaciones de Retell

-- 1. Añadimos la columna
ALTER TABLE reservations ADD COLUMN agent_call_id TEXT;

-- 2. Creamos un índice único para garantizar que nunca haya dos reservas con el mismo agent_call_id
-- Esto permite delegar la idempotencia y control de concurrencia al motor de la base de datos de forma atómica.
CREATE UNIQUE INDEX IF NOT EXISTS idx_reservations_agent_call_id ON reservations(agent_call_id) WHERE agent_call_id IS NOT NULL;
