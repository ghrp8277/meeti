export default function Page() {
  return (
    <div>
      {/* 동행 양도 영역역 */}
      <div className="flex flex-row px-20 text-xl">
        <div className="pr-12 border-r border-tin-grey-500 text-black">
          양도
        </div>
        <div className="px-12 text-tin-grey-700">동행</div>
      </div>
      {/* 카테고리 영역 */}
      <div className="px-20 py-12 flex flex-row gap-6">
        <div className="rounded-full bg-black px-14 py-8 cursor-pointer">
          <div className="text-white text-sm-semibold">모임</div>
        </div>
        <div className="rounded-full bg-tin-grey-200 px-14 py-8 cursor-pointer">
          <div className="text-lead-grey-100 text-sm-medium">카페</div>
        </div>
      </div>
    </div>
  );
}
