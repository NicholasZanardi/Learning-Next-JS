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

  if (req.method === 'PUT') {
    try {
      console.log('Request Body:', req.body); // Tambahkan ini untuk debugging
      
      const { name, stock, type } = req.body;

      const updatedItem = await prisma.item.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          stock: parseInt(stock), // Pastikan stock adalah integer
          type,
        },
      });

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        await prisma.item.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(200).json({ message: 'Item deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }


}
