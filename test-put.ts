import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const invoice = await prisma.invoice.update({
    where: { invoiceNumber: 'RB/1026/12' },
    data: { selectedPan: 'AAPHP5191Q' },
  });
  console.log('Updated Invoice:', invoice);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
