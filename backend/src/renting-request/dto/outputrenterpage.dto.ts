import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Request_status } from "../entities/renting-request.entity";

export class OutputRenterPageDto {
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    request_id: number;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    car_id: number;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    imagename: string;

    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    car_name: string;
    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    tel: string;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    provider_id: number;

    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    provider_firstname: string;

    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    provider_lastname: string;

    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    registrationId: string;

    @ApiProperty({
        type: Number,
      })
    @IsNotEmpty()
    maximumCapacity: number;

    @ApiProperty({
        enum :["pending","accepted","rejected"]
    })
    @IsNotEmpty()
    status : Request_status;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    startdate : string ;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    starttime : string ;
    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    enddate : string ;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    endtime : string ;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    cid : number ;
}