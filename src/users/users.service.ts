import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async create(dto: CreateUserAccountDto): Promise<User> {
    
    const loadedUser = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (loadedUser && loadedUser.username === dto.username) {
      throw new ConflictException('username is not available');
    }

    if (loadedUser && loadedUser.email === dto.email) {
      throw new ConflictException('email is not available');
    }

    const tempEntity = this.userRepository.create(dto);
    return this.userRepository.save(tempEntity);
  }

  getOneUserIncludingPass(username: string): Promise<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where(`user.username ='${username}'`).addSelect('user.password');
    return queryBuilder.getOne();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where(`user.id = :id`, { id })
    return queryBuilder.getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
