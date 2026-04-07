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

/** Static biller details — update these to match your business */
export const BILLER = {
  name: 'Rupali Bhateja',
  tagline: 'The Inquisitive Mind',
  address: 'BC 2, West Shalimar Bagh, Delhi – 110088, India',
  email: 'rupali.piyush@gmail.com',
  phone: '+91 9899485651',
  pan: 'AJUPB8140M',
  bank: {
    name: 'HDFC Bank',
    branch: 'Adarsh Nagar',
    accountName: 'Piyush Bhateja HUF',
    accountNumber: '50200023785569',
    ifsc: 'HDFC0000391',
    upi: 'rupali.piyush@okaxis', // Dummy UPI based on email
  },
} as const;

export type BillerType = typeof BILLER;
