import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Request_status } from "../entities/renting-request.entity";

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
        enum:['pending','accepted','rejected'],
    })
    @IsNotEmpty()
    status : Request_status;
      
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    rent_place: string;
}