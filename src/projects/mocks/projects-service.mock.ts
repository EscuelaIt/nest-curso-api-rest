import { v4 as uuidv4 } from 'uuid';
import { Project } from '../entities/project.entity';

export class ProjectsServiceMock {
    getManyProjects(affiliation, authUser): Promise<Project[]> {
        return Promise.resolve([
            {
                id: 11
            } as Project,
        ])
    }

    getOneProject(projectId: number): Promise<Project> {
        const p: Project = new Project();
        p.id = 1;
        return Promise.resolve(p);
    }
}