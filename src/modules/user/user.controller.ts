import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service'
import { User, DeleteRO } from './interfaces/user.interface'

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get(':id')
    async getUser(@Param('id') id): Promise<User>{
        const user = await this.userService.getUserById(id);
        return user;
    }

    @Get()
    async getUsers(): Promise<User[]>{
        const users = await this.userService.getUsers();
        return users;
    }

    @Put(':id/new-password')
    async newPassword(@Body('old') oldPassword: string, @Body('new') newPassword: string, @Param('username') username): Promise<void> {
        const changed = await this.userService.changePassword(username, oldPassword, newPassword)
        return changed;
    }

    @Put(':id')
    async editUser(@Body() user, @Param('id') id): Promise<User> {
        const edited = await this.userService.editUser(id, user);
        return edited;
    }

    @Post('register')
    async addUser(@Body() user: User): Promise<User> {
        const newUser = await this.userService.addUser(user)
        return newUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id): Promise<DeleteRO>{
        const deleted = await this.userService.removeUser(id);
        console.log(deleted, id)
        return deleted;
    }
}