interface DividerProps {
  id?: string;
  className?: string;
}

export default function Divider({ id, className }: DividerProps) {
  return (
    <div
      id={id}
      className={`w-full h-[8px] bg-tin-grey-200 ${className || ""}`}
    />
  );
}
