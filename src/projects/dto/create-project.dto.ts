import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsLowercase, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateProjectDto {
    
    @ApiProperty({ description: 'Key unica de 8-16 caracteres alfanumericos en minuscula de proyecto. ', example: 'martes2345'})
    @IsAlphanumeric()
    @IsLowercase()
    @IsNotEmpty()
    @Length(8, 16)
    key: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @Min(1, { message: 'Min value 1'})
    @Max(1000, { message: 'Max value 1000'})
    @IsNotEmpty()
    plannedHours: number;
}