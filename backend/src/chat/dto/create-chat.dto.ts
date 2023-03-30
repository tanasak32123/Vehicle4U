/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateChatDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    senderFirstName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    senderLastName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    receiverFirstName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    receiverLastName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    text : string ; 

}
