/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {User} from 'src/user/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()

export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async createOrUpdate(user: User): Promise<User> {
        return await this.userRepository.save(user);
      }

      async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: id });
      }
    
    
    
}
