const result = {
  fontHeaderFamily: 'Inter',
  fontHeaderSize: 24,
};

export async function GET() {
  return Response.json(result);
}

export async function PUT(request: Request) {
  const res = await request.json();

  const data = {
    result,
    ...res,
  };

  return Response.json(data);
}
