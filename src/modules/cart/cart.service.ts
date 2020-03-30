import { Injectable, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Cart } from './interfaces/cart.interface';
import { UserService } from '../user/user.service';
import { ProductsService } from '../products/products.service'

@Injectable()
export class CartService {
    constructor(
        private userService: UserService,
        private productsService: ProductsService

    ){
    }

    async removeProductFromCart(usernameId: string, productId: string): Promise<Cart> {
        const { _doc } = await this.userService.getUserById(usernameId);
        _doc.cart.items[productId] ? delete _doc.cart.items[productId] : null;
        await this.userService.editUser(_doc._id, { ..._doc, ..._doc.cart })
        return _doc.cart;
    }

    async addProductToCart(usernameId: string, productId: string, quantity: Number): Promise<Cart> {
        const { _doc } = await this.userService.getUserById(usernameId);
        try {
            await this.productsService.getProduct(productId);
            let cart = Object.assign({}, _doc.cart);
            if(!cart.items){
                cart.items = {}
            }
            cart.items[productId] = cart.items[productId] + quantity || quantity;
            await this.userService.editUser(_doc._id, { ..._doc, cart })
            return cart;

        } catch(err) {
            throw new HttpException(
                'This product does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async clearCart(usernameId: string): Promise<Cart>{
        let { _doc } = await this.userService.getUserById(usernameId);
        _doc.cart = {}
        await this.userService.editUser(_doc._id, { ..._doc })
        return _doc.cart;
    }

    async getCart(usernameId: string): Promise<Cart>{
        const { cart } = await this.userService.getUserById(usernameId);
        return cart;
    }

}