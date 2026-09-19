// ═══════════════════════════════════════════════════════════
//  2028 입시 개편 카드에 들어가는 일러스트 (SVG · 이미지 파일 없음)
//  색은 윈터 팔레트(아이스 블루 + 골드)를 그대로 씁니다.
//  새 카드가 생기면 아래 kind 를 하나 추가하면 됩니다.
// ═══════════════════════════════════════════════════════════
export type ReformArtKind = "grade" | "exam" | "paper";

const ICE = "#7FB4FF";
const GOLD = "#D9B871";

export default function ReformArt({ kind }: { kind: ReformArtKind }) {
  return (
    <svg
      className="wt-rcard-art"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* 뒤에 깔리는 옅은 원 */}
      <circle cx="62" cy="60" r="46" fill="url(#wtArtGlow)" />
      <defs>
        <radialGradient id="wtArtGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ICE} stopOpacity=".16" />
          <stop offset="100%" stopColor={ICE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {kind === "grade" && <Grade />}
      {kind === "exam" && <Exam />}
      {kind === "paper" && <Paper />}
    </svg>
  );
}

/* 1) 등급의 무게가 달라진다 — 저울 */
function Grade() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M60 30 V78" stroke={ICE} strokeWidth="2.6" />
      <path d="M46 94 L60 78 L74 94" stroke={ICE} strokeWidth="2.6" />
      <path d="M44 94 H76" stroke={ICE} strokeWidth="2.6" />
      <path d="M26 40 L94 28" stroke={ICE} strokeWidth="2.6" />
      <circle cx="60" cy="34" r="4.6" fill={GOLD} />

      {/* 가벼워진 쪽 */}
      <path d="M26 40 L19 56 M26 40 L33 56" stroke={ICE} strokeWidth="1.8" opacity=".7" />
      <path d="M16 56 Q26 68 36 56 Z" stroke={ICE} strokeWidth="2.2" opacity=".7" />

      {/* 무거워진 쪽 */}
      <path d="M94 28 L87 46 M94 28 L101 46" stroke={GOLD} strokeWidth="1.8" />
      <path d="M83 46 Q94 60 105 46 Z" stroke={GOLD} strokeWidth="2.4" fill={GOLD} fillOpacity=".14" />
    </g>
  );
}

/* 2) 통합형 수능 첫 시행 — 답안지 + 연필 */
function Exam() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect
        x="18" y="24" width="48" height="74" rx="7"
        stroke={ICE} strokeWidth="2.4" fill={ICE} fillOpacity=".05"
      />
      <path d="M28 36 H44" stroke={ICE} strokeWidth="2.4" opacity=".55" />

      {[46, 60, 74, 86].map((y, r) => (
        <g key={y}>
          {[30, 42, 54].map((x, c) => (
            <circle
              key={x}
              cx={x} cy={y} r="3.2"
              stroke={r === 1 && c === 1 ? GOLD : ICE}
              strokeWidth="1.8"
              fill={r === 1 && c === 1 ? GOLD : "none"}
              opacity={r === 1 && c === 1 ? 1 : 0.5}
            />
          ))}
        </g>
      ))}

      <g transform="rotate(15 92 60)">
        <path d="M86 30 H100 V84 L93 98 L86 84 Z" stroke={GOLD} strokeWidth="2.4" fill={GOLD} fillOpacity=".1" />
        <path d="M86 42 H100" stroke={GOLD} strokeWidth="2" opacity=".8" />
        <path d="M93 88 V98" stroke={GOLD} strokeWidth="2" />
      </g>
    </g>
  );
}

/* 3) 학종 · 논술 확대 — 서류 + 확장 화살표 */
function Paper() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect x="20" y="26" width="46" height="62" rx="6" stroke={ICE} strokeWidth="2.2" opacity=".42" />
      <rect
        x="32" y="36" width="46" height="62" rx="6"
        stroke={ICE} strokeWidth="2.4" fill={ICE} fillOpacity=".05"
      />
      <path d="M42 52 H68 M42 63 H68 M42 74 H60" stroke={ICE} strokeWidth="2.2" opacity=".55" />

      <path d="M74 62 L100 36" stroke={GOLD} strokeWidth="2.6" />
      <path d="M84 34 H102 V52" stroke={GOLD} strokeWidth="2.6" />
      <circle cx="74" cy="62" r="3.4" fill={GOLD} />
    </g>
  );
}
