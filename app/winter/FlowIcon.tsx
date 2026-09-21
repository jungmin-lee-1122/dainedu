// ═══════════════════════════════════════════════════════════
//  AI 관리 4단계 카드에 들어가는 아이콘 (SVG · 이미지 파일 없음)
//  아이스블루 선 + 골드 포인트로 윈터 팔레트를 그대로 씁니다.
// ═══════════════════════════════════════════════════════════
export type FlowIconKind = "collect" | "analyze" | "suggest" | "care";

const ICE = "#7FB4FF";
const GOLD = "#D9B871";

export default function FlowIcon({ kind }: { kind: FlowIconKind }) {
  return (
    <svg className="wt-flow-ico" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      {kind === "collect" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="7" width="20" height="26" rx="3" stroke={ICE} strokeWidth="2" />
          <path d="M15 15h8M15 21h8M15 27h5" stroke={ICE} strokeWidth="2" opacity=".65" />
          <rect x="19" y="15" width="20" height="26" rx="3" stroke={GOLD} strokeWidth="2" fill="#0F1A30" />
          <path d="M25 23h8M25 29h8M25 35h5" stroke={GOLD} strokeWidth="2" opacity=".85" />
        </g>
      )}

      {kind === "analyze" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 39h34" stroke={ICE} strokeWidth="2" opacity=".5" />
          <rect x="11" y="26" width="6" height="13" rx="1.5" stroke={ICE} strokeWidth="2" />
          <rect x="21" y="19" width="6" height="20" rx="1.5" stroke={ICE} strokeWidth="2" />
          <rect x="31" y="12" width="6" height="27" rx="1.5" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity=".14" />
          <path d="M10 18l7-6 7 5 10-9" stroke={GOLD} strokeWidth="2" />
          <circle cx="34" cy="8" r="3" fill={GOLD} />
        </g>
      )}

      {kind === "suggest" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M24 6a12 12 0 0 1 7 21.7V31a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2v-3.3A12 12 0 0 1 24 6z"
            stroke={ICE}
            strokeWidth="2"
          />
          <path d="M19 37h10M21 42h6" stroke={GOLD} strokeWidth="2" />
          <path d="M24 15v9M24 15l-3.5 3.5M24 15l3.5 3.5" stroke={GOLD} strokeWidth="2" />
        </g>
      )}

      {kind === "care" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 12h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H16l-6 5v-5H7a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z"
            stroke={ICE} strokeWidth="2" transform="translate(1 0)" />
          <circle cx="34" cy="16" r="6" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity=".14" />
          <path d="M26 36c1.6-4.4 4.6-6.6 8-6.6s6.4 2.2 8 6.6" stroke={GOLD} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
