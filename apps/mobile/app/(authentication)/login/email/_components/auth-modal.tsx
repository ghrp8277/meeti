import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogMessage,
} from "@/components/ui/dialog";

interface Props {
  onClose: () => void;
}

export default function AuthModal({ onClose }: Props) {
  return (
    <Dialog>
      <DialogContent className="gap-20">
        <DialogMessage>
          아이디 또는 비밀번호가
          <br />
          일치하지 않습니다.
        </DialogMessage>
        <DialogButton onClick={onClose}>확인</DialogButton>
      </DialogContent>
    </Dialog>
  );
}
