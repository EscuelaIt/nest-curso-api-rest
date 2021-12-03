import { PartialType } from '@nestjs/swagger';
import { CreateTotalTimeLogDto } from './create-total-time-log.dto';

export class UpdateTotalTimeLogDto extends PartialType(CreateTotalTimeLogDto) {}
