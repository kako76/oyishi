/**
  * Validates if a product image URL is a real food photograph.
  * Returns false for generic fallback images (no-imagen.jpg, novedad.png) or empty strings.
  */
export const isValidFoodImage = (url?: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed === '') return false;
  if (trimmed.includes('no-imagen.jpg')) return false;
  if (trimmed.includes('novedad.png')) return false;
  return true;
};
