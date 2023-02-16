/* eslint-disable prettier/prettier */
import { Injectable, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatusDto } from './dto/user-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
@UseGuards(JwtAuthGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: number, updateuserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      return null;
    } else {
      const user = await this.userRepository.findOneBy({
        username: updateuserDto.username,
      });
      if (user && user.id != id) {
        return null;
      }

      const user1 = await this.userRepository.findOneBy({
        citizen_id: updateuserDto.citizen_id,
      });
      if (user1 && user1.id != id) {
        return null;
      }
    }
    updateuserDto.password = await bcrypt.hash(updateuserDto.password, 10) ;
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
