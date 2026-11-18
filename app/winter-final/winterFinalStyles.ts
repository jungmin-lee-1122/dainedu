// ═══════════════════════════════════════════════════════════
//  /winter-final 전용 보탬 스타일
//
//  ※ 화면 틀은 설명회 상세와 같은 ev-* 를 그대로 씁니다.
//    여기에는 이 페이지에만 있는 것(회차 카드 등)만 wf-* 로 적습니다.
//    globals.css 는 건드리지 않습니다.
// ═══════════════════════════════════════════════════════════
export const winterFinalStyles = `
/* ── 오른쪽 "회차 고르기" 칸 ── */
.wf-rounds{display:grid;gap:10px;margin-top:18px}
.wf-round{display:block;padding:16px 16px 14px;border:1px solid #E3E7EF;border-radius:14px;
  background:#fff;text-decoration:none;
  transition:border-color .25s ease,box-shadow .25s ease,transform .25s ease}
.wf-round:hover{border-color:var(--dn-gold);transform:translateY(-2px);
  box-shadow:0 16px 34px -26px rgba(16,25,46,.55)}
.wf-grade{display:flex;align-items:baseline;gap:7px;margin:0 0 11px}
.wf-grade b{font-family:"Noto Serif KR",serif;font-size:19px;font-weight:900;
  letter-spacing:-.04em;color:var(--dn-deep)}
.wf-grade span{font-size:11.5px;font-weight:700;color:var(--dn-gold)}
.wf-when{margin:0;padding:10px 0;border-top:1px solid #EDF0F6;border-bottom:1px solid #EDF0F6;
  display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.wf-when b{font-size:14px;font-weight:800;letter-spacing:-.03em;color:var(--dn-deep)}
.wf-when span{font-size:13px;font-weight:700;color:var(--dn-gold)}
.wf-msg{margin:11px 0 0;font-size:13px;line-height:1.7;color:#6B7485;word-break:keep-all}
.wf-go{display:inline-flex;align-items:center;gap:6px;margin-top:13px;
  font-size:12.5px;font-weight:800;letter-spacing:-.02em;color:var(--dn-navy)}
.wf-go i{font-style:normal;transition:transform .25s ease}
.wf-round:hover .wf-go{color:var(--dn-gold)}
.wf-round:hover .wf-go i{transform:translateX(4px)}
.wf-tel{margin:16px 0 0;font-size:12.5px;color:#9AA1AC;text-align:center}
.wf-tel a{font-weight:800;color:var(--dn-navy);text-decoration:none}

/* ── 본문의 "설명회에서 확인하실 수 있습니다" 4칸 ── */
.wf-points{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:18px clamp(18px,2.6vw,34px);margin:16px 0 0;padding:0;list-style:none}
.wf-points li{padding-top:15px;border-top:2px solid var(--dn-navy)}
.wf-points b{display:block;margin-bottom:8px;font-size:11px;font-weight:800;
  letter-spacing:.18em;color:var(--dn-gold)}
.wf-points strong{display:block;margin-bottom:7px;font-size:16px;font-weight:800;
  letter-spacing:-.035em;color:var(--dn-deep)}
.wf-points span{font-size:13.5px;line-height:1.75;color:#6B7485;word-break:keep-all}

@media(max-width:720px){
  .wf-points{grid-template-columns:1fr;gap:16px}
  .wf-round{padding:14px 14px 12px}
}
`;
