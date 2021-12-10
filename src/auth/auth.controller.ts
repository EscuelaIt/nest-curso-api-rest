import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CreateUserAccountDto } from 'src/users/dto/create-user-account.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/account')
    async createUserAccount(
        @Body() dto: CreateUserAccountDto
    ): Promise<UserResponseDto> {
        const user = await this.authService.create(dto);
        return User.toDto(user);

    }


    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/login')
    async login(
        @AuthUser() user: User,
        @Body() loginDto: CreateLoginDto,
      ): Promise<LoginResponseDto> {
        console.log(user);
        // Devolver token al cliente
        return null;
    }

}
