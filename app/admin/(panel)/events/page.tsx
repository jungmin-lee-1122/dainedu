"use client";
import ResourceManager from "../../../components/admin/ResourceManager";

export default function Page() {
  return (
    <ResourceManager
      title="이벤트 · 설명회"
      resource="events"
      description="설명회와 공개특강을 관리합니다. 목록(/event)과 상세 페이지(/event/[id])에 함께 반영되고, 예약 신청서도 자동으로 붙습니다."
      fields={[
        { key: "title", label: "제목", type: "text", placeholder: "예) 2027 대입 변화 학부모 설명회" },
        { key: "kind", label: "분류", type: "select", options: ["설명회", "공개특강", "이벤트"] },
        { key: "status", label: "접수 상태", type: "select", options: ["접수중", "접수예정", "마감"] },
        {
          key: "lead",
          label: "한 줄 소개",
          type: "text",
          maxLength: 60,
          placeholder: "제목 아래에 들어가는 짧은 문구",
        },
        {
          key: "targets",
          label: "대상",
          type: "tags",
          placeholder: "학부모, 고2, 고3, N수",
          help: "쉼표로 구분합니다. 배지로 표시됩니다.",
        },
        { key: "date", label: "일시", type: "text", placeholder: "2026. 09. 20(일) 오후 2:00 ~ 4:00" },
        { key: "place", label: "장소", type: "text", placeholder: "롯데백화점 동탄점" },
        { key: "placeDetail", label: "장소 상세", type: "text", placeholder: "7층 롯데시네마 수퍼플렉스관 (선택)" },
        { key: "capacity", label: "정원", type: "text", placeholder: "선착순 300석" },
        {
          key: "body",
          label: "설명회 안내",
          type: "textarea",
          placeholder: "소개 문단을 입력하세요.",
          help: "한 줄에 한 문단씩 입력하세요.",
        },
        {
          key: "program",
          label: "진행 순서",
          type: "textarea",
          placeholder: "14:00 | 개회 및 학원 소개\n14:15 | 2027 대입 제도 변화 총정리",
          help: "한 줄에 하나씩, 「시간 | 내용」 형태로 입력하세요.",
        },
        {
          key: "notice",
          label: "유의사항",
          type: "textarea",
          placeholder: "사전예약은 선착순으로 진행되며 조기 마감될 수 있습니다.",
          help: "한 줄에 하나씩 입력하세요.",
        },
        { key: "poster", label: "안내 포스터", type: "image", help: "상세 페이지에 표시됩니다. (선택)" },
      ]}
      defaults={{
        title: "",
        kind: "설명회",
        status: "접수중",
        lead: "",
        targets: ["학부모"],
        date: "",
        place: "다인교육 동탄점",
        placeDetail: "",
        capacity: "선착순 80석",
        body: "",
        program: "",
        notice: "사전예약은 선착순으로 진행되며 조기 마감될 수 있습니다.\n예약 후 취소를 원하시면 대표번호(1644-0224)로 연락해 주세요.",
        poster: "",
      }}
      summary={(item) => (
        <span>
          <span className="ad-row-tag">{String(item.status || "접수중")}</span>
          <b>{String(item.title || "제목 없음")}</b>
          <span className="ad-row-sub"> · {String(item.date || "일시 미정")}</span>
        </span>
      )}
    />
  );
}
