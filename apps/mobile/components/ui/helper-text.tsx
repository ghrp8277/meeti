import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const helperTextVariants = cva("text-s leading-[18px] w-fit empty:hidden", {
  variants: {
    variant: {
      default: "text-blue-grey-500",
      error: "text-error-600",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type props = React.ComponentProps<"span"> &
  VariantProps<typeof helperTextVariants>;

export default function HelperText({ className, variant, ...props }: props) {
  return (
    <span
      className={cn(helperTextVariants({ variant }), className)}
      {...props}
    />
  );
}
