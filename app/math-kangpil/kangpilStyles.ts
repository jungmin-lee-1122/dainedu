// ═══════════════════════════════════════════════════════════
//  수학 특강 — 강필 선생님 (/math-kangpil) 전용 보탬 스타일
//
//  ※ 이 페이지는 윈터스쿨(/winter) · PRE 윈터스쿨(/pre-winter) 과
//    같은 디자인 틀(wt-*)을 그대로 씁니다.
//    색·글꼴·버튼·여백·등장 애니메이션이 자동으로 같아집니다.
//    여기에는 "이 페이지에만 있는 것" 만 mk-* 로 적습니다.
//
//  globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const kangpilStyles = `
/* ── 키비주얼 오른쪽 인물 ──
   wt-kv-in 의 글이 왼쪽 62% 를 쓰므로, 남는 오른쪽에 세웁니다. */
.mk-kv-photo{position:absolute;z-index:1;right:max(24px,calc((100% - 1160px)/2));
  bottom:0;width:clamp(230px,27%,360px);line-height:0}
.mk-kv-photo::before{content:"";position:absolute;inset:-14px -14px 22px 28px;
  border:2px solid rgba(192,153,79,.6)}
.mk-kv-photo img{position:relative;width:100%;height:auto;display:block;
  background:#fff;padding:8px;
  box-shadow:0 30px 64px -34px rgba(0,0,0,.8)}

/* ── 강사 프로필 표 ── */
.mk-prof{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0 clamp(30px,5vw,76px);margin:clamp(26px,3vw,38px) 0 0}
.mk-prow{display:grid;grid-template-columns:62px minmax(0,1fr);gap:18px;
  padding:16px 0;border-top:1px solid #E6E9F0}
.mk-prow dt{padding-top:3px;font-size:11.5px;font-weight:800;letter-spacing:.1em;
  color:var(--w-gold)}
.mk-prow dd{margin:0}
.mk-prow ul{margin:0;padding:0;list-style:none}
.mk-prow li{font-size:14.5px;line-height:1.85;color:#3F4756;word-break:keep-all}

/* ── 한 줄 인용 ── */
.mk-quote{margin:clamp(22px,2.8vw,34px) 0 0;padding-left:clamp(18px,2.4vw,34px);
  border-left:2px solid var(--w-gold)}
.mk-quote p{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(22px,3.2vw,40px);font-weight:600;line-height:1.46;
  letter-spacing:-.045em;color:var(--w-ink)}
.mk-quote.is-inv p{color:#fff}

/* ── 3원칙 · 수놀음 : 괘선 그리드 ── */
.mk-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:0 clamp(24px,3.4vw,54px);margin-top:clamp(30px,3.6vw,48px)}
.mk-col{padding-top:19px;border-top:2px solid var(--w-navy)}
.mk-col.is-inv{border-top-color:rgba(255,255,255,.4)}
.mk-col-no{display:block;margin-bottom:13px;font-size:11.5px;font-weight:800;
  letter-spacing:.18em;color:var(--w-gold)}
.mk-col h3{margin:0 0 12px;font-size:clamp(16.5px,1.8vw,20px);font-weight:800;
  letter-spacing:-.035em;line-height:1.45;color:var(--w-navy)}
.mk-col h3 span{display:block}
.mk-col.is-inv h3{color:#fff}
.mk-col p{margin:0;font-size:13.5px;line-height:1.9;color:var(--w-mut);
  word-break:keep-all}
.mk-col.is-inv p{color:rgba(255,255,255,.58)}

/* ── 발견적 과정 (2단계) ── */
.mk-steps{margin:clamp(28px,3.4vw,44px) 0 0;padding:0;list-style:none}
.mk-steps li{display:grid;grid-template-columns:150px minmax(0,1fr);
  gap:clamp(16px,2.6vw,36px);align-items:baseline;
  padding:clamp(18px,2.4vw,28px) 0;border-top:1px solid #E6E9F0}
.mk-steps li:last-child{border-bottom:1px solid #E6E9F0}
.mk-steps b{font-family:"Noto Serif KR",serif;font-size:clamp(18px,2vw,24px);
  font-weight:700;letter-spacing:-.04em;color:var(--w-navy)}
.mk-steps span{font-size:14.5px;line-height:1.9;color:var(--w-mut);word-break:keep-all}

/* ── 어록 ── */
.mk-says{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0 clamp(26px,4vw,62px);margin-top:clamp(28px,3.4vw,46px)}
.mk-say{padding:clamp(20px,2.4vw,28px) 0;border-top:1px solid rgba(255,255,255,.16)}
.mk-say b{display:block;margin-bottom:10px;font-family:"Noto Serif KR",serif;
  font-size:clamp(18px,2vw,25px);font-weight:700;letter-spacing:-.04em;
  color:var(--w-gold-l)}
.mk-say span{font-size:13.5px;line-height:1.85;color:rgba(255,255,255,.58);
  word-break:keep-all}

/* ── 수강 안내 ── */
.mk-facts{margin:clamp(26px,3vw,40px) 0 0;padding:0;display:grid;
  grid-template-columns:repeat(auto-fit,minmax(186px,1fr));gap:0 clamp(22px,3vw,44px)}
.mk-fact{padding:18px 0;border-top:1px solid rgba(255,255,255,.2)}
.mk-fact dt{margin-bottom:9px;font-size:10.5px;font-weight:700;letter-spacing:.2em;
  color:var(--w-gold)}
.mk-fact dd{margin:0;font-size:14.5px;font-weight:700;line-height:1.7;color:#fff;
  word-break:keep-all}
.mk-fact dd.is-soon{color:rgba(255,255,255,.4);font-weight:600}
.mk-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:clamp(26px,3vw,38px)}

.mk-draft{max-width:1160px;margin:0 auto;padding:20px 24px 64px;
  font-size:12px;line-height:1.95;color:#9AA1B0}
.mk-draft b{color:var(--w-navy)}

/* ── 태블릿 ── */
@media(max-width:980px){
  .mk-kv-photo{width:clamp(190px,26%,280px);right:20px}
  .mk-grid3{grid-template-columns:1fr;gap:0}
  .mk-col{margin-top:22px}
  .mk-col:first-child{margin-top:0}
  .mk-prof{grid-template-columns:1fr;gap:0}
}

/* ── 모바일 ──
   인물을 키비주얼 안에 두면 글자와 겹칩니다. 키비주얼 아래로 내립니다. */
@media(max-width:720px){
  .mk-kv-photo{position:static;width:min(66%,260px);margin:-14% auto 0;
    padding-bottom:26px}
  .mk-kv-photo::before{inset:-10px -10px 38px 20px}
  .mk-kv-photo img{padding:6px}
  .mk-says{grid-template-columns:1fr;gap:0}
  .mk-steps li{grid-template-columns:1fr;gap:6px;padding:18px 0}
  .mk-prow{grid-template-columns:54px minmax(0,1fr);gap:14px;padding:14px 0}
  .mk-prow li{font-size:14px}
  .mk-facts{grid-template-columns:1fr;gap:0}
  .mk-acts .wt-btn{flex:1 1 100%}
}
`;
