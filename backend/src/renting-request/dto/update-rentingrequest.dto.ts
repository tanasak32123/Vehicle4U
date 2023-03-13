import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Request_status } from "../entities/renting-request.entity";

export class UpdateRentingRequestDto {
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    id : number;
    
    // @ApiProperty({
    //     type: String,
    // })
    // start_rent_date : string ; 
    
    // @ApiProperty({
    //     type: String,
    // })
    // end_rent_date : string ;
    
    @ApiProperty({
        enum:['pending','accepted','rejected'],
    })
    status : Request_status;
      

}