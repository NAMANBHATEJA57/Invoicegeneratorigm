import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert the invoice counter seed
  await prisma.meta.upsert({
    where: { key: 'invoice_counter' },
    update: {},
    create: { key: 'invoice_counter', value: 0 },
  });
  console.log('✅ Seeded: Meta invoice_counter = 0');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
