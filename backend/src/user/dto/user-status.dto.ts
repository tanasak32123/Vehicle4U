/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty} from '@nestjs/swagger';
export class UserStatusDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    token : string;
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    isProvider : boolean;
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    isRenter : boolean
    
}