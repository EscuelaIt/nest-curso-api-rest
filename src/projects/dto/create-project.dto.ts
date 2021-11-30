import { IsAlphanumeric, IsLowercase, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateProjectDto {
    @IsAlphanumeric()
    @IsLowercase()
    @IsNotEmpty()
    @Length(8, 16)
    key: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(1, { message: 'Min value 1'})
    @Max(1000, { message: 'Max value 1000'})
    @IsNotEmpty()
    plannedHours: number;
}