import Image from "next/image";
import { ChevronRight } from "lucide-react";

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

interface ProfileNicknameProps {
  nickname: string;
}

const ProfileNickname = ({ nickname }: ProfileNicknameProps) => {
  return <div className="text-lg font-bold text-lead-grey-800">{nickname}</div>;
};

interface ProfileInfoProps {
  nickname: string;
  imageUrl?: string;
}

const ProfileInfo = ({ nickname, imageUrl }: ProfileInfoProps) => {
  return (
    <div className="flex flex-row gap-12 items-center">
      <ProfileAvatar imageUrl={imageUrl} />
      <ProfileNickname nickname={nickname} />
    </div>
  );
};

interface TemperatureBadgeProps {
  temperature: number;
}

const TemperatureBadge = ({ temperature }: TemperatureBadgeProps) => {
  return (
    <div className="bg-violet-200 rounded-full py-2 px-8">
      <div className="text-sm font-semibold text-violet-1000">
        {temperature}
      </div>
    </div>
  );
};

interface ProfileActionsProps {
  temperature: number;
}

const ProfileActions = ({ temperature }: ProfileActionsProps) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <TemperatureBadge temperature={temperature} />
      <ChevronRight
        width={20}
        height={20}
        strokeWidth={1.6}
        className="text-lead-grey-800"
      />
    </div>
  );
};

export default function ProfileSection() {
  return (
    <div className="px-20 py-14 flex flex-row justify-between items-center">
      <ProfileInfo nickname="닉네임" />
      <ProfileActions temperature={36.5} />
    </div>
  );
}
