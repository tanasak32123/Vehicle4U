import { Any, Like, MoreThan, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { max } from 'class-validator';

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
    const x = await this.vehicleRepository
      .createQueryBuilder('vehicles')
      .where(
        `vehicles.name ILIKE concat('%',CAST(:carName AS varchar(256)),'%')`,
        {
          carName: carName,
        },
      )
      .andWhere('vehicles.province = :province', { province: province })
      .andWhere('vehicles.maximumCapacity >= :maxPassenger', {
        maxPassenger: maxPassenger,
      })
      .printSql()
      .getMany();
    return x;
  }
}
