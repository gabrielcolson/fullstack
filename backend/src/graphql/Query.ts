import { queryType } from 'nexus';

const Query = queryType({
  definition(t): void {
    t.crud.user();
    t.crud.users();
  },
});

export { Query };
