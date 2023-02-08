/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
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
    role : boolean ;  // 0 -> renter , 1 -> provider 
}
