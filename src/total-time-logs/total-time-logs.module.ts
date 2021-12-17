import { Module } from '@nestjs/common';
import { TotalTimeLogsService } from './total-time-logs.service';
import { TotalTimeLogsController } from './total-time-logs.controller';
import { WorkTimeLogsModule } from 'src/work-time-logs/work-time-logs.module';

@Module({
  imports: [WorkTimeLogsModule],
  controllers: [TotalTimeLogsController],
  providers: [TotalTimeLogsService]
})
export class TotalTimeLogsModule {}
