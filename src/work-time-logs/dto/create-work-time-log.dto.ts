import { IsDateString, IsNumber, IsPositive, Max, Min } from "class-validator";

export class CreateWorkTimeLogDto {
    
    @IsNumber()
    @Min(1)
    @Max(12)
    hours: number;

    @IsDateString()
    date: string;

    @IsNumber()
    projectId: number;
}
