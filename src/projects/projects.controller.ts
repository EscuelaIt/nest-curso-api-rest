import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, Res } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getManyProjects(): Project[] {
        return this.projectsService.getManyProjects();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':projectId')
    getOneProject(
        @Param('projectId') projectId: number,
    ): Project {
        return this.projectsService.getOneProject(projectId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createOneproject(
        @Body() projectDto: CreateProjectDto
    ): Project {
        return this.projectsService.createOneproject(projectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':projectId')
    partialUpdateOneProject(
        @Param('projectId', ParseIntPipe) projectId: number,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Project {
        console.log(projectId);
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
