import {
  Body,
  Controller,
  Get,
  Response,
  Query,
  Post,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('vehicle')
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


  
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createVehicle(
    @Request() req,
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const id = req.user['id'];
    return await this.vehicleService.createVehicle(id, createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateVehicle(
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Response() res,
  ) {
    const { oldImageName, vehicle } = await this.vehicleService.updateVehicle(
      updateVehicleDto,
    );
    return res.status(200).send({
      oldImageName: oldImageName,
      vehicle: vehicle,
    });
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getVehiclesByVehicleId(
  @Query('vehicleId') vehicleId: number,
  @Request() req){
    console.log(vehicleId);
    return await this.vehicleService.getVehicleByVehicleId(vehicleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myvehicles')
  async getVehiclesById(@Request() req){
    const id = req.user['id'];
    return await this.vehicleService.getVehicleByUserId(id);
  }
}
