import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, UseGuards, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/common/roles.guard';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@ApiBearerAuth('JWT')
@Controller({
  path: 'users',
})
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Get()
  @Roles(Role.Admin)
  async findAllv1(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Version('2')
  @Get()
  @Roles(Role.Admin)
  async findAllv2(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    const res = users.map(user => User.toDto(user));
    return res;
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
