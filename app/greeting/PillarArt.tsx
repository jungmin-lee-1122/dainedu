// ═══════════════════════════════════════════════════════════
//  인사말 — 두 축 카드 오른쪽 아래 일러스트
//  ※ 직접 그린 SVG 입니다. 색은 브랜드 팔레트를 따릅니다.
// ═══════════════════════════════════════════════════════════

/** 01 프리미엄 강의 — 칠판 + 교재 */
function LectureArt() {
  return (
    <svg className="gr-art" viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="grBoardFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7CE9A" />
          <stop offset="55%" stopColor="#C0994F" />
          <stop offset="100%" stopColor="#8E6F33" />
        </linearGradient>
        <linearGradient id="grBookTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B5384" />
          <stop offset="100%" stopColor="#24365A" />
        </linearGradient>
        <linearGradient id="grPaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCFAF5" />
          <stop offset="100%" stopColor="#E6DFCF" />
        </linearGradient>
        <radialGradient id="grGlowA" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#C0994F" stopOpacity=".26" />
          <stop offset="100%" stopColor="#C0994F" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="170" cy="190" rx="140" ry="52" fill="url(#grGlowA)" />

      {/* 칠판 */}
      <g>
        <rect x="140" y="38" width="160" height="112" rx="10" fill="url(#grBoardFrame)" />
        <rect x="150" y="48" width="140" height="92" rx="5" fill="#16233D" />
        {/* 수식 */}
        <text
          x="220" y="86" textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic"
          fontSize="20" fill="#EBD9AE"
        >
          f(x) = ax² + bx + c
        </text>
        {/* 그래프 */}
        <path d="M170 128 V96" stroke="#8C7A55" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M166 126 H236" stroke="#8C7A55" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M170 124 Q190 100 210 112 T238 98" fill="none" stroke="#D9BE8C" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M232 100 l6 -2 -1 6" fill="none" stroke="#D9BE8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 분필 받침 */}
        <rect x="150" y="146" width="140" height="7" rx="3.5" fill="#A87F38" />
      </g>

      {/* 세워둔 책 두 권 */}
      <g>
        <rect x="24" y="118" width="104" height="22" rx="4" fill="#1B2A4A" />
        <rect x="24" y="118" width="104" height="7" rx="3.5" fill="url(#grBookTop)" />
        <rect x="30" y="126" width="92" height="3" rx="1.5" fill="#F2E8D4" opacity=".8" />
        <text x="76" y="136" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7"
          letterSpacing="1.2" fill="#D9BE8C">KNOWLEDGE</text>

        <rect x="20" y="142" width="112" height="22" rx="4" fill="#24365A" />
        <rect x="20" y="142" width="112" height="7" rx="3.5" fill="url(#grBookTop)" />
        <rect x="26" y="150" width="100" height="3" rx="1.5" fill="#F2E8D4" opacity=".8" />
      </g>

      {/* 펼친 책 */}
      <g>
        <path d="M40 196 Q104 176 168 196 L168 204 Q104 186 40 204 Z" fill="#B9AE95" />
        <path d="M40 194 Q104 174 104 190 L104 198 Q104 182 40 202 Z" fill="url(#grPaper)" />
        <path d="M168 194 Q104 174 104 190 L104 198 Q104 182 168 202 Z" fill="url(#grPaper)" />
        <path d="M104 190 V198" stroke="#C8BFA8" strokeWidth="1.4" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M58 ${186 + i * 4} Q80 ${181 + i * 4} 98 ${185 + i * 4}`} stroke="#C8BFA8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            <path d={`M110 ${185 + i * 4} Q128 ${181 + i * 4} 150 ${186 + i * 4}`} stroke="#C8BFA8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* 만년필 */}
      <g>
        <rect x="176" y="198" width="74" height="7" rx="3.5" fill="#C0994F" transform="rotate(-5 176 198)" />
        <path d="M172 204 l10 -3 1 5 z" fill="#8E6F33" transform="rotate(-5 176 198)" />
      </g>
    </svg>
  );
}

/** 02 프리미엄 관리 — 체크리스트 + 달력 */
function CareArt() {
  return (
    <svg className="gr-art" viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="grClipBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B5384" />
          <stop offset="100%" stopColor="#1B2A4A" />
        </linearGradient>
        <linearGradient id="grGold2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7CE9A" />
          <stop offset="60%" stopColor="#C0994F" />
          <stop offset="100%" stopColor="#8E6F33" />
        </linearGradient>
        <linearGradient id="grSheet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCFAF5" />
          <stop offset="100%" stopColor="#E8E1D2" />
        </linearGradient>
        <radialGradient id="grGlowB" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#C0994F" stopOpacity=".26" />
          <stop offset="100%" stopColor="#C0994F" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="196" rx="140" ry="48" fill="url(#grGlowB)" />

      {/* 클립보드 */}
      <g>
        <rect x="42" y="42" width="140" height="168" rx="14" fill="url(#grClipBack)" />
        <rect x="54" y="60" width="116" height="138" rx="8" fill="url(#grSheet)" />
        {/* 집게 */}
        <rect x="94" y="30" width="36" height="26" rx="7" fill="url(#grGold2)" />
        <circle cx="112" cy="26" r="9" fill="none" stroke="url(#grGold2)" strokeWidth="5" />
        {/* 체크 항목 3줄 */}
        {[0, 1, 2].map((i) => {
          const y = 88 + i * 36;
          return (
            <g key={i}>
              <rect x="68" y={y} width="22" height="22" rx="6" fill="#C0994F" />
              <path
                d={`M73 ${y + 11} l4 4 8 -9`}
                fill="none" stroke="#FFF8E9" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"
              />
              <rect x="100" y={y + 3} width="54" height="6" rx="3" fill="#C3BBA9" />
              <rect x="100" y={y + 13} width="34" height="6" rx="3" fill="#D6CFC0" />
            </g>
          );
        })}
      </g>

      {/* 달력 */}
      <g>
        {/* 링 */}
        <circle cx="212" cy="112" r="10" fill="none" stroke="url(#grGold2)" strokeWidth="5" />
        <circle cx="252" cy="112" r="10" fill="none" stroke="url(#grGold2)" strokeWidth="5" />
        <rect x="182" y="122" width="118" height="96" rx="12" fill="url(#grSheet)" />
        <rect x="182" y="122" width="118" height="16" rx="8" fill="#E2DACA" />
        {/* 날짜 칸 */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const x = 194 + c * 20;
            const y = 148 + r * 17;
            const isToday = r === 2 && c === 2;
            return (
              <rect
                key={`${r}-${c}`}
                x={x} y={y} width="14" height="12" rx="3"
                fill={isToday ? "#C0994F" : "#D9D2C2"}
              />
            );
          })
        )}
      </g>
    </svg>
  );
}

export default function PillarArt({ kind }: { kind: "lecture" | "care" }) {
  return kind === "lecture" ? <LectureArt /> : <CareArt />;
}
