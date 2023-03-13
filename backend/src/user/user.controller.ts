/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
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
import { UserStatusDto } from './dto/user-status.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';



// /localhost/username/role?=provider
@ApiTags('Vehicle4U')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const user = await this.userService.create(createUserDto);
    return res.status(200).send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/editProfile')
  @ApiResponse({ status: 200, description: 'User Updation Successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 406, description: 'Duplicate information' })
  async update(
    @Request() req,
    @Body() updateuserDto: UpdateUserDto,
    @Response() res,
  ) {
    const id = req.body['id'];
    const user = await this.userService.update(id, updateuserDto);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: 'user not found',
      });
    }
    return res.status(200).send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findUser(@Request() req): Promise<User> {
    const id = req.body['id'];
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/createvehicle')
  async createVehicle(@Request() req, @Body() createVehicleDto: CreateVehicleDto ): Promise<Vehicle> {
    const id = req.user['id'];
    console.log(req)
    return await this.userService.createVehicle(id, createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updatevehicle')
  async updateVehicle(@Body() updateVehicleDto : UpdateVehicleDto, @Response() res ) {
    const {oldImageName, vehicle} = await this.userService.updateVehicle(updateVehicleDto);
    return res.status(200).send({
      oldImageName: oldImageName,
      vehicle : vehicle,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/vehicles')
  async getVehicles(@Request() req) : Promise<User[]> {
    const id = req.user['id']
    const vehicles = await this.userService.getVehicles(id)
    return vehicles 
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('/getroles')
  async getRoles(
  @Request() req,
  @Response() res,
  ): Promise<UserStatusDto> {
    const id = req.body['id']
    console.log(id)
    const x = await this.userService.checkState(id);
    if (x == null) {
      return res.status(404).send({
        statusCode: 404,
        message: 'user not found',
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
