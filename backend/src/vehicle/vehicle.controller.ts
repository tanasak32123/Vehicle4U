import { Body, Controller, Get, Response, Query, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}




  @Get('search')
  async search(
    @Query('province') province: string,
    @Query('name') carName: string,
    @Query('maxPassenger') maxPassenger: number,
    @Response() res,
  ) {
    const vehicles = await this.vehicleService.findByFilter(
      province,
      carName,
      maxPassenger,
    );
    if (!vehicles) {
      return res.status(404).send({
        statusCode: 404,
        message: 'user not found',
      });
    }
    return res.status(200).send(vehicles);
  }
}