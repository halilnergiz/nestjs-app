import { Controller, Get, Param } from '@nestjs/common';

import { Product } from '../types/products.types';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllMockProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Product {
    return this.productsService.getMockProductById(Number(id));
  }
}
