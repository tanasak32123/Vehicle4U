/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
    @ApiProperty({
        type: String,
    })
    username : string;
    @ApiProperty({
        type: String,
    })
    password : string;
    @ApiProperty({
        type: String,
    })
    first_name : string; 
    @ApiProperty({
        type: String,
    })
    last_name : string; 
    @ApiProperty({
        type: String,
    })
    tel : string ; 
    @ApiProperty({
        type: String,
    })
    citizen_id : string ; 
    @ApiProperty({
        type: String,
    })
    is_provider: boolean; // 0 -> renter , 1 -> provider 
    @ApiProperty({
        type: String,
    })
    is_renter: boolean; // 0 -> renter , 1 -> provider 
    @ApiPropertyOptional({
        type: String,
    })
    payment_channel : string ; 
    @ApiPropertyOptional({
        type: String,
    })
    driving_license_id : string ; 
}
