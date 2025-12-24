import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RoleModule } from 'src/role/role.module';
import { PasswordService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
