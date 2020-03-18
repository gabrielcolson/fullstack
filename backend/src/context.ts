import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

export interface Context {
  db: PrismaClient;
  req: Request;
  userId?: string;
}
