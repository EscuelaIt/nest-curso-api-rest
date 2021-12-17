import { Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkTimeLogsService } from 'src/work-time-logs/work-time-logs.service';
import { CreateTotalTimeLogDto } from './dto/create-total-time-log.dto';
import { UpdateTotalTimeLogDto } from './dto/update-total-time-log.dto';
import { TotalTimeLog } from './entities/total-time-log.entity';

@Injectable()
export class TotalTimeLogsService {
  
  constructor(
    private readonly workTimeLogService: WorkTimeLogsService,
  ) {}

  async findAll(authUser: User) {
    const workTimeLogs = await this.workTimeLogService.findAll(authUser);
    const map = new Map<string, TotalTimeLog>();

    workTimeLogs.forEach((workTimeLog) => {
      const project = workTimeLog.project;
      const projectKey = project.key;
      const exist = map.get(projectKey);

      if (exist) {
        exist.totalHours = exist.totalHours+workTimeLog.hours;
        map.set(projectKey, exist);
        return;
      }

      const totalTimeReport: TotalTimeLog = {
        id: projectKey,
        user: workTimeLog.user,
        project: workTimeLog.project,
        totalHours: workTimeLog.hours,
      }
      map.set(projectKey, totalTimeReport);

    });

    return [ ...map.values() ] as TotalTimeLog[];
  }  

}
