import { Injectable } from '@nestjs/common';
import { CreateUserAccountDto } from 'src/users/dto/create-user-account.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
    ) {}

    async generateSuccessAuthenticationResponse(user: User): Promise<LoginResponseDto> {
        
        const token = await this.tokenService.generateAccessToken(user);
        
        return {
            access_token: token,
            username: user.username,
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
}
