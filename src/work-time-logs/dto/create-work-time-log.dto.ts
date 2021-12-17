import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsPositive, Max, Min } from "class-validator";

export class CreateWorkTimeLogDto {
    
    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(12)
    hours: number;

    @ApiProperty()
    @IsDateString()
    date: string;

    @ApiProperty()
    @IsNumber()
    projectId: number;
}
