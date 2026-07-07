import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber: 'RB/1026/12' },
  });
  console.log('Invoice from DB:', invoice);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
