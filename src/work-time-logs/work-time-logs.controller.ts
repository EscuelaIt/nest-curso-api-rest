import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkTimeLogsService } from './work-time-logs.service';
import { CreateWorkTimeLogDto } from './dto/create-work-time-log.dto';
import { UpdateWorkTimeLogDto } from './dto/update-work-time-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('work-time-logs')
@Controller('work-time-logs')
export class WorkTimeLogsController {
  constructor(private readonly workTimeLogsService: WorkTimeLogsService) {}

  @Post()
  create(@Body() createWorkTimeLogDto: CreateWorkTimeLogDto) {
    return this.workTimeLogsService.create(createWorkTimeLogDto);
  }

  @Get()
  findAll() {
    return this.workTimeLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workTimeLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkTimeLogDto: UpdateWorkTimeLogDto) {
    return this.workTimeLogsService.update(+id, updateWorkTimeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workTimeLogsService.remove(+id);
  }
}
