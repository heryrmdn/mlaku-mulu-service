import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS!);
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
