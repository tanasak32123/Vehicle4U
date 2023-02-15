/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line prettier/prettier
import { User } from 'src/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto'
import { Repository } from 'typeorm';
import { RegisterDto} from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';

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
        return await this.createToken(user);
      }
      async validateRegister(registerDto : RegisterDto) {
        const user =  await this.userRepository.findOneBy({username : registerDto.username});
        const user1 =  await this.userRepository.findOneBy({citizen_id : registerDto.citizen_id});
        if (user){
          throw new HttpException( "username exist", HttpStatus.NOT_ACCEPTABLE)
        }else if (user1){
          throw new HttpException( "citizen_id exist", HttpStatus.NOT_ACCEPTABLE)
        } 
      }

      async validateLogin(loginDto : LoginDto) : Promise<User> {
        const user =  await this.userRepository.findOneBy({username : loginDto.username});
        // check unique username 
        if (!user){
          throw new HttpException( "username not found", HttpStatus.NOT_FOUND)
        }
        // check password 
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch){
          throw new HttpException( "wrong password", HttpStatus.NOT_ACCEPTABLE)
        } 
        // is role enabled ? 
        if (loginDto.role == user.is_renter && !loginDto.role == user.is_provider){
          throw new HttpException("role not registered" , HttpStatus.NOT_FOUND)
        }
        return user 
      }

    

      async register(registerDto : RegisterDto): Promise<User>{
        registerDto.password = await bcrypt.hash(registerDto.password, 10) ;
        const ent = await this.userRepository.create(registerDto);
        return await this.userRepository.save(ent);
      }

      
}
