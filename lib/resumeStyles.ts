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

/* ── 상단 이력서 카드 ──
   배경·테두리는 기존 강사 상세페이지 카드(.td-profile-anim)와 똑같이 씁니다.
   다만 인물이 왼쪽에 서므로, 흰 빛 번짐만 좌우로 뒤집었습니다(78% → 22%). */
.rs-hero{
  position:relative;display:grid;align-items:stretch;
  grid-template-columns:minmax(0,46%) minmax(0,1fr);
  margin:clamp(18px,3vw,34px) 0 0;
  overflow:hidden;border:1px solid var(--dn-line);border-radius:24px;
  background:radial-gradient(120% 86% at 22% 104%,#fff 0%,rgba(255,255,255,0) 58%),
             linear-gradient(135deg,#FCFBF8,#EDF1F7)}

/* 인물 칸 */
.rs-figure{position:relative;min-height:clamp(430px,46vw,610px)}
/* 발밑 그림자 — 인물이 바닥에 서 있는 느낌 (기존 카드와 같은 값) */
.rs-figure::after{content:"";position:absolute;z-index:0;
  left:50%;bottom:-16px;width:56%;height:52px;translate:-50% 0;
  background:radial-gradient(50% 50% at 50% 50%,rgba(36,54,90,.16),rgba(36,54,90,0) 70%);
  pointer-events:none}
/* 인물 배율 — 발이 바닥에 붙은 채로 커지도록 기준점을 아래 가운데에 둡니다 */
.rs-figure .hx-stage{right:auto;left:50%;z-index:1;
  transform-origin:center bottom;
  transform:translateX(-50%) scale(var(--rs-zoom,1))}

/* 글 칸 */
.rs-info{position:relative;z-index:2;display:flex;flex-direction:column;
  padding:clamp(38px,5vw,58px) clamp(40px,4.6vw,62px) clamp(38px,5vw,58px) clamp(10px,1.8vw,24px)}
.rs-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:clamp(20px,2.6vw,30px)}
.rs-tags span{display:inline-flex;padding:6px 11px;
  border:1px solid rgba(36,54,90,.13);border-radius:4px;background:rgba(255,255,255,.7);
  font-size:11.5px;font-weight:700;color:#6D7788}
.rs-subject{margin:0 0 6px;font-size:16px;font-weight:800;letter-spacing:.02em;color:var(--rs-gold)}
.rs-name{margin:0;font-family:"Noto Serif KR",serif;
  font-size:clamp(32px,3.9vw,50px);font-weight:900;letter-spacing:-.04em;line-height:1.12;
  color:var(--dn-deep)}
.rs-name small{margin-left:9px;font-family:"Pretendard Variable",Pretendard,sans-serif;
  font-size:.4em;font-weight:700;letter-spacing:-.02em;color:#8A8F98}
.rs-school{margin:14px 0 0;font-size:clamp(15px,1.35vw,17.5px);font-weight:600;line-height:1.6;
  color:var(--dn-ink);word-break:keep-all}
.rs-slogan{margin:16px 0 0;font-family:"Noto Serif KR",serif;
  font-size:clamp(19px,1.9vw,25px);font-weight:700;line-height:1.5;
  color:var(--dn-navy);word-break:keep-all}
.rs-rule{width:64px;height:2px;margin:auto 0 22px;background:var(--rs-gold)}

/* 학력 · 약력 두 칸 */
.rs-cols{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,2.4vw,32px)}
/* 학력이 없는 선생님은 약력 한 칸이 전체 폭을 씁니다 */
.rs-col:only-child{grid-column:1 / -1}
.rs-col:only-child ul{columns:2;column-gap:28px}
.rs-col:only-child li{break-inside:avoid}
.rs-col h3{margin:0 0 11px;padding-bottom:9px;border-bottom:1px solid var(--dn-line);
  font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--rs-gold)}
.rs-col ul{margin:0;padding:0;list-style:none}
.rs-col li{position:relative;padding:3px 0 3px 13px;
  font-size:clamp(14px,1.2vw,16px);line-height:1.9;color:#5F6672;word-break:keep-all}
.rs-col li::before{content:"·";position:absolute;left:0;font-weight:900;color:var(--rs-gold)}
.rs-col li.is-past{color:#9AA1AC}
.rs-col li.is-past::before{color:#C7CCD6}
.rs-col-div{margin:11px 0 1px;font-size:10px;font-weight:800;
  letter-spacing:.14em;color:#A8AEBA}

/* 버튼 — 기존 카드의 '소개 영상 보기' 와 같은 모양 */
.rs-link{display:inline-flex;align-items:center;gap:7px;align-self:flex-start;
  margin-top:18px;padding:10px 16px;border-radius:999px;
  border:1px solid var(--dn-line);background:#fff;
  font-size:12.5px;font-weight:800;color:var(--dn-navy);text-decoration:none;
  transition:border-color .2s ease,transform .2s ease}
.rs-link:hover{border-color:#c0994f66;transform:translateY(-1px)}
.rs-link-note{margin:9px 0 0;font-size:11.5px;line-height:1.6;color:#9AA1AC;word-break:keep-all}
.rs-link-note b{color:var(--dn-navy);font-weight:800}

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
  .rs-hero{display:flex;flex-direction:column;border-radius:20px;margin-top:14px;
    background:radial-gradient(120% 60% at 50% 34%,#fff 0%,rgba(255,255,255,0) 62%),
               linear-gradient(135deg,#FCFBF8,#EDF1F7)}
  /* 인물이 허공에 뜨지 않도록, 카드 안에 액자를 한 겹 더 두고 그 안에 세웁니다 */
  .rs-figure{order:-1;min-height:min(86vw,380px);
    margin:18px 18px 0;overflow:hidden;
    border:1px solid var(--dn-line);border-radius:18px;
    background:linear-gradient(168deg,#FFFFFF 0%,#F4F7FC 62%,#E9EEF6 100%);
    box-shadow:inset 0 -26px 44px -30px rgba(36,54,90,.3),
               inset 0 1px 0 rgba(255,255,255,.9)}
  /* 액자 바닥에 깔리는 그림자 — 발이 바닥에 닿아 보이게 */
  .rs-figure::after{width:56%;height:30px;bottom:-4px;
    background:radial-gradient(50% 50% at 50% 50%,rgba(36,54,90,.22),rgba(36,54,90,0) 70%)}
  /* 액자 아래 ↔ 태그 ↔ 과목 간격을 같게 맞춥니다 */
  .rs-info{padding:16px 22px 28px}
  .rs-tags{margin-bottom:16px}
  .rs-rule{margin:18px 0}
  .rs-name{font-size:clamp(28px,8vw,38px)}
  .rs-name small{font-size:.4em}
  .rs-slogan{font-size:16px}
  .rs-cols{margin-top:0}
  .rs-col li{font-size:13px}
  .rs-col:only-child ul{columns:1}
  .rs-link{margin-top:18px}
}
`;
