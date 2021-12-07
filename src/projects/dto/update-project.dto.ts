import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { CreateProjectDto } from "./create-project.dto";

export class UpdateProjectDto extends PartialType(OmitType(CreateProjectDto, ['key'] as const)) {
}