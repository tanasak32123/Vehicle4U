import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { DataSource, LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
import { UpdateRentingRequestDto } from './dto/update-rentingrequest.dto';
import {
  RentingRequest,
  Request_status,
} from './entities/renting-request.entity';
import { request } from 'http';

@UseGuards(JwtAuthGuard)
@Injectable()
export class RentingRequestService {
  constructor(
    @InjectRepository(RentingRequest)
    private readonly rentingRequestRepository: Repository<RentingRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(
    id: number,
    createRentingRequestDto: CreateRentingRequestDto,
  ): Promise<RentingRequest> {
    //detect must be not request vehicle myself
    const checkprovider = await this.vehicleRepository.findOne({
      relations:{user:true},
      where:{'id':createRentingRequestDto.car_id}
    });
    if(checkprovider.user.id == id)throw new HttpException(
      'This is your vehicle',
      HttpStatus.BAD_REQUEST,
    );

    //detect request is exist in this time
    const research = await this.rentingRequestRepository.find({
      where: {
        vehicle: { id: createRentingRequestDto.car_id },
        status: Request_status.ACCEPTED,
      },
    });
    const starttime =
      createRentingRequestDto.startdate +
      '_' +
      createRentingRequestDto.starttime;
    const endtime =
      createRentingRequestDto.enddate + '_' + createRentingRequestDto.end_time;
    for (let i = 0; i < research.length; i++) {
      const otherstarttime =
        research[i].startdate + '_' + research[i].starttime;
      const otherendtime = research[i].enddate + '_' + research[i].endtime;

      if (starttime < otherendtime && endtime > otherstarttime)
        throw new HttpException(
          'request is exist in this time',
          HttpStatus.NOT_FOUND,
        );
    }
    const renreq = await this.rentingRequestRepository.create(
      createRentingRequestDto,
    );

    //update renreq.user
    renreq.user = await this.userRepository.findOneBy({ id: id });

    //update renreq.vehicle
    renreq.vehicle = await this.vehicleRepository.findOneBy({
      id: createRentingRequestDto.car_id,
    });

    //update status is pending
    renreq.status = Request_status.PENDING;

    return await this.rentingRequestRepository.save(renreq);
  }

    async providergetrequest(
      provider_id: number,
    ):Promise<any>{
      const requests = await this.rentingRequestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'renter')
      .leftJoinAndSelect('request.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.user','provider')
      .where('provider.id = :provider_id', { provider_id: provider_id })
      .select([
        'request.id',
        'vehicle.id',
        'vehicle.imagename',
        'vehicle.name',
        'vehicle.registrationId',
        'renter.id',
        'renter.first_name',
        'renter.last_name',
        'renter.tel',
        'request.contact',
        'request.rent_place',
        'vehicle.maximumCapacity',
        'request.created_at',
        'request.updated_at',
        'request.status',
        'vehicle.province',
        'request.startdate',
        'request.starttime',
        'request.enddate',
        'request.endtime',
      ])
      .getMany()
       return requests;
    }

    async rentergetrequest(renter_id: number): Promise<any>{
      const requests = await this.rentingRequestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'renter')
      .leftJoinAndSelect('request.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.user','provider')
      .where('renter.id = :renter_id', { renter_id: renter_id })
      .leftJoinAndSelect('request.comment', 'comment')
      .select([
        'comment.id',
        'request.id',
        'vehicle.id',
        'vehicle.imagename',
        'vehicle.name',
        'provider.tel',
        'provider.id',
        'provider.first_name',
        'provider.last_name',
        'vehicle.registrationId',
        'vehicle.maximumCapacity',
        'request.status',
        'request.startdate',
        'request.starttime',
        'request.enddate',
        'request.endtime',
      ])
      .getMany()
      return requests;
    }

  async updatestatus(
    updateRentingRequestDto: UpdateRentingRequestDto,
  ): Promise<RentingRequest> {
    const rentingRequest = await this.rentingRequestRepository.findOne({
      relations: { vehicle: true },
      where: { id: updateRentingRequestDto.id },
    });
    if (!rentingRequest)
      throw new HttpException('rentingrequest not found', HttpStatus.NOT_FOUND);

    let newstatus;
    if (updateRentingRequestDto.status == Request_status.ACCEPTED) {
      newstatus = Request_status.ACCEPTED;

      //automate rejected other_request that intercept_time
      //------------------------------
      const starttime =
        rentingRequest.startdate + '_' + rentingRequest.starttime;
      const endtime = rentingRequest.enddate + '_' + rentingRequest.endtime;
      const vehicle = rentingRequest.vehicle;
      const rentingRequests = await this.rentingRequestRepository.findBy({
        vehicle: { id: vehicle.id },
      });

      for (let i = 0; i < rentingRequests.length; i++) {
        if (rentingRequests[i].id != updateRentingRequestDto.id) {
          const otherstarttime =
            rentingRequests[i].startdate + '_' + rentingRequests[i].starttime;
          const otherendtime =
            rentingRequests[i].enddate + '_' + rentingRequests[i].endtime;

          let checkexisttime = false;
          if (starttime < otherendtime && endtime > otherstarttime)
            checkexisttime = true;

          if (checkexisttime)
            await this.rentingRequestRepository.update(
              { id: rentingRequests[i].id },
              { status: Request_status.REJECTED },
            );
        }
      }

      //------------------------------
    } else if(updateRentingRequestDto.status == Request_status.INUSE) newstatus = Request_status.INUSE;
    else if(updateRentingRequestDto.status == Request_status.REJECTED)newstatus = Request_status.REJECTED;
    else throw new HttpException('status invalid', HttpStatus.BAD_REQUEST);
    await this.rentingRequestRepository.update(
      { id: updateRentingRequestDto.id },
      { status: newstatus },
    );
    return await this.rentingRequestRepository.findOneBy({
      id: updateRentingRequestDto.id,
    });
  }

  async autoexpire(){
    let currentdate;
    let currenttime;
    let date = new Date().toLocaleDateString().split('/');
    let time = new Date().toLocaleTimeString().split(':');
    date[2] = (parseInt(date[2])-543).toString();
    if(date[1]<='9') currentdate = date[2]+'/0'+date[1]+'/'+date[0];
    else currentdate = date[2]+'/'+date[1]+'/'+date[0];
    currenttime = time[0]+':'+time[1];

    await this.rentingRequestRepository
    .createQueryBuilder()
    .update(RentingRequest)
    .set({
      status : Request_status.EXPIRE
    })
    .where({enddate : LessThan(currentdate)})
    .andWhere({status : Request_status.INUSE})
    .execute()

    await this.rentingRequestRepository
    .createQueryBuilder()
    .update(RentingRequest)
    .set({
      status : Request_status.EXPIRE
    })
    .where({enddate : currentdate})
    .andWhere({endtime : LessThanOrEqual(currenttime)})
    .andWhere({status : Request_status.INUSE})
    .execute()
  }

  // async delete(rentingRequest_id:number): Promise<RentingRequest> {
  //     const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
  //     if(!rentingRequest) throw new HttpException('rentingrequest not found', HttpStatus.NOT_ACCEPTABLE);
  //     await this.rentingRequestRepository.delete({'id':rentingRequest_id});
  //     return rentingRequest;
  // }
}
