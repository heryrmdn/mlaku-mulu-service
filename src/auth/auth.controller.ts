import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/auth.dto';
import { UpdateUserPasswordDto } from 'src/user/dto/user.dto';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('profile/password')
  updateProfilePassword(
    @Request() req,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.authService.updateProfilePassword(req.user.sub, updateUserPasswordDto);
  }
}
