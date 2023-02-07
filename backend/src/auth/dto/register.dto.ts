/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    username : string ;
}
