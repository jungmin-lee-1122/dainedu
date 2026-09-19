"use client";
import ResourceManager from "../../../components/admin/ResourceManager";
import { subjects } from "../../../teachers/teachersData";

/** 과목 목록 — teachersData.ts 의 subjects 에서 "전체"만 뺀 것 */
const SUBJECTS = subjects.filter((s) => s !== "전체");

export default function Page() {
  return (
    <ResourceManager
      title="강사진 · 개설강좌"
      resource="teachers"
      thumbKey="photo"
      description="과목별 선생님 카드입니다. 과목은 강사진 소개의 과목 탭과 같아야 해당 탭에 나옵니다. 아래 '개설 강좌'에 입력한 강좌는 단과시간표에 자동으로 들어갑니다."
      fields={[
        { key: "name", label: "이름", type: "text", placeholder: "예) 김다인 · 미공개면 Coming Soon" },
        { key: "subject", label: "과목", type: "select", options: SUBJECTS },
        {
          key: "tags",
          label: "대상 태그",
          type: "tags",
          placeholder: "고3, N수",
          help: "쉼표로 구분합니다. 카드 위쪽에 표시됩니다.",
        },
        { key: "photo", label: "사진", type: "image", help: "세로형 인물 사진을 권장합니다." },
        {
          key: "school",
          label: "출신학교",
          type: "text",
          maxLength: 60,
          placeholder: "예) 서울대학교 국어교육과",
          help: "강사진 목록 카드의 PROFILE 아래에 표시됩니다.",
        },
        {
          key: "copy",
          label: "한 줄 소개",
          type: "text",
          maxLength: 60,
          placeholder: "예) 개념을 세우고 실전으로 끝냅니다.",
        },
        {
          key: "career",
          label: "이력",
          type: "textarea",
          placeholder: "대치 대형학원 출강\n재수종합 정규 담당",
          help: "한 줄에 하나씩 입력하세요.",
        },
        {
          key: "openAt",
          label: "공개 예정 시기",
          type: "text",
          placeholder: "예) 10월 첫째 주 공개",
          help: "아직 공개 전인 강사에게만 표시됩니다.",
        },
        { key: "videoUrl", label: "소개 영상 링크", type: "text", placeholder: "유튜브 주소 (선택)" },
        {
          key: "introPoster",
          label: "강사 소개 포스터",
          type: "image",
          help: "상세 페이지 '강사 소개' 탭에 표시됩니다. A4 세로 비율을 권장합니다. (선택)",
        },
        {
          key: "courses",
          label: "개설 강좌",
          type: "courses",
          help: "이 선생님의 단과 강좌입니다. 모집대상(N수·고3·고2·고1·중3·특강)에 따라 단과시간표 탭에 자동 노출됩니다.",
        },
        {
          key: "revealed",
          label: "실명 · 사진 공개",
          type: "checkbox",
          help: "끄면 이름 대신 Coming Soon 과 공개 예정 시기가 표시됩니다.",
        },
        {
          key: "hidden",
          label: "강사진 목록에서 숨기기",
          type: "checkbox",
          help: "강사가 아직 정해지지 않은 강좌를 모아둘 때 사용합니다. 카드는 숨겨지고 개설 강좌만 단과시간표에 나옵니다.",
        },
      ]}
      defaults={{
        name: "Coming Soon",
        subject: SUBJECTS[0] || "수학",
        tags: ["고3", "N수"],
        photo: "",
        school: "",
        copy: "",
        career: "",
        openAt: "공개 예정",
        videoUrl: "",
        introPoster: "",
        courses: [],
        revealed: false,
        hidden: false,
      }}
      summary={(item) => (
        <span>
          <b>{String(item.name || "이름 없음")}</b>
          <span className="ad-row-sub">
            {" · "}{String(item.subject || "")}
            {Array.isArray(item.courses) && item.courses.length > 0
              ? ` · 강좌 ${item.courses.length}개`
              : ""}
            {item.revealed ? "" : " · 미공개"}
          </span>
        </span>
      )}
    />
  );
}
