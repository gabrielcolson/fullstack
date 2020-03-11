import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
  req: Request;
  userId?: string;
}

function createContext({ req }: { req: Request }): Context {
  return { prisma, req, userId: req.session?.userId };
}

export { Context, createContext };
