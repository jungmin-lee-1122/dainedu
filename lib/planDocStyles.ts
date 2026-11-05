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
.pl-sec-no{display:inline-block;margin-bottom:8px;font-size:11px;font-weight:800;
  letter-spacing:.16em;color:var(--pl-gold)}
.pl-h2{margin:0 0 6px;font-size:clamp(19px,2.2vw,25px);font-weight:900;
  letter-spacing:-.035em;color:var(--pl-deep)}
.pl-lead{margin:0 0 24px;font-size:13.5px;line-height:1.8;color:var(--pl-mut);word-break:keep-all}

/* ── ② 강사 소개 ── */
.pl-prof{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pl-prof-box{padding:22px 24px;border:1px solid var(--pl-line);border-radius:16px;background:var(--pl-soft)}
.pl-prof-box h4{margin:0 0 13px;padding-bottom:11px;border-bottom:1px solid var(--pl-line);
  font-size:13px;font-weight:800;color:var(--pl-navy);letter-spacing:-.01em}
.pl-prof-box ul{margin:0;padding:0;list-style:none}
.pl-prof-box li{position:relative;padding:5px 0 5px 13px;font-size:14px;line-height:1.7;color:#3C4454}
.pl-prof-box li::before{content:"";position:absolute;left:0;top:14px;
  width:4px;height:4px;border-radius:50%;background:var(--pl-gold)}
.pl-prof-box li.is-past{color:#99A0AE}
.pl-prof-box li.is-past::before{background:#C7CCD6}
.pl-prof-div{margin:12px 0 2px;font-size:11px;font-weight:800;letter-spacing:.1em;color:#A8AEBA}

/* ── ③ 연간 로드맵 ── */
.pl-road{overflow-x:auto;border:1px solid var(--pl-line);border-radius:16px;background:#fff;
  scrollbar-width:thin}
.pl-road-in{min-width:760px;padding:4px}
.pl-road-row{display:grid;align-items:stretch;gap:4px;padding:3px 4px}
.pl-road-row:first-child .pl-road-cell{background:var(--pl-deep);color:#fff;
  font-size:11.5px;font-weight:800;border-radius:7px;padding:8px 0;text-align:center}
.pl-road-label{display:flex;align-items:center;justify-content:center;
  padding:0 10px;border-radius:7px;background:var(--pl-navy);color:#fff;
  font-size:12px;font-weight:800;text-align:center;letter-spacing:-.02em;min-height:44px}
.pl-road-cell{position:relative;background:#F1F3F8;border-radius:7px;min-height:44px}
.pl-road-bar{display:flex;align-items:center;justify-content:center;
  padding:6px 10px;border-radius:7px;min-height:44px;
  background:linear-gradient(135deg,#2E4470,var(--pl-navy));
  color:#fff;font-size:11.5px;font-weight:700;line-height:1.35;
  text-align:center;word-break:keep-all}
.pl-road-bar.is-line{background:#fff;border:1.5px solid var(--pl-gold);color:#8A6F30}
.pl-road-hint{margin:10px 0 0;font-size:11.5px;color:#9AA1AE}

/* ── ④ 단계별 과정 ── */
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

/* ── ⑤ 주간 운영 ── */
.pl-weekly{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.pl-week{padding:20px 20px;border:1px solid var(--pl-line);border-radius:14px;
  background:linear-gradient(165deg,#fff,var(--pl-soft))}
.pl-week b{display:block;margin-bottom:4px;font-size:12.5px;font-weight:800;color:var(--pl-gold)}
.pl-week strong{display:block;margin-bottom:8px;font-size:20px;font-weight:900;
  letter-spacing:-.035em;color:var(--pl-deep)}
.pl-week p{margin:0;font-size:12.5px;line-height:1.7;color:var(--pl-mut);word-break:keep-all}

/* ── ⑥ 관리·피드백 ── */
.pl-care{margin:0;padding:0;list-style:none;overflow:hidden;
  border:1px solid var(--pl-line);border-radius:16px}
.pl-care li{display:grid;grid-template-columns:150px 1fr;gap:18px;
  padding:17px 22px;border-bottom:1px solid var(--pl-line);background:#fff}
.pl-care li:last-child{border-bottom:0}
.pl-care li:nth-child(even){background:#FCFDFE}
.pl-care b{font-size:13.5px;font-weight:800;color:var(--pl-navy);letter-spacing:-.02em}
.pl-care span{font-size:13.5px;line-height:1.8;color:#5A6273;word-break:keep-all}

/* ── ⑦ 안내 ── */
.pl-notes{margin:0;padding:22px 24px;list-style:none;
  border:1px solid var(--pl-line);border-left:3px solid var(--pl-gold);border-radius:12px;
  background:#FAF8F3}
.pl-notes li{position:relative;padding:4px 0 4px 14px;font-size:12.5px;line-height:1.85;color:#6E6B62}
.pl-notes li::before{content:"※";position:absolute;left:0;color:var(--pl-gold);font-size:10px;top:8px}

.pl-foot{padding:26px 0 72px;font-size:12px;line-height:1.9;color:#9399A6}
.pl-foot b{color:var(--pl-navy)}

/* ── 모바일 ── */
@media(max-width:860px){
  .pl-prof{grid-template-columns:1fr;gap:12px}
  .pl-step{grid-template-columns:1fr}
  .pl-step-side{flex-direction:row;align-items:baseline;gap:9px;padding:15px 18px;flex-wrap:wrap}
  .pl-step-period{margin-top:0}
  .pl-step-body{padding:18px}
  .pl-care li{grid-template-columns:1fr;gap:5px;padding:15px 18px}
  .pl-road-in{min-width:680px}
  .pl-road-hint{display:block}
}
@media(max-width:520px){
  .pl-wrap{padding:0 18px}
  .pl-week strong{font-size:18px}
}
`;
