import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Vehicle)
    private requestRepository: Repository<RentingRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto)
    const rentReq = await this.requestRepository.findOneBy({ id: createCommentDto.request_id })
    comment.user = rentReq.user
    comment.vehicle = rentReq.vehicle
    comment.request = rentReq
    return this.vehicleRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
