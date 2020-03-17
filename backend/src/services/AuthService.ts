import * as yup from 'yup';
import { hash, compare } from 'bcryptjs';

import { User } from '@prisma/client';
import { AuthenticationError, ForbiddenError } from '../utils/errors';
import { Service } from '../utils/Service';

const registerSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const loginSchema = registerSchema;

export class AuthService extends Service {
  async register(args: yup.InferType<typeof registerSchema>): Promise<User> {
    await registerSchema.validate(args);
    const { email, password } = args;

    if (this.userId) {
      throw new ForbiddenError('Already logged in');
    }

    const hashedPassword = await hash(password, 10);

    try {
      return await this.db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      throw new ForbiddenError('User already exists', e);
    }
  }

  async login(args: yup.InferType<typeof loginSchema>): Promise<User> {
    await loginSchema.validate(args);
    const { email, password } = args;

    if (this.userId) {
      throw new ForbiddenError('Already logged in');
    }

    const user = await this.db.user.findOne({ where: { email } });

    if (!user || !await compare(password, user.password)) {
      throw new AuthenticationError('invalid credentials');
    }

    return user;
  }
}
