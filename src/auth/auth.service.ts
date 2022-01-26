import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserAccountDto } from 'src/users/dto/create-user-account.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RenewAccessTokenResponse, TokensPayload } from './dto/authenticationResponse';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
    ) {}

    async generateSuccessAuthenticationResponse(user: User): Promise<LoginResponseDto> {
        
        const expireRefreshTokenTimeInSec = 864000; // 10 dias

        const tokens = await this.tokenService.generatePairTokens(user, expireRefreshTokenTimeInSec);
        const tokenPayload = this.generateTokenPayload(tokens.accessToken, tokens.refreshToken);

        return {
            username: user.username,
            payload: tokenPayload,
        }

    }

    async validateLoginCredentials(username: string, password: string): Promise<User | null> {
        const user: User = await this.usersService.getOneUserIncludingPass(username);
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        return null;
    }

    async create(dto: CreateUserAccountDto): Promise<User> {
        return await this.usersService.create(dto);
    }

    async rotateTokens(refreshTokenEncoded: string): Promise<RenewAccessTokenResponse> {
        const refreshTokenPayload = await this.tokenService.decodeRefreshToken(refreshTokenEncoded);
        const usernameInRefreshToken = await this.tokenService.extractUserNameFromTokenPayload(refreshTokenPayload);
        const user = await this.usersService.getOneUser(usernameInRefreshToken);

        if (!user) {
            throw new UnprocessableEntityException('User not exits')
        }

        // Revocamos el refresh token
        const refreshToken: RefreshToken = await this.tokenService.getRefreshTokenEntity(refreshTokenPayload);
        if (!refreshToken || refreshToken.isRevoked) {
            throw new UnauthorizedException('Refresh token revoked')
        }
        await this.tokenService.revokeRefreshToken(refreshToken);

        return this.generateSuccessAuthenticationResponse(user);

    }

    private generateTokenPayload(accessToken: string, refreshToken: string): TokensPayload {
        return {
          type: 'bearer',
          token: accessToken,
          refresh_token: refreshToken,
        }
    }

    
}
