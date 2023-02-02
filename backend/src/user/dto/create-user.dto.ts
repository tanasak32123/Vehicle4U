/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    password : string;
    
}
