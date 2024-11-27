import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all examples
export async function GET() {
  try {
    const examples = await prisma.example.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(examples);
  } catch {
    return NextResponse.json({ error: 'Error fetching examples' }, { status: 500 });
  }
}

// POST new example
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, status } = body;

    const example = await prisma.example.create({
      data: {
        name,
        status,
      },
    });
    return NextResponse.json(example);
  } catch {
    return NextResponse.json({ error: 'Error creating example' }, { status: 500 });
  }
}
