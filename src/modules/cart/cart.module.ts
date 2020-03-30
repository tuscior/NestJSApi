import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
@Module({
  imports: [UserModule, AuthModule, ProductsModule],
  controllers: [CartController],   
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}