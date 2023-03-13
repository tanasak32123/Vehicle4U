import { Body, Controller, Get, Response, Query } from '@nestjs/common';
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
    @Response() res,
  ) {
    //const pagination_count = 2;
    const vehicles = await this.vehicleService.findByFilter(
      province,
      carName,
      maxPassenger,
    );
    if (!vehicles) {
      return res.status(404).send({
        statusCode: 404,
        message: 'car not found',
      });
    }
    //console.log(vehicles);
    return res.status(200).send(vehicles);
  }
}
