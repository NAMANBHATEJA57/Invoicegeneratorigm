import { prisma } from './db';

/**
 * Generates next invoice number in format RB/1026/XX (zero-padded 2 digits).
 * Uses atomic upsert + increment via Prisma transaction.
 */
export async function generateInvoiceNumber(): Promise<string> {
  const result = await prisma.$transaction(async (tx) => {
    const meta = await tx.meta.upsert({
      where: { key: 'invoice_counter' },
      update: { value: { increment: 1 } },
      create: { key: 'invoice_counter', value: 1 },
    });
    return meta.value;
  });

  const padded = String(result).padStart(2, '0');
  return `RB/1026/${padded}`;
}

