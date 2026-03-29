import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/client — list all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error('GET /api/client', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

// POST /api/client — create client
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, email, phone, gstin } = body as {
      name: string;
      address: string;
      email?: string;
      phone?: string;
      gstin?: string;
    };

    const client = await prisma.client.create({
      data: { name, address, email, phone, gstin },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('POST /api/client', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
