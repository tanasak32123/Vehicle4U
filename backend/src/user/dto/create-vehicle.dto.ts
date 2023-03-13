import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateVehicleDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  registrationId: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  imagename: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  province: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  maximumCapacity: number;

  

}
