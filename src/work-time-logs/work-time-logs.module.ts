import { Module } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { WorkTimeLogsController } from './work-time-logs.controller';
import { WorkTimeLog } from './entities/work-time-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkTimeLog]),
    ProjectsModule,
  ],
  controllers: [WorkTimeLogsController],
  providers: [WorkTimeLogsService],
  exports: [WorkTimeLogsService],
})
export class WorkTimeLogsModule {}
