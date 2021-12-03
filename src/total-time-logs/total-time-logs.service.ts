import { Injectable } from '@nestjs/common';
import { CreateTotalTimeLogDto } from './dto/create-total-time-log.dto';
import { UpdateTotalTimeLogDto } from './dto/update-total-time-log.dto';

@Injectable()
export class TotalTimeLogsService {
  create(createTotalTimeLogDto: CreateTotalTimeLogDto) {
    return 'This action adds a new totalTimeLog';
  }

  findAll() {
    return `This action returns all totalTimeLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} totalTimeLog`;
  }

  update(id: number, updateTotalTimeLogDto: UpdateTotalTimeLogDto) {
    return `This action updates a #${id} totalTimeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} totalTimeLog`;
  }
}
