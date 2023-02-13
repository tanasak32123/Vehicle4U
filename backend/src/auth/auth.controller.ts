/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Param, Post, Response} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {LoginDto} from './dto/login.dto'
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto } from './dto/update.dto';
import { ApiTags,ApiResponse } from '@nestjs/swagger';

@ApiTags('Vehicle4U')
@ApiTags('Vehicle4U')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    

    @Post('login')
    @ApiResponse({ status: 201, description: 'Login Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 500, description: 'Invalid login credentials.'})
    @ApiResponse({ status: 201, description: 'Login Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 500, description: 'Invalid login credentials.'})
    async login(@Body() loginDto : LoginDto , @Response() res ) {
        const user = await this.authService.validateLogin(loginDto); 
        const token = await this.authService.login(loginDto);
        return res.status(200).send({
            user : user , 
            token : token 
        });
      }
    @Post(['/signup/renter' , '/signup/provider'])
    @ApiResponse({ status: 201, description: 'User Registration Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 500, description: 'Invalid register information.'})
    async register(@Body() registerDto : RegisterDto, @Response() res) {
        await this.authService.validateRegister(registerDto);
        const user = await this.authService.register(registerDto)
        return res.status(200).send(user);
    }

    @Patch('/editProfile/:id')
    @ApiResponse({ status: 201, description: 'User Updation Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    async update(@Param() id: number, @Body() updateDto : UpdateDto, @Response() res) {
        try {
            console.log(1)
            const user = await this.authService.update(id["id"], updateDto);
            console.log(2)
            if (!user){return res.status(400)}
            return res.status(200).send(user);
        }catch(err){
            console.log(err);
        }
    }
    
}