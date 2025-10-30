import Carousel from "@/components/ui/carousel";
import Image from "next/image";

export default function GuideCarousel({
  imagePaths,
}: {
  imagePaths: string[];
}) {
  const items = imagePaths.map((src) => (
    <div key={src} className="w-full h-full">
      <Image
        src={src}
        alt="guide"
        className="w-full h-full"
        width={375}
        height={210}
      />
    </div>
  ));

  return (
    <Carousel
      items={items}
      autoPlay={false}
      showArrows={false}
      showDots
      className="w-full h-full"
      itemClassName="w-full h-full"
    />
  );
}
