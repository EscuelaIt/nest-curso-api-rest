import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserProjectAffiliation } from './decorators/user-project-affiliation.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { UserProjectAffiliationType } from './types/user-project-affiliation';

@ApiTags('projects')
@ApiBearerAuth('JWT')
@Controller('projects')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getManyProjects(
        @AuthUser() authUser: User,
        @UserProjectAffiliation() affiliation: UserProjectAffiliationType,
    ): Promise<Project[]> {
        return this.projectsService.getManyProjects(affiliation, authUser);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':projectId')
    async getOneProject(
        @AuthUser() authUser: User,
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
        @AuthUser() authUser: User,
        @Body() projectDto: CreateProjectDto
    ): Promise<Project> {
        console.log(authUser);
        return this.projectsService.createOneproject(projectDto, authUser);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':projectId')
    partialUpdateOneProject(
        @AuthUser() authUser: User,
        @Param('projectId', ParseIntPipe) projectId: number,
        @Body() updateProjectDto: UpdateProjectDto,
    ): Promise<Project> {
        return this.projectsService.partialUpdateOneProject(projectId, updateProjectDto, authUser);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':projectId')
    deleteOneProject(
        @AuthUser() authUser: User,
        @Param('projectId', ParseIntPipe) projectId: number,
    ) {
        return this.projectsService.deleteOneProject(projectId, authUser);
    }



}
