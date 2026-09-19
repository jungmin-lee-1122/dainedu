"use client";
import ResourceManager from "../../../components/admin/ResourceManager";

export default function Page() {
  return (
    <ResourceManager
      title="공지사항"
      resource="notices"
      thumbKey="image"
      description="공지사항 페이지(/notices)와 포르타·클라비스의 공지 목록에 함께 표시됩니다. 어느 관에 보일지는 아래에서 고르세요."
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
          key: "content",
          label: "본문",
          type: "textarea",
          placeholder: "공지 내용을 입력하세요.\n엔터로 문단을 나눌 수 있습니다.",
          help: "공지사항 상세 페이지에 표시됩니다.",
        },
        {
          key: "image",
          label: "첨부 사진",
          type: "image",
          help: "포스터·안내문 등을 올리면 상세 페이지 본문 위에 표시됩니다. (선택)",
        },
        {
          key: "imageHref",
          label: "사진 클릭 시 이동할 주소",
          type: "text",
          placeholder: "https://... 또는 /event/1",
          help: "첨부 사진을 누르면 이 주소로 이동합니다. 비우면 링크가 걸리지 않습니다. (선택)",
        },
        {
          key: "href",
          label: "외부 링크",
          type: "text",
          placeholder: "비우면 사이트 안의 상세 페이지로 연결됩니다",
          help: "다른 사이트로 바로 보내고 싶을 때만 입력하세요. 보통은 비워둡니다. (선택)",
        },
        { key: "pinned", label: "위에 고정", type: "checkbox", help: "켜면 목록 맨 위에 표시됩니다." },
      ]}
      defaults={{
        title: "",
        tag: "공지",
        hall: "둘 다",
        date: "",
        content: "",
        image: "",
        imageHref: "",
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
