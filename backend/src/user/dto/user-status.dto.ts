/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class UserStatusDto {
    @IsNotEmpty()
    token : string;
    @IsNotEmpty()
    isProvider : boolean;
    @IsNotEmpty()
    isRenter : boolean
    
}