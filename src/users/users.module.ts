import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
  ],
  controllers: [UsersController],
  providers: [UsersService], // pertenezco al modulo
  exports: [UsersService], // publicos
})
export class UsersModule {}
