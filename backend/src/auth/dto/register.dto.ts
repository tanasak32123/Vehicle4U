/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    username : string ;
    @IsNotEmpty()
    password : string ;
    @IsNotEmpty()
    first_name : string ; 
    @IsNotEmpty()
    last_name : string ; 
    @IsNotEmpty()
    tel : string ; 
    @IsNotEmpty()
    citizen_id : string; 
    @IsNotEmpty()
    is_provider : boolean ; 
    @IsNotEmpty()
    is_renter : boolean ; 
    driving_license_id : string ;
    payment_channel : string ; 

}
