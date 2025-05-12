import { Injectable } from '@nestjs/common';

import { Product } from '../types/products.types';
import { readProductsFromFile } from '../utils/products.util';

@Injectable()
export class ProductsService {
  getAllMockProducts(): Product[] {
    return readProductsFromFile();
  }

  getMockProductById(id: number): Product {
    const filteredProduct = this.getAllMockProducts().find(
      (product) => product.id === id,
    );
    if (!filteredProduct) {
      throw new Error('Product not found');
    }
    return filteredProduct;
  }
}
