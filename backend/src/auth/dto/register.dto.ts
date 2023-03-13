/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    username : string ;
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    password : string ;
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    first_name : string ; 
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    last_name : string ; 
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    tel : string ; 
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    citizen_id : string; 
    @ApiProperty({
        type: Boolean,
    })
    @IsNotEmpty()
    is_provider : boolean ; 
    @ApiProperty({
        type: Boolean,
    })
    @IsNotEmpty()
    is_renter : boolean ; 
    @ApiProperty({
        type: String,
    })
    driving_license_id : string ;
    @ApiProperty({
        type: String,
    })
    payment_channel : string ; 

}
