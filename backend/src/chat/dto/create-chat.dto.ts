/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

enum Sender {
    Renter = 'renter',
    Provider = 'provider'
}
  
export class CreateChatDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    renterFirstName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    renterLastName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    providerFirstName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    providerLastName : string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    text : string ; 

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    sender : string ; 


    // @ApiProperty({
    //     enum: Sender,
    //     enumName: 'Sender',
    //     example: Sender.Renter,
    // })
    // @IsEnum(Sender)
    // sender: Sender;  

}
