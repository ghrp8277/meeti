import { ChevronRight, CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Gauge from "./gauge";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

interface ProfileAvatarProps {
  imageUrl?: string;
}

const ProfileAvatar = ({ imageUrl }: ProfileAvatarProps) => {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt="프로필"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
    );
  }
  return <div className="rounded-full w-[50px] h-[50px] bg-tin-grey-300"></div>;
};

const ProfileHeader = ({ nickname }: { nickname: string }) => {
  return (
    <div className="py-14 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-12 items-center">
        <ProfileAvatar />
        <div className="text-lg text-lead-grey-800">{nickname}</div>
      </div>
      <div className="text-lead-grey-100 text-md-semibold cursor-pointer">
        프로필 수정
      </div>
    </div>
  );
};

const ScoreHeader = ({
  onPointGuideClick,
}: {
  onPointGuideClick: () => void;
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <div className="text-violet-500 text-md-semibold">내 점수</div>
        <CircleQuestionMark
          width={16}
          height={16}
          strokeWidth={1.6}
          className="text-violet-500"
        />
      </div>
      <div
        className="flex flex-row gap-2 items-center cursor-pointer"
        onClick={onPointGuideClick}
      >
        <div className="text-violet-900 text-sm-medium">점수별 혜택</div>
        <ChevronRight
          width={16}
          height={16}
          strokeWidth={1.6}
          className="text-violet-900"
        />
      </div>
    </div>
  );
};

const ScoreGauge = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  return <Gauge value={value} maxValue={maxValue} />;
};

const ScoreActionCard = ({ text }: { text: string }) => {
  const router = useRouter();
  const handlePointGuide = () => {
    router.push(PATH.COMPANION.ROOT);
  };

  return (
    <div
      className="rounded-[12px] py-10 px-16 bg-violet-300 flex flex-row justify-between items-center cursor-pointer"
      onClick={handlePointGuide}
    >
      <div className="text-s-medium text-black">{text}</div>
      <ChevronRight
        width={16}
        height={16}
        strokeWidth={1.6}
        className="text-black"
      />
    </div>
  );
};

const ScoreSection = ({
  onPointGuideClick,
  scoreValue,
  maxScore,
  actionText,
}: {
  onPointGuideClick: () => void;
  scoreValue: number;
  maxScore: number;
  actionText: string;
}) => {
  return (
    <div className="bg-violet-200 rounded-[12px] px-20 py-16">
      <ScoreHeader onPointGuideClick={onPointGuideClick} />
      <div className="flex flex-col gap-12">
        <ScoreGauge value={scoreValue} maxValue={maxScore} />
        <ScoreActionCard text={actionText} />
      </div>
    </div>
  );
};

export default function ProfileSection() {
  const router = useRouter();

  const handlePointGuide = () => {
    router.push(PATH.MY.POINT_GUIDE);
  };

  return (
    <div className="flex flex-col">
      <ProfileHeader nickname="닉네임" />
      <ScoreSection
        onPointGuideClick={handlePointGuide}
        scoreValue={36.5}
        maxScore={100}
        actionText="동행 참여하고 1점 올리기"
      />
    </div>
  );
}
