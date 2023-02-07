/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post,Patch, Response, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { AuthGuard } from '@nestjs/passport';
import { UserStatusDto } from './dto/user-status.dto';
import { ApiTags,ApiResponse } from '@nestjs/swagger';
import { UpdateDto } from 'src/auth/dto/update.dto';

// /localhost/username/role?=provider 
@ApiTags('Vehicle4U')
@Controller('user')

export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Response() res)  {
        const user = await this.userService.create(createUserDto);
        return res.status(200).send(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updateUserDto: UpdateUserDto, @Response() res) {
        const user = await this.userService.update(updateUserDto);
        return res.status(200).send(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findUser(@Param('id') id: string): Promise<User> {
        return await this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    @Get('/getroles/:id')
    async getRoles(@Param("id") id: string ,@Response() res): Promise<UserStatusDto> {
        const x = await this.userService.checkState(id);
        if (x == null){
            return res.status(404).send({
                statusCode: 404,
                message: "user not found"
            })
        }
        return res.status(200).send({
            statusCode : 200,
            message: "success",
            isProvider : x.isProvider,
            isRenter : x.isRenter
        })
    }

    
}
