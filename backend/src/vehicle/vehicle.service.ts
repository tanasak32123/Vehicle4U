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
    pageNumber: number,
  ): Promise<[Vehicle[], any]> {
    const pagination_count = 2;
    const all_vehicles = await this.vehicleRepository.find();
    const datalength = all_vehicles.length;
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
    paginationData.page_count = Math.ceil(datalength / pagination_count);
    // console.log(await this.vehicleRepository.find());
    // const paginated_vehicles = [];
    // let buffer = [];
    // for (const vehicle of x) {
    //   console.log(vehicle);
    //   if (buffer.length == pagination_count) {
    //     paginated_vehicles.push(buffer);
    //     buffer = [];
    //   }
    //   buffer.push(vehicle);
    //   console.log(buffer);
    // }
    // if (buffer.length != 0) paginated_vehicles.push(buffer);
    console.log(paginated_vehicles);
    console.log(paginationData);
    return [paginated_vehicles, paginationData];
  }
}
