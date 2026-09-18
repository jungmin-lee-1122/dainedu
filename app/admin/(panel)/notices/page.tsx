"use client";
import ResourceManager from "../../../components/admin/ResourceManager";

export default function Page() {
  return (
    <ResourceManager
      title="공지사항"
      resource="notices"
      description="포르타 고등전문관(/porta)과 클라비스 N수전문관(/clavis)의 공지사항 목록에 표시됩니다. 어느 관에 보일지는 아래에서 고르세요."
      fields={[
        { key: "title", label: "제목", type: "text", placeholder: "예) 2027 정규반 모집 안내" },
        { key: "tag", label: "분류", type: "select", options: ["공지", "모집안내", "입시결과", "공개특강", "안내"] },
        {
          key: "hall",
          label: "표시할 곳",
          type: "select",
          options: ["둘 다", "포르타 고등전문관", "클라비스 N수전문관"],
        },
        { key: "date", label: "날짜", type: "text", placeholder: "2026.10.01" },
        {
          key: "href",
          label: "연결 주소",
          type: "text",
          placeholder: "비우면 클릭해도 이동하지 않습니다",
          help: "상세 내용이 있는 페이지 주소를 넣으면 제목이 링크가 됩니다. (선택)",
        },
        { key: "pinned", label: "위에 고정", type: "checkbox", help: "켜면 목록 맨 위에 표시됩니다." },
      ]}
      defaults={{
        title: "",
        tag: "공지",
        hall: "둘 다",
        date: "",
        href: "",
        pinned: false,
      }}
      summary={(item) => (
        <span>
          <span className="ad-row-tag">{String(item.tag || "공지")}</span>
          <b>{String(item.title || "제목 없음")}</b>
          <span className="ad-row-sub">
            {" · "}{String(item.date || "")} · {String(item.hall || "둘 다")}
          </span>
        </span>
      )}
    />
  );
}
