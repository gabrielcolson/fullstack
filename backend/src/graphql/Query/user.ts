import { extendType } from 'nexus';

import { User } from '../User';
import { UserService } from '../../services/UserService';

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: User,
      resolve: (root, args, ctx) => {
        const userService = new UserService(ctx);
        return userService.getConnectedUser();
      },
    });
  },
});
