import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class IndexDto {
    @ApiProperty({ description: 'Please enter index name' })
    @IsString()
    index: string;
  }

export class IndexIdDto {
    @ApiProperty({ description: 'Please enter id' })
    @IsString()
    id: string;
  }
