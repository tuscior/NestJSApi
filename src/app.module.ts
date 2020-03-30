import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// ---------- PRODUCT IMPORTS

import { ProductsController } from './modules/products/products.controller';
import { ProductsModule } from './modules/products/products.module';

// ---------- CART IMPORTS
import { CartController } from './modules/cart/cart.controller';
import { CartModule } from './modules/cart/cart.module';

// ---------- AUTH IMPORTS
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';

// ---------- HEALTH IMPORTS
import { HealthModule } from './modules/health/health.module';

import { UploadModule } from './modules/upload/upload.module';
import { UploadController } from './modules/upload/upload.controller';

import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URL),
    ProductsModule, 
    CartModule, 
    AuthModule,
    HealthModule,
    UploadModule
  ],
  controllers: [ProductsController, CartController, AuthController, UploadController],
  providers: [],
})
export class AppModule {}
