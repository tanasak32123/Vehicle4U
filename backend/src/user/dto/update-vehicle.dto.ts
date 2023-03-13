import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateVehicleDto {
  @ApiProperty({
   type: Number,
  })
  @IsNotEmpty()
  id : number;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  registrationId: string;

  @ApiProperty({
    type: String,
  })
  imagename: string;

  @ApiProperty({
    type: String,
  })
  province: string;

  @ApiProperty({
    type: Number,
  })
  maximumCapacity: number;
}
