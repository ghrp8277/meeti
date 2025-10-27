export default function layout({ children }: { children: React.ReactNode }) {
  return <main className="relative flex flex-col container">{children}</main>;
}
