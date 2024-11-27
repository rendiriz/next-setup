import { NextResponse } from 'next/server';

import { createToken, verifyPassword } from '@/lib/auth';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create token
    const token = await createToken(user.id);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: token,
    });
  } catch {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
