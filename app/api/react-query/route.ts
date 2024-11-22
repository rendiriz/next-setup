export async function GET() {
  const data = { title: 'test' };
  return Response.json(data);
}

export async function PUT(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}
