// ═══════════════════════════════════════════════════════════
//  수학 특강 — 강필 선생님 페이지 스타일
//
//  인트로(히어로)는 전달받은 8번 시안 그대로입니다 —
//  딥네이비 바탕 + 샴페인 골드 포인트 + 오른쪽 사진 액자(골드 오프셋 프레임).
//  사이트의 딥네이비 섹션 톤과 같은 계열이라 그대로 이어집니다.
//
//  아래 본문은 "흰 종이 + 가는 괘선 + 여백" 의 에디토리얼 구성입니다.
//  카드 남발·둥근 박스·그림자는 쓰지 않습니다.
//  globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const kangpilStyles = `
.kp{
  --kp-navy:#24375C; --kp-deep:#141F38; --kp-ink2:#1B2946;
  --kp-gold:#B89555; --kp-gold-l:#E0C691;
  --kp-warm:#FAF9F6; --kp-line:#E7E9EE; --kp-mut:#747D8C; --kp-ink:#1B2130;
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  background:#fff;color:var(--kp-ink);letter-spacing:-.02em;overflow-x:clip
}
.kp-wrap{max-width:1120px;margin:0 auto;padding:0 24px}

/* ══════════ 인트로 (8번 시안) ══════════ */
.kp-kv{position:relative;overflow:hidden;
  background:
    radial-gradient(120% 90% at 16% 8%, rgba(96,128,190,.22) 0%, rgba(96,128,190,0) 58%),
    radial-gradient(90% 80% at 92% 96%, rgba(184,149,85,.13) 0%, rgba(184,149,85,0) 62%),
    linear-gradient(135deg,#1E2E52 0%,#15223E 52%,#0F1A30 100%);
  color:#fff}
.kp-kv-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,36%);
  gap:clamp(28px,4vw,64px);align-items:center;
  max-width:1160px;margin:0 auto;
  padding:clamp(118px,12vw,168px) 24px clamp(52px,6vw,78px)}

.kp-kv-label{display:flex;align-items:center;gap:12px;margin:0 0 clamp(14px,1.8vw,20px);
  font-size:clamp(10.5px,1.1vw,12px);font-weight:700;letter-spacing:.26em;
  color:var(--kp-gold-l)}
.kp-kv-label i{flex:0 0 26px;height:1px;background:currentColor;opacity:.55;font-style:normal}
.kp-kv-name{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(58px,9.4vw,124px);font-weight:900;line-height:.98;
  letter-spacing:-.05em;color:#fff}
.kp-kv-rule{height:1px;margin:clamp(18px,2.4vw,30px) 0 clamp(20px,2.6vw,30px);
  background:linear-gradient(90deg,var(--kp-gold) 0%,rgba(184,149,85,.25) 72%,transparent 100%)}
.kp-kv-tag{margin:0;font-size:clamp(17px,2.2vw,27px);font-weight:800;
  line-height:1.5;letter-spacing:-.035em}
.kp-kv-tag em{display:block;font-style:normal;color:var(--kp-gold-l)}
.kp-kv-sub{margin:clamp(14px,1.8vw,20px) 0 0;
  font-size:clamp(12.5px,1.3vw,14.5px);line-height:1.85;
  color:rgba(255,255,255,.56);word-break:keep-all}

.kp-kv-cols{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,3vw,46px);
  margin-top:clamp(26px,3.4vw,42px)}
.kp-kv-col h2{margin:0 0 11px;font-size:12.5px;font-weight:800;letter-spacing:.02em;
  color:var(--kp-gold)}
.kp-kv-col ul{margin:0;padding:0;list-style:none}
.kp-kv-col li{font-size:clamp(12.5px,1.25vw,14px);line-height:1.95;
  color:rgba(255,255,255,.8);word-break:keep-all}

.kp-kv-foot{display:flex;align-items:center;gap:14px;
  margin:clamp(26px,3.4vw,40px) 0 0;padding-top:clamp(18px,2.2vw,24px);
  border-top:1px solid rgba(255,255,255,.12)}
.kp-kv-foot img{height:30px;width:auto;display:block;opacity:.95}
.kp-kv-foot span{font-size:clamp(11.5px,1.2vw,13.5px);font-weight:600;
  color:rgba(255,255,255,.62);word-break:keep-all}

/* 사진 액자 — 뒤로 비켜 선 골드 프레임 */
.kp-kv-photo{position:relative;align-self:center}
.kp-kv-photo::before{content:"";position:absolute;z-index:0;
  right:-14px;top:-14px;bottom:26px;left:34px;
  border:2px solid rgba(184,149,85,.75)}
.kp-kv-photo img{position:relative;z-index:1;display:block;width:100%;height:auto;
  background:#fff;padding:9px;
  box-shadow:0 34px 70px -38px rgba(0,0,0,.75)}

/* ══════════ 본문 공통 ══════════ */
.kp-sec{padding:clamp(60px,7.6vw,118px) 0}
.kp-sec.is-warm{background:var(--kp-warm)}
.kp-sec.is-deep{background:linear-gradient(165deg,#1C2B4A,var(--kp-deep));color:#fff}
.kp-eyebrow{display:flex;align-items:center;gap:11px;margin:0 0 15px;
  font-size:10.5px;font-weight:700;letter-spacing:.22em;color:var(--kp-gold)}
.kp-eyebrow::after{content:"";flex:0 0 20px;height:1px;background:currentColor;opacity:.5}
.kp-h2{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(25px,3.3vw,42px);font-weight:700;
  letter-spacing:-.045em;line-height:1.34;color:var(--kp-deep)}
.is-deep .kp-h2{color:#fff}
.kp-lead{margin:clamp(16px,2vw,22px) 0 0;font-size:clamp(14px,1.45vw,16px);
  line-height:1.9;color:var(--kp-mut);word-break:keep-all;max-width:58ch}
.is-deep .kp-lead{color:rgba(255,255,255,.6)}

/* ── 프로필 ── */
.kp-profile{margin:clamp(30px,3.6vw,46px) 0 0;
  display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0 clamp(32px,5vw,80px)}
.kp-prow{display:grid;grid-template-columns:62px minmax(0,1fr);gap:18px;
  padding:17px 0;border-top:1px solid var(--kp-line)}
.kp-prow dt{font-size:11.5px;font-weight:800;letter-spacing:.1em;color:var(--kp-gold);
  padding-top:3px}
.kp-prow dd{margin:0}
.kp-prow ul{margin:0;padding:0}
.kp-prow li{list-style:none;font-size:14.5px;line-height:1.85;color:#3F4756;
  word-break:keep-all}

/* ── 별칭 ── */
.kp-nick{text-align:center}
.kp-nick .kp-eyebrow{justify-content:center;color:var(--kp-gold-l)}
.kp-nick .kp-eyebrow::after{display:none}
.kp-nick h2{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(32px,5.2vw,64px);font-weight:900;letter-spacing:-.05em;
  line-height:1.18;color:#fff}
.kp-nick .kp-lead{margin-left:auto;margin-right:auto;text-align:center}

/* ── 철학 ── */
.kp-quote{margin:clamp(24px,3vw,38px) 0 0;padding-left:clamp(20px,2.6vw,38px);
  border-left:1px solid var(--kp-gold)}
.kp-quote p{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(23px,3.4vw,42px);font-weight:600;line-height:1.46;
  letter-spacing:-.045em;color:var(--kp-deep)}

/* ── 세 가지 원칙 ── */
.kp-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:0 clamp(24px,3.4vw,56px);margin-top:clamp(34px,4vw,56px)}
.kp-card{padding-top:20px;border-top:1px solid var(--kp-deep)}
.kp-card-no{display:block;margin-bottom:14px;font-size:11.5px;font-weight:800;
  letter-spacing:.18em;color:var(--kp-gold)}
.kp-card h3{margin:0 0 13px;font-size:clamp(17px,1.85vw,21px);font-weight:800;
  letter-spacing:-.035em;line-height:1.42;color:var(--kp-deep)}
.kp-card h3 span{display:block}
.kp-card p{margin:0;font-size:13.5px;line-height:1.9;color:var(--kp-mut);
  word-break:keep-all}

/* ── 발견적 과정 ── */
.kp-steps{margin:clamp(30px,3.6vw,46px) 0 0;padding:0;list-style:none}
.kp-steps li{display:grid;grid-template-columns:150px minmax(0,1fr);
  gap:clamp(16px,2.6vw,38px);align-items:baseline;
  padding:clamp(20px,2.5vw,30px) 0;border-top:1px solid var(--kp-line)}
.kp-steps li:last-child{border-bottom:1px solid var(--kp-line)}
.kp-steps b{font-family:"Noto Serif KR",serif;
  font-size:clamp(18px,2vw,24px);font-weight:700;letter-spacing:-.04em;
  color:var(--kp-navy)}
.kp-steps span{font-size:14.5px;line-height:1.9;color:var(--kp-mut);word-break:keep-all}

/* ── 어록 ── */
.kp-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0 clamp(26px,4vw,64px);margin-top:clamp(32px,4vw,52px)}
.kp-say{padding:clamp(22px,2.6vw,30px) 0;border-top:1px solid rgba(255,255,255,.14)}
.kp-say b{display:block;margin-bottom:10px;font-family:"Noto Serif KR",serif;
  font-size:clamp(18px,2vw,25px);font-weight:700;letter-spacing:-.04em;
  color:var(--kp-gold-l)}
.kp-say span{font-size:13.5px;line-height:1.85;color:rgba(255,255,255,.58);
  word-break:keep-all}

/* ── 수놀음 ── */
.kp-since{display:inline-block;margin-left:12px;vertical-align:middle;
  font-family:"Pretendard Variable",Pretendard,sans-serif;
  font-size:11.5px;font-weight:800;letter-spacing:.12em;color:var(--kp-gold)}
.kp-sn{margin:clamp(32px,4vw,52px) 0 0;padding:0;list-style:none;
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:0 clamp(24px,3.4vw,56px)}
.kp-sn li{padding-top:19px;border-top:1px solid var(--kp-deep)}
.kp-sn b{display:block;margin-bottom:11px;font-size:15.5px;font-weight:800;
  letter-spacing:-.03em;color:var(--kp-deep)}
.kp-sn span{font-size:13.5px;line-height:1.9;color:var(--kp-mut);word-break:keep-all}

/* ── 수강 안내 ── */
.kp-cta h2{margin:0 0 clamp(30px,3.6vw,46px);font-family:"Noto Serif KR",serif;
  font-size:clamp(28px,4.2vw,52px);font-weight:900;line-height:1.26;
  letter-spacing:-.05em;color:#fff}
.kp-cta h2 span{display:block}
.kp-facts{margin:0;padding:0;display:grid;
  grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
  gap:0 clamp(22px,3vw,46px)}
.kp-fact{padding:19px 0;border-top:1px solid rgba(255,255,255,.18)}
.kp-fact dt{margin-bottom:9px;font-size:10.5px;font-weight:700;
  letter-spacing:.2em;color:var(--kp-gold)}
.kp-fact dd{margin:0;font-size:14.5px;font-weight:700;line-height:1.7;color:#fff;
  word-break:keep-all}
.kp-fact dd.is-soon{color:rgba(255,255,255,.4);font-weight:600}
.kp-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:clamp(30px,3.4vw,42px)}
.kp-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 30px;
  text-decoration:none;font-size:14.5px;font-weight:800;letter-spacing:-.02em;
  background:var(--kp-gold);color:#141F38;
  transition:background .2s ease,transform .2s ease}
.kp-btn:hover{background:var(--kp-gold-l);transform:translateY(-1px)}
.kp-btn.is-ghost{background:transparent;color:#fff;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.kp-btn.is-ghost:hover{background:rgba(255,255,255,.07)}

.kp-draft{max-width:1120px;margin:0 auto;padding:20px 24px 70px;
  font-size:12px;line-height:1.95;color:#9AA1AE}
.kp-draft b{color:var(--kp-navy)}

/* ── 스크롤 진입 ── */
.kp-up{opacity:0;transform:translateY(16px);
  transition:opacity .75s ease,transform .75s cubic-bezier(.22,.7,.3,1)}
.kp-up.is-in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  .kp-up{opacity:1;transform:none;transition:none}
  .kp-btn{transition:none}
}

/* ══════════ 태블릿 ══════════ */
@media(max-width:980px){
  .kp-kv-in{grid-template-columns:minmax(0,1fr) minmax(0,34%);
    gap:clamp(20px,3vw,36px)}
  .kp-grid3{grid-template-columns:1fr;gap:0}
  .kp-card{margin-top:22px}
  .kp-card:first-child{margin-top:0}
  .kp-sn{grid-template-columns:1fr;gap:0}
  .kp-sn li{margin-top:20px}
  .kp-sn li:first-child{margin-top:0}
  .kp-profile{grid-template-columns:1fr;gap:0}
}

/* ══════════ 모바일 ══════════ */
@media(max-width:680px){
  .kp-wrap{padding:0 20px}
  /* 인트로: 사진이 먼저, 글이 아래 */
  .kp-kv-in{display:flex;flex-direction:column;gap:0;
    padding:clamp(96px,22vw,116px) 20px 44px}
  .kp-kv-photo{order:-1;width:min(74%,290px);margin:0 auto clamp(26px,6vw,36px)}
  .kp-kv-photo::before{right:-10px;top:-10px;bottom:18px;left:24px}
  .kp-kv-photo img{padding:7px}
  .kp-kv-name{font-size:clamp(52px,16vw,68px)}
  .kp-kv-tag{font-size:clamp(17px,4.6vw,21px)}
  .kp-kv-cols{grid-template-columns:1fr;gap:20px}
  .kp-kv-foot{flex-wrap:wrap;gap:10px}
  .kp-kv-foot img{height:26px}

  .kp-grid2{grid-template-columns:1fr;gap:0}
  .kp-steps li{grid-template-columns:1fr;gap:7px;padding:19px 0}
  .kp-prow{grid-template-columns:54px minmax(0,1fr);gap:14px;padding:15px 0}
  .kp-prow li{font-size:14px}
  .kp-facts{grid-template-columns:1fr;gap:0}
  .kp-acts .kp-btn{flex:1 1 100%;justify-content:center}
}
`;
