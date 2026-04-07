import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/invoice/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { services: true, client: true },
    });
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error('GET /api/invoice/[id]', error);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

// PUT /api/invoice/[id] — update invoice + replace all services
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { clientId, date, dueDate, notes, showPan, services } = body as {
      clientId: string;
      date: string;
      dueDate: string;
      notes?: string;
      showPan?: boolean;
      services: { description: string; qty: number; rate: number; total: number }[];
    };

    const totalAmount = services.reduce((sum, s) => sum + s.total, 0);

    // Delete old services and recreate
    await prisma.service.deleteMany({ where: { invoiceId: id } });

    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
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

    return NextResponse.json(invoice);
  } catch (error) {
    console.error('PUT /api/invoice/[id]', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

// DELETE /api/invoice/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.invoice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/invoice/[id]', error);
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}
