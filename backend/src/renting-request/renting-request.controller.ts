import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RentingRequest } from './entities/renting-request.entity';
import { RentingRequestService } from './renting-request.service';

@ApiTags('Vehicle4U')
@Controller('renting-request')
export class RentingRequestController{
    constructor (private readonly rentingRequestService: RentingRequestService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() request: RentingRequest, @Request() req, @Response() res) {
        //const user = await this.rentingRequestService.create();
    }
}