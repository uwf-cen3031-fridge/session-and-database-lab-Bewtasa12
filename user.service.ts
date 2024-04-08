import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}

async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

export { createUser, authenticateUser };
