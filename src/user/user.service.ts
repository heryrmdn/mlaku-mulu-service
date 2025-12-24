import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto/user.dto';
import { Glossary as GlossaryUtil } from 'src/shared/utils/glossary';
import { RoleService } from 'src/role/role.service';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private roleService: RoleService,
    private passwordService: PasswordService,
  ) {}

  async getList(): Promise<User[]> {
    return this.userRepository.find({
      relations: { role: true, status: true },
    });
  }

  async getDetailById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: { rolePermissions: true }, status: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getDetailByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: { role: { rolePermissions: true }, status: true },
    });
  }

  async getDetailByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUsername = await this.getDetailByUsername(
      createUserDto.username,
    );
    if (
      existUsername &&
      existUsername.statusId === GlossaryUtil.UsersStatusActive
    ) {
      throw new ConflictException('User username already exist');
    }

    const existEmail = await this.getDetailByEmail(createUserDto.email);
    if (existEmail && existEmail.statusId === GlossaryUtil.UsersStatusActive) {
      throw new ConflictException('User email already exist');
    }

    await this.roleService.getDetailById(createUserDto.roleId);

    const hashPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
        statusId: GlossaryUtil.UsersStatusActive,
      }),
    );

    return this.getDetailById(user.id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.getDetailById(id);

    const existUsername = await this.getDetailByUsername(
      updateUserDto.username,
    );

    if (
      existUsername &&
      existUsername?.id !== id &&
      existUsername?.statusId === GlossaryUtil.UsersStatusActive
    ) {
      throw new ConflictException('User username already exist');
    }

    const existEmail = await this.getDetailByEmail(updateUserDto.email);

    if (
      existEmail &&
      existEmail?.id !== id &&
      existEmail?.statusId === GlossaryUtil.UsersStatusActive
    ) {
      throw new ConflictException('User email already exist');
    }

    await this.roleService.getDetailById(updateUserDto.roleId);

    await this.userRepository.update(id, updateUserDto);

    return this.getDetailById(id);
  }

  async updatePassword(
    sub: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const user = await this.getDetailById(sub);

    const isMatch = await this.passwordService.comparePassword(
      updateUserPasswordDto.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Old password incorrect');
    }

    const hashPassword = await this.passwordService.hashPassword(
      updateUserPasswordDto.newPassword,
    );

    await this.userRepository.update(sub, { password: hashPassword });
  }

  async delete(id: number): Promise<User> {
    const user = await this.getDetailById(id);
    if (user?.statusId === GlossaryUtil.UsersStatusDeleted) {
      throw new ConflictException('User status already deleted');
    }

    await this.userRepository.update(id, {
      statusId: GlossaryUtil.UsersStatusDeleted,
      deletedAt: new Date(),
    });

    return this.getDetailById(id);
  }
}
