// ═══════════════════════════════════════════════════════════
//  /winter-final 전용 보탬 스타일
//
//  ※ 화면 틀은 설명회 상세와 같은 ev-* 를 그대로 씁니다.
//    여기에는 이 페이지에만 있는 것(회차 아코디언 등)만 wf-* 로 적습니다.
//    globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const winterFinalStyles = `
/* 오른쪽 신청서 칸 — 회차가 3개라 안쪽 여백만 줄입니다 */
.wf-pick .wf-rounds{margin-top:16px}
/* 일정 확인 안내 — 굵게 */
.wf-warn{font-weight:800;color:var(--dn-deep);word-break:keep-all}

/* ── 회차 아코디언 ── */
.wf-rounds{display:grid;gap:12px;margin-top:20px}
.wf-item{border:1px solid #E3E7EF;border-radius:16px;background:#fff;overflow:hidden;
  transition:border-color .25s ease,box-shadow .25s ease}
.wf-item.is-open{border-color:var(--dn-gold);
  box-shadow:0 20px 44px -30px rgba(16,25,46,.5)}

.wf-round{display:block;width:100%;padding:16px 16px;border:0;background:none;
  text-align:left;cursor:pointer;font:inherit;color:inherit}
.wf-round:hover{background:#FAFBFD}
.wf-grade{display:flex;align-items:baseline;gap:8px;margin-bottom:12px}
.wf-grade b{font-size:19px;font-weight:900;letter-spacing:-.035em;color:var(--dn-navy)}
.wf-grade>span{font-size:12px;font-weight:700;color:var(--dn-gold)}
.wf-when{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;
  padding:11px 0;border-top:1px solid #EDF0F6;border-bottom:1px solid #EDF0F6}
.wf-when b{font-size:15px;font-weight:800;letter-spacing:-.03em;color:var(--dn-deep)}
.wf-when span{font-size:13.5px;font-weight:700;color:var(--dn-gold)}
.wf-msg{display:block;margin-top:12px;font-size:13.5px;line-height:1.7;
  color:#6B7485;word-break:keep-all}
.wf-go{display:inline-flex;align-items:center;gap:7px;margin-top:14px;
  font-size:13px;font-weight:800;letter-spacing:-.02em;color:var(--dn-navy)}
.wf-go i{font-style:normal;font-size:15px;line-height:1;transition:transform .3s ease}
.wf-item.is-open .wf-go{color:var(--dn-gold)}
.wf-item.is-open .wf-go i{transform:rotate(180deg)}

/* 펼쳐진 신청서 칸 */
.wf-panel{padding:0 12px 16px;border-top:1px solid #EDF0F6;background:#FAFBFD;
  animation:wfOpen .34s cubic-bezier(.22,1,.36,1)}
@keyframes wfOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.wf-panel .rv{margin-top:18px}

/* ── "설명회에서 확인하실 수 있습니다" 4칸 ── */
.wf-points{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:18px clamp(18px,2.6vw,34px);margin:16px 0 0;padding:0;list-style:none}
.wf-points li{padding-top:15px;border-top:2px solid var(--dn-navy)}
.wf-points b{display:block;margin-bottom:8px;font-size:11px;font-weight:800;
  letter-spacing:.18em;color:var(--dn-gold)}
.wf-points strong{display:block;margin-bottom:7px;font-size:16px;font-weight:800;
  letter-spacing:-.035em;color:var(--dn-deep)}
.wf-points span{font-size:13.5px;line-height:1.75;color:#6B7485;word-break:keep-all}

.wf-tel{margin:20px 0 0;font-size:13px;color:#9AA1AC}
.wf-tel a{font-weight:800;color:var(--dn-navy);text-decoration:none}

@media(max-width:720px){
  .wf-points{grid-template-columns:1fr;gap:16px}
  .wf-round{padding:15px 14px}
  .wf-panel{padding:0 10px 14px}
  .wf-grade b{font-size:18px}
}
`;
