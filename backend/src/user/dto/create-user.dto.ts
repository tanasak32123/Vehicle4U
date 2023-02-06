/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    password : string;
    @IsNotEmpty()
    first_name : string; 
    @IsNotEmpty()
    last_name : string; 
    @IsNotEmpty()
    tel : string ; 
    @IsNotEmpty()
    citizen_id : string ; 
    @IsNotEmpty()
    is_provider: boolean; // 0 -> renter , 1 -> provider 
    @IsNotEmpty()
    is_renter: boolean; // 0 -> renter , 1 -> provider 
    payment_channel : string ; 
    driving_license_id : string ; 
}
