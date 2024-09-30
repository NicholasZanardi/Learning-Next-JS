import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, stock, type } = req.body;
    const item = await prisma.item.create({
      data: {
        name,
        stock,
        type,
      },
    });
    res.json(item);
  } else if (req.method === 'GET') {
    const items = await prisma.item.findMany();
    res.json(items);
  }
}
