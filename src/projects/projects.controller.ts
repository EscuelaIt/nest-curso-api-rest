import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getManyProjects(): Promise<Project[]> {
        return this.projectsService.getManyProjects();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':projectId')
    async getOneProject(
        @Param('projectId', ParseIntPipe) projectId: number,
    ): Promise<Project> {
        const project = await this.projectsService.getOneProject(projectId);
        if (!project) {
            throw new NotFoundException(`Proyecto con id ${projectId} no existe`);
        }

        return project;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createOneproject(
        @Body() projectDto: CreateProjectDto
    ): Promise<Project> {
        return this.projectsService.createOneproject(projectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':projectId')
    partialUpdateOneProject(
        @Param('projectId', ParseIntPipe) projectId: number,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Promise<Project> {
        return this.projectsService.partialUpdateOneProject(projectId, updateProjectDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':projectId')
    deleteOneProject(
        @Param('projectId', ParseIntPipe) projectId: number,
    ) {
        return this.projectsService.deleteOneProject(projectId);
    }



}
