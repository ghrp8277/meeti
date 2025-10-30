export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside pl-20 space-y-8 text-s text-lead-grey-100 marker:text-lead-grey-100">
      {items.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
}
