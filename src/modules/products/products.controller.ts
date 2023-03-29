import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':productId')
  getProductDetail(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.getProductDetail(productId);
  }
}
