/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    receiverId : number;
}
