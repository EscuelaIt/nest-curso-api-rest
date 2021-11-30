import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

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

@Injectable()
export class ProjectsService {
    
    
    getManyProjects(): Project[] {
        return mock;
    }

    getOneProject(projectId: number): Project {
        throw new Error('Method not implemented.');
    }

    deleteOneProject(projectId: number) {
        throw new Error('Method not implemented.');
    }
    
    partialUpdateOneProject(projectId: number, updateProjectDto: UpdateProjectDto): Project {
        const res = mock.find(proj => proj.id = projectId);
        return {
            ...res,
            ...updateProjectDto,
        };
    }
    
    createOneproject(projectDto: CreateProjectDto): Project {
        console.log(projectDto);
        const a = mock[0];
        return {
            ...a,
            id: 50,
            ...projectDto,
        };
    }
}
