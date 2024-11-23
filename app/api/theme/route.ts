const result = {
  headerFontFamily: 'inter',
  headerFontSize: 24,
  questionFontFamily: 'inter',
  questionFontSize: 18,
  textFontFamily: 'inter',
  textFontSize: 16,
  color: '#673ab7',
  backgroundColor: '#f6f6f6',
};

export async function GET() {
  return Response.json(result);
}

export async function PUT(request: Request) {
  const res = await request.json();

  // const data = {
  //   result,
  //   ...res,
  // };

  return Response.json(res);
}
