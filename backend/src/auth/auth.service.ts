/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line prettier/prettier
import { User } from 'src/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto'
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User> , private jwtService: JwtService ){}
    async createToken(user: User) {
        const payload = {
          id: user.id,
          username: user.username,
        };
        return { access_token: this.jwtService.sign(payload) };
      }
      async login(loginDto : LoginDto){
        const user =  await this.userRepository.findOneBy({username : loginDto.username});
        if (!user){
          return null
        }
        const pass = await this.userRepository.findOneBy({password : loginDto.password});
        if (!pass){
          return null;
        }
        return await this.createToken(pass);
      }

      async register(registerDto : RegisterDto):Promise<boolean>{
        const exist = await this.userRepository.findOneBy({username: registerDto.username});
        if(exist)return false;
        return true;
      }
}
