import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Affiliation, UserProjectAffiliationType } from './types/user-project-affiliation';
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
        private readonly categoriesService: CategoriesService,
    ) {}
    
    getManyProjects(affiliation: UserProjectAffiliationType, authUser: User): Promise<Project[]> {
        if (affiliation === Affiliation.OWNER) {
            return this.projectRepository.find({
                where: {
                    userId: authUser.id,
                },
            });
        } 
        
        return this.projectRepository.find();
    }

    getOneProject(projectId: number): Promise<Project> {
        return this.projectRepository.findOne(projectId);
    }

    async createOneproject(projectDto: CreateProjectDto, authUser: User): Promise<Project> {
        const countExist = await this.projectRepository.count({
            where: {
                key: projectDto.key,
            }
        })
        if (countExist > 0) {
            throw new ConflictException(`La key ${projectDto.key} ya existe`);
        }

        let categories: Category[] = [];
        if (projectDto.categoriesIds && projectDto.categoriesIds.length > 0) {
            categories = await this.categoriesService.findByIds(projectDto.categoriesIds);
        }

        const tempEntity = await this.projectRepository.create(projectDto);
        tempEntity.userId = authUser.id;
        if (categories.length > 0) {
            tempEntity.categories = categories;
        }
        const objSaved =  await this.projectRepository.save(tempEntity);

        return this.projectRepository.findOne(objSaved.id);
    }

    async partialUpdateOneProject(projectId: number, updateProjectDto: UpdateProjectDto, authUser: User): Promise<Project> {
        const preloadData = {
            id: projectId,
            ...updateProjectDto,
        }
        const preloadedProject = await this.projectRepository.preload(preloadData);

        if (!preloadedProject) {
            throw new NotFoundException('El proyecto no existe');
        }

        if (!(preloadedProject.userId===authUser.id)) {
            throw new UnauthorizedException('No es dueño del proyecto');
        }

        let categories: Category[] = [];
        if (updateProjectDto.categoriesIds) {
            categories = await this.categoriesService.findByIds(updateProjectDto.categoriesIds);
        }

        preloadedProject.categories = categories;

        return this.projectRepository.save(preloadedProject);
    }

    async deleteOneProject(projectId: number, authUser: User): Promise<void> {
        const project = await this.projectRepository.findOne(projectId);
        if (!project || project.userId !== authUser.id) {
            return;
        }
        this.projectRepository.delete(project);
    }
    
    
    
    
}
