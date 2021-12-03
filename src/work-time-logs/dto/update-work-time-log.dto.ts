import { PartialType } from '@nestjs/swagger';
import { CreateWorkTimeLogDto } from './create-work-time-log.dto';

export class UpdateWorkTimeLogDto extends PartialType(CreateWorkTimeLogDto) {}
