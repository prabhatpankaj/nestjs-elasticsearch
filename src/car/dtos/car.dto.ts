import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class CarDto {
  @ApiProperty({ description: 'Please enter id' })
  @IsString()
  id: string;
}