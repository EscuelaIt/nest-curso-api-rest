import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsOptional()
    @IsNumber()
    @Min(1, { message: 'Min value 1'})
    @Max(1000, { message: 'Max value 1000'})
    plannedHours?: number;
}