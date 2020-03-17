import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import env from 'env-var';

import schema from './schema';
import { createContext } from './context';
import session from './utils/session';
import { formatError } from './utils/formatError';

const server = new ApolloServer({
  schema,
  context: createContext,
  formatError,
});

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(session);

const ALLOWED_ORIGIN = env.get('ALLOWED_ORIGIN').required().asString();

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: ALLOWED_ORIGIN,
  },
});

export default app;
