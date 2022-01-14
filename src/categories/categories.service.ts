import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
  ) {}

  findByIds(categoriesIds: string[]): Promise<Category[]> {
    return this.categoryRepository.findByIds(categoriesIds);
  }

  create(createCategoryDto: CreateCategoryDto) {
    const tempEntity = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(tempEntity);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
