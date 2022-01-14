import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsServiceMock } from './mocks/projects-service.mock';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers:[ProjectsService],
    })
    .overrideProvider(ProjectsService).useClass(ProjectsServiceMock)
    .compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Projects', async () => {
    expect(await controller.getManyProjects(null, null)).toBeInstanceOf(Array);
  })

  it('should get One Projects', async () => {
    expect(await (await controller.getOneProject(null, 0)).id).toEqual(1);
  })
});
