import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OptionFrame() {
  const [seatGrade, setSeatGrade] = useState<string>("");
  const [seatLocation, setSeatLocation] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [row, setRow] = useState<string>("");

  const handleSeatGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatGrade(e.target.value);
  };

  const handleSeatLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatLocation(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(e.target.value);
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(e.target.value);
  };

  return (
    <div className="flex flex-col gap-20 p-20">
      {/* 좌석 등급 */}
      <Input
        label="좌석 등급"
        placeholder="좌석 등급을 입력해주세요."
        full
        required
        value={seatGrade}
        onChange={handleSeatGradeChange}
      />
      {/* 좌석 위치 */}
      <Input
        label="좌석 위치"
        placeholder="좌석 위치를 입력해주세요."
        full
        required
        value={seatLocation}
        onChange={handleSeatLocationChange}
      />
      {/* 구역 */}
      <Input
        label="구역"
        placeholder="구역을 입력해주세요."
        full
        required
        value={area}
        onChange={handleAreaChange}
      />
      {/* 열 */}
      <Input
        label="열"
        placeholder="열을 입력해주세요."
        full
        required
        value={row}
        onChange={handleRowChange}
      />
    </div>
  );
}
