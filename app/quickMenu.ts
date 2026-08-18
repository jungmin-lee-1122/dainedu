// 우측 고정 퀵메뉴 (입학상담 · 커리큘럼 · 설명회 참석 · 이벤트)
// 홈 / 사전등록 / 포르타 · 클라비스 페이지에서 공통으로 사용합니다.
export const quickMenuMarkup = String.raw`
<aside class="dn-quick" aria-label="빠른 메뉴">
  <a class="dn-quick-item" href="/consult">
    <span class="dn-quick-ico">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 5h13a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-6l-5 4v-4H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" fill="#24365A"/>
        <circle cx="10.5" cy="13" r="1.5" fill="#F2E3C4"/>
        <circle cx="15" cy="13" r="1.5" fill="#F2E3C4"/>
        <circle cx="19.5" cy="13" r="1.5" fill="#F2E3C4"/>
        <path d="M22 20.5c3 1 5 2.6 5 4.4 0 2.3-3.4 4.1-7.5 4.1S12 27.2 12 24.9" fill="none" stroke="#C0994F" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="dn-quick-label">입학상담</span>
  </a>
  <a class="dn-quick-item" href="/winter">
    <span class="dn-quick-ico">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 7h9a3 3 0 0 1 3 3v16a2.5 2.5 0 0 0-2.5-2H5z" fill="#24365A"/>
        <path d="M27 7h-9a3 3 0 0 0-3 3v16a2.5 2.5 0 0 1 2.5-2H27z" fill="#2E4470"/>
        <path d="M19 12h6M19 16h6M19 20h4" stroke="#D9BE8C" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M7 12h6M7 16h6" stroke="#C0994F" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="dn-quick-label">커리큘럼</span>
  </a>
  <a class="dn-quick-item" href="https://dain-edu.higgsfield.app/seminar">
    <span class="dn-quick-ico">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="7" width="24" height="21" rx="3" fill="#24365A"/>
        <path d="M4 12h24" stroke="#F7F4EC" stroke-width="2"/>
        <path d="M10 4v5M22 4v5" stroke="#C0994F" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M11 20.5l3.2 3.2L22 16" fill="none" stroke="#F2E3C4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="dn-quick-label">설명회 참석</span>
  </a>
  <a class="dn-quick-item" href="#event">
    <span class="dn-quick-ico">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="13" width="24" height="15" rx="2.5" fill="#24365A"/>
        <rect x="3" y="9" width="26" height="6" rx="2" fill="#2E4470"/>
        <rect x="14" y="9" width="4" height="19" fill="#C0994F"/>
        <path d="M16 9c-1.5-3-3.5-4.5-5.5-3.5S9 9 16 9zM16 9c1.5-3 3.5-4.5 5.5-3.5S23 9 16 9z" fill="#D9BE8C"/>
      </svg>
    </span>
    <span class="dn-quick-label">이벤트</span>
  </a>
  <button class="dn-quick-top" type="button" aria-label="맨 위로">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
</aside>
`;
