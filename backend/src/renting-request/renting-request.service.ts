import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
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

    // async providergetrequest(provider_id: number): Promise<RentingRequest[]>{
    //     const user = await this.userRepository.findOneBy({'id': provider_id});
    //     if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);
    //     if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);
        
    //     let requests: RentingRequest[];
    //     for(var i = 0;i<user.vehicles.length;i++){
    //         const vehicle = user.vehicles[i].rentingRequests;
    //         requests.push(vehicle);
    //     }
    //     return requests;
    // }

    // async rentergetrequest(renter_id: number): Promise<RentingRequest[]>{
    //     const user = await this.userRepository.findOneBy({'id': renter_id});
    //     if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);

    //     if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);

    //     return user.rentingRequests;
    // }

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
