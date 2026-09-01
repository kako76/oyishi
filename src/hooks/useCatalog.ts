import { useState, useEffect } from 'react';
import { menuData as staticMenuData, categories as staticCategories, type OyishiProduct } from '../data/oyishi';

export const useCatalog = () => {
  const [menuData, setMenuData] = useState<OyishiProduct[]>(staticMenuData);
  const [allProducts, setAllProducts] = useState<OyishiProduct[]>(staticMenuData);
  const [categories, setCategories] = useState<string[]>(staticCategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          if (data && data.products && data.products.length > 0) {
            // Filter active products for public display
            const activeProducts = data.products.filter((p: any) => p.active !== false);
            setAllProducts(data.products);
            setMenuData(activeProducts);
            
            // Recompute categories based on active products
            const cats = Array.from(new Set(activeProducts.map((p: any) => p.category))) as string[];
            const normalizedCats = cats.map(c => c.replace('MENsS', 'MENÚS').replace('EXLUSIVOS TARTAS', 'EXCLUSIVOS TARTAS'));
            setCategories(normalizedCats);
          }
        }
      } catch (err) {
        console.error('Error fetching catalog, falling back to static data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return { menuData, allProducts, categories, isLoading };
};
