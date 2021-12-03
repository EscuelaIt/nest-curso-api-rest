import { Module } from '@nestjs/common';
import { TotalTimeLogsService } from './total-time-logs.service';
import { TotalTimeLogsController } from './total-time-logs.controller';

@Module({
  controllers: [TotalTimeLogsController],
  providers: [TotalTimeLogsService]
})
export class TotalTimeLogsModule {}
