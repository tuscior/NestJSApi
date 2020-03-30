import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {AuthService} from '../auth/auth.service'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
    ){}

    async editUser(id, user): Promise<User>{
        const { _doc } = await this.userModel.findOneAndUpdate({ _id: id }, user, { new: true });
        return {
            ..._doc
        };
    }

    async hashPassword(pass: string): Promise<String> {
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(pass, salt);
        return encrypted;
    }

    async changePassword(id: string, oldPassword: string, newPassword: string) {
        const user = await this.getUserById(id);
        const validated = await this.authService.validateUser(user.username, oldPassword);
        if(validated){

        } else {
            throw new HttpException(
                'UNAUTHORIZED',
                HttpStatus.UNAUTHORIZED
            )
        }
    }

    async addUser(user): Promise<User>{
        const { username, password } = user;
        const alreadyExist = await this.getUser(username);
        if (alreadyExist) {
            throw new HttpException(
              'User already exists',
              HttpStatus.BAD_REQUEST,
            );
        }
        user.password = await this.hashPassword(password)
        user.image = null;
        user.cart = {
            items: {},
        };
        user.id = uuidv4();
        const newUserInstance = new this.userModel(user);
        const newUser = await newUserInstance.save();
        return newUser;
    }

    async removeUser(id){
        const deleted = await this.userModel.find({ _id: id }).remove();

        return deleted;
    }

    async getUsers(){
        const users = await this.userModel.find({});
        return users;
    }

    async getUser(username){
        const user = await this.userModel.findOne({ username });
        return user;
    }

    async getUserById(id){
        const user = await this.userModel.findOne({ _id: id });
        return user;
    }
}