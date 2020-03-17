import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

import * as errors from './errors';

export function formatError(err: GraphQLError): Error {
  const { originalError } = err;
  if (originalError instanceof errors.CustomError) {
    // eslint-disable-next-line no-console
    console.log(originalError.error);
  }

  if (originalError instanceof errors.AuthenticationError) {
    return new AuthenticationError(originalError.message);
  }
  if (originalError instanceof errors.ForbiddenError) {
    return new ForbiddenError(originalError.message);
  }

  // eslint-disable-next-line no-console
  console.error(originalError);
  return new Error('Internal server error');
}
