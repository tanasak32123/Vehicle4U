import { Any, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}
  async findByFilter(
    province: string,
    carName: string,
    maxPassenger: number,
  ): Promise<Vehicle[]> {
    return await this.vehicleRepository
      .createQueryBuilder('vehicles')
      .where('vehicles.name = :carName', { carName: carName })
      .andWhere('vehicles.province = :province', { province: province })
      .andWhere('vehicles.maxPassenger > :maxPassenger', {
        maxPassenger: maxPassenger,
      })
      .getMany();
  }
}
