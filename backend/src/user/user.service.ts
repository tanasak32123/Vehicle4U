/* eslint-disable prettier/prettier */
import { Injectable, Request, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatusDto } from './dto/user-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
@UseGuards(JwtAuthGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
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
