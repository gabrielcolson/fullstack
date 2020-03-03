import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
}

function createContext(): Context {
  return { prisma };
}

export { Context, createContext };
