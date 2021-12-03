import { Injectable } from '@nestjs/common';
import { CreateWorkTimeLogDto } from './dto/create-work-time-log.dto';
import { UpdateWorkTimeLogDto } from './dto/update-work-time-log.dto';

@Injectable()
export class WorkTimeLogsService {
  create(createWorkTimeLogDto: CreateWorkTimeLogDto) {
    return 'This action adds a new workTimeLog';
  }

  findAll() {
    return `This action returns all workTimeLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workTimeLog`;
  }

  update(id: number, updateWorkTimeLogDto: UpdateWorkTimeLogDto) {
    return `This action updates a #${id} workTimeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} workTimeLog`;
  }
}
