"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ImageIndicator from "./image-indicator";

interface CarouselArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const CarouselArrow = ({
  direction,
  onClick,
  disabled,
  className,
}: CarouselArrowProps) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "prev" ? "left-3" : "right-3";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      type="button"
      title={direction === "prev" ? "Previous" : "Next"}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-[40px] h-[40px] rounded-full absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity shadow-emphasize",
        positionClass,
        className,
        disabled && "opacity-40 cursor-not-allowed"
      )}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
    >
      <Icon className="w-[24px] h-[24px] text-lead-grey-800" />
    </button>
  );
};

interface CarouselDotsProps {
  items: React.ReactNode[];
  currentIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
}

const CarouselDots = ({
  items,
  currentIndex,
  onDotClick,
  className,
}: CarouselDotsProps) => {
  return (
    <div
      className={cn("w-full h-[38px] py-4 flex justify-center items-center")}
    >
      <ImageIndicator
        variant="dots"
        totalCount={items.length}
        currentIndex={currentIndex}
        onIndexChange={onDotClick}
        className={cn("flex justify-center gap-8")}
        dotClassName={cn(
          "size-[6px] bg-black/20 data-[state=active]:bg-black",
          className
        )}
      />
    </div>
  );
};

interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}

const CarouselContainer = ({
  children,
  className,
  full,
}: CarouselContainerProps) => {
  return (
    <div className={cn("relative", full && "w-full", className)}>
      {children}
    </div>
  );
};

interface CarouselTrackProps {
  children: React.ReactNode;
  gap?: number;
  emblaRef: (node: HTMLDivElement | null) => void;
}

const CarouselTrack = ({ children, emblaRef, gap }: CarouselTrackProps) => {
  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex" style={{ gap: gap ? `${gap}px` : undefined }}>
        {children}
      </div>
    </div>
  );
};

interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

const CarouselSlide = ({ children, className }: CarouselSlideProps) => {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>;
};

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  itemClassName?: string;
  prevArrowClassName?: string;
  nextArrowClassName?: string;
  dotClassName?: string;
  gap?: number;
  full?: boolean;
  loop?: boolean;
  dragFree?: boolean;
  onIndexChange?: (index: number) => void;
}

export interface CarouselRef {
  scrollTo: (index: number) => void;
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      items,
      autoPlay = false,
      interval = 3000,
      showArrows = true,
      showDots = false,
      className,
      itemClassName,
      prevArrowClassName,
      nextArrowClassName,
      dotClassName,
      gap,
      full = false,
      loop = true,
      dragFree,
      onIndexChange,
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: loop,
      align: "start",
      dragFree: !!dragFree,
    });
    const [internalIndex, setInternalIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setInternalIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return undefined;
      onSelect();
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      };
    }, [emblaApi, onSelect]);

    useEffect(() => {
      if (!autoPlay || !emblaApi) return undefined;
      const timer = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, emblaApi]);

    useImperativeHandle(
      ref,
      () => ({
        scrollTo: (index: number) => {
          emblaApi?.scrollTo(index);
        },
      }),
      [emblaApi]
    );

    useEffect(() => {
      onIndexChange?.(internalIndex);
    }, [internalIndex, onIndexChange]);

    if (!items.length) return null;

    return (
      <>
        <CarouselContainer className={className} full={full}>
          <CarouselTrack emblaRef={emblaRef} gap={gap}>
            {items.map((item, index) => (
              <CarouselSlide key={index} className={itemClassName}>
                {item}
              </CarouselSlide>
            ))}
          </CarouselTrack>

          {showArrows && items.length > 1 && (
            <>
              {(loop || canScrollPrev) && (
                <CarouselArrow
                  direction="prev"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev && !loop}
                  className={prevArrowClassName}
                />
              )}
              {(loop || canScrollNext) && (
                <CarouselArrow
                  direction="next"
                  onClick={scrollNext}
                  disabled={!canScrollNext && !loop}
                  className={nextArrowClassName}
                />
              )}
            </>
          )}
        </CarouselContainer>

        {showDots && items.length > 1 && (
          <CarouselDots
            items={items}
            currentIndex={internalIndex}
            onDotClick={(index) => emblaApi?.scrollTo(index)}
            className={dotClassName}
          />
        )}
      </>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
