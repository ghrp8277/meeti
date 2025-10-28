import { ChevronRight, CircleQuestionMark } from "lucide-react";
import Image from "next/image";

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

export default function ProfileSection() {
  return (
    <div className="flex flex-col">
      <div className="py-14 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-12 items-center">
          <ProfileAvatar />

          <div className="text-lg text-lead-grey-800">닉네임</div>
        </div>

        <div className="text-lead-grey-100 text-md-semibold cursor-pointer">
          프로필 수정
        </div>
      </div>

      {/* 포인트 영역 */}
      <div className="bg-violet-200 rounded-[12px] px-20 py-16">
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

          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <div className="text-violet-900 text-sm-medium">점수별 혜택</div>
            <ChevronRight
              width={16}
              height={16}
              strokeWidth={1.6}
              className="text-violet-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
