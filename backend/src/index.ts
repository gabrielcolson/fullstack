import server from './server';

server.listen({ port: 4000 }, (): void => {
  console.log('🚀 Server ready at: http://localhost:4000');
});
