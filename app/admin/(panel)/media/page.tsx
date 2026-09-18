"use client";
import ResourceManager from "../../../components/admin/ResourceManager";

export default function Page() {
  return (
    <ResourceManager
      title="사진 · 영상"
      resource="media"
      thumbKey="image"
      description="시설 사진과 선생님 클립영상을 관리합니다. 종류를 고르면 해당 위치에 노출됩니다."
      fields={[
        {
          key: "kind",
          label: "종류",
          type: "select",
          options: ["시설 사진", "선생님 클립영상", "설명회 현장"],
        },
        { key: "title", label: "제목", type: "text", placeholder: "예) 1인 1지정석 자습실" },
        {
          key: "image",
          label: "사진",
          type: "image",
          help: "종류가 '선생님 클립영상'이면 비워두세요. 유튜브 썸네일이 자동으로 들어갑니다.",
        },
        {
          key: "youtube",
          label: "유튜브 영상",
          type: "text",
          placeholder: "pln4F-B_xq8 또는 https://youtu.be/pln4F-B_xq8",
          help: "'선생님 클립영상'일 때만 입력하세요. 주소 전체를 붙여넣어도 됩니다.",
        },
        { key: "caption", label: "설명", type: "textarea", placeholder: "한 줄 설명 (선택)" },
        { key: "active", label: "노출 여부", type: "checkbox" },
      ]}
      defaults={{
        kind: "시설 사진",
        title: "",
        image: "",
        youtube: "",
        caption: "",
        active: true,
      }}
      summary={(item) => (
        <span>
          <span className="ad-row-tag">{String(item.kind || "시설 사진")}</span>
          <b>{String(item.title || "제목 없음")}</b>
          {!item.active && <span className="ad-row-sub"> · 숨김</span>}
        </span>
      )}
    />
  );
}
