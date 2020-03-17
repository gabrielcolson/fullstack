import { gql } from 'apollo-server-express';
import * as faker from 'faker';

import { createTestContext, TestContext } from './__helpers';

const ctx: TestContext = createTestContext();

const REGISTER = gql`
    mutation register($email: String!, $password: String!){
        register(email: $email, password: $password) {
            email
        }
    }
`;

it('should register a user', async () => {
  const data = { email: faker.internet.email(), password: faker.internet.password() };

  const want = { email: data.email };
  const { data: { register: got } } = await ctx.server.graphql(REGISTER, data);

  expect(got).toEqual(want);
});

it('should not register a user twice', async () => {
  const data = { email: faker.internet.email(), password: faker.internet.password() };
  await ctx.server.graphql(REGISTER, data);

  const got = await ctx.server.graphql(REGISTER, data);

  expect(got.errors.length).not.toBe(0);
});
