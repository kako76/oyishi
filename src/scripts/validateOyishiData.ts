import fs from 'fs';
import path from 'path';

// Using JSON directly, or we could import it, but let's read the file directly to avoid import issues
const dataPath = path.join(process.cwd(), 'src/data/oyishi/products.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const { categories, products } = JSON.parse(rawData);

let duplicates = 0;
let errors = 0;

const idSet = new Set();
const productNames = new Set();
let withPhoto = 0;
let withoutPhoto = 0;
let withAllergensVerified = 0;
let allergensUnknown = 0;
let withDescription = 0;
let withoutDescription = 0;

products.forEach((p: any) => {
  if (idSet.has(p.id)) {
    duplicates++;
    console.error(`Duplicate ID found: ${p.id} (${p.name})`);
  }
  idSet.add(p.id);

  if (productNames.has(p.name)) {
    duplicates++;
    console.error(`Duplicate name found: ${p.name}`);
  }
  productNames.add(p.name);

  if (!p.name || p.name.trim() === '') {
    errors++;
    console.error(`Missing name for product ID: ${p.id}`);
  }

  if (!categories.includes(p.category) && !categories.map((c: string) => c.replace('MENsS', 'MENÚS').replace('EXLUSIVOS TARTAS', 'EXCLUSIVOS TARTAS')).includes(p.category)) {
    errors++;
    console.error(`Invalid category: ${p.category} for product ${p.name}`);
  }

  if (typeof p.price !== 'number' || p.price < 0) {
    errors++;
    console.error(`Invalid price for product ${p.name}: ${p.price}`);
  }

  if (!p.sourceUrl) {
    errors++;
    console.error(`Missing sourceUrl for product ${p.name}`);
  }
  
  if (!p.source) {
    errors++;
    console.error(`Missing source for product ${p.name}`);
  }

  if (p.imageStatus === 'official') {
    withPhoto++;
  } else {
    withoutPhoto++;
  }

  if (p.allergenStatus === 'verified') {
    withAllergensVerified++;
  } else {
    allergensUnknown++;
  }

  if (p.description) {
    withDescription++;
  } else {
    withoutDescription++;
  }
});

console.log("RESULTADO DEL SCRAPE");
console.log(`Categorías: ${categories.length}`);
console.log(`Productos: ${products.length}`);
console.log(`Productos con foto oficial: ${withPhoto}`);
console.log(`Productos sin foto: ${withoutPhoto}`);
console.log(`Productos con alérgenos verificados: ${withAllergensVerified}`);
console.log(`Productos con alérgenos desconocidos: ${allergensUnknown}`);
console.log(`Productos con descripción: ${withDescription}`);
console.log(`Productos sin descripción: ${withoutDescription}`);
console.log(`Duplicados encontrados: ${duplicates}`);
console.log(`Errores encontrados: ${errors}`);

if (errors > 0) {
  process.exit(1);
}
