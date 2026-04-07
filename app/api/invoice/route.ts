import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateInvoiceNumber } from '@/lib/invoice';

// GET /api/invoice — list all invoices
export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { name: true } } },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('GET /api/invoice', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

// POST /api/invoice — create invoice + services
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, date, dueDate, notes, showPan, services } = body as {
      clientId: string;
      date: string;
      dueDate: string;
      notes?: string;
      showPan?: boolean;
      services: { description: string; qty: number; rate: number; total: number }[];
    };

    const invoiceNumber = await generateInvoiceNumber();
    const totalAmount = services.reduce((sum, s) => sum + s.total, 0);

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId,
        date: new Date(date),
        dueDate: new Date(dueDate),
        totalAmount,
        notes,
        showPan: showPan ?? true,
        services: {
          create: services.map((s) => ({
            description: s.description,
            qty: s.qty,
            rate: s.rate,
            total: s.total,
          })),
        },
      },
      include: { services: true, client: true },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('POST /api/invoice', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
