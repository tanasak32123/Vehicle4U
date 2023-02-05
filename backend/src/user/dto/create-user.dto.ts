/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    password : string;
    
}

export class UserStatusDto {
    @IsNotEmpty()
    token : string;
    @IsNotEmpty()
    currentRole : string;
    
}