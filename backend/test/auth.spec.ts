import { gql } from 'apollo-server-express';

import {
  createTestContext, TestContext,
} from './__helpers';

const ctx: TestContext = createTestContext();

it('should register a user', async () => {
  const users = await ctx.server.graphql(gql`
      {
          users {
              email
          }
      }
  `);
  console.log('FIRST TEST', users);
});

it('should login a user', async () => {
  const users = await ctx.server.graphql(gql`
      {
          users {
              email
          }
      }
  `);
  console.log('SECOND TEST', users);
});
