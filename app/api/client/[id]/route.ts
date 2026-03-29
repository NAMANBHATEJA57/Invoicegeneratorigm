import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/client/[id] — get single client
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error('GET /api/client/[id]', error);
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

// PUT /api/client/[id] — update client
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, address, email, phone, gstin } = body as {
      name: string;
      address: string;
      email?: string;
      phone?: string;
      gstin?: string;
    };

    const client = await prisma.client.update({
      where: { id },
      data: { name, address, email, phone, gstin },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error('PUT /api/client/[id]', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

// DELETE /api/client/[id] — delete client (optional but good to have)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.client.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/client/[id]', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
