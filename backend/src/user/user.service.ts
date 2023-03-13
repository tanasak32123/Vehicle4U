/* eslint-disable prettier/prettier */
import { Injectable, Request, UseGuards } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatusDto } from './dto/user-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
@UseGuards(JwtAuthGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }


  async createVehicle(id:number, createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const ent = await this.vehicleRepository.findOneBy({registrationId : createVehicleDto.registrationId })
    if (ent){
      throw new HttpException( "registration number exist", HttpStatus.NOT_ACCEPTABLE)
    }
    const vehicle = await this.vehicleRepository.create(createVehicleDto);
    vehicle.user = await this.findOne(id.toString())
    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(updateVehicleDto: UpdateVehicleDto)  {
    const ent = await this.vehicleRepository.findOneBy({id : updateVehicleDto.id })
    if (!ent){
      throw new HttpException( "id dont exist", HttpStatus.NOT_FOUND)
    }
    const oldImageName = ent.imagename
  
    await this.vehicleRepository.update({id:updateVehicleDto.id} , updateVehicleDto);
    const vehicle = await this.vehicleRepository.findOneBy({id : updateVehicleDto.id })
    return {oldImageName , vehicle}
  }

  async getVehicles(id : number) : Promise<User[]>{ 
    const vehicles = await this.userRepository.find({
      where : {
        id : id , 
      }, 
      relations: {
        vehicles : true , 
    },
    })
    return vehicles 
  }
  async update(id: number, updateuserDto: UpdateUserDto): Promise<User> { 
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException( "User not found", HttpStatus.NOT_FOUND);
    }
    if(updateuserDto.username){
      const userusername = await this.userRepository.findOneBy({
        username: updateuserDto.username,
      });
      if (userusername && userusername.id != id) {
        throw new HttpException( "username is exist", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    if(updateuserDto.citizen_id){
      const usercitizen = await this.userRepository.findOneBy({

        citizen_id: updateuserDto.citizen_id,
      });
      if (usercitizen && usercitizen.id != id) {
        throw new HttpException( "citizen_id is exist", HttpStatus.NOT_ACCEPTABLE);
      }
    }
    if(updateuserDto.password){
      updateuserDto.password = await bcrypt.hash(updateuserDto.password, 10);
    }
    await this.userRepository.update({ id: id }, updateuserDto);
    return await this.userRepository.findOneBy({ id: id });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: parseInt(id) });
  }
  async checkState(id: string): Promise<UserStatusDto> {
    const Dto = new UserStatusDto();
    const user = await this.userRepository.findOneBy({ id: parseInt(id) });
    if (user == null) return null;
    Dto.isProvider = user.is_provider;
    Dto.isRenter = user.is_renter;

    return Dto;
  }
}
