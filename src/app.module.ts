import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { WorkTimeLogsModule } from './work-time-logs/work-time-logs.module';
import { TotalTimeLogsModule } from './total-time-logs/total-time-logs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNC==='true',
      autoLoadEntities: true,
    }),*/
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      })
    }),
    ProjectsModule,
    WorkTimeLogsModule,
    TotalTimeLogsModule,
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
