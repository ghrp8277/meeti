export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh flex flex-col w-full pb-20">
      {children}
    </main>
  );
}
