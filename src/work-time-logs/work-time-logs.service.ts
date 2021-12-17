import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWorkTimeLogDto } from './dto/create-work-time-log.dto';
import { UpdateWorkTimeLogDto } from './dto/update-work-time-log.dto';
import { WorkTimeLog } from './entities/work-time-log.entity';

@Injectable()
export class WorkTimeLogsService {

  constructor(
    @InjectRepository(WorkTimeLog) private workTimeLogRepository: Repository<WorkTimeLog>,
    private readonly projectsService: ProjectsService,
  ){}

  async findAll(authUser: User): Promise<WorkTimeLog[]> {
    return this.workTimeLogRepository.find({
      where: {
          user: {
              id: authUser.id,
          }
      }
    });
  }

  async findOne(id: string, authUser: User): Promise<WorkTimeLog> {
    
    const workTimeLog = await this.workTimeLogRepository.findOne({
      where: {
        id: id,
        user: {
          id: authUser.id,
        }
      }
    });

    if (!workTimeLog) {
      throw new NotFoundException();
    }

    return workTimeLog;
  }

  async create(createWorkTimeLogDto: CreateWorkTimeLogDto, authUser: User): Promise<WorkTimeLog> {
    const project = await this.projectsService.getOneProject(createWorkTimeLogDto.projectId);
    if (project.userId !== authUser.id) {
      throw new UnauthorizedException('El proyecto no pertenece al usuario');
    }

    const tempEntity = await this.workTimeLogRepository.create({
      ...createWorkTimeLogDto,
      userId: authUser.id,
    });

    return this.workTimeLogRepository.save(tempEntity);
  }

  async update(id: string, updateWorkTimeLogDto: UpdateWorkTimeLogDto, authUser: User) {
    const preloadData = {
      id: id,
      ...updateWorkTimeLogDto,
    }
    const preloadedWorkTimeLog = await this.workTimeLogRepository.preload(preloadData);
    if (!preloadedWorkTimeLog || preloadedWorkTimeLog.userId !== authUser.id) {
      throw new NotFoundException();
    }
    return this.workTimeLogRepository.save(preloadedWorkTimeLog);
  }

  async remove(id: string, authUser: User) {
    const workTimeLog = await this.workTimeLogRepository.findOne({
      where: {
        id: id,
        userId: authUser.id,
      }
    });
    
    if (!workTimeLog) {
      return;
    }
    
    this.workTimeLogRepository.delete(workTimeLog);
  }
}
