import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductDetail(id: string) {
    // we throw so our filter converts to 404 if the product is not found
    return this.prisma.product.findUniqueOrThrow({ where: { id } });
  }
}
