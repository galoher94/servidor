import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      JwtModule.register({
        global: true,
        secret: 'jwt secret',
        signOptions: { expiresIn: '1d' },
      }),
      TypeOrmModule.forFeature([User]),
    ],
  controllers: [UsersController],
  providers: [UsersService, JwtModule],
})
export class UsersModule {}
