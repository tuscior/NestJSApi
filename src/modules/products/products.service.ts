import { Injectable, Inject } from '@nestjs/common';
import { Product, DeleteRO } from './interfaces/product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async findAllProducts(): Promise<Product[]>{
        return await this.productModel.find({})
    }

    async insertProduct(product: Product): Promise<Product> {
        const createdProduct = new this.productModel(product);
        const returnable = await createdProduct.save();
        return returnable;
    }

    async editProduct(id: string, newProduct: Product): Promise<Product> {
        const edited = await this.productModel.findOneAndUpdate({ _id: id}, newProduct);
        return newProduct;
    }

    async removeProduct(id: string): Promise<DeleteRO>{
        const deleted = await this.productModel.find({ _id: id }).remove();
        return deleted;
    }

    async getProduct(id: string): Promise<DeleteRO>{
        try {
            const product = await this.productModel.find({ _id: id });
            return product;
        } catch(err){
            throw new Error('This id does not exist');
        }
    }
}