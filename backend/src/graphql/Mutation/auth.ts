import { extendType, stringArg } from 'nexus';

import { AuthService } from '../../services/AuthService';
import { User } from '../User';

export const authMutation = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('register', {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const authService = new AuthService(ctx);
        const user = await authService.register(args);

        if (ctx.req.session) {
          ctx.req.session.userId = user.id;
        }

        return user;
      },
    });

    t.field('login', {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const authService = new AuthService(ctx);
        const user = await authService.login(args);

        if (ctx.req.session) {
          ctx.req.session.userId = user.id;
        }

        return user;
      },
    });
  },
});
