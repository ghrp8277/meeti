import GuideCarousel from "./guide-carousel";
import BulletList from "./bullet-list";

interface GuideSectionProps {
  badge?: string;
  title: string;
  images: string[];
  bullets: string[];
  className?: string;
}

export default function GuideSection({
  badge,
  title,
  images,
  bullets,
  className,
}: GuideSectionProps) {
  return (
    <div className={className}>
      {badge && (
        <div className="text-sm-bold text-brand-red-500 text-center">
          {badge}
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col gap-24">
          <div className="text-xl text-black text-center">{title}</div>
          <div>
            <GuideCarousel imagePaths={images} />
          </div>
        </div>
        <BulletList items={bullets} />
      </div>
    </div>
  );
}
