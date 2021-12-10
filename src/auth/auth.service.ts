import { Injectable } from '@nestjs/common';
import { CreateUserAccountDto } from 'src/users/dto/create-user-account.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    
    
    constructor(
        private usersService: UsersService,
    ) {}

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
