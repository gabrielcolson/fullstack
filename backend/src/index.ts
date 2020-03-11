import env from 'env-var';

import server from './server';

const PORT = env.get('PORT').required().asPortNumber();

server.listen({ port: PORT }, (): void => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
