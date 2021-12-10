import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
  }