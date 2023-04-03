/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateChatDto {

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    senderId : number

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    receiverId : number

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    message : string ;   

}
