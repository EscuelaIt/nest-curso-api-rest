import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

export class CategoriesServiceMock {
    create(dto: CreateCategoryDto): Promise<Category> {
        return Promise.resolve({
            id: uuidv4(),
            ...dto
        });
    }
}