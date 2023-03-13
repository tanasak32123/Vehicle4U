import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
import { UpdateRentingRequestDto } from './dto/update-rentingrequest.dto';
import { RentingRequest } from './entities/renting-request.entity';

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
        
        
        
        //update renreq in user
        const user = await this.userRepository.findOneBy({'id':id});
        await user.rentingRequests.push(renreq);
        await this.userRepository.update({'id': id}, {'rentingRequests': user.rentingRequests});

        //update renreq in vehicle
        await this.vehicleRepository.update({'id': renreq.car_id}, {'rentingRequest':renreq});

        //update rentingRequest before save
        renreq.renter_id = id;
        renreq.user = await this.userRepository.findOneBy({'id':id});
        renreq.vehicle = await this.vehicleRepository.findOneBy({'id': createRentingRequestDto.car_id});
        
        return await this.rentingRequestRepository.save(renreq);
    }

    async providergetrequest(provider_id: number): Promise<RentingRequest[]>{
        const user = await this.userRepository.findOneBy({'id': provider_id});
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);
        if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);
        
        let requests: RentingRequest[];
        for(var i = 0;i<user.vehicles.length;i++){
            const vehicle = user.vehicles[i].rentingRequest;
            requests.push(vehicle);
        }
        return requests;
    }

    async rentergetrequest(renter_id: number): Promise<RentingRequest[]>{
        const user = await this.userRepository.findOneBy({'id': renter_id});
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);

        if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);

        return user.rentingRequests;
    }

    async update(rentingRequest_id:number, updateRentingRequestDto: UpdateRentingRequestDto): Promise<RentingRequest>{
        const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
        if(!rentingRequest) throw new HttpException( "rentingrequest not found", HttpStatus.NOT_FOUND);

        await this.rentingRequestRepository.update({'id':rentingRequest_id}, updateRentingRequestDto);
        return await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
    }
    
    async delete(rentingRequest_id:number): Promise<RentingRequest> {
        const rentingRequest = await this.rentingRequestRepository.findOneBy({'id': rentingRequest_id});
        if(!rentingRequest) return null;
        await this.rentingRequestRepository.delete({'id':rentingRequest_id});
        return rentingRequest;
    }
}
