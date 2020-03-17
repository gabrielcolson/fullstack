import env from 'env-var';

import server from './server';

const PORT = env.get('PORT').required().asPortNumber();

server.listen({ port: PORT }, (): void => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
