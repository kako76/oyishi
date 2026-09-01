CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    reference TEXT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    pieces INTEGER,
    price REAL NOT NULL,
    allergens TEXT, -- JSON string array
    allergenStatus TEXT,
    imageUrl TEXT,
    imageStatus TEXT,
    sourceUrl TEXT,
    source TEXT,
    verified BOOLEAN,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
