import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-2xl p-4 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-2xl font-bold">Home</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
