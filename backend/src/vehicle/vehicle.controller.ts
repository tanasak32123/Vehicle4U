import { Body, Controller, Get, Response, Query, Post } from '@nestjs/common';

import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('search')
  async search(
    @Query('province') province: string,
    @Query('name') carName: string,
    @Query('maxPassenger') maxPassenger: number,
    @Query('page') pageNumber: number,
    @Response() res,
  ) {
    //const pagination_count = 2;
    const temp = await this.vehicleService.findByFilter(
      province,
      carName,
      maxPassenger,
      pageNumber,
    );
    const vehicles = temp[0];
    const pagination_data = temp[1];
    if (!vehicles) {
      return res.status(404).send({
        statusCode: 404,
        message: 'car not found',
      });
    }
    //console.log(vehicles);
    return res.status(200).json({
      vehicles: vehicles,
      page_count: pagination_data.page_count,
      next_page: pagination_data.next.pageNumber,
    });
  }
}
