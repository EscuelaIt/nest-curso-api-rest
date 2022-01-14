import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../src/projects/entities/project.entity';
import { ProjectsModule } from '../src/projects/projects.module';
import { CategoriesModule } from '../src/categories/categories.module';
import { Category } from '../src/categories/entities/category.entity';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';


describe('ProjectController (e2e)', () => {
  let app: INestApplication;

  const projectEntityMock = {
    id: 11,
    key: 'AA',
    title: 'TITLE',
    description: 'DESCRIPTION',
    plannedHours: 200
  }


  const mockProjectRepository = {
    find: jest.fn(() => {
      return projectEntityMock;
    })
  }
  const mockCategoryRepository = {
    find: jest.fn(),
  }

  beforeEach(async () => {
    const mockJwtAuthGuard: CanActivate = { 
      canActivate: jest.fn((context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        request.user = { id: 1, username: 'aaa' };
        return true;
      }) 
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule, CategoriesModule],
    })
    .overrideProvider(getRepositoryToken(Project)).useValue(mockProjectRepository)
    .overrideProvider(getRepositoryToken(Category)).useValue(mockCategoryRepository)
    .overrideGuard(JwtAuthGuard).useValue(mockJwtAuthGuard)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/projects (GET)', () => {
    return request(app.getHttpServer())
      .get('/projects').set('Authorization','Bearer test')
      .expect(({ body }: { body: Project[] }) => {
        expect(body).toBeTruthy();
        console.log(body);
      })
      .expect(200)      
  });
});
