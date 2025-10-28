import { X } from "lucide-react";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: Props) {
  return (
    <div className="flex flex-row items-center justify-center relative fixed top-0 left-0 right-0 z-50 bg-white h-[50px]">
      <button onClick={onBack} className="absolute left-[20px]">
        <X className="w-24 h-24" />
      </button>
      <div className="text-black text-lg">{title}</div>
    </div>
  );
}
