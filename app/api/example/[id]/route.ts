/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single example
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const example = await prisma.example.findUnique({
      where: { id },
    });

    if (!example) {
      return NextResponse.json({ error: 'Example not found' }, { status: 404 });
    }

    return NextResponse.json(example);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching example' }, { status: 500 });
  }
}

// PUT update example (full update)
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, status } = body;

    const example = await prisma.example.update({
      where: { id },
      data: {
        name,
        status,
      },
    });

    return NextResponse.json(example);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating example' }, { status: 500 });
  }
}

// PATCH update example (partial update)
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Only include fields that are present in the request body
    const updateData: { name?: string; status?: string } = {};
    if ('name' in body) updateData.name = body.name;
    if ('status' in body) updateData.status = body.status;

    // Check if any fields were provided for update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 });
    }

    const example = await prisma.example.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(example);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Example not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating example' }, { status: 500 });
  }
}

// DELETE example
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await prisma.example.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Example deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting example' }, { status: 500 });
  }
}
