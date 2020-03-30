import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if(!user){
      return false
    }
    const compare = await bcrypt.compare(pass, user.password);
    if (user && compare) {
      return true
    }
    return false;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const validated = await this.validateUser(user.username, user.password)
    if(validated){
        return {
            access_token: this.jwtService.sign(payload),
        };
    } else {
      throw new HttpException(
        'UNAUTHORIZED',
        HttpStatus.UNAUTHORIZED
      )
    }
  }
}