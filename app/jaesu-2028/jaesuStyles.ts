// ═══════════════════════════════════════════════════════════
//  2028 재수선행반 (/jaesu-2028) — 스타일
//
//  윈터스쿨(/winter) · PRE 윈터스쿨(/pre-winter) 과 같은 색·둥글기·카드·버튼
//  으로 맞췄습니다. (색 이름 --w-* 도 윈터스쿨과 같은 값입니다)
//  글과 구성은 전달받은 시안 그대로이고, 모양만 우리 톤입니다.
//  맨 아래 "움직임" 이후가 애니메이션입니다. globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const jaesuStyles = `
/* ── 바탕값 — 윈터스쿨(/winter) · PRE 윈터스쿨과 같은 색·글꼴·둥글기 ── */
.jp{
  --w-deep:#080D1A; --w-navy:#111C36; --w-navy2:#18274A;
  --w-ice:#7FB4FF; --w-gold:#C0994F; --w-gold-l:#E4CD9A; --w-gold-d:#8A6A25;
  --w-soft:#F4F6FA; --w-ink:#14192B; --w-mut:#6B7488;
  --ease:cubic-bezier(.22,1,.36,1);
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  background:#fff;color:var(--w-ink);font-size:15px;line-height:1.7;letter-spacing:-.02em;word-break:keep-all}
.jp *{box-sizing:border-box}
:where(.jp) a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}
:where(.jp) button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
:where(.jp) button:focus-visible,:where(.jp) a:focus-visible,:where(.jp) summary:focus-visible{outline:3px solid var(--w-gold);outline-offset:4px}
:where(.jp) img{display:block;max-width:100%}
:where(.jp) h1,:where(.jp) h2,:where(.jp) h3,:where(.jp) p{margin:0}
:where(.jp) small{font-size:12.5px}
.jp ::selection{background:var(--w-gold-l);color:var(--w-navy)}
.jp [hidden]{display:none!important}
.jp section[id]{scroll-margin-top:96px}

.jp-wrap{width:min(1160px,calc(100% - 48px));margin:0 auto}
.jp-section{padding:clamp(70px,8vw,120px) 0}
/* 꼬리표(작은 영문) — 알약 모양 */
.jp-eyebrow{display:inline-block;margin:0 0 16px;padding:6px 14px;border-radius:999px;
  background:rgba(17,28,54,.07);color:var(--w-navy);font-size:12px;font-weight:800;letter-spacing:.04em}
:where(.jp) h2{font-size:clamp(26px,3.6vw,44px);font-weight:800;line-height:1.32;letter-spacing:-.035em;color:var(--w-ink)}
:where(.jp) h2 em{font-style:normal;color:var(--w-gold)}
:where(.jp) h3{font-size:20px;font-weight:900;line-height:1.45;letter-spacing:-.035em;color:var(--w-navy)}
.jp-sub{margin-top:18px;font-size:15px;line-height:1.85;color:var(--w-mut)}
.jp-fine{font-size:12px;line-height:1.75;color:#9AA1B0}
.jp-section-head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:clamp(30px,3.6vw,46px)}
.jp-section-head .jp-sub{max-width:400px;margin:0}

/* 버튼 — 알약 + 금색 */
.jp-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:16px 30px;border-radius:999px;
  font-size:15px;font-weight:800;letter-spacing:-.02em;color:#101A2E;
  background:linear-gradient(135deg,#E4CD9A,var(--w-gold) 55%,#A87F38);
  transition:transform .2s ease,box-shadow .2s ease,background .2s ease}
.jp-button:hover{transform:translateY(-2px);box-shadow:0 14px 30px -14px rgba(192,153,79,.8)}
.jp-button.jp-line,.jp-button.jp-light-line{background:transparent;border:1px solid rgba(255,255,255,.5);color:#fff}
.jp-button.jp-line:hover,.jp-button.jp-light-line:hover{background:rgba(255,255,255,.12);box-shadow:none}

/* ══ 첫 화면 ══ */
.jp-hero{position:relative;overflow:hidden;display:flex;align-items:center;color:#fff;
  min-height:clamp(500px,44vw,620px);
  background:radial-gradient(120% 140% at 88% 12%,rgba(192,153,79,.22),transparent 55%),linear-gradient(115deg,#0A1122 0%,#152A4E 100%)}
.jp-hero-photo{position:absolute;right:0;top:0;width:62%;height:100%;object-fit:cover;object-position:60% center;
  filter:saturate(.95) brightness(.86);
  -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 34%);mask-image:linear-gradient(90deg,transparent 0,#000 34%)}
.jp-hero::before{content:"";position:absolute;inset:0;z-index:1;opacity:.5;pointer-events:none;
  background:repeating-linear-gradient(115deg,rgba(255,255,255,.035) 0 2px,transparent 2px 16px)}
.jp-hero::after{content:"";position:absolute;inset:0;z-index:1;
  background:linear-gradient(100deg,#0A1122 0%,rgba(10,17,34,.96) 32%,rgba(10,17,34,.6) 60%,rgba(10,17,34,.16) 100%)}
.jp-hero-grid{position:relative;z-index:2;padding:clamp(52px,6vw,84px) 0 calc(clamp(52px,6vw,84px) + 24px)}
.jp-hero-copy{max-width:min(700px,66%)}
.jp-hero .jp-eyebrow{display:block;padding:0;border-radius:0;background:none;margin:0 0 20px;
  font-size:clamp(12px,1.25vw,15px);font-weight:800;letter-spacing:.24em;color:var(--w-gold-l)}
.jp-hero-product{display:inline-block;margin-bottom:20px;padding:8px 18px;border-radius:999px;
  border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.06);font-size:13.5px;font-weight:700;color:#fff}
.jp-hero h1{font-size:clamp(30px,4.4vw,56px);font-weight:900;line-height:1.26;letter-spacing:-.04em;color:#fff}
.jp-hero h1 em{font-style:normal;background:linear-gradient(100deg,#fff 5%,var(--w-gold-l) 50%,var(--w-gold));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.jp-hero .jp-lead{margin-top:22px;font-size:clamp(14px,1.5vw,18px);line-height:1.7;color:rgba(255,255,255,.76)}
.jp-hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:30px}
.jp-hero .jp-edition{position:absolute;right:0;top:clamp(30px,4vw,56px);z-index:-1;
  font-size:clamp(80px,11vw,150px);font-weight:200;line-height:1;letter-spacing:-.06em;color:rgba(228,205,154,.2)}
.jp-hero-location{position:absolute;right:0;bottom:58px;text-align:right;font-size:12.5px;color:rgba(255,255,255,.62)}
.jp-hero-location span{display:block;font-size:10.5px;letter-spacing:.2em;color:rgba(255,255,255,.4)}
/* 첫 화면 아래 숫자 세 칸 — 유리 카드 */
.jp-hero-baseline{background:#0A1122;padding:0 0 26px}
.jp-baseline-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:-34px;position:relative;z-index:3}
.jp-baseline-grid>div{display:flex;align-items:center;gap:18px;padding:22px 26px;border-radius:18px;
  background:linear-gradient(160deg,rgba(32,48,84,.94),rgba(17,28,54,.94));
  border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 44px -28px rgba(0,0,0,.8);backdrop-filter:blur(8px);
  transition:transform .3s ease,border-color .3s ease}
.jp-baseline-grid>div:hover{transform:translateY(-4px);border-color:rgba(192,153,79,.5)}
.jp-baseline-grid strong{flex:0 0 auto;font-size:clamp(26px,2.8vw,36px);font-weight:900;line-height:1.15;letter-spacing:-.04em;
  background:linear-gradient(180deg,#F4E6C4,var(--w-gold-l) 50%,var(--w-gold));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.jp-baseline-grid .jp-words{font-size:clamp(15px,1.5vw,19px);letter-spacing:-.03em}
.jp-baseline-grid span{font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.62)}

/* ══ 페이지 안 이동 띠 ══ */
.jp-secnav{background:#fff;border-bottom:1px solid #E8EBF1}
.jp-secnav-in{display:flex;align-items:center;gap:2px;overflow-x:auto;scrollbar-width:none;white-space:nowrap}
.jp-secnav-in::-webkit-scrollbar{display:none}
.jp-secnav-in a{flex:0 0 auto;padding:16px 15px;font-size:13.5px;font-weight:700;color:var(--w-mut);
  border-bottom:2px solid transparent;transition:color .2s ease,border-color .2s ease}
.jp-secnav-in a:hover{color:var(--w-navy);border-bottom-color:var(--w-gold)}
.jp-secnav-in .jp-secnav-cta{margin-left:auto;padding:10px 18px;border-radius:10px;border-bottom:0;
  background:linear-gradient(135deg,#E4CD9A,var(--w-gold));color:#101A2E;font-weight:800}
.jp-secnav-in .jp-secnav-cta:hover{filter:brightness(1.04);color:#101A2E}

/* ══ 2028 수능 ══ */
.jp-intro{padding:clamp(70px,8vw,120px) 0;background:#fff}
.jp-intro-grid{display:grid;grid-template-columns:1fr 1.12fr;gap:clamp(36px,5vw,70px);align-items:start}
.jp-intro-copy .jp-sub{max-width:420px}
.jp-change-list{display:grid;gap:14px}
.jp-change-item{position:relative;overflow:hidden;padding:28px 28px 26px;border-radius:18px;background:var(--w-soft);
  border:1px solid rgba(17,28,54,.07);box-shadow:0 14px 34px rgba(17,28,54,.045);
  transition:transform .3s ease,border-color .3s ease}
.jp-change-item:hover{transform:translateY(-4px);border-color:rgba(192,153,79,.45)}
.jp-change-item::before{content:"";position:absolute;left:28px;top:0;width:46px;height:2px;border-radius:0 0 2px 2px;
  background:linear-gradient(90deg,var(--w-gold),rgba(192,153,79,0));transition:width .35s ease}
.jp-change-item:hover::before{width:132px}
.jp-change-label{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:12px;font-weight:900;letter-spacing:.08em;color:var(--w-gold)}
.jp-change-label::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--w-gold);flex:0 0 auto}
.jp-change-item h3{font-size:clamp(18px,2.1vw,22px);margin-bottom:10px}
.jp-change-item p{font-size:13.5px;line-height:1.9;color:var(--w-mut)}
.jp-change-item .jp-subjects{display:block;margin-top:14px;padding:11px 14px;border-radius:10px;background:rgba(17,28,54,.045);
  font-size:12.5px;font-weight:700;line-height:1.8;color:var(--w-ink)}
.jp-policy-note{margin-top:18px;padding-left:14px;border-left:2px solid var(--w-gold-l)}
.jp-policy-note a{color:var(--w-gold-d);font-weight:700;text-decoration:underline;text-underline-offset:3px}

/* ══ 이음 문장 ══ */
.jp-bridge{position:relative;overflow:hidden;padding:clamp(56px,7vw,96px) 0;text-align:center;color:#fff;
  background:linear-gradient(180deg,var(--w-deep),var(--w-navy2))}
.jp-bridge::before,.jp-bridge::after{content:"";position:absolute;top:-30%;height:160%;width:1px;transform:rotate(35deg);
  background:linear-gradient(180deg,rgba(192,153,79,0),rgba(192,153,79,.5),rgba(192,153,79,0))}
.jp-bridge::before{left:15%}.jp-bridge::after{right:15%}
.jp-bridge p{margin-bottom:14px;font-size:13.5px;font-weight:700;letter-spacing:.06em;color:var(--w-ice)}
.jp-bridge h2{font-size:clamp(24px,3.4vw,40px);font-weight:900;line-height:1.4;color:#fff}
.jp-bridge h2 span{color:var(--w-gold-l)}

/* ══ 먼저 정리할 세 가지 ══ */
.jp-start{background:var(--w-soft)}
.jp-start-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:jpstart}
.jp-start-item{position:relative;counter-increment:jpstart;padding:32px 28px 28px;border-radius:18px;background:#fff;
  border:1px solid rgba(17,28,54,.07);box-shadow:0 14px 34px rgba(17,28,54,.045);
  transition:transform .3s ease,border-color .3s ease}
.jp-start-item:hover{transform:translateY(-4px);border-color:rgba(192,153,79,.45)}
.jp-start-item .jp-step{display:flex;align-items:center;gap:12px;margin-bottom:16px;font-size:12px;font-weight:900;letter-spacing:.06em;color:var(--w-gold)}
.jp-start-item .jp-step::before{content:counter(jpstart,decimal-leading-zero);font-size:30px;font-weight:900;line-height:1;
  letter-spacing:-.05em;color:rgba(17,28,54,.16)}
.jp-start-item h3{font-size:clamp(18px,2vw,21px);margin-bottom:12px}
.jp-start-item p{font-size:13.5px;line-height:1.9;color:var(--w-mut)}
.jp-start-item ul{list-style:none;margin:18px 0 0;padding:0;display:grid;gap:8px}
.jp-start-item li{display:flex;align-items:baseline;gap:8px;padding:10px 12px;border-radius:10px;background:rgba(17,28,54,.035);
  font-size:12.5px;font-weight:800;color:var(--w-ink)}
.jp-start-item li::before{content:"✓";flex:0 0 auto;font-size:11px;font-weight:900;color:var(--w-gold)}
.jp-start-bottom{display:flex;align-items:center;gap:22px;margin-top:16px;padding:24px 28px;border-radius:18px;
  background:linear-gradient(180deg,#FFFFFF,#F6F7FA);border:1px solid rgba(192,153,79,.4);box-shadow:0 18px 44px rgba(17,28,54,.05)}
.jp-start-bottom strong{flex:0 0 auto;font-size:15px;font-weight:900;color:var(--w-navy)}
.jp-start-bottom p{font-size:13.5px;line-height:1.8;color:var(--w-mut)}

/* ══ 과목별 학습 방향 ══ */
.jp-curriculum{background:#fff}
.jp-curriculum .jp-proposal-label{display:inline-block;margin-bottom:12px;padding:5px 13px;border-radius:999px;
  background:rgba(192,153,79,.16);color:var(--w-gold-d);font-size:11.5px;font-weight:800}
.jp-study-layout{display:grid;grid-template-columns:260px 1fr;min-height:340px;overflow:hidden;border-radius:20px;background:#fff;
  border:1px solid rgba(17,28,54,.1);box-shadow:0 14px 34px rgba(17,28,54,.06)}
.jp-subject-tabs{display:flex;flex-direction:column;gap:6px;padding:16px;background:var(--w-soft)}
.jp-subject-tabs button{display:flex;justify-content:space-between;align-items:center;border:0;background:transparent;
  padding:16px 18px;border-radius:12px;text-align:left;font-size:16px;font-weight:800;color:var(--w-navy);
  transition:background .25s ease,color .25s ease,transform .25s ease}
.jp-subject-tabs button small{font-size:10.5px;font-weight:800;letter-spacing:.1em;color:#9AA1B0}
.jp-subject-tabs button:hover:not([aria-selected=true]){background:rgba(17,28,54,.06)}
.jp-subject-tabs button[aria-selected=true]{background:linear-gradient(160deg,var(--w-navy2),var(--w-deep));color:#fff;
  box-shadow:0 12px 24px -14px rgba(8,13,26,.8)}
.jp-subject-tabs button[aria-selected=true] small{color:var(--w-gold-l)}
.jp-subject-panel{display:flex;flex-direction:column;justify-content:center;height:100%;padding:clamp(28px,3.4vw,44px) clamp(24px,3.6vw,48px)}
.jp-subject-panel .jp-range{margin-bottom:12px;font-size:12.5px;font-weight:800;letter-spacing:.02em;color:var(--w-gold)}
.jp-subject-panel h3{font-size:clamp(20px,2.3vw,27px);margin-bottom:16px}
.jp-subject-panel p{font-size:14.5px;line-height:1.9;color:var(--w-mut)}
.jp-focus-points{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px}
.jp-focus-points span{padding:7px 14px;border-radius:999px;background:rgba(17,28,54,.06);font-size:12.5px;font-weight:700;color:var(--w-navy)}
.jp-curriculum .jp-wrap>.jp-fine{margin-top:18px}

/* ══ 4대 밀착 케어 ══ */
.jp-management{background:var(--w-soft)}
.jp-management-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,4.6vw,60px);align-items:start}
.jp-management-intro .jp-sub{max-width:440px}
.jp-management-image{position:relative;overflow:hidden;margin:34px 0 0;border-radius:18px;line-height:0}
.jp-management-image img{width:100%;height:315px;object-fit:cover;transition:transform 1.2s var(--ease)}
.jp-management-image:hover img{transform:scale(1.05)}
.jp-management-image figcaption{position:absolute;left:0;right:0;bottom:0;padding:44px 22px 18px;line-height:1.5;
  font-size:13px;font-weight:700;color:#fff;background:linear-gradient(180deg,transparent,rgba(8,13,26,.9))}
.jp-care-accordion{display:grid;gap:12px;counter-reset:jpcare}
.jp-care-accordion details{counter-increment:jpcare;padding:22px 24px;border-radius:18px;
  background:linear-gradient(180deg,#FFFFFF,#F7F8FB);border:1px solid rgba(17,28,54,.09);box-shadow:0 14px 34px rgba(17,28,54,.045);
  transition:transform .3s ease,border-color .3s ease}
.jp-care-accordion details:hover{transform:translateY(-3px);border-color:rgba(192,153,79,.45)}
.jp-care-accordion summary{display:flex;align-items:center;gap:14px;cursor:pointer;list-style:none}
.jp-care-accordion summary::-webkit-details-marker{display:none}
.jp-care-accordion summary::before{content:counter(jpcare,decimal-leading-zero);flex:0 0 auto;font-size:30px;font-weight:900;
  line-height:1;letter-spacing:-.05em;color:rgba(17,28,54,.16)}
.jp-care-accordion summary>div{flex:1 1 auto;min-width:0}
.jp-care-accordion summary h3{font-size:18px;line-height:1.35}
.jp-care-accordion summary small{display:block;margin-top:4px;font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--w-gold)}
.jp-care-accordion summary::after{content:"+";flex:0 0 auto;display:flex;align-items:center;justify-content:center;
  width:32px;height:32px;border-radius:50%;border:1px solid #DCE0E9;background:#fff;font-size:19px;line-height:1;color:var(--w-gold);
  transition:transform .3s ease,background .25s ease,color .25s ease,border-color .25s ease}
.jp-care-accordion details[open] summary::after{transform:rotate(45deg);background:var(--w-navy);border-color:var(--w-navy);color:var(--w-gold-l)}
.jp-care-body{padding-top:16px}
.jp-care-body p{padding-bottom:14px;border-bottom:1px solid rgba(17,28,54,.1);font-size:13.5px;line-height:1.85;color:var(--w-mut)}
.jp-care-body ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0 0;padding:0}
.jp-care-body li{display:flex;align-items:baseline;gap:7px;padding:10px 12px;border-radius:10px;background:rgba(17,28,54,.035);
  font-size:12.5px;font-weight:800;color:var(--w-ink)}
.jp-care-body li::before{content:"✓";flex:0 0 auto;font-size:11px;font-weight:900;color:var(--w-gold)}
.jp-care-body .jp-fine{margin-top:12px;padding:0;border:0;font-size:12px;color:#9AA1B0}

/* ══ 하루 일과 ══ */
.jp-day{background:#fff}
.jp-day-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:clamp(36px,5vw,64px);align-items:start}
.jp-day-metric{margin-top:30px;padding:26px 28px;border-radius:18px;color:#fff;
  background:linear-gradient(120deg,var(--w-navy),var(--w-deep))}
.jp-day-metric .jp-hours{display:flex;align-items:baseline;gap:10px;font-size:clamp(30px,3.6vw,44px);font-weight:900;line-height:1.15;
  letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:var(--w-gold-l)}
.jp-day-metric .jp-hours span{font-size:.55em;font-weight:700;color:rgba(255,255,255,.35)}
.jp-day-metric p{margin-top:10px;font-size:12.5px;color:rgba(255,255,255,.55)}
.jp-day-aside .jp-fine{max-width:360px;margin-top:20px}
.jp-day-main{padding:26px 28px 24px;border-radius:18px;background:#fff;border:1px solid rgba(17,28,54,.1);box-shadow:0 14px 34px rgba(17,28,54,.06)}
.jp-day-tabs{display:inline-flex;gap:4px;margin-bottom:16px;padding:5px;border-radius:999px;background:var(--w-soft)}
.jp-day-tabs button{border:0;background:transparent;padding:9px 18px;border-radius:999px;font-size:13.5px;font-weight:800;color:var(--w-mut);
  transition:background .25s ease,color .25s ease}
.jp-day-tabs button:hover:not([aria-selected=true]){color:var(--w-navy)}
.jp-day-tabs button[aria-selected=true]{background:var(--w-navy);color:#fff;box-shadow:0 8px 18px -10px rgba(8,13,26,.7)}
.jp-time-row{display:grid;grid-template-columns:132px 1fr;gap:20px;align-items:start;padding:14px 4px;border-bottom:1px solid #EFF1F6}
.jp-time-row time{padding-top:1px;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums;color:var(--w-gold)}
.jp-time-row strong{display:block;font-size:14.5px;font-weight:800;color:var(--w-navy)}
.jp-time-row small{display:block;margin-top:2px;font-size:12.5px;color:var(--w-mut)}
.jp-time-row.jp-main{margin:0 -10px 4px;padding:14px 14px;border:0;border-radius:12px;background:rgba(192,153,79,.12)}
.jp-time-row.jp-main time{color:var(--w-gold-d)}
.jp-time-row.jp-break{margin:6px -10px;padding:9px 14px;border:0;border-radius:10px;background:var(--w-soft)}
.jp-time-row.jp-break time{color:var(--w-mut)}
.jp-time-row.jp-break strong{font-size:13.5px;font-weight:700;color:var(--w-mut)}
.jp-time-panel .jp-fine{margin-top:16px}

/* ══ 기록 · 피드백 ══ */
.jp-record{padding:clamp(70px,8vw,110px) 0;color:#fff;background:linear-gradient(160deg,var(--w-navy2),var(--w-deep))}
.jp-record .jp-eyebrow,.jp-final-cta .jp-eyebrow{background:rgba(255,255,255,.12);color:var(--w-gold-l)}
.jp-record h2{color:#fff}.jp-record h2 em{color:var(--w-gold-l)}
.jp-record .jp-sub{color:rgba(255,255,255,.6)}
.jp-record-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,5vw,68px);align-items:center}
.jp-record-copy .jp-sub{max-width:460px}
.jp-record-steps{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}
.jp-record-steps span{padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.06);
  font-size:13px;font-weight:700;color:#fff}
.jp-report{overflow:hidden;border-radius:20px;background:#fff;color:var(--w-ink);box-shadow:0 34px 70px -30px rgba(0,0,0,.75);transform:rotate(1deg)}
.jp-report-top{display:flex;justify-content:space-between;align-items:flex-start;padding:26px 28px 20px;border-bottom:1px solid #EFF1F6}
.jp-report-top .jp-en{display:block;margin-bottom:6px;font-size:10.5px;font-weight:800;letter-spacing:.16em;color:var(--w-gold)}
.jp-report-top strong{display:block;font-size:20px;font-weight:900;letter-spacing:-.03em;color:var(--w-navy)}
.jp-report-top img{width:32px}
.jp-report-preview{padding:6px 28px}
.jp-report-row{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-bottom:1px solid #EFF1F6;font-size:14px;font-weight:800;color:var(--w-ink)}
.jp-report-row:last-child{border:0}
.jp-report-row span:last-child{font-size:12.5px;font-weight:600;color:var(--w-mut)}
.jp-report-bottom{padding:16px 28px 18px;background:var(--w-soft);font-size:13px;line-height:1.7;color:var(--w-mut)}
.jp-report-bottom strong{color:var(--w-navy);font-weight:900}
.jp-report-caption{margin-top:16px;text-align:right;font-size:12px;color:rgba(255,255,255,.4)}
.jp-tablet-strip{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:stretch;margin-top:clamp(36px,4.6vw,56px)}
.jp-tablet-strip>img{width:100%;height:100%;min-height:200px;max-height:260px;object-fit:cover;border-radius:18px}
.jp-tablet-strip>div{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:26px 28px;border-radius:18px;
  background:linear-gradient(150deg,rgba(255,255,255,.075),rgba(255,255,255,.028));border:1px solid rgba(255,255,255,.09)}
.jp-tablet-strip>div::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:2px;border-radius:2px;
  background:linear-gradient(180deg,var(--w-gold),rgba(192,153,79,0))}
.jp-tablet-strip h3{margin-bottom:12px;font-size:clamp(18px,2vw,21px);color:#fff}
.jp-tablet-strip p{font-size:14px;line-height:1.85;color:rgba(255,255,255,.6)}
.jp-tablet-strip .jp-fine{margin-top:12px;font-size:12px;color:rgba(255,255,255,.38)}

/* ══ 시설 ══ */
.jp-campus-gallery{display:grid;grid-template-columns:1.3fr 1fr 1fr;grid-auto-rows:230px;gap:16px}
.jp-campus-gallery figure{position:relative;overflow:hidden;margin:0;border-radius:18px;line-height:0;background:var(--w-navy)}
.jp-campus-gallery figure:first-child{grid-column:1;grid-row:1 / 3}
.jp-campus-gallery figure:last-child{grid-column:2 / 4}
.jp-campus-gallery img{width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease)}
.jp-campus-gallery figure:last-child img{object-position:center 44%}
.jp-campus-gallery figure:hover img{transform:scale(1.06)}
.jp-campus-gallery figcaption{position:absolute;left:0;right:0;bottom:0;padding:46px 20px 18px;line-height:1.5;
  background:linear-gradient(180deg,transparent,rgba(8,13,26,.9))}
.jp-campus-gallery figcaption strong{display:block;margin-bottom:4px;font-size:17px;font-weight:800;color:#fff}
.jp-campus-gallery figcaption span{font-size:12px;color:var(--w-gold-l)}

/* ══ 모집 안내 ══ */
.jp-admission{background:var(--w-soft)}
.jp-admission-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(36px,5vw,72px);align-items:start}
.jp-admission-copy .jp-sub{max-width:380px}
.jp-admission-copy .jp-phone{display:inline-block;margin:28px 0 2px;font-size:clamp(30px,3.6vw,42px);font-weight:900;letter-spacing:-.045em;
  line-height:1.2;color:var(--w-navy);transition:color .25s ease}
.jp-admission-copy .jp-phone:hover{color:var(--w-gold)}
.jp-admission-copy>.jp-fine{font-size:13px;color:var(--w-mut)}
.jp-admission-steps{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px;counter-reset:jpadm}
.jp-admission-steps span{counter-increment:jpadm;display:inline-flex;align-items:center;gap:8px;padding:7px 14px 7px 7px;border-radius:999px;
  background:#fff;border:1px solid rgba(17,28,54,.09);font-size:12.5px;font-weight:800;color:var(--w-navy)}
.jp-admission-steps span::before{content:counter(jpadm);display:inline-flex;align-items:center;justify-content:center;
  width:22px;height:22px;border-radius:50%;background:rgba(192,153,79,.2);font-size:11px;font-weight:900;color:var(--w-gold-d)}
.jp-admission-box{padding:14px 30px 30px;border-radius:20px;background:#fff;border:1px solid rgba(17,28,54,.09);box-shadow:0 18px 44px rgba(17,28,54,.07)}
.jp-admission-box dl{margin:0}
.jp-admission-box dl>div{display:grid;grid-template-columns:104px 1fr;gap:18px;padding:16px 0;border-bottom:1px solid #EFF1F6;font-size:14.5px}
.jp-admission-box dt{padding-top:1px;font-size:13.5px;font-weight:800;color:var(--w-gold)}
.jp-admission-box dd{margin:0;font-weight:700;color:var(--w-ink)}
.jp-admission-box dd small{font-weight:600;color:var(--w-mut)}
.jp-pending{display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(192,153,79,.16);font-size:12px;font-weight:800;color:var(--w-gold-d)}
.jp-admission-box .jp-button{width:100%;margin-top:22px}
.jp-admission-box .jp-fine{margin-top:14px}

/* ══ 자주 묻는 질문 ══ */
.jp-faq-wrap{max-width:900px}
.jp-faq-head{margin-bottom:clamp(22px,3vw,34px)}
.jp-faq-list{border-top:1px solid #E8EBF1}
.jp-faq-list details{border-bottom:1px solid #E8EBF1}
.jp-faq-list summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 4px;list-style:none;cursor:pointer;
  font-size:15.5px;font-weight:700;line-height:1.6;color:var(--w-ink);transition:color .2s ease}
.jp-faq-list summary::-webkit-details-marker{display:none}
.jp-faq-list summary:hover{color:var(--w-gold)}
.jp-faq-list summary::after{content:"+";flex:0 0 auto;font-size:21px;font-weight:400;line-height:1;color:var(--w-gold);transition:transform .25s ease}
.jp-faq-list details[open] summary{font-weight:800;color:var(--w-navy)}
.jp-faq-list details[open] summary::after{transform:rotate(45deg)}
.jp-faq-answer{padding:0 36px 22px 4px;font-size:14px;line-height:1.9;color:var(--w-mut)}

/* ══ 맺음 ══ */
.jp-final-cta{padding:clamp(70px,8vw,110px) 0 90px;text-align:center;color:#fff;background:var(--w-deep)}
.jp-final-cta .jp-eyebrow{padding:0;border-radius:0;background:none;margin-bottom:16px;font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--w-ice)}
.jp-final-cta h2{font-size:clamp(26px,3.8vw,46px);font-weight:900;line-height:1.35;letter-spacing:-.04em;color:#fff}
.jp-gold-text{color:var(--w-gold-l)}
.jp-final-cta p{margin:20px 0 32px;font-size:15px;line-height:1.85;color:rgba(255,255,255,.6)}
.jp-final-buttons{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

/* ══ 하단 상담 띠 ══ */
.jp-floating-cta{position:fixed;left:0;right:0;bottom:0;z-index:95;transform:translateY(110%);
  transition:transform .35s cubic-bezier(.22,.7,.3,1);background:rgba(8,13,26,.96);backdrop-filter:blur(10px);
  border-top:1px solid rgba(192,153,79,.35)}
.jp-floating-cta.is-visible{transform:none}
.jp-floating-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px 0}
.jp-floating-inner strong{font-size:14.5px;font-weight:800;letter-spacing:-.02em;color:#fff}
.jp-floating-inner span{display:block;font-size:12px;color:rgba(255,255,255,.55)}
.jp-floating-links{display:flex;gap:8px;flex:0 0 auto}
.jp-floating-inner .jp-button{padding:12px 24px;font-size:14px}
.jp-floating-inner .jp-button:not(.jp-light-line){animation:jpPulse 2.6s ease-in-out infinite}
@keyframes jpPulse{0%,100%{box-shadow:0 0 0 rgba(192,153,79,0)}50%{box-shadow:0 0 22px rgba(192,153,79,.6)}}

/* ── 태블릿 ── */
@media(max-width:1000px){
  .jp-intro-grid,.jp-management-grid,.jp-day-layout,.jp-admission-grid,.jp-record-grid{grid-template-columns:1fr;gap:34px}
  .jp-section-head{display:block}
  .jp-section-head .jp-sub{margin-top:16px;max-width:560px}
  .jp-intro-copy .jp-sub,.jp-management-intro .jp-sub,.jp-record-copy .jp-sub,.jp-admission-copy .jp-sub{max-width:560px}
  .jp-hero-photo{width:100%;object-position:65% center}
  .jp-hero::after{background:linear-gradient(100deg,rgba(10,17,34,.94),rgba(10,17,34,.62))}
  .jp-hero-copy{max-width:100%}
  .jp-hero-location{display:none}
  .jp-start-grid{grid-template-columns:1fr}
  .jp-start-bottom{display:block}
  .jp-start-bottom p{margin-top:8px}
  .jp-study-layout{grid-template-columns:210px 1fr}
  .jp-day-metric{display:none}
  .jp-day-aside .jp-fine{max-width:none}
  .jp-tablet-strip{grid-template-columns:1fr}
  .jp-campus-gallery{grid-template-columns:1fr 1fr;grid-auto-rows:210px}
  .jp-campus-gallery figure:first-child{grid-column:1 / 3;grid-row:auto}
  .jp-campus-gallery figure:last-child{grid-column:1 / 3}
}
/* ── 모바일 ── */
@media(max-width:640px){
  .jp section[id]{scroll-margin-top:72px}
  .jp-wrap{width:calc(100% - 36px)}
  .jp-hero{min-height:0}
  .jp-hero-grid{padding:48px 0 76px}
  .jp-hero .jp-eyebrow{font-size:11.5px;letter-spacing:.16em;margin-bottom:16px}
  .jp-hero h1{font-size:clamp(30px,8.6vw,42px)}
  .jp-hero .jp-lead{font-size:14.5px}
  .jp-hero .jp-lead br{display:none}
  .jp-hero-actions{flex-direction:column;max-width:280px}
  .jp-hero .jp-edition{font-size:96px;top:20px;color:rgba(228,205,154,.13)}
  .jp-baseline-grid{grid-template-columns:1fr 1fr;gap:10px;margin-top:-44px}
  .jp-baseline-grid>div{flex-direction:column;align-items:flex-start;gap:6px;padding:16px 16px}
  .jp-baseline-grid>div:last-child{grid-column:1 / 3;flex-direction:row;align-items:center;gap:14px}
  .jp-secnav-in a{padding:13px 11px;font-size:12.5px}
  .jp-secnav-in .jp-secnav-cta{margin-left:6px;padding:9px 14px}
  .jp-change-item{padding:22px 20px 20px;border-radius:16px}
  .jp-change-item::before{left:20px}
  .jp-start-item{padding:24px 20px 22px;border-radius:16px}
  .jp-study-layout{display:block;min-height:0;border-radius:16px}
  .jp-subject-tabs{flex-direction:row;gap:4px;padding:8px}
  .jp-subject-tabs button{flex:1;justify-content:center;padding:11px 8px;font-size:13.5px;white-space:nowrap;border-radius:10px}
  .jp-subject-tabs button small{display:none}
  .jp-subject-panel{min-height:320px;padding:26px 20px}
  .jp-management-image img{height:230px}
  .jp-care-accordion details{padding:18px 16px;border-radius:16px}
  .jp-care-accordion summary::before{font-size:24px}
  .jp-care-accordion summary h3{font-size:16.5px}
  .jp-care-body ul{grid-template-columns:1fr}
  .jp-day-main{padding:18px 16px 16px;border-radius:16px}
  .jp-day-tabs button{padding:8px 13px;font-size:12.5px}
  .jp-time-row{grid-template-columns:100px 1fr;gap:12px}
  .jp-time-row time{font-size:12px}
  .jp-time-row strong{font-size:14px}
  .jp-report{transform:none;border-radius:16px}
  .jp-report-top{padding:22px 20px 16px}
  .jp-report-preview{padding:4px 20px}
  .jp-report-bottom{padding:14px 20px 16px}
  .jp-tablet-strip>div{padding:22px 20px}
  .jp-campus-gallery{gap:10px;grid-auto-rows:auto}
  .jp-campus-gallery figure{height:160px;border-radius:14px}
  .jp-campus-gallery figure:first-child{height:230px}
  .jp-campus-gallery figure:last-child{height:190px}
  .jp-campus-gallery figcaption{padding:34px 13px 12px}
  .jp-campus-gallery figcaption strong{font-size:14px}
  .jp-campus-gallery figcaption span{font-size:10.5px}
  .jp-admission-box{padding:8px 20px 24px;border-radius:16px}
  .jp-admission-box dl>div{grid-template-columns:82px 1fr;gap:12px;font-size:14px}
  .jp-faq-list summary{font-size:15px;padding:18px 2px}
  .jp-faq-answer{padding:0 18px 20px 2px}
  .jp-final-buttons{flex-direction:column;align-items:center}
  .jp-final-buttons .jp-button{width:min(260px,100%);padding:14px 22px}
  .jp-floating-inner{gap:10px;padding:9px 0}
  .jp-floating-inner strong{font-size:13px}
  .jp-floating-inner span{font-size:10.5px}
  .jp-floating-inner .jp-button{padding:10px 16px;font-size:13px}
  .jp-floating-links .jp-phone-link{display:none}
}
@media(prefers-reduced-motion:reduce){
  .jp *,.jp *::before,.jp *::after{transition:none!important;animation:none!important}
}

/* ═══════════════════════════════════════════════════════════
   움직임
   ═══════════════════════════════════════════════════════════ */
/* ── 첫 화면 — 페이지가 열릴 때 ── */
@keyframes jpUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes jpFade{from{opacity:0}to{opacity:1}}
@keyframes jpZoom{from{transform:scale(1.09)}to{transform:scale(1)}}
@keyframes jpEdition{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:none}}
.jp-hero-photo{animation:jpZoom 2.8s var(--ease) both}
.jp-hero-copy>*{animation:jpUp 1s var(--ease) both}
.jp-hero-copy>*:nth-child(1){animation-delay:.15s}
.jp-hero-copy>*:nth-child(2){animation-delay:.28s}
.jp-hero-copy>*:nth-child(3){animation-delay:.42s}
.jp-hero-copy>*:nth-child(4){animation-delay:.6s}
.jp-hero-copy>*:nth-child(5){animation-delay:.76s}
.jp-hero .jp-edition{animation:jpEdition 1.8s var(--ease) .45s both}
.jp-hero-location{animation:jpFade 1.4s ease 1.1s both}

/* ── 스크롤 등장 ──
   스크립트가 .jp-armed 를 붙인 뒤에만 감춥니다(스크립트가 안 돌면 전부 그냥 보입니다).
   묶음이 화면에 들어오면 안의 조각들이 --i 순서대로 차례로 나타납니다. */
.jp .jp-r{transition:opacity .95s var(--ease),transform .95s var(--ease),clip-path 1.15s var(--ease);
  transition-delay:calc(var(--i,0) * var(--step,90ms))}
.jp-armed .jp-r:not(.is-in){opacity:0}
.jp-armed .jp-r-up:not(.is-in){transform:translateY(30px)}
.jp-armed .jp-r-left:not(.is-in){transform:translateX(-38px)}
.jp-armed .jp-r-right:not(.is-in){transform:translateX(38px)}
.jp-armed .jp-r-scale:not(.is-in){transform:scale(.86)}
.jp-armed .jp-r-tilt:not(.is-in){transform:translateY(54px) rotate(5deg)}
.jp-r-clip{clip-path:inset(0 0 0 0 round 18px)}
.jp-armed .jp-r-clip:not(.is-in){opacity:1;clip-path:inset(0 0 100% 0 round 18px)}
.jp .jp-r-clip img{transition:transform 1.6s var(--ease)}
.jp-armed .jp-r-clip:not(.is-in) img{transform:scale(1.15)}
/* 이음 문장의 사선 — 그어지듯 */
.jp-bridge::before,.jp-bridge::after{transition:transform 1.5s var(--ease),opacity 1.2s ease}
.jp-armed .jp-bridge:not(.jp-seen)::before,.jp-armed .jp-bridge:not(.jp-seen)::after{transform:rotate(35deg) scaleY(0);opacity:0}

/* ── 탭을 바꿀 때 · 접힌 글을 펼칠 때 ── */
@keyframes jpPanel{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes jpFold{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.jp-subject-panel.is-switch>*{animation:jpPanel .55s var(--ease) both}
.jp-subject-panel.is-switch>*:nth-child(2){animation-delay:.06s}
.jp-subject-panel.is-switch>*:nth-child(3){animation-delay:.12s}
.jp-subject-panel.is-switch>*:nth-child(4){animation-delay:.18s}
.jp-time-panel.is-switch .jp-time-row,.jp-time-panel.is-switch .jp-fine{animation:jpPanel .5s var(--ease) both;
  animation-delay:calc(var(--n,0) * 45ms)}
.jp-care-accordion details[open]>.jp-care-body,.jp-faq-list details[open]>.jp-faq-answer{animation:jpFold .45s var(--ease)}
@media(max-width:640px){
  .jp-armed .jp-r-left:not(.is-in){transform:translateX(-22px)}
  .jp-armed .jp-r-right:not(.is-in){transform:translateX(22px)}
}

`;
