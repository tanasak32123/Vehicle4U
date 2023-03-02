import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRentingRequestDto } from './dto/create-reningrequest.dto';
import { RentingRequestService } from './renting-request.service';

@ApiTags('Vehicle4U')
@Controller('renting-request')
export class RentingRequestController{
    constructor (private readonly rentingRequestService: RentingRequestService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRentingRequestDto: CreateRentingRequestDto, @Request() req, @Response() res) {
        const id = req.body['id'];
        const renreq = await this.rentingRequestService.create(id, createRentingRequestDto);
        return res.status(200).send(renreq);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 406, description: 'No Access Rights'})
    @Get('/provider')
    async providerGetRequest(@Request() req,@Response() res) {
    const request = await this.rentingRequestService.providergetrequest(req.body['id']);
        return res.status(200).send(request);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 406, description: 'No Access Rights'})
    @Get('/renter')
    async renterGetRequest(@Request() req,@Response() res) {
    const request = await this.rentingRequestService.rentergetrequest(req.body['id']);
        return res.status(200).send(request);
    }
}