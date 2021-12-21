import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserAccountDto) {
    
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string, @AuthUser() authUser: User) {
    const user = await this.usersService.findOneV2(username, authUser);
    return User.toDto(user);
  }

  @Patch(':username')
  update(
    @Param('username') username: string, 
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: User
    ) {
    return this.usersService.update(username, updateUserDto, authUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
