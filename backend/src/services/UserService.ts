import { User } from '@prisma/client';
import { AuthenticationError } from '../utils/errors';
import { Service } from '../utils/Service';

export class UserService extends Service {
  async getConnectedUser(): Promise<User> {
    if (!this.userId) {
      throw new AuthenticationError('not logged in');
    }

    const user = this.db.user.findOne({ where: { id: this.userId } });

    if (!user) {
      throw new AuthenticationError('user not found');
    }

    return user;
  }
}
