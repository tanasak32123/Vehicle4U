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
}
