import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import HelperText from "./helper-text";

const textareaVariants = cva([
  "border border-tin-grey-500 rounded-[12px] outline-none",
  "placeholder:text-tin-grey-700",
  "placeholder:text-md",
  "focus-visible:border-black",
  "flex [field-sizing:content] min-h-[100px] w-full bg-white px-16 py-8",
  "text-base text-lead-grey-800",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "data-[invalid=true]:border-error-600 data-[invalid=true]:bg-[#FFC2AF]/20",
]);

type Props = React.ComponentProps<"textarea"> & {
  invalid?: boolean;
  showCount?: boolean;
  maxLength?: number;
  label?: string;
};

export default function Textarea({
  className,
  invalid,
  showCount = false,
  maxLength,
  value,
  label,
  ...props
}: Props) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="flex flex-col gap-y-8">
      {label && <label className="text-sm-semibold text-black">{label}</label>}
      <textarea
        data-slot="textarea"
        data-invalid={!!invalid}
        className={cn(textareaVariants(), className)}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      {showCount && maxLength && (
        <div className="float-right">
          <HelperText className="float-right text-s font-medium">
            <span className="text-lead-grey-800">{currentLength}</span>
            <span className="text-lead-grey-100"> / {maxLength}</span>
          </HelperText>
        </div>
      )}
    </div>
  );
}
