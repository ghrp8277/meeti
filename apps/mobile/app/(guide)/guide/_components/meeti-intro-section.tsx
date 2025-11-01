import Image from "next/image";

export default function MeetiIntroSection() {
  return (
    <div id="meeti-intro" className="px-20 scroll-mt-[100px]">
      <Image
        src="/guide/meeti-intro/intro.png"
        alt="meeti-intro"
        className="w-full h-full"
        width={375}
        height={210}
      />
    </div>
  );
}
