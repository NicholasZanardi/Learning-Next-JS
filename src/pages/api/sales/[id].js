import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.sale.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete sale' });
    }
  } else if (req.method === 'PUT') {
    try {
      const sale = await prisma.sale.findUnique({
        where: { id: parseInt(id) },
      });

      if (!sale) {
        return res.status(404).json({ error: 'Sale not found' });
      }

      const { itemId, quantity, saleDate } = req.body;

      const updatedSale = await prisma.sale.update({
        where: { id: parseInt(id) },
        data: {
          itemId: parseInt(itemId),
          quantity: parseInt(quantity),
          saleDate: new Date(saleDate),
        },
      });

      res.status(200).json(updatedSale);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update sale' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
