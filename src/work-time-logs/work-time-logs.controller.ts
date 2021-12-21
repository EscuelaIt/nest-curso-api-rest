import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { CreateWorkTimeLogDto } from './dto/create-work-time-log.dto';
import { UpdateWorkTimeLogDto } from './dto/update-work-time-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { WorkTimeLog } from './entities/work-time-log.entity';
import { WorkTimeLogResponseDto } from './dto/work-time-log-response.dto';

@ApiTags('work-time-logs')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('work-time-logs')
@UseGuards(JwtAuthGuard)
export class WorkTimeLogsController {
  constructor(private readonly workTimeLogsService: WorkTimeLogsService) {}

  @Get()
  async findAll(
    @AuthUser() authUser: User,
  ): Promise<WorkTimeLogResponseDto[]> {
    const entities = await this.workTimeLogsService.findAll(authUser);
    const dtos = entities.map(entity => WorkTimeLog.toDto(entity));
    return dtos;
  }

  @Get(':id')
  findOne(
    @AuthUser() authUser: User,
    @Param('id') id: string
  ) {
    return this.workTimeLogsService.findOne(id, authUser);
  }

  @Post()
  create(
    @AuthUser() authUser: User,
    @Body() createWorkTimeLogDto: CreateWorkTimeLogDto
  ) {
    return this.workTimeLogsService.create(createWorkTimeLogDto, authUser);
  }

  @Patch(':id')
  update(
    @AuthUser() authUser: User,
    @Param('id') id: string, 
    @Body() updateWorkTimeLogDto: UpdateWorkTimeLogDto
  ) {
    return this.workTimeLogsService.update(id, updateWorkTimeLogDto, authUser);
  }

  @Delete(':id')
  remove(
    @AuthUser() authUser: User,
    @Param('id') id: string
  ) {
    return this.workTimeLogsService.remove(id, authUser);
  }
}
