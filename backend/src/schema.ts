import { makeSchema } from 'nexus';
import * as path from 'path';
import { nexusPrismaPlugin } from 'nexus-prisma';

import * as allTypes from './graphql';

const schema = makeSchema({
  types: allTypes,
  plugins: [nexusPrismaPlugin({ prismaClient: (ctx) => ctx.db })],
  outputs: {
    schema: path.join(__dirname, '..', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'db',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

export default schema;
