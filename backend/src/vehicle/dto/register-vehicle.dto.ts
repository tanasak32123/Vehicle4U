import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class RegisterVehicleDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  name: string;

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

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  tel: string;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  citizen_id: string;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  is_provider: boolean; // 0 -> renter , 1 -> provider
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  is_renter: boolean; // 0 -> renter , 1 -> provider
  @ApiPropertyOptional({
    type: String,
  })
  payment_channel: string;
  @ApiPropertyOptional({
    type: String,
  })
  driving_license_id: string;
}
