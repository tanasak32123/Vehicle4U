/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    username : string ; 
    @IsNotEmpty()
    password : string ; 
    @IsNotEmpty()
    role : boolean ; 
}
