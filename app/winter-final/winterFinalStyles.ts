// ═══════════════════════════════════════════════════════════
//  2027 윈터스쿨 확장 추가 모집 설명회 (/winter-final) 전용 보탬 스타일
//
//  ※ 이 페이지는 윈터스쿨(/winter) · PRE 윈터스쿨(/pre-winter) 과
//    같은 디자인 틀(wt-*)을 그대로 씁니다. 여기에는 이 페이지에만
//    있는 것(회차 카드 등)만 wf-* 로 적습니다.
//    globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const winterFinalStyles = `
/* ── 회차 카드 3개 ── */
.wf-rounds{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:clamp(14px,1.8vw,22px);margin-top:clamp(28px,3.4vw,44px)}
.wf-round{display:flex;flex-direction:column;
  padding:clamp(22px,2.4vw,30px) clamp(20px,2.2vw,28px) clamp(20px,2.2vw,26px);
  border:1px solid #E3E7EF;border-radius:18px;background:#fff;text-decoration:none;
  box-shadow:0 18px 40px -32px rgba(16,25,46,.5);
  transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.wf-round:hover{transform:translateY(-4px);border-color:var(--w-gold);
  box-shadow:0 26px 54px -30px rgba(16,25,46,.45)}
.wf-grade{display:flex;align-items:baseline;gap:8px;margin-bottom:14px}
.wf-grade b{font-family:"Noto Serif KR",serif;font-size:clamp(20px,2.1vw,25px);
  font-weight:900;letter-spacing:-.04em;color:var(--w-navy)}
.wf-grade span{font-size:12px;font-weight:700;color:var(--w-gold)}
.wf-when{padding:13px 0;border-top:1px solid #EDF0F6;border-bottom:1px solid #EDF0F6}
.wf-when b{display:block;font-size:15.5px;font-weight:800;letter-spacing:-.03em;
  color:var(--w-navy)}
.wf-when span{display:block;margin-top:3px;font-size:13.5px;font-weight:700;
  color:var(--w-gold)}
.wf-msg{margin:15px 0 0;font-size:14px;line-height:1.75;color:var(--w-mut);
  word-break:keep-all}
.wf-go{display:inline-flex;align-items:center;justify-content:center;gap:7px;
  margin-top:auto;padding-top:20px;
  font-size:13.5px;font-weight:800;letter-spacing:-.02em;color:var(--w-navy)}
.wf-go i{font-style:normal;transition:transform .25s ease}
.wf-round:hover .wf-go{color:var(--w-gold)}
.wf-round:hover .wf-go i{transform:translateX(4px)}

/* ── 공통 안내 ── */
.wf-facts{margin:clamp(26px,3vw,40px) 0 0;padding:0;display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));gap:0 clamp(24px,3.4vw,52px)}
.wf-fact{padding:17px 0;border-top:1px solid rgba(255,255,255,.2)}
.wf-fact dt{margin-bottom:8px;font-size:10.5px;font-weight:700;letter-spacing:.2em;
  color:var(--w-gold)}
.wf-fact dd{margin:0;font-size:14.5px;font-weight:700;line-height:1.7;color:#fff;
  word-break:keep-all}

/* ── 윈터스쿨 안내 4가지 ── */
.wf-points{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
  gap:0 clamp(20px,2.8vw,44px);margin-top:clamp(28px,3.4vw,44px)}
.wf-point{padding-top:18px;border-top:2px solid var(--w-navy)}
.wf-point b{display:block;margin-bottom:11px;font-size:11.5px;font-weight:800;
  letter-spacing:.18em;color:var(--w-gold)}
.wf-point h3{margin:0 0 9px;font-size:clamp(16px,1.7vw,19px);font-weight:800;
  letter-spacing:-.035em;color:var(--w-navy)}
.wf-point p{margin:0;font-size:13.5px;line-height:1.8;color:var(--w-mut);
  word-break:keep-all}

/* ── 태블릿 ── */
@media(max-width:980px){
  .wf-rounds{grid-template-columns:1fr}
  .wf-points{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px clamp(20px,3vw,34px)}
}

/* ── 모바일 ── */
@media(max-width:720px){
  .wf-round{padding:20px 18px 18px;border-radius:15px}
  .wf-facts{grid-template-columns:1fr;gap:0}
  .wf-points{grid-template-columns:1fr;gap:18px}
}
`;
