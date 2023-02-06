/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {User} from 'src/user/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatusDto } from './dto/user-status.dto';
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

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }
  async changeState(token: string, state: string): Promise<UserStatusDto> {
    const Dto = new UserStatusDto();
    if (state == 'renter') {
      Dto.token = token;
      Dto.currentRole = 'provider';
    } else if (state == 'provider') {
      Dto.token = token;
      Dto.currentRole = 'renter';
    } else {
      Dto.token = token;
      Dto.currentRole = 'error';
    }
    return await Dto;
  }
}
