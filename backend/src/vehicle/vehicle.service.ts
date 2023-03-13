import { Repository } from 'typeorm';
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
    const pagination_count = 2;
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
    const paginated_vehicles = [];
    let buffer = [];
    for (const vehicle of x) {
      console.log(vehicle);
      if (buffer.length == pagination_count) {
        paginated_vehicles.push(buffer);
        buffer = [];
      }
      buffer.push(vehicle);
      console.log(buffer);
    }
    if (buffer.length != 0) paginated_vehicles.push(buffer);
    console.log(paginated_vehicles);
    return paginated_vehicles;
  }
}
