import { PrismaClient } from '@prisma/client';

export interface ServiceContext {
  db: PrismaClient;
  userId?: string;
}

export class Service {
  protected db: PrismaClient;
  protected userId: string | undefined;

  constructor(ctx: ServiceContext) {
    this.db = ctx.db;
    this.userId = ctx.userId;
  }
}
