import { Module } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { WorkTimeLogsController } from './work-time-logs.controller';
import { WorkTimeLog } from './entities/work-time-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkTimeLog]),
  ],
  controllers: [WorkTimeLogsController],
  providers: [WorkTimeLogsService]
})
export class WorkTimeLogsModule {}
