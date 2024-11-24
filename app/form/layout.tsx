import Link from 'next/link';

export default function Formlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex gap-4">
        <Link href={'/form/title'}>Title</Link>
        <Link href={'/form/description'}>Description</Link>
        <Link href={'/form/question'}>Question</Link>
      </nav>
      <div className="mx-auto max-w-2xl p-4">{children}</div>
    </>
  );
}
