import Link from 'next/link';

export default function Elementlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex gap-4">
        <Link href={'/element/title'}>Title</Link>
        <Link href={'/element/question'}>Question</Link>
      </nav>
      <div className="mx-auto max-w-2xl p-4">{children}</div>
    </>
  );
}
