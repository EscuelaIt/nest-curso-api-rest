import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TotalTimeLogsService } from './total-time-logs.service';
import { CreateTotalTimeLogDto } from './dto/create-total-time-log.dto';
import { UpdateTotalTimeLogDto } from './dto/update-total-time-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('total-time-logs')
@Controller('total-time-logs')
export class TotalTimeLogsController {
  constructor(private readonly totalTimeLogsService: TotalTimeLogsService) {}

  @Post()
  create(@Body() createTotalTimeLogDto: CreateTotalTimeLogDto) {
    return this.totalTimeLogsService.create(createTotalTimeLogDto);
  }

  @Get()
  findAll() {
    return this.totalTimeLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.totalTimeLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTotalTimeLogDto: UpdateTotalTimeLogDto) {
    return this.totalTimeLogsService.update(+id, updateTotalTimeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.totalTimeLogsService.remove(+id);
  }
}
