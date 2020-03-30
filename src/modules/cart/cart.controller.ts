import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        private authService: AuthService
    ){
    }

    // @UseGuards(JwtAuthGuard)
    @Put(':usernameId/remove/:productId')
    async removeProductFromCart(@Param('productId') productId: string, @Param('usernameId') usernameId: string): Promise<Cart> {
        const products = await this.cartService.removeProductFromCart(usernameId, productId);
        return products;
    }

    // @UseGuards(JwtAuthGuard)
    @Put(':usernameId/add')
    async addProductToCart(@Body('productId') productId: string, @Body('quantity') quantity: Number, @Param('usernameId') usernameId: string): Promise<Cart> {
        const prod = await this.cartService.addProductToCart(usernameId, productId, quantity);
        return prod;
    }

    // @UseGuards(JwtAuthGuard)
    @Put(':usernameId/clear')
    async clearCart(@Body() productId: string, @Param('usernameId') usernameId: string): Promise<Cart>{
        const edited = await this.cartService.clearCart(usernameId);
        return edited;
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':usernameId/get')
    async getCart(@Param('usernameId') usernameId: string): Promise<Cart> {
        const deleted = await this.cartService.getCart(usernameId);
        return deleted;
    }
}