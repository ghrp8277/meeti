"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const imageIndicatorVariant = cva("flex flex-row items-center w-fit", {
  variants: {
    variant: {
      number:
        "bg-black-100/50 px-xs py-xxxs h-6 rounded-full gap-x-xxxs text-xxs font-medium text-white",
      dots: "gap-x-xxs",
    },
  },
  defaultVariants: {
    variant: "number",
  },
});

type ImageIndicatorProps = React.ComponentProps<"div"> &
  VariantProps<typeof imageIndicatorVariant> & {
    totalCount: number;
    currentIndex: number;
    onIndexChange?: (index: number) => void;
    dotClassName?: string;
  };

export default function ImageIndicator(
  imageIndicatorProps: ImageIndicatorProps
) {
  const {
    variant,
    className,
    totalCount = 1,
    currentIndex = 0,
    onIndexChange,
    dotClassName,
    ...props
  } = imageIndicatorProps;

  return (
    <div
      data-slot="image-indicator"
      className={cn(imageIndicatorVariant({ variant }), className)}
      {...props}
    >
      {variant === "dots" ? (
        <>
          {Array.from({ length: totalCount }).map((_, index) => {
            const Component = onIndexChange ? "button" : "span";
            return (
              <Component
                key={index}
                type="button"
                data-state={index === currentIndex ? "active" : "inactive"}
                className={cn(
                  "size-[6px] rounded-full transition-colors ease-in-out",
                  "bg-white/50 hover:bg-white/70",
                  "data-[state=active]:bg-white",
                  dotClassName
                )}
                onClick={() => onIndexChange?.(index)}
              />
            );
          })}
        </>
      ) : (
        <>
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span className="opacity-50">{totalCount}</span>
        </>
      )}
    </div>
  );
}
