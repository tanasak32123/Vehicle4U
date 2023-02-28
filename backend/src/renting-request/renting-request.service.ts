import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateRentingRequestDto } from './dto/create-reningrequest.dto';
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

    async providergetrequest(id: number): Promise<RentingRequest[]>{
        const user = await this.userRepository.findOneBy({'id': id});
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);
        if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);
        
        let requests: RentingRequest[];
        for(var i = 0;i<user.vehicles.length;i++){
            const vehicle = user.vehicles[i].rentingRequest;
            requests.push(vehicle);
        }
        return requests;
    }

    async rentergetrequest(id: number): Promise<RentingRequest[]>{
        const user = await this.userRepository.findOneBy({'id': id});
        if(!user)throw new HttpException( "user not found", HttpStatus.NOT_FOUND);

        if(!user.is_provider)throw new HttpException("no access rights", HttpStatus.NOT_ACCEPTABLE);

        return user.rentingRequests;
    }
}
