/* eslint-disable prettier/prettier */
import { Injectable, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import {User} from 'src/user/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatusDto } from './dto/user-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(createUserDto)
        return await this.userRepository.save(user);
      }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: parseInt(id) });
  }
  async checkState(id: string): Promise<UserStatusDto> {
    const Dto = new UserStatusDto();
    const user = await this.userRepository.findOneBy({ id : parseInt(id)});
    if (user == null) return null;
    Dto.isProvider = user.is_provider
    Dto.isRenter = user.is_renter
   
    return Dto;
  }
}
