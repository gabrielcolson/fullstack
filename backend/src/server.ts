import http from 'http';

import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import env from 'env-var';

import schema from './schema';
import { Context } from './context';
import session from './utils/session';
import { formatError } from './utils/formatError';

class Server {
  db: PrismaClient;
  server: http.Server;

  constructor() {
    this.db = new PrismaClient();

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }): Context => ({
        db: this.db,
        req,
        userId: req.session?.userId,
      }),
      formatError,
    });

    const app = express();

    if (process.env.NODE_ENV === 'production') {
      app.set('trust proxy', 1);
    }

    app.use(session);

    const ALLOWED_ORIGIN = env.get('ALLOWED_ORIGIN').required().asString();
    apolloServer.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: ALLOWED_ORIGIN,
      },
    });

    this.server = http.createServer(app);
  }

  listen(port: number, cb?: () => void): http.Server {
    return this.server.listen({ port }, cb);
  }

  async stop(): Promise<void> {
    this.server.close();
    await this.db.disconnect();
  }
}

export default Server;
