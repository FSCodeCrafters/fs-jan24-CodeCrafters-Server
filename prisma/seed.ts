import { products } from './products';
import { productItems } from './productsItems';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    await prisma.product.deleteMany({});
    await prisma.productItem.deleteMany({});

    await prisma.productItem.createMany({
      data: productItems.map((productItem) => ({
        ...productItem,
        description: productItem.description,
      })),
    });

    await prisma.product.createMany({
      data: products.map((product) => product),
    });

    return;
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error) => {
  console.error('Error during execution:', error);
  process.exit(1);
});
