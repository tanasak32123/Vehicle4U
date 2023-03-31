import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
import { OutputRenterPageDto } from './dto/outputrenterpage.dto';
import { OutputProviderPageDto } from './dto/outputproviderpage.dto';
import { UpdateRentingRequestDto } from './dto/update-rentingrequest.dto';
import { RentingRequest, Request_status } from './entities/renting-request.entity';

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

    async create(id: number, createRentingRequestDto: CreateRentingRequestDto): Promise<RentingRequest> {
        const renreq = await this.rentingRequestRepository.create(createRentingRequestDto);
        
        //update renreq.user
        renreq.user = await this.userRepository.findOneBy({'id':id});
        
        //update renreq.vehicle
        renreq.vehicle = await this.vehicleRepository.findOneBy({'id':createRentingRequestDto.car_id});

        //update status is pending
        renreq.status = Request_status.PENDING;
        
        return await this.rentingRequestRepository.save(renreq);
    }

    async providergetrequest(provider_id: number): Promise<OutputProviderPageDto[]>{
        const user = await this.userRepository.findOne({
            relations:{
                vehicles: true
            },
            where:{'id': provider_id}
        });
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);
        if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);

        let rentingRequests = [];
        for (let i = 0; i < user.vehicles.length; i++){
            let request = await this.rentingRequestRepository.find({
                relations:{vehicle:true},
                where:{'vehicle':{'id':user.vehicles[i].id}}
            });
            for(let j = 0; j < request.length; j++)rentingRequests.push(request[j]);
        }
        console.log(rentingRequests);

        let providerrequests = [];
        for (let i = 0; i < rentingRequests.length; i++) {
            let providerrequest= new OutputProviderPageDto;
            providerrequest.car_id          = rentingRequests[i].vehicle.id;
            providerrequest.imagename       = rentingRequests[i].vehicle.imagename;
            providerrequest.car_name        = rentingRequests[i].vehicle.name;
            providerrequest.registrationId  = rentingRequests[i].vehicle.registrationId;
            providerrequest.rent_place      = rentingRequests[i].rent_place;
            providerrequest.maximumCapacity = rentingRequests[i].vehicle.maximumCapacity
            providerrequest.created_at      = rentingRequests[i].created_at;
            providerrequest.updated_at      = rentingRequests[i].updated_at;
            providerrequest.status          = rentingRequests[i].status;
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
            renterrequest.car_id             = rentingRequests[i].vehicle.id;
            renterrequest.imagename          = rentingRequests[i].vehicle.imagename;
            renterrequest.car_name           = rentingRequests[i].vehicle.name;
            renterrequest.tel                = rentingRequests[i].vehicle.user.tel;
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

    async updatestatus(updateRentingRequestDto: UpdateRentingRequestDto): Promise<RentingRequest>{
        const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': updateRentingRequestDto.id});
        if(!rentingRequest) throw new HttpException( "rentingrequest not found", HttpStatus.NOT_FOUND);

        await this.rentingRequestRepository.update({'id': updateRentingRequestDto.id}, {"status": updateRentingRequestDto.status});
        return await this.rentingRequestRepository.findOneBy({'id': updateRentingRequestDto.id});
    }
    
    // async delete(rentingRequest_id:number): Promise<RentingRequest> {
    //     const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
    //     if(!rentingRequest) return null;
    //     await this.rentingRequestRepository.delete({'id':rentingRequest_id});
    //     return rentingRequest;
    // }
}
