/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User()
        user.username = createUserDto.username
        user.password = createUserDto.password
        return await this.userService.createOrUpdate(user);
    }

    @Get(':id')
    async findUser(@Param('id') id: number): Promise<User> {
        return await this.userService.findOne(id);
    }
    

    
}
