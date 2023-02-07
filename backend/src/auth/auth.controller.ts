/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {LoginDto} from './dto/login.dto'
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    

    @Post('login')
    async login(@Body() loginDto : LoginDto , @Response() res ) {
        const user = await this.authService.validateLogin(loginDto); 
        const token = await this.authService.login(loginDto);
        return res.status(200).send({
            user : user , 
            token : token 
        });
      }

    @Post(['/register/renter' , '/register/provider'])
    async register(@Body() registerDto : RegisterDto, @Response() res) {
        await this.authService.validateRegister(registerDto);
        const user = await this.authService.register(registerDto)
        return res.status(200).send(user);
    }
    
}