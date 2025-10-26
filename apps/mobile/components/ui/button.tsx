import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base-bold font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-tin-grey-200 disabled:text-lead-grey-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-red-500 text-white hover:bg-brand-red-400",
        secondary: "bg-brand-red-100 text-brand-red-500 hover:bg-brand-red-200",
        tertiary: "bg-lead-grey-800 text-white hover:bg-lead-grey-700",
      },
      size: {
        md: "h-[50px] w-[364px] rounded-[12px] p-[12px]",
        sm: "h-[42px] w-[364px] rounded-[12px] p-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  full?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      full = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          full && "w-full",
          loading && "cursor-not-allowed"
        )}
        ref={ref}
        {...props}
      >
        {loading && (
          <LoaderCircle className="!w-[16px] !h-[16px] animate-spin text-brand-red-500" />
        )}
        {!loading && children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
