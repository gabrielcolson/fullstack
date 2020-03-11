import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import env from 'env-var';

import schema from './schema';
import { createContext } from './context';

const server = new ApolloServer({
  schema,
  context: createContext,
});

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const ALLOWED_ORIGIN = env.get('ALLOWED_ORIGIN').required().asString();

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: ALLOWED_ORIGIN,
  },
});

export default app;
