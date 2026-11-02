// ═══════════════════════════════════════════════════════════
//  PRE 윈터스쿨 카드 아이콘 — 선으로만 그린 단순한 모양입니다.
//  색은 CSS 에서 정해지므로 여기서는 currentColor 만 씁니다.
// ═══════════════════════════════════════════════════════════

export default function PwIcon({ name }: { name?: string }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  /* 중등과 고등 사이의 공백을 잇는 다리 */
  if (name === "gap") {
    return (
      <svg {...common}>
        <path d="M3 21h8M21 21h8" />
        <path d="M11 21c0-4 2-6 5-6s5 2 5 6" />
        <path d="M6 21v4M26 21v4" />
        <path d="M16 6v5" />
        <path d="M13.2 8.6 16 11l2.8-2.4" />
      </svg>
    );
  }

  /* 수학 — 좌표평면 위의 곡선 */
  if (name === "math") {
    return (
      <svg {...common}>
        <path d="M5 27V6M5 27h22" />
        <path d="M8 23c4 0 4-13 8-13s5 9 9 9" />
        <circle cx="16" cy="10" r="1.6" />
      </svg>
    );
  }

  /* 통합과학 — 플라스크 */
  if (name === "science") {
    return (
      <svg {...common}>
        <path d="M13 4h6" />
        <path d="M14 4v8.4L7.6 23.2A2.4 2.4 0 0 0 9.7 27h12.6a2.4 2.4 0 0 0 2.1-3.8L18 12.4V4" />
        <path d="M10.6 20h10.8" />
        <circle cx="14.4" cy="23.2" r="1.1" />
        <circle cx="18.4" cy="24" r="0.8" />
      </svg>
    );
  }

  /* 이름이 없거나 모르는 값일 때 — 작은 별 */
  return (
    <svg {...common}>
      <path d="M16 5.5 18.6 13l7.9.3-6.2 4.8 2.2 7.6L16 21.3 9.5 25.7l2.2-7.6L5.5 13.3 13.4 13z" />
    </svg>
  );
}
