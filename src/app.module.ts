import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { WorkTimeLogsModule } from './work-time-logs/work-time-logs.module';
import { TotalTimeLogsModule } from './total-time-logs/total-time-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'user_cursonest',
      password: 'password_cursonest',
      database: 'db_cursonest2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    WorkTimeLogsModule,
    TotalTimeLogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
