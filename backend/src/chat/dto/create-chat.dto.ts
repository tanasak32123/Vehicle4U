/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateChatDto {

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    senderId : string

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    receiverId : string

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    message : string ;   

}
