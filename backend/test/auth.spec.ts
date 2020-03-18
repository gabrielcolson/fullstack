import * as faker from 'faker';

import { createTestContext, TestContext } from './__helpers/context';
import { LOGIN, LOGOUT, REGISTER } from './__helpers/queries';

const ctx: TestContext = createTestContext();

describe('register mutation', () => {
  it('should register a user', async () => {
    const userData = { email: faker.internet.email(), password: faker.internet.password() };

    const want = { email: userData.email };
    const { data: { register: got } } = await ctx.server.graphql(REGISTER, userData);

    expect(got).toEqual(want);
  });

  it('should not register a user twice', async () => {
    const userData = { email: faker.internet.email(), password: faker.internet.password() };
    await ctx.server.graphql(REGISTER, userData);

    const got = await ctx.server.graphql(REGISTER, userData);

    expect(got.errors.length).not.toBe(0);
  });

  it('should not register a user with an invalid email', async () => {
    const userData = { email: 'invalid email', password: faker.internet.password() };
    const got = await ctx.server.graphql(REGISTER, userData);

    expect(got.errors.length).not.toBe(0);
  });
});

describe('login mutation', () => {
  it('should login a user', async () => {
    const userData = { email: faker.internet.email(), password: faker.internet.password() };
    await ctx.server.graphql(REGISTER, userData);
    await ctx.server.graphql(LOGOUT);

    const want = { email: userData.email };
    const { data: { login: got } } = await ctx.server.graphql(LOGIN, userData);

    expect(got).toEqual(want);
  });

  it('should not login a non existing user', async () => {
    const userData = { email: faker.internet.email(), password: faker.internet.password() };

    const got = await ctx.server.graphql(LOGIN, userData);

    expect(got.errors.length).not.toBe(0);
  });

  it('should not login a user with invalid credentials', async () => {
    const userData = { email: faker.internet.email(), password: faker.internet.password() };
    await ctx.server.graphql(REGISTER, userData);

    const got = await ctx.server.graphql(LOGIN, { email: userData.email, password: 'wrong password' });

    expect(got.errors.length).not.toBe(0);
  });
});
