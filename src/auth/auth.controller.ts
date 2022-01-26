import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CreateUserAccountDto } from 'src/users/dto/create-user-account.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RenewAccessTokenResponse } from './dto/authenticationResponse';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

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
        return await this.authService.generateSuccessAuthenticationResponse(user);
    }

    @Post('/refresh-tokens')
    public async refreshAccessToken(
        @Body() refreshTokenDto: RefreshTokenDto,
    ): Promise<RenewAccessTokenResponse> {
        const resultPayload: RenewAccessTokenResponse = await this.authService.rotateTokens(refreshTokenDto.refreshToken)
        
        if (!resultPayload) {
            throw new UnauthorizedException();
        }
        return resultPayload;
    }

}
