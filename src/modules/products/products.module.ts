import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema }]), AuthModule],
  controllers: [ProductsController],   
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}