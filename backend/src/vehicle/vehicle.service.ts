import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  RentingRequest,
  Request_status,
} from 'src/renting-request/entities/renting-request.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RentingRequest)
    private rentingRequestRepository: Repository<RentingRequest>,
  ) {}
  async findByFilter(
    province: string,
    carName: string,
    maxPassenger: number,
    pageNumber: number,
  ): Promise<[Vehicle[], any]> {
    pageNumber = pageNumber - 0;
    console.log(pageNumber);
    const pagination_count = 2;
    const all_vehicles = await this.vehicleRepository
      .createQueryBuilder('vehicles')
      .where(
        `vehicles.name ILIKE concat('%',CAST(:carName AS varchar(256)),'%')`,
        {
          carName: carName,
        },
      )
      .andWhere(
        `vehicles.province ILIKE concat('%',CAST(:province AS varchar(256)),'%')`,
        { province: province },
      )
      .andWhere('vehicles.maximumCapacity >= :maxPassenger', {
        maxPassenger: maxPassenger,
      })
      .printSql()
      .getMany();
    const datalength = all_vehicles.length;
    const x = await this.vehicleRepository
      .createQueryBuilder('vehicles')
      .innerJoinAndSelect('vehicles.user', 'user')
      .innerJoinAndSelect('vehicles.rentingRequests', 'rentingRequests')
      .innerJoinAndSelect('rentingRequests.comment', 'comment')
      .where(
        `vehicles.name ILIKE concat('%',CAST(:carName AS varchar(256)),'%')`,
        {
          carName: carName,
        },
      )
      .andWhere(
        `vehicles.province ILIKE concat('%',CAST(:province AS varchar(256)),'%')`,
        { province: province },
      )
      .andWhere('vehicles.maximumCapacity >= :maxPassenger', {
        maxPassenger: maxPassenger,
      })
      .limit(pagination_count)
      .offset((pageNumber - 1) * pagination_count)
      .printSql()
      .getMany();
    const paginated_vehicles = x;
    //console.log(pageNumber - 0 * pagination_count < datalength);
    const paginationData = { next: {}, prev: {}, page_count: {} };
    if ((pageNumber - 0) * pagination_count < datalength) {
      //console.log('there is next page');
      paginationData.next = {
        pageNumber: pageNumber - 0 + 1,
      };
    }
    //console.log(typeof (pageNumber - 0));
    if ((pageNumber - 1) * pagination_count > 0) {
      paginationData.prev = {
        pageNumber: pageNumber - 1,
      };
    }
    paginationData.page_count = Math.ceil(
      all_vehicles.length / pagination_count,
    );

    console.log(paginated_vehicles);
    console.log(paginationData);
    return [paginated_vehicles, paginationData];
  }

  async createVehicle(
    id: number,
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const ent = await this.vehicleRepository.findOneBy({
      registrationId: createVehicleDto.registrationId,
    });
    if (ent) {
      throw new HttpException(
        'registration number exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const vehicle = await this.vehicleRepository.create(createVehicleDto);
    vehicle.user = await this.userRepository.findOneBy({ id: id });
    return await this.vehicleRepository.save(vehicle);
  }
  async updateVehicle(updateVehicleDto: UpdateVehicleDto) {
    const ent = await this.vehicleRepository.findOneBy({
      id: updateVehicleDto.id,
    });
    if (!ent) {
      throw new HttpException('id dont exist', HttpStatus.NOT_FOUND);
    }
    const oldImageName = ent.imagename;

    await this.vehicleRepository.update(
      { id: updateVehicleDto.id },
      updateVehicleDto,
    );
    const vehicle = await this.vehicleRepository.findOneBy({
      id: updateVehicleDto.id,
    });
    return { oldImageName, vehicle };
  }

  async getVehicleByUserId(userId: number) {
    const vehicles = await this.vehicleRepository.find({
      relations: {
        comments: { user: true},
      },
      where: { user: { id: userId } },
    });
    return vehicles;
    // const vehicleandstatus = [];
    // for (let i = 0; i < vehicles.length; i++) {
    //   const rentingrequests = await this.rentingRequestRepository.find({
    //     where: {
    //       status: Request_status.ACCEPTED,
    //       vehicle: { id: vehicles[i].id },
    //     },
    //   });
    //   let carstatus = 'Available';
    //   if (rentingrequests.length != 0) carstatus = 'Not available';

    //   vehicleandstatus.push(vehicles[i]);
    //   vehicleandstatus[i].status = carstatus;
    // }
    // return vehicleandstatus;
  }

  async getVehicleByVehicleId(vehicleId: number) {
    const vehicle = await this.vehicleRepository.findOne({
      relations: { user: true },
      where: { id: vehicleId },
    });
    if (!vehicle)
      throw new HttpException('vehicle not found', HttpStatus.NOT_FOUND);
    const rentingrequests = await this.rentingRequestRepository.find({
      where: {
        status: Request_status.ACCEPTED,
        vehicle: { id: vehicle.id },
      },
    });
    let carstatus = 'Available';
    if (rentingrequests.length != 0) carstatus = 'Not available';
    const vehicleandstatus = [];
    vehicleandstatus.push(vehicle);
    vehicleandstatus[0].status = carstatus;
    return vehicleandstatus;
  }
}
