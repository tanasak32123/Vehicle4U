import { Body, Controller, Get, Patch, Post, Delete, Request, Response, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchVehicleDto } from 'src/vehicle/dto/search-vehicle.dto';
import { CreateRentingRequestDto } from './dto/create-rentingrequest.dto';
import { UpdateRentingRequestDto } from './dto/update-rentingrequest.dto';
import { RentingRequestService } from './renting-request.service';

@ApiTags('Vehicle4U')
@Controller('renting-request')
export class RentingRequestController{
    constructor (private readonly rentingRequestService: RentingRequestService) {}

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
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
    const request = await this.rentingRequestService.providergetrequest(req.user['id']);
        return res.status(200).send(request);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 406, description: 'No Access Rights'})
    @Get('/renter')
    async renterGetRequest(@Request() req,@Response() res) {
    const request = await this.rentingRequestService.rentergetrequest(req.user['id']);
        return res.status(200).send(request);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 406, description: 'No Access Rights'})
    @Patch('/provider')
    async updateStatus(@Body() updateRentingRequestDto: UpdateRentingRequestDto, @Request() req,@Response() res) {
        const rentingrequest = await this.rentingRequestService.updatestatus(updateRentingRequestDto);
        return res.status(200).send(rentingrequest);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiResponse({ status: 200, description: 'Successful.' })
    // @ApiResponse({ status: 401, description: 'Unauthorized' })
    // @ApiResponse({ status: 404, description: 'User not found.' })
    // @ApiResponse({ status: 406, description: 'No Access Rights'})
    // @Delete('/renter')
    // async delete(@Body() id: number, @Request() req, @Response() res){
    //     const rentingRequest = await this.rentingRequestService.delete(id);
    //     if(!rentingRequest) return res.status(404).send('rentingrequest not found');
    //     return res.status(200).send(rentingRequest);
    // }
}