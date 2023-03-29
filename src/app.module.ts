import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { PrismaService } from './shared/services/prisma.service';

@Module({
  imports: [ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}
