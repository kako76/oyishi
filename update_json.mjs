import fs from 'fs';
import path from 'path';

const inPath = path.join(process.cwd(), 'src/data/oyishi/products.json');
const data = JSON.parse(fs.readFileSync(inPath, 'utf8'));

const updatedProducts = data.products.map(p => {
  let allergenStatus = 'unknown';
  if (p.allergens && p.allergens.length > 0) {
    allergenStatus = 'verified';
  } else if (p.allergens && p.allergens.length === 0) {
    // We can't know for sure if it has no allergens or just wasn't listed on the site.
    allergenStatus = 'unknown';
  }

  let imageStatus = 'missing';
  if (p.imageUrl) {
    imageStatus = 'official';
  }

  return {
    ...p,
    allergenStatus,
    imageStatus
  };
});

fs.writeFileSync(inPath, JSON.stringify({ categories: data.categories, products: updatedProducts }, null, 2));
console.log(`Updated schema for ${updatedProducts.length} products.`);
