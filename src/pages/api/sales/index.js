import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemId, quantity, saleDate } = req.body;
    const newSale = await prisma.sale.create({
      data: {
        itemId: parseInt(itemId),
        quantity: parseInt(quantity),
        saleDate: new Date(saleDate),
      },
    });
    res.json(newSale);
  } else if (req.method === 'GET') {
    const sales = await prisma.sale.findMany({
      include: {
        item: true, // Include the related item data
      },
    });
    res.status(200).json(sales);
  }
}
