import { Button } from "@/components/ui/button";

interface RegisterTitleProps {
  title: string;
}

function RegisterTitle({ title }: RegisterTitleProps) {
  return <div className="text-base-bold text-black">{title}</div>;
}

interface RegisterButtonProps {
  onRegister: () => void;
  children: React.ReactNode;
}

function RegisterButton({ onRegister, children }: RegisterButtonProps) {
  return (
    <Button
      full
      variant="outline"
      onClick={onRegister}
      className="[&_svg]:!size-[16px]"
    >
      {children}
    </Button>
  );
}

interface RegisterDescriptionProps {
  description: string;
}

function RegisterDescription({ description }: RegisterDescriptionProps) {
  return (
    <ul className="list-disc list-outside pl-20 space-y-8 text-s text-lead-grey-100 marker:text-lead-grey-100">
      <li>{description}</li>
    </ul>
  );
}

interface RegisterFrameProps {
  title: string;
  onRegister: () => void;
  buttonChildren: React.ReactNode;
  description: string;
}

export default function RegisterFrame({
  title,
  onRegister,
  buttonChildren,
  description,
}: RegisterFrameProps) {
  return (
    <div className="py-20 flex flex-col gap-4">
      <div className="flex flex-col gap-12">
        <RegisterTitle title={title} />
        <RegisterButton onRegister={onRegister}>
          {buttonChildren}
        </RegisterButton>
      </div>
      <RegisterDescription description={description} />
    </div>
  );
}
