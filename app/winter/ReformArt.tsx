// ═══════════════════════════════════════════════════════════
//  2028 입시 개편 카드 일러스트 (SVG · 이미지 파일 없음)
//  인사말 페이지의 3D 오브제와 같은 결 — 네이비 본체 + 골드 포인트 +
//  크림색 종이, 바닥 그림자로 입체감을 냅니다.
//  새 카드가 생기면 아래 kind 를 하나 추가하면 됩니다.
// ═══════════════════════════════════════════════════════════
export type ReformArtKind = "grade" | "exam" | "paper";

export default function ReformArt({ kind }: { kind: ReformArtKind }) {
  return (
    <svg
      className="wt-rcard-art"
      viewBox="0 0 160 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* 네이비 본체 */}
        <linearGradient id="raNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A3E68" />
          <stop offset="100%" stopColor="#131F3A" />
        </linearGradient>
        {/* 골드 */}
        <linearGradient id="raGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EBD6A6" />
          <stop offset="55%" stopColor="#C0994F" />
          <stop offset="100%" stopColor="#8F6F32" />
        </linearGradient>
        {/* 종이 */}
        <linearGradient id="raPaper" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FBF6EA" />
          <stop offset="100%" stopColor="#E4DAC4" />
        </linearGradient>
        {/* 바닥 그림자 */}
        <radialGradient id="raShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity=".55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        {/* 뒤에 깔리는 빛 */}
        <radialGradient id="raGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7FB4FF" stopOpacity=".18" />
          <stop offset="100%" stopColor="#7FB4FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="68" r="58" fill="url(#raGlow)" />
      <ellipse cx="80" cy="129" rx="46" ry="9" fill="url(#raShadow)" />

      {kind === "grade" && <Grade />}
      {kind === "exam" && <Exam />}
      {kind === "paper" && <Paper />}
    </svg>
  );
}

/* 1) 한 등급의 무게가 달라진다 — 저울 */
function Grade() {
  return (
    <g>
      {/* 받침 */}
      <path d="M62 124 L74 92 H86 L98 124 Z" fill="url(#raNavy)" />
      <rect x="56" y="120" width="48" height="7" rx="3.5" fill="url(#raGold)" />
      {/* 기둥 */}
      <rect x="76" y="40" width="8" height="54" rx="3" fill="url(#raNavy)" />
      <rect x="76" y="40" width="3" height="54" fill="#3A5183" opacity=".7" />

      {/* 저울대 (오른쪽이 내려간 상태) */}
      <g transform="rotate(9 80 42)">
        <rect x="26" y="38" width="108" height="7" rx="3.5" fill="url(#raGold)" />
        <circle cx="80" cy="41.5" r="8" fill="url(#raNavy)" />
        <circle cx="80" cy="41.5" r="3.4" fill="url(#raGold)" />

        {/* 가벼워진 쪽 */}
        <path d="M32 45 L26 62 M32 45 L38 62" stroke="#5B7099" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 62 H44 L38 74 Q32 79 26 74 Z" fill="url(#raPaper)" opacity=".92" />
        <path d="M20 62 H44" stroke="#C0994F" strokeWidth="2" strokeLinecap="round" opacity=".8" />

        {/* 무거워진 쪽 */}
        <path d="M128 45 L122 64 M128 45 L134 64" stroke="#C0994F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M114 64 H142 L135 78 Q128 84 121 78 Z" fill="url(#raGold)" />
        <path d="M114 64 H142" stroke="#EBD6A6" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* 2) 통합형 수능 첫 시행 — 답안지 + 연필 */
function Exam() {
  return (
    <g>
      {/* 뒤 종이 */}
      <g transform="rotate(-7 66 70)">
        <rect x="30" y="20" width="64" height="94" rx="7" fill="#C9BFA6" opacity=".55" />
      </g>
      {/* 앞 종이 */}
      <rect x="36" y="16" width="64" height="98" rx="7" fill="url(#raPaper)" />
      <path d="M36 23a7 7 0 0 1 7-7h50a7 7 0 0 1 7 7v10H36z" fill="url(#raNavy)" />
      <rect x="44" y="21" width="24" height="4" rx="2" fill="#C0994F" opacity=".9" />

      {/* 마킹 칸 */}
      {[46, 60, 74, 88, 101].map((y, r) => (
        <g key={y}>
          {[50, 62, 74, 86].map((x, c) => (
            <circle
              key={x}
              cx={x}
              cy={y}
              r="4"
              fill={r === 1 && c === 2 ? "url(#raGold)" : "none"}
              stroke={r === 1 && c === 2 ? "#8F6F32" : "#A79C84"}
              strokeWidth="1.4"
            />
          ))}
        </g>
      ))}

      {/* 연필 */}
      <g transform="rotate(24 118 66)">
        <path d="M110 24 H126 V94 L118 110 L110 94 Z" fill="url(#raGold)" />
        <path d="M118 24 H126 V94 L118 110 Z" fill="#000000" opacity=".16" />
        <path d="M110 94 L118 110 L126 94 Z" fill="url(#raPaper)" />
        <path d="M114.5 104 L118 110 L121.5 104 Z" fill="#131F3A" />
        <rect x="110" y="36" width="16" height="5" fill="#131F3A" opacity=".75" />
      </g>
    </g>
  );
}

/* 3) 학종 · 논술 확대 — 서류 + 상승 화살표 */
function Paper() {
  return (
    <g>
      {/* 뒤 서류 */}
      <g transform="rotate(-8 60 70)">
        <rect x="24" y="26" width="58" height="80" rx="6" fill="#C9BFA6" opacity=".5" />
      </g>
      {/* 앞 서류 */}
      <rect x="32" y="22" width="60" height="88" rx="7" fill="url(#raPaper)" />
      <rect x="32" y="22" width="9" height="88" rx="4" fill="url(#raNavy)" />
      <rect x="50" y="36" width="32" height="5" rx="2.5" fill="#131F3A" opacity=".8" />
      <rect x="50" y="50" width="32" height="3.6" rx="1.8" fill="#A79C84" />
      <rect x="50" y="60" width="32" height="3.6" rx="1.8" fill="#A79C84" />
      <rect x="50" y="70" width="22" height="3.6" rx="1.8" fill="#A79C84" />

      {/* 상승 화살표 */}
      <path
        d="M84 96 C100 96 104 72 120 46"
        stroke="url(#raGold)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M106 40 H128 V62" stroke="url(#raGold)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="84" cy="96" r="5.5" fill="url(#raGold)" />
      <circle cx="84" cy="96" r="2" fill="#131F3A" />
    </g>
  );
}
