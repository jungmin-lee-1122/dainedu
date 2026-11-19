// ═══════════════════════════════════════════════════════════
//  2028 재수선행반 (/jaesu-2028) — 스타일
//
//  위쪽은 전달받은 시안의 스타일 그대로입니다(클래스 앞에 jp- 만 붙임).
//  아래쪽에 차례로 덧붙였습니다.
//   · "여기부터는 … 보탠 부분" — 이동 띠 · 애니메이션
//   · "다듬기"               — 둥글기 · 색 · 얕은 그림자
//  globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const jaesuStyles = `
.jp{--navy:#101d35;--ink:#17243d;--gold:#c9aa66;--gold-light:#ead7a6;--muted:#637086;--line:#dce1e8;--paper:#f3f5f8;--white:#fff;--max:1180px}
.jp *{box-sizing:border-box}
.jp{margin:0;font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:var(--ink);font-size:17px;line-height:1.7;word-break:keep-all;background:#fff}
:where(.jp) button,:where(.jp) a{-webkit-tap-highlight-color:transparent}
:where(.jp) a{color:inherit;text-decoration:none}
:where(.jp) button{font:inherit;cursor:pointer}
:where(.jp) button:focus-visible,:where(.jp) a:focus-visible,:where(.jp) summary:focus-visible{outline:3px solid #a5843f;outline-offset:5px}
:where(.jp) button{color:inherit}
:where(.jp) img{display:block;max-width:100%}
:where(.jp) h1,:where(.jp) h2,:where(.jp) h3,:where(.jp) p{margin:0}
:where(.jp) h1,:where(.jp) h2,:where(.jp) h3{line-height:1.3;letter-spacing:-.045em}
:where(.jp) h2{font-size:clamp(32px,3.6vw,48px);font-weight:750}
:where(.jp) h3{font-size:24px;font-weight:720}
:where(.jp) p{letter-spacing:-.02em}
:where(.jp) small{font-size:14px}
.jp ::selection{background:var(--gold-light);color:var(--navy)}
.jp [hidden]{display:none!important}
.jp-wrap{width:min(var(--max),calc(100% - 96px));margin:auto}
.jp-eyebrow{font-size:14px;font-weight:700;letter-spacing:.17em;text-transform:uppercase;display:block;margin-bottom:22px;color:#8f753e}
.jp-sub{color:var(--muted);font-size:18px;line-height:1.85;margin-top:22px}
.jp-section{padding:112px 0}
.jp-section-head{display:flex;justify-content:space-between;gap:40px;align-items:end;margin-bottom:52px}
.jp-section-head .jp-sub{max-width:400px;margin:0}
.jp-button{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:15px 25px;min-height:56px;background:var(--navy);color:#fff;border:1px solid var(--navy);font-size:16px;font-weight:650;border-radius:3px;transition:background .2s,transform .2s}
.jp-button:hover{background:#243957;transform:translateY(-2px)}
.jp-button.jp-gold{background:var(--gold-light);border-color:var(--gold-light);color:var(--navy)}
.jp-button.jp-gold:hover{background:#f4e5bf}
.jp-button.jp-line{background:transparent;border-color:#728098;color:#fff}
.jp-button.jp-light-line{background:transparent;border-color:var(--line);color:var(--ink)}
.jp-button.jp-light-line:hover{background:var(--paper)}
.jp-fine{font-size:14px;line-height:1.75;color:var(--muted)}
.jp-pill{display:inline-block;font-size:14px;padding:5px 11px;border:1px solid var(--line);border-radius:30px;color:var(--muted)}
.jp-gold-text{color:var(--gold-light)}
.jp-hero{background:var(--navy);position:relative;min-height:700px;overflow:hidden;color:#fff;display:flex;align-items:center}
.jp-hero-photo{position:absolute;right:0;top:0;bottom:0;width:67%;height:100%;object-fit:cover;object-position:60% center;filter:brightness(.59) saturate(.65)}
.jp-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#101d35 0%,rgba(16,29,53,.97) 22%,rgba(16,29,53,.65) 52%,rgba(16,29,53,.05) 100%)}
.jp-hero-grid{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding-top:65px;padding-bottom:95px}
.jp-hero-copy{max-width:770px}
.jp-hero .jp-eyebrow{color:var(--gold-light);margin-bottom:27px;font-size:15px}
.jp-hero-product{font-size:25px;font-weight:500;margin-bottom:16px;letter-spacing:-.025em}
.jp-hero h1{font-size:clamp(42px,4.8vw,66px);line-height:1.23;font-weight:760;letter-spacing:-.055em}
.jp-hero h1 em{font-style:normal;color:var(--gold-light)}
.jp-hero .jp-lead{font-size:20px;line-height:1.8;color:#cbd3df;margin-top:29px;font-weight:400}
.jp-hero-actions{display:flex;gap:12px;margin-top:37px}
.jp-hero .jp-edition{position:absolute;right:0;top:40px;font-size:clamp(80px,11vw,155px);font-weight:300;line-height:1;letter-spacing:-.06em;color:rgba(234,215,166,.22);z-index:-1}
.jp-hero-location{position:absolute;bottom:31px;right:0;text-align:right;font-size:13px;color:#c4cedb;letter-spacing:.04em}
.jp-hero-location span{display:block;font-size:11px;letter-spacing:.2em;color:#aeb8c6}
.jp-hero-baseline{background:#182840;color:#fff;border-top:1px solid #304059}
.jp-baseline-grid{display:grid;grid-template-columns:1fr 1fr 1fr;padding:27px 0}
.jp-baseline-grid>div{display:flex;gap:22px;align-items:center;justify-content:center;border-right:1px solid #3b485c}
.jp-baseline-grid>div:first-child{justify-content:flex-start}
.jp-baseline-grid>div:last-child{border:0}
.jp-baseline-grid strong{font-size:32px;font-weight:600;letter-spacing:-.04em;color:#ead7a6;line-height:1.2}
.jp-baseline-grid span{font-size:14px;line-height:1.6;color:#c9d1dc}
.jp-baseline-grid .jp-words{font-size:21px}
.jp-intro{padding:114px 0 96px}
.jp-intro-grid{display:grid;grid-template-columns:1fr 1.12fr;gap:90px}
.jp-intro h2{font-size:43px}
.jp-intro p{max-width:405px}
.jp-change-list{border-top:2px solid var(--ink)}
.jp-change-item{padding:27px 0;display:grid;grid-template-columns:80px 1fr;gap:22px;border-bottom:1px solid var(--line)}
.jp-change-label{font-size:16px;color:#8d723c;font-weight:650;padding-top:3px}
.jp-change-item h3{font-size:23px;margin-bottom:10px}
.jp-change-item p{font-size:16px;color:var(--muted);line-height:1.8;max-width:none}
.jp-change-item .jp-subjects{color:#344158;font-size:15px;margin-top:7px;display:block}
.jp-policy-note{margin-top:26px;padding-left:15px;border-left:2px solid #d9be83}
.jp-policy-note a{text-decoration:underline;text-underline-offset:3px}
.jp-bridge{background:var(--navy);color:white;text-align:center;padding:74px 0;position:relative;overflow:hidden}
.jp-bridge::before{content:"";height:130%;width:1px;background:rgba(201,170,102,.3);position:absolute;top:-30%;left:15%;transform:rotate(35deg)}
.jp-bridge::after{content:"";height:130%;width:1px;background:rgba(201,170,102,.3);position:absolute;top:-30%;right:15%;transform:rotate(35deg)}
.jp-bridge p{color:#bdc9d9;font-size:18px;margin-bottom:16px}
.jp-bridge h2{font-size:clamp(27px,3.1vw,40px);line-height:1.5;font-weight:650}
.jp-bridge h2 span{color:var(--gold-light)}
.jp-start{background:var(--paper)}
.jp-start-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid #c9d0dc;border-bottom:1px solid #c9d0dc}
.jp-start-item{padding:38px 35px 40px 0}
.jp-start-item+ .jp-start-item{border-left:1px solid #c9d0dc;padding-left:35px}
.jp-start-item .jp-step{color:#8c713d;font-size:15px;letter-spacing:.04em;font-weight:650;margin-bottom:22px;display:block}
.jp-start-item h3{font-size:27px;margin-bottom:18px}
.jp-start-item p{font-size:17px;color:var(--muted);line-height:1.85}
.jp-start-item ul{list-style:none;padding:0;margin:25px 0 0;font-size:15px;font-weight:550}
.jp-start-item li{margin-top:8px;display:flex;gap:9px}
.jp-start-item li::before{content:"—";color:#ae945d}
.jp-start-bottom{display:flex;gap:24px;align-items:center;margin-top:34px}
.jp-start-bottom strong{white-space:nowrap;font-size:17px}
.jp-start-bottom p{font-size:16px;color:var(--muted)}
.jp-curriculum{padding-bottom:106px}
.jp-curriculum .jp-proposal-label{display:inline-block;color:#7d632e;background:#faf4e7;border:1px solid #e7dbbe;padding:5px 12px;font-size:13px;margin-bottom:20px;border-radius:3px}
.jp-study-layout{display:grid;grid-template-columns:280px 1fr;border:1px solid var(--line);border-radius:5px;overflow:hidden;min-height:368px}
.jp-subject-tabs{display:flex;flex-direction:column;background:var(--paper);padding:18px}
.jp-subject-tabs button{border:0;text-align:left;background:transparent;padding:17px 20px;font-size:19px;display:flex;justify-content:space-between;align-items:center;border-radius:3px}
.jp-subject-tabs button small{font-size:11px;letter-spacing:.07em;color:#8a93a3}
.jp-subject-tabs button[aria-selected=true]{background:var(--navy);color:white}
.jp-subject-tabs button[aria-selected=true] small{color:var(--gold-light)}
.jp-subject-tabs button:hover:not([aria-selected=true]){background:#e8edf3}
.jp-subject-panel{padding:43px 48px;display:flex;flex-direction:column;justify-content:center}
.jp-subject-panel .jp-range{font-size:15px;color:#94783c;margin-bottom:13px;font-weight:600}
.jp-subject-panel h3{font-size:30px;margin-bottom:18px}
.jp-subject-panel p{color:var(--muted);font-size:17px;line-height:1.85}
.jp-focus-points{display:flex;gap:8px;flex-wrap:wrap;margin-top:27px}
.jp-focus-points span{background:var(--paper);padding:6px 12px;border-radius:3px;font-size:14px;color:#43516a}
.jp-curriculum .jp-fine{margin-top:18px}
.jp-management{background:#eef2f6}
.jp-management-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px}
.jp-management-intro h2{max-width:470px}
.jp-management-intro .jp-sub{max-width:435px}
.jp-management-image{margin-top:37px;position:relative;overflow:hidden;border-radius:4px}
.jp-management-image img{width:100%;height:315px;object-fit:cover}
.jp-management-image figcaption{position:absolute;bottom:0;left:0;right:0;padding:32px 22px 20px;color:#fff;font-size:14px;background:linear-gradient(transparent,rgba(16,29,53,.83))}
.jp-care-accordion{border-top:1px solid #b9c5d3}
.jp-care-accordion details{border-bottom:1px solid #cbd4df;padding:24px 0}
.jp-care-accordion summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center}
.jp-care-accordion summary::-webkit-details-marker{display:none}
.jp-care-accordion summary h3{font-size:25px;line-height:1.4}
.jp-care-accordion summary small{font-size:12px;letter-spacing:.1em;display:block;color:#76849a;margin-top:3px}
.jp-care-accordion summary::after{content:"+";font-weight:300;font-size:30px;line-height:1;color:#8a7140}
.jp-care-accordion details[open] summary::after{content:"−"}
.jp-care-body{padding-top:18px}
.jp-care-body p{color:var(--muted);font-size:16px;line-height:1.85}
.jp-care-body ul{display:grid;grid-template-columns:1fr 1fr;gap:9px 18px;padding:0;margin:20px 0 0;list-style:none;font-size:15px}
.jp-care-body li{display:flex;gap:8px;line-height:1.6}
.jp-care-body li::before{content:"✓";color:#967d47}
.jp-care-accordion .jp-fine{margin-top:17px}
.jp-day{background:#fff}
.jp-day-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:85px}
.jp-day-aside h2{font-size:43px}
.jp-day-metric{margin-top:35px;padding-top:26px;border-top:1px solid var(--line)}
.jp-day-metric .jp-hours{display:flex;align-items:baseline;gap:12px;font-size:48px;letter-spacing:-.04em;line-height:1.2;font-weight:500}
.jp-day-metric .jp-hours span{font-size:24px;color:#a7b0bd}
.jp-day-metric p{font-size:15px;color:var(--muted);margin-top:11px}
.jp-day-aside .jp-fine{max-width:340px;margin-top:28px}
.jp-day-tabs{display:flex;border-bottom:1px solid var(--line);margin-bottom:16px;gap:24px}
.jp-day-tabs button{border:0;border-bottom:3px solid transparent;background:none;padding:12px 4px;font-size:16px;color:var(--muted);font-weight:550}
.jp-day-tabs button[aria-selected=true]{border-bottom-color:var(--gold);color:var(--ink);font-weight:750}
.jp-time-row{display:grid;grid-template-columns:150px 1fr;gap:25px;padding:17px 0;border-bottom:1px solid #e6eaf0;align-items:start}
.jp-time-row time{font-size:15px;color:#5a6880;letter-spacing:-.025em;font-variant-numeric:tabular-nums}
.jp-time-row strong{display:block;font-size:17px;font-weight:650}
.jp-time-row small{font-size:14px;color:var(--muted);display:block;margin-top:2px}
.jp-time-row.jp-main{background:#f5f1e7;margin-left:-14px;margin-right:-14px;padding-left:14px;padding-right:14px;border:0}
.jp-time-row.jp-break strong{font-size:15px;font-weight:400;color:#788395}
.jp-time-row.jp-break{padding-top:10px;padding-bottom:10px}
.jp-time-panel .jp-fine{margin-top:18px}
.jp-record{background:var(--navy);color:#fff;padding:102px 0}
.jp-record .jp-eyebrow{color:var(--gold-light)}
.jp-record .jp-sub{color:#b7c3d4}
.jp-record-grid{display:grid;grid-template-columns:1fr 1fr;gap:68px;align-items:center}
.jp-record-copy h2{font-size:43px}
.jp-record-copy .jp-sub{max-width:450px}
.jp-record-steps{margin-top:30px;display:flex;flex-wrap:wrap;gap:9px}
.jp-record-steps span{border:1px solid #44536b;padding:7px 12px;font-size:14px;border-radius:3px;color:#ced8e5}
.jp-report{background:#fff;color:var(--ink);border-radius:6px;box-shadow:0 30px 60px #07102066;overflow:hidden;transform:rotate(1deg)}
.jp-report-top{padding:28px 28px 20px;display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid var(--line)}
.jp-report-top strong{font-size:22px;font-weight:750;letter-spacing:-.03em;display:block}
.jp-report-top .jp-en{font-size:11px;color:#8490a1;letter-spacing:.16em;margin-bottom:6px;display:block}
.jp-report-top img{width:32px}
.jp-report-preview{padding:8px 28px}
.jp-report-row{display:flex;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid #e5e9ef;font-size:15px}
.jp-report-row:last-child{border:0}
.jp-report-row span:last-child{color:#778398;font-size:14px}
.jp-report-bottom{background:#f0f3f7;padding:17px 28px;font-size:14px;color:#637186}
.jp-report-bottom strong{color:var(--ink)}
.jp-report-caption{text-align:right;color:#a5b3c8;font-size:12px;margin-top:15px}
.jp-tablet-strip{margin-top:50px;display:grid;grid-template-columns:1.1fr .9fr;gap:34px;padding-top:42px;border-top:1px solid #34435c;align-items:center}
.jp-tablet-strip img{width:100%;height:198px;object-fit:cover;border-radius:4px}
.jp-tablet-strip h3{font-size:25px;margin-bottom:14px}
.jp-tablet-strip p{color:#b7c3d4;font-size:16px;line-height:1.8}
.jp-tablet-strip .jp-fine{color:#90a0b8;margin-top:13px}
.jp-campus-gallery{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:18px}
.jp-campus-gallery figure{margin:0;overflow:hidden;background:var(--paper)}
.jp-campus-gallery figure:first-child{grid-column:1;grid-row:1 / 3}
.jp-campus-gallery figure:last-child{grid-column:2 / 4}
.jp-campus-gallery img{width:100%;height:190px;object-fit:cover;transition:transform .5s}
.jp-campus-gallery figure:first-child img{height:469px}
.jp-campus-gallery figure:last-child img{height:190px;object-position:center 44%}
.jp-campus-gallery figure:hover img{transform:scale(1.025)}
.jp-campus-gallery figcaption{padding:16px 18px;background:#f3f5f7;position:relative}
.jp-campus-gallery figcaption strong{font-size:17px;display:block}
.jp-campus-gallery figcaption span{font-size:14px;color:var(--muted)}
.jp-admission{background:#f0f3f7}
.jp-admission-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:80px}
.jp-admission-copy .jp-sub{max-width:380px}
.jp-admission-copy .jp-phone{font-size:38px;letter-spacing:-.045em;font-weight:700;display:block;margin:34px 0 2px}
.jp-admission-copy .jp-fine{font-size:15px}
.jp-admission-box{background:#fff;border:1px solid #d9e0e9;border-radius:4px;padding:15px 32px 30px}
.jp-admission-box dl{margin:0}
.jp-admission-box dl>div{display:grid;grid-template-columns:110px 1fr;gap:20px;padding:18px 0;border-bottom:1px solid var(--line);font-size:16px}
.jp-admission-box dt{color:#69768c}
.jp-admission-box dd{margin:0;font-weight:550}
.jp-pending{font-size:14px;display:inline-block;color:#857042;background:#f8f2e5;padding:1px 9px;border-radius:3px;font-weight:500}
.jp-admission-box .jp-button{width:100%;margin-top:24px}
.jp-admission-box .jp-fine{margin-top:14px}
.jp-admission-steps{display:flex;gap:12px;margin-top:37px;flex-wrap:wrap;align-items:center;font-size:14px;color:#64738a}
.jp-admission-steps span{padding-right:13px;border-right:1px solid #bac4d2;line-height:1.3}
.jp-admission-steps span:last-child{border:0}
.jp-faq-wrap{max-width:900px}
.jp-faq-head{margin-bottom:40px}
.jp-faq-list{border-top:1px solid var(--ink)}
.jp-faq-list details{border-bottom:1px solid var(--line)}
.jp-faq-list summary{display:flex;gap:20px;justify-content:space-between;padding:25px 0;list-style:none;font-weight:650;font-size:19px;cursor:pointer;line-height:1.6}
.jp-faq-list summary::-webkit-details-marker{display:none}
.jp-faq-list summary::after{content:"+";font-weight:400;color:#9b814c}
.jp-faq-list details[open] summary::after{content:"−"}
.jp-faq-answer{padding:0 40px 27px 0;font-size:17px;line-height:1.9;color:var(--muted)}
.jp-final-cta{text-align:center;background:var(--navy);color:white;padding:91px 0 93px;position:relative;overflow:hidden}
.jp-final-cta .jp-eyebrow{color:var(--gold-light)}
.jp-final-cta h2{font-size:clamp(32px,3.8vw,48px);line-height:1.4}
.jp-final-cta p{color:#b9c6d7;font-size:18px;margin:22px 0 30px}
.jp-final-buttons{display:flex;gap:12px;justify-content:center}
.jp-floating-cta{position:fixed;left:0;right:0;bottom:0;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-top:1px solid #d9e0e8;z-index:35;box-shadow:0 -4px 30px #101d3508;transform:translateY(110%);transition:transform .25s}
.jp-floating-cta.jp-is-visible{transform:translateY(0)}
.jp-floating-inner{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.jp-floating-inner strong{font-size:18px;font-weight:720;letter-spacing:-.025em}
.jp-floating-inner span{display:block;font-size:13px;color:var(--muted)}
.jp-floating-inner .jp-button{padding:11px 25px;min-height:48px}
.jp-floating-links{display:flex;gap:10px}
@media(min-width:1600px){
  .jp-hero{min-height:760px}
}
@media(max-width:1100px){
  .jp-wrap{width:calc(100% - 64px)}
  .jp-intro-grid{gap:45px}
  .jp-management-grid{gap:40px}
  .jp-day-layout{gap:45px}
  .jp-record-grid{gap:40px}
  .jp-admission-grid{gap:45px}
  .jp-intro h2,.jp-day-aside h2,.jp-record-copy h2{font-size:38px}
  .jp-hero h1{font-size:55px}
  .jp-hero-copy{max-width:700px}
  .jp-study-layout{grid-template-columns:225px 1fr}
  .jp-subject-panel{padding:35px}
  .jp-campus-gallery{grid-template-columns:1.1fr 1fr 1fr}
}
@media(max-width:850px){
  .jp-section{padding:80px 0}
  .jp-intro{padding:80px 0}
  .jp-intro-grid,.jp-management-grid,.jp-day-layout,.jp-admission-grid{grid-template-columns:1fr;gap:40px}
  .jp-section-head{display:block;margin-bottom:35px}
  .jp-section-head .jp-sub{margin-top:20px;max-width:530px}
  .jp-intro p{max-width:530px}
  .jp-hero{min-height:650px}
  .jp-hero h1{font-size:49px}
  .jp-hero-photo{width:100%;object-position:65% center}
  .jp-hero::after{background:linear-gradient(90deg,#101d35ed,#101d35a6)}
  .jp-hero-location{display:none}
  .jp-baseline-grid>div{gap:12px}
  .jp-baseline-grid strong{font-size:28px}
  .jp-baseline-grid .jp-words{font-size:18px}
  .jp-baseline-grid span{font-size:12px}
  .jp-start-grid{grid-template-columns:1fr}
  .jp-start-item{padding:28px 0}
  .jp-start-item+ .jp-start-item{border-left:0;border-top:1px solid #c9d0dc;padding-left:0}
  .jp-start-item .jp-step{margin-bottom:12px}
  .jp-start-item h3{font-size:25px;margin-bottom:12px}
  .jp-start-item ul{margin-top:15px;display:flex;flex-wrap:wrap;gap:8px 20px}
  .jp-start-bottom{display:block}
  .jp-start-bottom p{margin-top:10px}
  .jp-management-image img{height:300px}
  .jp-management-intro .jp-sub{max-width:550px}
  .jp-management-image{margin-bottom:0}
  .jp-day-aside .jp-sub{max-width:550px}
  .jp-day-metric{display:none}
  .jp-day-aside .jp-fine{max-width:none}
  .jp-record-grid{gap:30px}
  .jp-record-copy h2{font-size:35px}
  .jp-record-copy .jp-sub{font-size:16px}
  .jp-report-top{padding:22px}
  .jp-report-preview{padding:5px 22px}
  .jp-report-row{font-size:14px;gap:10px}
  .jp-report-row span:last-child{font-size:12px}
  .jp-report-bottom{padding:16px 22px}
  .jp-campus-gallery{grid-template-columns:1fr 1fr}
  .jp-campus-gallery figure:first-child{grid-column:1 / 3;grid-row:auto}
  .jp-campus-gallery figure:first-child img{height:330px}
  .jp-campus-gallery figure:last-child{grid-column:1 / 3}
  .jp-campus-gallery figure:last-child img{height:250px}
}
@media(max-width:600px){
  .jp{font-size:16px}
  .jp-wrap{width:calc(100% - 40px)}
  :where(.jp) h2{font-size:32px}
  .jp-eyebrow{font-size:12px;margin-bottom:17px;letter-spacing:.13em}
  .jp-sub{font-size:16px;margin-top:18px}
  .jp-section{padding:66px 0}
  .jp-section-head{margin-bottom:30px}
  .jp-hero{min-height:620px;align-items:flex-start}
  .jp-hero-grid{padding-top:53px;padding-bottom:50px;display:block}
  .jp-hero .jp-eyebrow{font-size:12px;letter-spacing:.11em;margin-bottom:29px}
  .jp-hero-product{font-size:20px;margin-bottom:16px}
  .jp-hero h1{font-size:clamp(33px,9.2vw,43px);line-height:1.3;letter-spacing:-.058em}
  .jp-hero .jp-lead{font-size:16px;line-height:1.9;margin-top:24px;max-width:325px}
  .jp-hero .jp-lead br{display:none}
  .jp-hero-actions{flex-direction:column;gap:10px;margin-top:30px;max-width:280px}
  .jp-hero-actions .jp-button{font-size:15px;min-height:49px;padding:11px 17px}
  .jp-hero-photo{object-position:66% center;filter:brightness(.47) saturate(.5)}
  .jp-hero::after{background:linear-gradient(90deg,#101d35eb,#101d3590)}
  .jp-hero .jp-edition{font-size:100px;right:-3px;top:26px;color:#ead7a618;z-index:-1}
  .jp-baseline-grid{grid-template-columns:1fr 1fr;padding:23px 0;gap:21px 10px}
  .jp-baseline-grid>div{justify-content:flex-start}
  .jp-baseline-grid>div:nth-child(2){border:0;justify-content:center}
  .jp-baseline-grid>div:last-child{grid-column:1 / 3;padding-top:18px;border-top:1px solid #3b485c;justify-content:center;gap:20px}
  .jp-baseline-grid strong{font-size:29px}
  .jp-baseline-grid span{font-size:12px}
  .jp-baseline-grid .jp-words{font-size:17px}
  .jp-intro{padding:67px 0}
  .jp-intro-grid{gap:30px}
  .jp-intro h2,.jp-day-aside h2,.jp-record-copy h2{font-size:32px}
  .jp-intro p{font-size:16px}
  .jp-change-item{grid-template-columns:55px 1fr;gap:15px;padding:23px 0}
  .jp-change-label{font-size:14px}
  .jp-change-item h3{font-size:21px;line-height:1.45}
  .jp-change-item p{font-size:15px}
  .jp-change-item .jp-subjects{font-size:13px}
  .jp-fine{font-size:13px}
  .jp-policy-note{margin-top:20px}
  .jp-bridge{padding:51px 0}
  .jp-bridge p{font-size:15px;margin-bottom:14px}
  .jp-bridge h2{font-size:25px;line-height:1.6}
  .jp-bridge::before{left:4%}
  .jp-bridge::after{right:4%}
  .jp-start-item .jp-step{font-size:13px}
  .jp-start-item p{font-size:15px}
  .jp-start-item ul{font-size:14px;display:block}
  .jp-start-item h3{font-size:24px}
  .jp-start-bottom strong{font-size:16px}
  .jp-start-bottom p{font-size:15px}
  .jp-curriculum .jp-proposal-label{font-size:12px}
  .jp-study-layout{display:block;min-height:0}
  .jp-subject-tabs{padding:9px;flex-direction:row;gap:3px;justify-content:space-between}
  .jp-subject-tabs button{font-size:14px;padding:11px 12px;justify-content:center;flex:1;white-space:nowrap}
  .jp-subject-tabs small{display:none}
  .jp-subject-panel{padding:28px 23px;min-height:340px}
  .jp-subject-panel .jp-range{font-size:13px;line-height:1.7}
  .jp-subject-panel h3{font-size:25px}
  .jp-subject-panel p{font-size:15px}
  .jp-focus-points{margin-top:22px;gap:6px}
  .jp-focus-points span{font-size:12px;padding:5px 9px}
  .jp-management-grid{gap:30px}
  .jp-management-image{margin:25px 0 0}
  .jp-management-image img{height:240px}
  .jp-management-image figcaption{font-size:12px}
  .jp-care-accordion details{padding:21px 0}
  .jp-care-accordion summary h3{font-size:22px}
  .jp-care-accordion summary small{font-size:10px}
  .jp-care-body p{font-size:15px}
  .jp-care-body ul{font-size:14px;grid-template-columns:1fr;gap:8px;margin-top:16px}
  .jp-day-layout{gap:20px}
  .jp-day-tabs{gap:20px}
  .jp-day-tabs button{font-size:15px}
  .jp-time-row{grid-template-columns:113px 1fr;gap:15px;padding:15px 0}
  .jp-time-row time{font-size:13px}
  .jp-time-row strong{font-size:15px}
  .jp-time-row small{font-size:12px}
  .jp-time-row.jp-break strong{font-size:14px}
  .jp-record{padding:66px 0}
  .jp-record-grid{grid-template-columns:1fr;gap:32px}
  .jp-record-copy .jp-sub{font-size:16px}
  .jp-record-steps{margin-top:22px}
  .jp-record-steps span{font-size:12px}
  .jp-report{transform:none}
  .jp-report-top{padding:23px 24px 18px}
  .jp-report-top strong{font-size:21px}
  .jp-report-preview{padding:4px 24px}
  .jp-report-row{font-size:15px;padding:14px 0}
  .jp-report-row span:last-child{font-size:13px}
  .jp-report-bottom{font-size:13px;padding:17px 24px}
  .jp-report-caption{font-size:11px}
  .jp-tablet-strip{grid-template-columns:1fr;gap:22px;margin-top:35px;padding-top:32px}
  .jp-tablet-strip img{height:180px}
  .jp-tablet-strip h3{font-size:23px}
  .jp-tablet-strip p{font-size:15px}
  .jp-tablet-strip .jp-fine{font-size:12px}
  .jp-campus-gallery{gap:12px}
  .jp-campus-gallery figure:first-child img{height:255px}
  .jp-campus-gallery img{height:148px}
  .jp-campus-gallery figure:last-child img{height:210px}
  .jp-campus-gallery figcaption{padding:12px 13px}
  .jp-campus-gallery figcaption strong{font-size:15px}
  .jp-campus-gallery figcaption span{font-size:12px}
  .jp-admission-grid{gap:28px}
  .jp-admission-copy .jp-phone{font-size:32px;margin-top:23px}
  .jp-admission-copy .jp-fine{font-size:14px}
  .jp-admission-box{padding:8px 22px 25px}
  .jp-admission-box dl>div{grid-template-columns:80px 1fr;gap:13px;font-size:14px;padding:16px 0}
  .jp-pending{font-size:12px}
  .jp-admission-box .jp-button{font-size:15px}
  .jp-admission-box .jp-fine{font-size:12px}
  .jp-admission-steps{font-size:12px;gap:10px;margin-top:25px}
  .jp-admission-steps span{padding-right:9px}
  .jp-faq-head{margin-bottom:25px}
  .jp-faq-list summary{font-size:17px;padding:21px 0;gap:16px;line-height:1.65}
  .jp-faq-answer{font-size:15px;padding:0 20px 23px 0}
  .jp-final-cta{padding:66px 0}
  .jp-final-cta h2{font-size:31px}
  .jp-final-cta p{font-size:15px;max-width:300px;margin:20px auto 27px}
  .jp-final-buttons{flex-direction:column;max-width:290px;margin:auto}
  .jp-final-buttons .jp-button{min-height:50px;font-size:15px}
  .jp-floating-inner{height:73px;gap:10px}
  .jp-floating-inner strong{font-size:14px}
  .jp-floating-inner span{font-size:11px;margin-top:1px}
  .jp-floating-inner .jp-button{font-size:14px;min-height:43px;padding:10px 15px}
  .jp-floating-links .jp-phone-link{display:none}
}
@media(max-width:600px){
  .jp-change-item p,.jp-start-item p,.jp-start-bottom p,.jp-subject-panel p,.jp-care-body p,.jp-tablet-strip p,.jp-faq-answer{font-size:16px}
  .jp-care-body ul{font-size:15px}
  .jp-admission-box dl>div{font-size:16px}
  .jp-time-row strong{font-size:16px}
}
@media(prefers-reduced-motion:reduce){
  .jp *,.jp *::after,.jp *::before{transition:none!important;animation:none!important}
}
/* ═══════════════════════════════════════════════════════════
   여기부터는 우리 사이트에 얹으면서 보탠 부분입니다.
   (원본 시안의 모양은 위쪽 그대로 · 아래는 연결/다듬기/애니메이션)
   ═══════════════════════════════════════════════════════════ */
.jp{--ease:cubic-bezier(.22,1,.36,1)}
.jp section[id]{scroll-margin-top:96px}
/* 모바일에서는 사이트 하단 퀵메뉴 위로 올라오게 (윈터스쿨 하단 띠와 같은 높이값) */
.jp-floating-cta{z-index:95}

/* ── 페이지 안 이동 띠 (원본 머리글에 있던 메뉴) ── */
.jp-secnav{background:#fff;border-bottom:1px solid var(--line)}
.jp-secnav-in{display:flex;align-items:center;gap:30px;height:62px;font-size:15px;font-weight:600;
  overflow-x:auto;scrollbar-width:none;white-space:nowrap}
.jp-secnav-in::-webkit-scrollbar{display:none}
.jp-secnav-in a{position:relative;padding:6px 0;color:#43516a;transition:color .25s}
.jp-secnav-in a:not(.jp-secnav-cta)::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;
  background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.jp-secnav-in a:hover{color:var(--ink)}
.jp-secnav-in a:not(.jp-secnav-cta):hover::after{transform:scaleX(1)}
.jp-secnav-in .jp-secnav-cta{margin-left:auto;padding:7px 16px;border:1px solid var(--gold);border-radius:3px;
  font-size:14px;color:var(--ink);transition:background .25s}
.jp-secnav-in .jp-secnav-cta:hover{background:#faf4e7}

/* ── 다듬기 ── */
.jp-subject-tabs button{transition:background .25s,color .25s}
.jp-day-tabs button{transition:color .25s,border-color .25s}
.jp-care-accordion summary h3,.jp-faq-list summary{transition:color .25s}
.jp-care-accordion summary:hover h3,.jp-faq-list summary:hover{color:var(--gold-d)}
.jp-care-accordion summary::after,.jp-faq-list summary::after{flex:0 0 auto}
.jp-admission-copy .jp-phone{transition:color .25s}
.jp-admission-copy .jp-phone:hover{color:var(--gold-d)}
.jp-campus-gallery img{transition:transform .9s var(--ease)}
.jp-campus-gallery figure:hover img{transform:scale(1.04)}
.jp-management-image img{transition:transform 1.2s var(--ease)}
.jp-management-image:hover img{transform:scale(1.035)}

/* ── 첫 화면(키비주얼) — 페이지가 열릴 때 ── */
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
.jp-r{transition:opacity .95s var(--ease),transform .95s var(--ease),clip-path 1.15s var(--ease);
  transition-delay:calc(var(--i,0) * var(--step,90ms))}
.jp-armed .jp-r:not(.is-in){opacity:0}
.jp-armed .jp-r-up:not(.is-in){transform:translateY(30px)}
.jp-armed .jp-r-left:not(.is-in){transform:translateX(-38px)}
.jp-armed .jp-r-right:not(.is-in){transform:translateX(38px)}
.jp-armed .jp-r-scale:not(.is-in){transform:scale(.9)}
.jp-armed .jp-r-tilt:not(.is-in){transform:translateY(54px) rotate(5deg)}
.jp-r-clip{clip-path:inset(0 0 0 0)}
.jp-armed .jp-r-clip:not(.is-in){opacity:1;clip-path:inset(0 0 100% 0)}
.jp-r-clip img{transition:transform 1.6s var(--ease)}
.jp-armed .jp-r-clip:not(.is-in) img{transform:scale(1.15)}

/* 선이 그어지는 효과 */
.jp-change-list{position:relative;border-top-color:transparent}
.jp-change-list::before{content:"";position:absolute;left:0;right:0;top:-2px;height:2px;background:var(--ink);
  transform-origin:left;transition:transform 1.2s var(--ease)}
.jp-armed .jp-change-col:not(.jp-seen) .jp-change-list::before{transform:scaleX(0)}
.jp-faq-list{position:relative;border-top-color:transparent}
.jp-faq-list::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--ink);
  transform-origin:left;transition:transform 1.2s var(--ease)}
.jp-armed .jp-faq-list:not(.jp-seen)::before{transform:scaleX(0)}
.jp-bridge::before,.jp-bridge::after{transition:transform 1.5s var(--ease),opacity 1.2s ease}
.jp-armed .jp-bridge:not(.jp-seen)::before,.jp-armed .jp-bridge:not(.jp-seen)::after{transform:rotate(35deg) scaleY(0);opacity:0}
.jp-day-metric{position:relative;border-top-color:transparent}
.jp-day-metric::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--line);
  transform-origin:left;transition:transform 1.2s var(--ease) .3s}
.jp-armed .jp-day-aside:not(.jp-seen) .jp-day-metric::before{transform:scaleX(0)}

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

@media(max-width:600px){
  .jp section[id]{scroll-margin-top:72px}
  .jp-secnav-in{gap:22px;height:52px;font-size:14px}
  .jp-secnav-in .jp-secnav-cta{font-size:13px;padding:6px 12px}
  .jp-armed .jp-r-left:not(.is-in){transform:translateX(-22px)}
  .jp-armed .jp-r-right:not(.is-in){transform:translateX(22px)}
}

/* ═══════════════════════════════════════════════════════════
   다듬기 — 시안의 구성·분위기는 그대로 두고 세 가지만 손봤습니다.
     ① 모서리를 조금 둥글게   ② 탁한 회색·갈색 기운을 맑게   ③ 얕은 그림자로 깊이
   ═══════════════════════════════════════════════════════════ */
.jp{--paper:#F5F7FA;--muted:#5F6B82;--gold-d:#9C7A34}

/* ① 둥글기 */
.jp-button{border-radius:10px;transition:background .2s,transform .2s,box-shadow .25s}
.jp-button:hover{box-shadow:0 14px 26px -16px rgba(16,29,53,.55)}
.jp-button.jp-gold:hover{box-shadow:0 14px 28px -14px rgba(201,170,102,.75)}
.jp-button.jp-line:hover{background:rgba(255,255,255,.1)}
.jp-secnav-in .jp-secnav-cta{border-radius:8px}
.jp-curriculum .jp-proposal-label,.jp-pending,.jp-focus-points span,.jp-record-steps span{border-radius:999px}
.jp-focus-points span{padding:6px 14px}
.jp-record-steps span{padding:7px 15px}
.jp-study-layout{border-radius:16px;box-shadow:0 18px 40px -30px rgba(16,29,53,.45)}
.jp-subject-tabs button{border-radius:10px}
.jp-management-image{border-radius:14px}
.jp-time-row.jp-main{border-radius:10px}
.jp-report{border-radius:16px}
.jp-tablet-strip img{border-radius:14px}
.jp-campus-gallery figure{border-radius:14px;box-shadow:0 16px 36px -28px rgba(16,29,53,.5);transition:transform .35s var(--ease),box-shadow .35s ease}
.jp-campus-gallery figure:hover{transform:translateY(-4px);box-shadow:0 24px 44px -28px rgba(16,29,53,.55)}
.jp-admission-box{border-radius:18px;box-shadow:0 20px 46px -34px rgba(16,29,53,.5)}

/* ② 색 — 갈색빛 금색은 맑은 금색으로, 사진과 배경은 덜 탁하게 */
.jp-hero-photo{filter:brightness(.7) saturate(.92)}
.jp-management{background:#F3F6FA}
.jp-admission{background:#F5F7FA}
.jp-time-row.jp-main{background:#FAF3E2}
.jp-curriculum .jp-proposal-label{background:#FBF4E3;border-color:#EBDDB8}
.jp-pending{background:#FBF4E3;padding:2px 11px}
.jp-campus-gallery figcaption{background:#fff}

/* ③ 작은 손질 */
.jp-change-item{transition:padding-left .35s var(--ease)}
.jp-change-item:hover{padding-left:8px}
.jp-start-item h3,.jp-change-item h3{transition:color .25s}
.jp-start-item:hover h3,.jp-change-item:hover h3{color:var(--gold-d)}
.jp-subject-tabs button[aria-selected=true]{box-shadow:0 10px 20px -12px rgba(16,29,53,.7)}
.jp-floating-cta{box-shadow:0 -10px 34px -18px rgba(16,29,53,.28)}
/* 시설 사진 — 큰 사진 칸 아래에 남던 회색 띠를 없앱니다 */
.jp-campus-gallery figure{background:#fff}
@media(min-width:851px){
  .jp-campus-gallery figure:first-child{display:flex;flex-direction:column}
  .jp-campus-gallery figure:first-child img{flex:1 1 auto;height:0;min-height:300px}
}
/* 첫 화면 개강일 안내 */
.jp-open-date{gap:8px}
.jp-open-date b{font-weight:800;color:var(--gold-light)}


/* ── 첫 화면 간편 상담 신청 ── */
.jp-hero-grid{gap:44px}
.jp-hero-copy{flex:1 1 auto;min-width:0;max-width:640px}
.jp-hero h1{font-size:clamp(40px,4.3vw,60px)}
.jp-quick{flex:0 0 384px;padding:26px 26px 24px;border-radius:16px;background:#fff;color:var(--ink);
  box-shadow:0 34px 70px -30px rgba(4,10,24,.85);animation:jpUp 1.1s var(--ease) .55s both}
.jp-quick-title{display:block;font-size:21px;font-weight:760;line-height:1.35;letter-spacing:-.035em}
.jp-quick-sub{margin-top:4px;font-size:14px;line-height:1.6;color:var(--muted)}
.jp-quick-field{margin-top:13px}
.jp-quick-label{display:block;margin-bottom:6px;font-size:13px;font-weight:650;letter-spacing:-.01em;color:#43516a}
.jp-quick-label i{margin-left:4px;font-style:normal;font-weight:500;color:#8a93a3}
.jp-quick input[type=text],.jp-quick input[type=tel],.jp-quick textarea{display:block;width:100%;padding:11px 13px;
  border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);font:inherit;font-size:15px;line-height:1.5;
  transition:border-color .2s,box-shadow .2s}
.jp-quick textarea{resize:vertical;min-height:62px}
.jp-quick input::placeholder,.jp-quick textarea::placeholder{color:#a3acba}
.jp-quick input[type=text]:focus,.jp-quick input[type=tel]:focus,.jp-quick textarea:focus{outline:0;border-color:var(--gold);
  box-shadow:0 0 0 3px rgba(201,170,102,.24)}
.jp-quick-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px}
.jp-quick-seg label{position:relative;cursor:pointer}
.jp-quick-seg input{position:absolute;opacity:0;pointer-events:none}
.jp-quick-seg span{display:block;padding:9px 6px;border:1px solid var(--line);border-radius:9px;text-align:center;
  font-size:14px;font-weight:600;color:#43516a;transition:background .2s,border-color .2s,color .2s}
.jp-quick-seg label:hover span{border-color:#b9c3d1}
.jp-quick-seg input:checked+span{background:var(--navy);border-color:var(--navy);color:#fff}
.jp-quick-seg input:focus-visible+span{outline:3px solid #a5843f;outline-offset:2px}
.jp-quick-agree{display:flex;align-items:flex-start;gap:8px;margin-top:14px;font-size:13px;line-height:1.5;color:#43516a;cursor:pointer}
.jp-quick-agree input{flex:0 0 auto;width:16px;height:16px;margin:2px 0 0;accent-color:var(--navy)}
.jp-quick-agree-detail{margin:5px 0 0 24px;font-size:11.5px;line-height:1.65;color:#8a93a3}
.jp-quick-msg{margin-top:10px;font-size:13px;line-height:1.55}
.jp-quick-msg:empty{display:none}
.jp-quick-msg.is-error{color:#c0392b}
.jp-quick-msg.is-ok{padding:10px 12px;border-radius:9px;background:#EEF7F1;color:#1f7a4d;font-weight:600}
.jp-quick-submit{width:100%;margin-top:12px;min-height:52px}
.jp-quick-submit:disabled{opacity:.6;cursor:default;transform:none;box-shadow:none}
@media(max-width:1000px){
  .jp-hero-grid{display:block}
  .jp-hero-copy{max-width:700px}
  .jp-quick{margin-top:38px;max-width:460px}
}
@media(max-width:600px){
  .jp-hero h1{font-size:clamp(33px,9.2vw,43px)}
  .jp-quick{max-width:none;margin-top:32px;padding:22px 20px 20px;border-radius:14px}
}

`;
