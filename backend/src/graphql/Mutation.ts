import { mutationType } from 'nexus';

const Mutation = mutationType({
  definition(t): void {
    t.crud.createOneUser();
  },
});

export { Mutation };
