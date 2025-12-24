import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PasswordService } from 'src/user/password.service';
import { UpdateUserPasswordDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.getDetailByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const isMatch = await this.passwordService.comparePassword(
      pass,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(sub: number) {
    return await this.userService.getDetailById(sub);
  }

  async updateProfilePassword(
    sub: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updatePassword(sub, updateUserPasswordDto);
  }
}
