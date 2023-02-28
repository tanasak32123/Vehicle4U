import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export enum Request_status {
    //custom status
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export class CreateRentingRequestDto {
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    car_id : number;
    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    start_rent_date : string ; 
    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    end_rent_date : string ;
    
    @ApiProperty({
        type: Request_status,
    })
    @IsNotEmpty()
    status : Request_status;
      
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    rent_place: string;
}