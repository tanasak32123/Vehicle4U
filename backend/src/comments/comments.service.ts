import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { notEqual } from 'assert';

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
    // console.log(1);
    const comment = await this.commentRepository.create(createCommentDto);
    // console.log(2);
    // console.log(comment);
    const rentReq = await this.requestRepository.findOne(
      {
        relations: {
          vehicle: true,
          user: true
        },
        where: {
          id: createCommentDto.request_id
        }
      },
    );
    rentReq.comment = comment;
    // console.log(rentReq);
    //await this.requestRepository.update({ id: rentReq.id }, {});
    await this.requestRepository.save(rentReq);
    comment.request = rentReq;
    comment.vehicle = rentReq.vehicle;
    comment.user = rentReq.user;
    // console.log(3)
    return await this.commentRepository.save(comment);;
  }


  async findComments(vehicleId: number) {
    console.log(vehicleId);
    const queryVehicle = await this.vehicleRepository.findOneBy({
      id: vehicleId,
    });
    console.log(queryVehicle);
    const requests = await this.requestRepository.find({
      relations: {
        vehicle: true,
        comment: true,
        user: true,
      },
      where: {
        vehicle: { id: queryVehicle.id },
      },
      select: {
        user: { username: true },
      },
    });
    requests.forEach(request => {
      if (request.comment == null) {
        const idx = requests.indexOf(request);
        requests.splice(idx);
      }
    });
    return requests;
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
