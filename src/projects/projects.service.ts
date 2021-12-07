import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
/*
const mock:Project[] = [
    {
        id: 1,
        key:'marte2030',
        description:'descri',
        title: 'title',
        plannedHours: 250,
        owner: 'miowner',
    },
    {
        id: 2,
        key:'marte2020',
        description:'descri',
        title: 'title',
        plannedHours: 250,
        owner: 'miowner',
    } ,
    {
        id: 3,
        key:'marte2040',
        description:'descri',
        title: 'title',
        plannedHours: 250,
        owner: 'miowner',
    }  
]
*/

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}
    
    getManyProjects(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    getOneProject(projectId: number): Promise<Project> {
        return this.projectRepository.findOne(projectId);
    }

    async createOneproject(projectDto: CreateProjectDto): Promise<Project> {
        const countExist = await this.projectRepository.count({
            where: {
                key: projectDto.key,
            }
        })
        if (countExist > 0) {
            throw new ConflictException(`La key ${projectDto.key} ya existe`);
        }

        const tempEntity = await this.projectRepository.create(projectDto);
        return this.projectRepository.save(tempEntity);
    }

    async partialUpdateOneProject(projectId: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const preloadData = {
            id: projectId,
            ...updateProjectDto,
        }
        const preloadedProject = await this.projectRepository.preload(preloadData);

        if (!preloadedProject) {
            throw new NotFoundException('El proyecto no existe');
        }
        return this.projectRepository.save(preloadedProject);
    }

    async deleteOneProject(projectId: number): Promise<void> {
        const project = await this.projectRepository.findOne(projectId);
        if (!project) {
            return;
        }
        this.projectRepository.delete(project);
    }
    
    
    
    
}
