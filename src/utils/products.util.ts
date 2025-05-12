import { readFileSync } from 'fs';
import { join } from 'path';

import { Product } from '../types/products.types';

export function readProductsFromFile(): Product[] {
  const filePath = join(process.cwd(), 'src/constants', 'products.json');
  const data = readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(data) as { products: Product[] };
  if (!Array.isArray(parsed.products)) {
    throw new Error(
      'products.json dosyasında products alanı bulunamadı veya dizi değil.',
    );
  }
  return parsed.products;
}

export const products = readProductsFromFile();
