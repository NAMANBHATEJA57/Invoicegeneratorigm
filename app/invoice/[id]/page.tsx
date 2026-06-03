import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import InvoiceForm from '@/components/invoice/InvoiceForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: Props) {
  const { id } = await params;

  const [invoice, clients] = await Promise.all([
    prisma.invoice.findUnique({
      where: { id },
      include: { services: true, client: true },
    }),
    prisma.client.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!invoice) return notFound();

  const initialData = {
    clientId: invoice.clientId,
    date: invoice.date.toISOString().split('T')[0],
    dueDate: invoice.dueDate.toISOString().split('T')[0],
    notes: invoice.notes ?? '',
    showPan: invoice.showPan,
    showClientBankDetails: invoice.showClientBankDetails,
    services: invoice.services.map((s) => ({
      id: s.id,
      description: s.description,
      qty: s.qty,
      rate: s.rate,
      total: s.total,
    })),
  };

  return (
    <InvoiceForm
      invoiceId={invoice.id}
      invoiceNumber={invoice.invoiceNumber}
      initialData={initialData}
      clients={clients}
    />
  );
}
