/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {LoginDto} from './dto/login.dto'
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    

    @Post('login')
    async login(@Body() loginDto : LoginDto , @Response() res ) {
        const token = await this.authService.login(loginDto);
        if (!token){
            return res.status(500).send({
                statusCode : 500,
                message : "wrong" 
            });
        }
        //res.cookie("access_token", token, { httpOnly: true, secure: false });
        return res.status(200).send({
            access_token : token.access_token,
            statusCode : 200,
            message : "login success" 
        });
      }

    @Post('register')
    async register(@Body() registerDto : RegisterDto, @Response() res) {
        const exist = await this.authService.register(registerDto);
        if(exist){
            return res.status(500).send({
                statusCode : 500,
                message : "wrong" 
            });
        }
        return res.status(200).send({
            statusCode : 200,
            message : "register success" 
        });
    }
}
