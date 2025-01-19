const result = [
  {
    code: 'apple',
    name: 'Apple',
  },
  {
    code: 'banana',
    name: 'Banana',
  },
];

export async function GET() {
  return Response.json(result);
}
