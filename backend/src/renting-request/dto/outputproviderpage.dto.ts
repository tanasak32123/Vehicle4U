import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Request_status } from "../entities/renting-request.entity";

export class OutputProviderPageDto {
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
  registrationId: string;
  
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  renter_id: number;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  renter_firstname: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  renter_lastname: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  tel: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  contact: string;

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

  @ApiProperty({
    type: String
  })
  @IsNotEmpty()
  province : string;
  
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
}