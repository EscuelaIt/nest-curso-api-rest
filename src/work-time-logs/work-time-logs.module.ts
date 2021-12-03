import { Module } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { WorkTimeLogsController } from './work-time-logs.controller';

@Module({
  controllers: [WorkTimeLogsController],
  providers: [WorkTimeLogsService]
})
export class WorkTimeLogsModule {}
