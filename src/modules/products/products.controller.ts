import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, DeleteRO } from './interfaces/product.interface';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private authService: AuthService
    ){}

    @Get()
    async getProducts(): Promise<Product[]> {
        const products = await this.productsService.findAllProducts();
        return products;
    }

    @Post()
    async addProduct(@Body() product: Product): Promise<Product> {
        const prod = await this.productsService.insertProduct(product)
        return prod;
    }

    @Put(':id')
    async editProduct(@Body() newProduct: Product, @Param('id') id: string): Promise<Product>{
        const edited = await this.productsService.editProduct(id, newProduct);
        return edited;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id): Promise<DeleteRO> {
        const deleted = await this.productsService.removeProduct(id);
        return deleted;
    }

}