import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/oyishi/products.json'), 'utf-8'));
const products = data.products;

let sql = '';
for (const p of products) {
    const active = p.active !== undefined ? p.active : 1;
    const allergens = JSON.stringify(p.allergens || []);
    
    // Escape single quotes for SQL
    const escapeStr = (str) => {
        if (str === null || str === undefined) return 'NULL';
        return "'" + String(str).replace(/'/g, "''") + "'";
    };
    
    sql += `INSERT OR REPLACE INTO products (id, reference, name, category, description, pieces, price, allergens, allergenStatus, imageUrl, imageStatus, sourceUrl, source, verified, active) VALUES (
        ${escapeStr(p.id)},
        ${escapeStr(p.reference)},
        ${escapeStr(p.name)},
        ${escapeStr(p.category)},
        ${escapeStr(p.description)},
        ${p.pieces || 'NULL'},
        ${p.price},
        ${escapeStr(allergens)},
        ${escapeStr(p.allergenStatus)},
        ${escapeStr(p.imageUrl)},
        ${escapeStr(p.imageStatus)},
        ${escapeStr(p.sourceUrl)},
        ${escapeStr(p.source)},
        ${p.verified ? 1 : 0},
        ${active ? 1 : 0}
    );\n`;
}

fs.writeFileSync(path.join(__dirname, 'seed_products.sql'), sql);
console.log(`Created seed_products.sql with ${products.length} products.`);
