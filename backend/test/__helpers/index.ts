import { PrismaClient } from '@prisma/client';
import { AddressInfo } from 'net';

import express, { Request } from 'express';
import { HttpLink } from 'apollo-link-http';
import { DocumentNode, execute, toPromise } from 'apollo-link';
import { ApolloServer } from 'apollo-server-express';
import fetch from 'isomorphic-fetch';
import { Context } from '../../src/context';

import schema from '../../src/schema';

interface TestServer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graphql: (query: DocumentNode, variables?: unknown) => Promise<any>;
  stop: () => void;
}

export interface TestContext {
  server: TestServer;
}

export function startTestServer(server: ApolloServer): TestServer {
  const app = express();

  server.applyMiddleware({ app });

  const httpServer = app.listen(0);

  const { port } = httpServer.address() as AddressInfo;

  const link = new HttpLink({
    uri: `http://localhost:${port}/graphql`,
    fetch,
  });

  const graphql = (query, variables = {}): Promise<unknown> => toPromise(execute(link, {
    query,
    variables,
  }));

  const stop = (): void => { httpServer.close(); };

  return {
    stop,
    graphql,
  };
}

const createApolloContext = (prisma: PrismaClient) => ({ req }: { req: Request}): Context => ({
  db: prisma,
  req,
  userId: req.session?.userId,
});

export function createTestContext(): TestContext {
  const ctx: TestContext = { server: {} as TestServer };

  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();

    const server = new ApolloServer({
      schema,
      context: createApolloContext(prisma),
    });

    const testServer = startTestServer(server);
    ctx.server.graphql = testServer.graphql;
    ctx.server.stop = testServer.stop;
  });

  afterEach(async () => {
    ctx.server.stop();
    await prisma.disconnect();
  });

  return ctx;
}
