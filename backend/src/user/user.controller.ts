/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  Post,
  Patch,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserStatusDto } from './dto/user-status.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

// /localhost/username/role?=provider
@ApiTags('Vehicle4U')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService , private jwtService: JwtService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const user = await this.userService.create(createUserDto);
    return res.status(200).send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/editProfile')
  @ApiResponse({ status: 201, description: 'User Updation Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Request() req,
    //@Param() id: number,
    @Body() updateuserDto: UpdateUserDto,
    @Response() res,
  ) {
    try {
      const token = req.headers['authorization'].replace('Bearer','').trim();
      console.log(token);

      //Make sure token exists
      let id;
      if(token) {
        let jwtService :JwtService;
        const decoded = await this.jwtService.decode(token);
        console.log(decoded);
        id = decoded['id'];
      }
      const user = await this.userService.update(id, updateuserDto);
      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          message: 'user not found'
        });;

      }
      return res.status(200).send(user);
    }catch (err) {
      console.log(err);  
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('/getroles/:id')
  async getRoles(
    @Param('id') id: string,
    @Response() res,
  ): Promise<UserStatusDto> {
    const x = await this.userService.checkState(id);
    if (x == null) {
      return res.status(404).send({
        statusCode: 404,
        message: 'user not found'
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: 'success',
      isProvider: x.isProvider,
      isRenter: x.isRenter,
    });
  }
}
