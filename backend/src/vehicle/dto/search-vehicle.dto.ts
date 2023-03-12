import { ApiPropertyOptional } from '@nestjs/swagger';
export class SearchVehicleDto {
  @ApiPropertyOptional({
    type: String,
  })
  Name: string;
  @ApiPropertyOptional({
    type: String,
  })
  Province: string;

  @ApiPropertyOptional({
    type: Number,
  })
  MaxCapacity: number;
}
