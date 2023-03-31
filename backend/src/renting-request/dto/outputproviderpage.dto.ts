import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Request_status } from "../entities/renting-request.entity";

export class OutputProviderPageDto {
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
    registrationId: string;
    
    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    rent_place: string;

    @ApiProperty({
        type: Number,
      })
    @IsNotEmpty()
    maximumCapacity: number;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    created_at: string;

    @ApiProperty({
        type: String,
      })
    @IsNotEmpty()
    updated_at: string;

    @ApiProperty({
        enum :["pending","accepted","rejected"]
    })
    @IsNotEmpty()
    status : Request_status;

    
    
}