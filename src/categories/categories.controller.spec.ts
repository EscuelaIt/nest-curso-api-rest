import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuidv4 } from 'uuid';
import { CategoriesServiceMock } from './mocks/categories-service.mock';

const createCategoryDto: CreateCategoryDto = { name: 'categoria_test' };

/*let categoriesServiceMock = {
  create: jest.fn((dto) => {
    return {
      id: uuidv4(),
      ...dto,
    }
  })

  // create: jest.fn().mockReturnValue({
  //  id: uuidv4(),
  //  ...createCategoryDto,
  // })
};*/

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useClass: CategoriesServiceMock
        }
      ],
    })
    .overrideProvider(CategoriesService).useClass(CategoriesServiceMock)
    // .overrideProvider(CategoriesService).useValue(categoriesServiceMock)
    .compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new category record and return that', async () => {
    
    expect(await controller.create(createCategoryDto)).toEqual({
      id: expect.any(String),
      ...createCategoryDto,
    })

  });

  it('should be called 1 time', async () => {

    const spyServiceCreate = jest.spyOn(service, 'create');
    controller.create(createCategoryDto);
    expect(spyServiceCreate).toHaveBeenCalledWith(createCategoryDto);
    expect(spyServiceCreate).toHaveBeenCalledTimes(1);

  });



});
