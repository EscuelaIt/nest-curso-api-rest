import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { v4 as uuidv4 } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesModule } from './categories.module';

const MOCK_DATA: Category[] = [
  { id: uuidv4(), name: 'Primera' },
  { id: uuidv4(), name: 'Segunda' },
  { id: uuidv4(), name: 'Tercera' }
];

const mockCategoriesRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(category => Promise.resolve({ id: uuidv4(), ...category })),
  find: jest.fn().mockImplementation(() => Promise.resolve(MOCK_DATA)),
}

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CategoriesModule,
      ]
      //providers: [CategoriesService],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockCategoriesRepository)
    .compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a new category record and return that', async () => {
    expect(await service.create({ name: 'categoria_test'})).toEqual({
      id: expect.any(String),
      name: 'categoria_test'
    });
  });

  test('should return array with same Category elements', async () => {
    expect(await service.findAll()).toEqual(MOCK_DATA);
    expect(await service.findAll()).toBeInstanceOf(Array);
    expect((await service.findAll()).length).toEqual(MOCK_DATA.length);
  });

});
