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
import { Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
import { OutputRenterPageDto } from './dto/outputrenterpage.dto';
import { OutputProviderPageDto } from './dto/outputproviderpage.dto';
import { UpdateRentingRequestDto } from './dto/update-rentingrequest.dto';
import {
  RentingRequest,
  Request_status,
} from './entities/renting-request.entity';

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
  ): Promise<OutputProviderPageDto[]> {
    const user = await this.userRepository.findOne({
      relations: {
        vehicles: true,
      },
      where: { id: provider_id },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (!user.is_provider)
      throw new HttpException('no access rights', HttpStatus.NOT_ACCEPTABLE);

    const rentingRequests = [];
    for (let i = 0; i < user.vehicles.length; i++) {
      const requests = await this.rentingRequestRepository.find({
        relations: {
          vehicle: true,
          user: true,
        },
        where: { vehicle: { id: user.vehicles[i].id } },
      });
      for (let j = 0; j < requests.length; j++)
        rentingRequests.push(requests[j]);
    }

        let providerrequests = [];
        for (let i = 0; i < rentingRequests.length; i++) {
            let providerrequest= new OutputProviderPageDto;
            providerrequest.request_id       = rentingRequests[i].id;
            providerrequest.car_id           = rentingRequests[i].vehicle.id;
            providerrequest.imagename        = rentingRequests[i].vehicle.imagename;
            providerrequest.car_name         = rentingRequests[i].vehicle.name;
            providerrequest.registrationId   = rentingRequests[i].vehicle.registrationId;
            providerrequest.renter_id        = rentingRequests[i].user.id;
            providerrequest.renter_firstname = rentingRequests[i].user.first_name;
            providerrequest.renter_lastname  = rentingRequests[i].user.last_name;
            providerrequest.tel              = rentingRequests[i].user.tel;
            providerrequest.contact          = rentingRequests[i].contact;
            providerrequest.rent_place       = rentingRequests[i].rent_place;
            providerrequest.maximumCapacity  = rentingRequests[i].vehicle.maximumCapacity
            providerrequest.created_at       = rentingRequests[i].created_at;
            providerrequest.updated_at       = rentingRequests[i].updated_at;
            providerrequest.status           = rentingRequests[i].status;
            providerrequest.province         = rentingRequests[i].vehicle.province;
            providerrequest.startdate        = rentingRequests[i].startdate;
            providerrequest.starttime        = rentingRequests[i].starttime;
            providerrequest.enddate          = rentingRequests[i].enddate;
            providerrequest.endtime          = rentingRequests[i].endtime;
            providerrequests.push(providerrequest);
        }
        return providerrequests;
    }

    async rentergetrequest(renter_id: number): Promise<OutputRenterPageDto[]>{
        const user = await this.userRepository.findOneBy({'id': renter_id});
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);
        if(!user.is_renter)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);
        let rentingRequests = await this.rentingRequestRepository.find({
            relations : { 
                vehicle : {user: true}
            },
            where : {
                'user': {'id' : user.id}
            }
            
        });
        let renterrequests : OutputRenterPageDto[];
        renterrequests = [];
        for (let i = 0; i < rentingRequests.length; i++) {
            let renterrequest = new OutputRenterPageDto;
            renterrequest.request_id         = rentingRequests[i].id;
            renterrequest.car_id             = rentingRequests[i].vehicle.id;
            renterrequest.imagename          = rentingRequests[i].vehicle.imagename;
            renterrequest.car_name           = rentingRequests[i].vehicle.name;
            renterrequest.tel                = rentingRequests[i].vehicle.user.tel;
            renterrequest.provider_id        = rentingRequests[i].vehicle.user.id;
            renterrequest.provider_firstname = rentingRequests[i].vehicle.user.first_name;
            renterrequest.provider_lastname  = rentingRequests[i].vehicle.user.last_name;
            renterrequest.registrationId     = rentingRequests[i].vehicle.registrationId;
            renterrequest.maximumCapacity    = rentingRequests[i].vehicle.maximumCapacity;
            renterrequest.status             = rentingRequests[i].status;
            renterrequest.startdate          = rentingRequests[i].startdate;
            renterrequest.starttime          = rentingRequests[i].starttime;
            renterrequest.enddate            = rentingRequests[i].enddate;
            renterrequest.endtime            = rentingRequests[i].endtime;
            renterrequests.push(renterrequest);
        }
        return renterrequests;
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
    if (updateRentingRequestDto.confirm) {
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
    } else newstatus = Request_status.REJECTED;
    await this.rentingRequestRepository.update(
      { id: updateRentingRequestDto.id },
      { status: newstatus },
    );
    return await this.rentingRequestRepository.findOneBy({
      id: updateRentingRequestDto.id,
    });
  }

  // async delete(rentingRequest_id:number): Promise<RentingRequest> {
  //     const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
  //     if(!rentingRequest) return null;
  //     await this.rentingRequestRepository.delete({'id':rentingRequest_id});
  //     return rentingRequest;
  // }
}
