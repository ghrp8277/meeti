import { Button } from "@/components/ui/button";
import DescriptionSection from "./description-section";

export default function RegisterSection() {
  const handleRegister = () => {
    console.log("등록하기");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <DescriptionSection />
      <div className="py-20 pb-40 px-20 flex flex-col gap-4">
        <Button full variant="default" onClick={handleRegister}>
          저장
        </Button>
      </div>
    </div>
  );
}
