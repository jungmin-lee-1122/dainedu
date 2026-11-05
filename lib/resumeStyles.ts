// ═══════════════════════════════════════════════════════════
//  강사 프로필 "이력서형" 상단 — 테스트 전용 스타일
//
//  왼쪽에 인물 애니메이션을 크게 세우고, 오른쪽에 학력·약력을 세웁니다.
//  그 아래로 연간 계획서 다섯 칸이 이어집니다.
//
//  ※ globals.css 는 건드리지 않습니다.
//    인물 세우는 .hx-* 만 기존 것을 그대로 빌려 씁니다
//    (얼굴 크기·눈높이 보정이 그 안에 들어 있어서 다시 만들면 어긋납니다).
// ═══════════════════════════════════════════════════════════
export const resumeStyles = `
.rs{
  --rs-navy:#24365A; --rs-deep:#0C1426; --rs-gold:#C0994F; --rs-gold-l:#E7CE9A;
  --rs-line:#E4E8EF; --rs-mut:#6B7384;
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  background:#fff;color:#1B2130;letter-spacing:-.02em;overflow-x:clip
}
.rs-wrap{max-width:1180px;margin:0 auto;padding:0 24px}

/* ── 상단 이력서 카드 ── */
.rs-hero{
  position:relative;display:grid;align-items:stretch;
  grid-template-columns:minmax(0,46%) minmax(0,1fr);
  margin:clamp(18px,3vw,34px) 0 0;
  overflow:hidden;border-radius:26px;
  background:
    radial-gradient(90% 80% at 22% 100%, rgba(192,153,79,.17) 0%, rgba(192,153,79,0) 62%),
    linear-gradient(132deg, #16233E 0%, #0C1426 54%, #1A2B4D 100%);
  box-shadow:0 44px 90px -56px rgba(8,13,26,.9), inset 0 1px 0 rgba(255,255,255,.07)}
/* 위쪽에 걸린 금색 실선 한 줄 */
.rs-hero::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;z-index:5;
  background:linear-gradient(90deg,transparent,rgba(231,206,154,.6) 28%,rgba(231,206,154,.6) 72%,transparent)}

/* 인물 칸 */
.rs-figure{position:relative;min-height:clamp(420px,42vw,580px)}
/* 바닥의 은은한 빛 — 인물이 공중에 뜨지 않도록 그림자 대신 빛을 깝니다 */
.rs-figure::after{content:"";position:absolute;z-index:0;left:50%;bottom:4%;
  width:74%;height:52px;transform:translateX(-50%);
  background:radial-gradient(closest-side,rgba(192,153,79,.3),rgba(192,153,79,0) 72%);
  filter:blur(2px)}
.rs-figure .hx-stage{right:auto;left:50%;transform:translateX(-50%);z-index:1}

/* 글 칸 */
.rs-info{position:relative;z-index:2;display:flex;flex-direction:column;
  padding:clamp(30px,3.4vw,46px) clamp(26px,3.4vw,46px) clamp(30px,3.4vw,44px) clamp(8px,1.6vw,20px)}
.rs-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.rs-tags span{padding:5px 11px;border-radius:6px;
  border:1px solid rgba(231,206,154,.3);background:rgba(231,206,154,.08);
  font-size:11.5px;font-weight:700;color:var(--rs-gold-l)}
.rs-subject{margin:0 0 7px;font-size:13px;font-weight:800;letter-spacing:.14em;color:var(--rs-gold)}
.rs-name{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(34px,4.2vw,54px);font-weight:900;letter-spacing:-.04em;line-height:1.1;color:#fff}
.rs-name small{margin-left:9px;font-family:inherit;font-size:.38em;font-weight:600;
  letter-spacing:-.01em;color:rgba(255,255,255,.5)}
.rs-school{margin:13px 0 0;font-family:"Noto Serif KR",serif;
  font-size:clamp(14px,1.3vw,16.5px);font-weight:600;line-height:1.6;
  color:rgba(255,255,255,.62);word-break:keep-all}
.rs-slogan{margin:16px 0 0;font-size:clamp(16px,1.6vw,21px);font-weight:700;
  line-height:1.55;color:var(--rs-gold-l);word-break:keep-all}
.rs-rule{width:56px;height:2px;margin:clamp(20px,2.4vw,30px) 0;
  background:linear-gradient(90deg,var(--rs-gold),rgba(192,153,79,0))}

/* 학력 · 약력 두 칸 */
.rs-cols{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,2.4vw,32px);margin-top:auto}
 /* 학력이 없는 선생님은 약력 한 칸이 전체 폭을 씁니다 */
.rs-col:only-child{grid-column:1 / -1}
.rs-col:only-child ul{columns:2;column-gap:28px}
.rs-col:only-child li{break-inside:avoid}
.rs-col h3{margin:0 0 11px;padding-bottom:9px;
  border-bottom:1px solid rgba(255,255,255,.12);
  font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--rs-gold)}
.rs-col ul{margin:0;padding:0;list-style:none}
.rs-col li{position:relative;padding:4px 0 4px 12px;
  font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.84);word-break:keep-all}
.rs-col li::before{content:"";position:absolute;left:0;top:13px;
  width:3px;height:3px;border-radius:50%;background:var(--rs-gold)}
.rs-col li.is-past{color:rgba(255,255,255,.44)}
.rs-col li.is-past::before{background:rgba(255,255,255,.3)}
.rs-col-div{margin:11px 0 1px;font-size:10px;font-weight:800;
  letter-spacing:.14em;color:rgba(255,255,255,.34)}

.rs-link{display:inline-flex;align-items:center;gap:7px;align-self:flex-start;
  margin-top:22px;padding:10px 17px;border-radius:999px;
  border:1px solid rgba(231,206,154,.34);background:rgba(255,255,255,.04);
  font-size:12.5px;font-weight:700;color:var(--rs-gold-l);text-decoration:none;
  transition:background .2s ease,border-color .2s ease}
.rs-link:hover{background:rgba(231,206,154,.12);border-color:rgba(231,206,154,.6)}

/* ── 아래 연간 계획서 ── */
.rs-plan{padding:clamp(34px,4vw,58px) 0 0}
.rs-foot{padding:26px 0 72px;font-size:12px;line-height:1.9;color:#9399A6}
.rs-foot b{color:var(--rs-navy)}

/* 선생님 바꾸기 탭 */
.rs-tabs{display:inline-flex;gap:3px;margin:clamp(16px,2.4vw,26px) 0 0;
  padding:4px;border-radius:12px;background:rgba(36,54,90,.06)}
.rs-tab{padding:9px 18px;border-radius:9px;text-decoration:none;
  font-size:13px;font-weight:700;color:var(--rs-mut);transition:background .2s ease,color .2s ease}
.rs-tab:hover{color:var(--rs-navy)}
.rs-tab.is-on{background:var(--rs-navy);color:#fff;box-shadow:0 4px 12px -6px rgba(16,25,46,.7)}

/* ── 태블릿 ── */
@media(max-width:1000px){
  .rs-hero{grid-template-columns:minmax(0,42%) minmax(0,1fr)}
  .rs-figure{min-height:clamp(380px,46vw,480px)}
  .rs-cols{grid-template-columns:1fr;gap:16px}
}

/* ── 모바일 — 인물이 위, 글이 아래 ── */
@media(max-width:720px){
  .rs-wrap{padding:0 18px}
  .rs-hero{display:flex;flex-direction:column;border-radius:20px;margin-top:14px}
  .rs-figure{order:-1;min-height:min(92vw,400px)}
  .rs-figure::after{width:62%;height:36px;bottom:2%}
  .rs-info{padding:0 22px 28px;margin-top:-14px}
  .rs-name{font-size:clamp(28px,8vw,38px)}
  .rs-name small{font-size:.4em}
  .rs-slogan{font-size:16px}
  .rs-rule{margin:18px 0}
  .rs-cols{margin-top:0}
  .rs-col li{font-size:13px}
  .rs-col:only-child ul{columns:1}
  .rs-link{margin-top:18px}
}
`;
