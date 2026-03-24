import { prisma } from '@/lib/db';
import InvoiceForm from '@/components/invoice/InvoiceForm';

export const dynamic = 'force-dynamic';

export default async function NewInvoicePage() {
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });

  return (
    <InvoiceForm clients={clients} />
  );
}
