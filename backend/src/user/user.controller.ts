/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Response() res ) {
        await this.userService.create(createUserDto);
        return res.status(200).send({
            statusCode : 200,
            message : "create success" 
        });
    }
    
    @Get(':id')
    async findUser(@Param('id') id: number): Promise<User> {
        return await this.userService.findOne(id);
    }

    
}
