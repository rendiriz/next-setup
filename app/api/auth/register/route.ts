import { NextResponse } from 'next/server';

import { createToken, hashPassword } from '@/lib/auth';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    console.log('body', body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log('existingUser', existingUser);

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    console.log('hashedPassword', hashedPassword);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    console.log('user', user);

    // Create token
    const token = await createToken(user.id);
    console.log('token', token);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
