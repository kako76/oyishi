import oyishiData from './products.json';

export interface OyishiProduct {
  id: string;
  originalId?: string;
  name: string;
  category: string;
  description?: string;
  pieces?: number;
  price: number;
  allergens: string[];
  allergenStatus: 'verified' | 'unknown';
  imageUrl?: string;
  imageStatus: 'official' | 'missing' | 'decorative';
  sourceUrl: string;
  source: 'oyishi.es';
  verified: boolean;
}

export const dataMetadata = {
  source: "oyishi.es",
  lastVerifiedAt: new Date().toISOString(),
};

// Normalize categories a bit for display while keeping the real string
export const categories: string[] = oyishiData.categories.map(c => 
  c.replace('MENsS', 'MENÚS')
   .replace('EXLUSIVOS TARTAS', 'EXCLUSIVOS TARTAS')
);

export const menuData: OyishiProduct[] = oyishiData.products.map(p => ({
  ...p,
  source: p.source as 'oyishi.es',
  allergenStatus: p.allergenStatus as 'verified' | 'unknown',
  imageStatus: p.imageStatus as 'official' | 'missing' | 'decorative',
  category: p.category.replace('MENsS', 'MENÚS').replace('EXLUSIVOS TARTAS', 'EXCLUSIVOS TARTAS')
}));

import { restaurantInfo } from './restaurant';
export { restaurantInfo };
