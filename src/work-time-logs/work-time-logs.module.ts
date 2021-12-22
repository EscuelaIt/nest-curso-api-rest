import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { WorkTimeLogsController } from './work-time-logs.controller';
import { WorkTimeLog } from './entities/work-time-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkTimeLog]),
    ProjectsModule,
    CacheModule.register({
      ttl: 5, // segundos,
      max: 10, 
    }),
  ],
  controllers: [WorkTimeLogsController],
  providers: [WorkTimeLogsService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [WorkTimeLogsService],
})
export class WorkTimeLogsModule {}
