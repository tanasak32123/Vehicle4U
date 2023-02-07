/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Response, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
<<<<<<< HEAD
||||||| 3916fde
import { AuthGuard } from '@nestjs/passport';
=======
//import { AuthGuard } from '@nestjs/passport';
>>>>>>> 9ec7bf6e4717c13b03401d66eb4965bd5e16619a
import { UserStatusDto } from './dto/user-status.dto';
<<<<<<< HEAD

@UseGuards(JwtAuthGuard)
@Controller('user')
||||||| 3916fde
// /localhost/username/role?=provider 
@UseGuards(JwtAuthGuard)
@Controller('*')
=======
import { ApiTags,ApiResponse } from '@nestjs/swagger';

// /localhost/username/role?=provider 
@ApiTags('Vehicle4U')
@Controller('user')
>>>>>>> 9ec7bf6e4717c13b03401d66eb4965bd5e16619a

export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Response() res )  {
        const user = await this.userService.create(createUserDto);
        return res.status(200).send(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    
    async findUser(@Param('id') id: string): Promise<User> {
        return await this.userService.findOne(id);
    }
<<<<<<< HEAD

    @Get(':id')
    async getRoles(@Param("id") id: number ,@Response() res): Promise<UserStatusDto> {
        const x = await this.userService.changeState(id);
||||||| 3916fde
    @Get(':id')
    async getRoles(@Param("id") id: number ,@Response() res): Promise<UserStatusDto> {
        const x = await this.userService.changeState(id);
=======
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    @Get('/getroles/:id')
    async getRoles(@Param("id") id: string ,@Response() res): Promise<UserStatusDto> {
        const x = await this.userService.checkState(id);
>>>>>>> 9ec7bf6e4717c13b03401d66eb4965bd5e16619a
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
