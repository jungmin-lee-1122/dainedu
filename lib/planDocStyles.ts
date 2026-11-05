// ═══════════════════════════════════════════════════════════
//  다인에듀 연간 계획서 공통 서식 — 스타일 (테스트 전용)
//
//  globals.css 는 건드리지 않습니다. 이 폴더만 지우면 원래대로 돌아갑니다.
//  색은 사이트 기본(네이비 + 골드)을 그대로 씁니다 —
//  선생님 자료의 주황/검정 톤을 따라가면 학원 브랜드와 따로 놉니다.
// ═══════════════════════════════════════════════════════════
export const planDocStyles = `
.pl{
  --pl-navy:#24365A; --pl-deep:#10192E; --pl-gold:#C0994F; --pl-gold-l:#E7CE9A;
  --pl-line:#E4E8EF; --pl-soft:#F6F8FC; --pl-ink:#1B2130; --pl-mut:#6B7384;
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  background:#fff;color:var(--pl-ink);letter-spacing:-.02em;overflow-x:clip
}
.pl-wrap{max-width:1080px;margin:0 auto;padding:0 24px}

/* ── 문서 머리 ── */
.pl-head{padding:clamp(34px,5vw,64px) 0 26px}
.pl-kicker{display:inline-block;margin:0 0 14px;padding:6px 13px;border-radius:999px;
  background:rgba(36,54,90,.07);color:var(--pl-navy);font-size:11.5px;font-weight:800;letter-spacing:.08em}
.pl-title{margin:0 0 10px;font-size:clamp(26px,3.6vw,42px);font-weight:900;
  letter-spacing:-.04em;line-height:1.24;color:var(--pl-deep)}
.pl-title em{font-style:normal;color:var(--pl-gold)}
.pl-sub{margin:0;font-size:clamp(14px,1.6vw,16px);line-height:1.7;color:var(--pl-mut)}
.pl-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.pl-meta span{padding:7px 14px;border-radius:999px;border:1px solid var(--pl-line);
  background:#fff;font-size:12.5px;font-weight:700;color:var(--pl-navy)}

/* 선생님 전환 탭 */
.pl-tabs{display:inline-flex;gap:3px;margin:22px 0 0;padding:4px;border-radius:12px;background:rgba(36,54,90,.06)}
.pl-tab{padding:9px 18px;border-radius:9px;text-decoration:none;
  font-size:13px;font-weight:700;color:var(--pl-mut);transition:background .2s ease,color .2s ease}
.pl-tab:hover{color:var(--pl-navy)}
.pl-tab.is-on{background:var(--pl-navy);color:#fff;box-shadow:0 4px 12px -6px rgba(16,25,46,.7)}

/* ── 상세페이지에 얹힐 때(큰 애니메이션 아래) ── */
.pl-doc{margin:0}
.pl-doc-head{padding:0 0 4px}
.pl-doc-title{margin:0 0 8px;font-size:clamp(21px,2.6vw,30px);font-weight:900;
  letter-spacing:-.04em;line-height:1.3;color:var(--pl-deep)}
.pl-doc-title em{font-style:normal;color:var(--pl-gold)}
.pl-doc .pl-sec:first-of-type{border-top:0;padding-top:26px}

/* ── 공통 섹션 ── */
.pl-sec{padding:clamp(34px,4vw,54px) 0;border-top:1px solid var(--pl-line)}
/* 섹션 머리 — 숫자(골드) + 영문 라벨(회색 대문자) */
.pl-sec-no{display:flex;align-items:center;gap:9px;margin:0 0 11px;
  font-size:10.5px;font-weight:700;letter-spacing:.18em;color:#747D8C}
.pl-sec-no b{font-weight:800;color:#B89555;letter-spacing:.1em}
.pl-sec-no s{width:14px;height:1px;background:#D8DCE4;text-decoration:none}
.pl-h2{margin:0 0 6px;font-size:clamp(19px,2.2vw,25px);font-weight:900;
  letter-spacing:-.035em;color:var(--pl-deep)}
.pl-lead{margin:0 0 24px;font-size:13.5px;line-height:1.8;color:var(--pl-mut);word-break:keep-all}

/* ── ① 연간 로드맵 ──
   "칸마다 둥근 박스" 시간표를 버리고, 하나로 이어지는 간트 바로 다시 짰습니다.
   · 월 구분은 얇은 세로 가이드라인 한 겹으로만 (빈 달에 회색 카드를 깔지 않습니다)
   · 머리줄·가이드·바 모두 같은 grid 를 써서 1px 어긋남 없이 맞습니다
   · 장식(그림자·그라데이션·과한 라운드)은 쓰지 않습니다 */
.rm{
  --rm-navy:#24375C; --rm-deep:#1B2946; --rm-warm:#FAF9F6;
  --rm-gold:#B89555; --rm-border:#E7E9EE; --rm-mut:#747D8C;
  --rm-labelw:140px; --rm-rowh:46px;
  border-top:1px solid var(--rm-deep);
  border-bottom:1px solid var(--rm-border)}
/* 좁은 화면에서는 옆으로 밀어서 봅니다 */
.rm-scroll{overflow-x:auto;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
.rm-grid{min-width:880px}

/* 머리줄 — 월. 버튼이 아니라 글자와 선으로만 */
.rm-head{display:grid;grid-template-columns:var(--rm-labelw) minmax(0,1fr);
  border-bottom:1px solid var(--rm-border)}
.rm-head-label{display:flex;align-items:flex-end;padding:0 14px 10px 0;
  font-size:10.5px;font-weight:700;letter-spacing:.16em;color:var(--rm-mut)}
.rm-head-track{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr))}
.rm-month{display:flex;align-items:flex-end;justify-content:center;
  padding:0 0 10px;font-size:11.5px;font-weight:600;letter-spacing:.02em;
  color:var(--rm-mut);font-variant-numeric:tabular-nums}

/* 본문 */
.rm-body{position:relative}
/* 세로 가이드라인 — 한 겹만 깔고 행들이 그 위에 올라갑니다 */
.rm-guides{position:absolute;inset:0 0 0 var(--rm-labelw);z-index:0;
  display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));
  pointer-events:none}
.rm-guides i{border-left:1px solid var(--rm-border)}
.rm-guides i:last-child{border-right:1px solid var(--rm-border)}

.rm-row{position:relative;z-index:1;
  display:grid;grid-template-columns:var(--rm-labelw) minmax(0,1fr);
  align-items:center;min-height:var(--rm-rowh);
  border-bottom:1px solid var(--rm-border);
  transition:background .22s ease}
.rm-row:last-child{border-bottom:0}
.rm-row:hover{background:var(--rm-warm)}
@media(hover:none){ .rm-row:hover{background:transparent} }

/* 왼쪽 과정명 — 가로 스크롤에서도 붙어 있습니다 */
.rm-label{position:sticky;left:0;z-index:2;
  padding:12px 16px 12px 2px;background:#fff;
  font-size:13px;font-weight:700;letter-spacing:-.02em;color:var(--rm-deep);
  line-height:1.35;word-break:keep-all}
.rm-row:hover .rm-label{background:var(--rm-warm)}
.rm-track{position:relative;display:grid;
  grid-template-columns:repeat(var(--cols),minmax(0,1fr));
  align-items:center;padding:7px 0}

/* 진행 바 — 시작 달부터 끝 달까지 하나로 이어집니다 */
.rm-bar{grid-column:calc(var(--from) + 1) / span var(--span);
  display:flex;align-items:center;min-height:32px;margin:0 3px;
  padding:6px 12px;border-radius:5px;
  background:var(--rm-navy);color:#fff;
  font-size:11.5px;font-weight:600;letter-spacing:-.02em;line-height:1.3;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* 수업 없이 과제로 진행되는 구간 — 선과 글자로만 구분 */
.rm-bar.is-line{background:transparent;color:#7A6630;
  box-shadow:inset 0 0 0 1px var(--rm-gold);font-weight:700}
/* 한 달짜리 구간은 글자를 가운데로 */
.rm-bar.is-short{justify-content:center;padding:6px 6px}

.rm-foot{display:flex;flex-wrap:wrap;align-items:center;gap:18px;
  margin:14px 0 0;font-size:11.5px;color:var(--rm-mut)}
.rm-key{display:inline-flex;align-items:center;gap:7px}
.rm-key i{display:block;width:18px;height:9px;border-radius:3px;background:var(--rm-navy)}
.rm-key.is-line i{background:transparent;box-shadow:inset 0 0 0 1px var(--rm-gold)}
.rm-hint{margin-left:auto}

/* ── 스크롤해서 보이면 바가 왼쪽에서 오른쪽으로 열립니다 ──
   is-armed 는 스크립트가 붙입니다. 스크립트가 없으면 처음부터 다 보입니다.
   폭을 늘리는 대신 가리개를 걷어 글자가 늘어나지 않습니다. */
.rm.is-armed:not(.is-in) .rm-bar{clip-path:inset(0 100% 0 0);opacity:0}
.rm.is-armed.is-in .rm-bar{
  animation:rmBarIn .62s cubic-bezier(.22,.61,.25,1) backwards;
  animation-delay:calc(var(--d,0) * 42ms)}
@keyframes rmBarIn{
  from{clip-path:inset(0 100% 0 0);opacity:0}
  to  {clip-path:inset(0 0 0 0);opacity:1}
}
@media(prefers-reduced-motion:reduce){
  .rm.is-armed .rm-bar{clip-path:none;opacity:1;animation:none}
  .rm-row{transition:none}
}

@media(max-width:720px){
  .rm{--rm-labelw:108px;--rm-rowh:44px}
  .rm-grid{min-width:780px}
  .rm-label{font-size:12px;padding-right:12px}
  .rm-bar{font-size:11.5px;padding:6px 9px;min-height:30px}
  .rm-month{font-size:11px}
  .rm-foot{gap:12px;font-size:11px}
  .rm-hint{margin-left:0;width:100%}
}

/* ── ② 단계별 과정 ── */
.pl-steps{display:flex;flex-direction:column;gap:12px}
.pl-step{display:grid;grid-template-columns:190px 1fr;gap:0;
  overflow:hidden;border:1px solid var(--pl-line);border-radius:16px;background:#fff}
.pl-step-side{display:flex;flex-direction:column;justify-content:center;gap:5px;
  padding:22px 20px;background:linear-gradient(150deg,#2E4470,var(--pl-deep));color:#fff}
.pl-step.is-extra .pl-step-side{background:linear-gradient(150deg,#B8914A,#8E6C2C)}
.pl-step-no{font-size:11.5px;font-weight:800;letter-spacing:.1em;color:var(--pl-gold-l)}
.pl-step.is-extra .pl-step-no{color:#FFF2D8}
.pl-step-name{font-size:16px;font-weight:900;letter-spacing:-.03em;line-height:1.35;word-break:keep-all}
.pl-step-period{margin-top:3px;font-size:12px;font-weight:600;color:rgba(255,255,255,.62)}
.pl-step-body{padding:22px 24px}
.pl-step-goal{margin:0 0 10px;font-size:15.5px;font-weight:800;letter-spacing:-.025em;color:var(--pl-deep)}
.pl-step-detail{margin:0;font-size:13.5px;line-height:1.85;color:#5A6273;word-break:keep-all}
.pl-books{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px;padding:0;list-style:none}
.pl-books li{padding:5px 11px;border-radius:7px;background:var(--pl-soft);
  border:1px solid var(--pl-line);font-size:12px;font-weight:700;color:#4A5266}

/* ── ③ 주간 운영 ── */
.pl-weekly{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.pl-week{padding:20px 20px;border:1px solid var(--pl-line);border-radius:14px;
  background:linear-gradient(165deg,#fff,var(--pl-soft))}
.pl-week b{display:block;margin-bottom:4px;font-size:12.5px;font-weight:800;color:var(--pl-gold)}
.pl-week strong{display:block;margin-bottom:8px;font-size:20px;font-weight:900;
  letter-spacing:-.035em;color:var(--pl-deep)}
.pl-week p{margin:0;font-size:12.5px;line-height:1.7;color:var(--pl-mut);word-break:keep-all}

/* ── ④ 관리·피드백 ── */
.pl-care{margin:0;padding:0;list-style:none;overflow:hidden;
  border:1px solid var(--pl-line);border-radius:16px}
.pl-care li{display:grid;grid-template-columns:150px 1fr;gap:18px;
  padding:17px 22px;border-bottom:1px solid var(--pl-line);background:#fff}
.pl-care li:last-child{border-bottom:0}
.pl-care li:nth-child(even){background:#FCFDFE}
.pl-care b{font-size:13.5px;font-weight:800;color:var(--pl-navy);letter-spacing:-.02em}
.pl-care span{font-size:13.5px;line-height:1.8;color:#5A6273;word-break:keep-all}

/* ── ⑤ 안내 ── */
.pl-notes{margin:0;padding:22px 24px;list-style:none;
  border:1px solid var(--pl-line);border-left:3px solid var(--pl-gold);border-radius:12px;
  background:#FAF8F3}
.pl-notes li{position:relative;padding:4px 0 4px 14px;font-size:12.5px;line-height:1.85;color:#6E6B62}
.pl-notes li::before{content:"※";position:absolute;left:0;color:var(--pl-gold);font-size:10px;top:8px}

.pl-foot{padding:26px 0 72px;font-size:12px;line-height:1.9;color:#9399A6}
.pl-foot b{color:var(--pl-navy)}

/* ── 모바일 ── */
@media(max-width:860px){
  .pl-step{grid-template-columns:1fr}
  .pl-step-side{flex-direction:row;align-items:baseline;gap:9px;padding:15px 18px;flex-wrap:wrap}
  .pl-step-period{margin-top:0}
  .pl-step-body{padding:18px}
  .pl-care li{grid-template-columns:1fr;gap:5px;padding:15px 18px}
}
@media(max-width:520px){
  .pl-wrap{padding:0 18px}
  .pl-week strong{font-size:18px}
}
`;
