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
    @InjectRepository(RentingRequest)
    private requestRepository: Repository<RentingRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  

  async create(createCommentDto: CreateCommentDto) {
    console.log(1);
    const comment = await this.commentRepository.create(createCommentDto);
    console.log(2);
    console.log(comment);
    const rentReq = await this.requestRepository.findOneBy({id:createCommentDto.request_id});
    rentReq.comment = comment;
    console.log(rentReq);
    //await this.requestRepository.update({ id: rentReq.id }, {});
    await this.requestRepository.save(rentReq);
    comment.request = rentReq;
    console.log(3)
    return await this.commentRepository.save(comment);;
  }


  async findComments(id: number) {
    const queryVehicle = await this.vehicleRepository.findOneBy({ id: id })
    const comments = await this.requestRepository.find({
      relations: {
        vehicle: true,
        comment: true
      }
      , where: {
        vehicle:{id : queryVehicle.id}
      },
    })
    return comments;
  }

  async addReply(updateCommentDto:UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({
      id:updateCommentDto.id
    })
    comment.reply = updateCommentDto.reply
    return await this.commentRepository.update({ id:updateCommentDto.id},comment);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
