// ═══════════════════════════════════════════════════════════
//  메인 페이지 윈터스쿨 팝업
//  · 처음 들어오면 자동으로 열립니다.
//  · "오늘 하루 보지 않기" 를 누르면 그날 자정까지 다시 열리지 않습니다.
//  · 신청하기 버튼은 설명회 상세 페이지로 이동합니다.
//
//  문구·일정은 아래 HTML 에서 바로 고치시면 됩니다.
// ═══════════════════════════════════════════════════════════
export const winterPopupMarkup = `
<div class="wp-dim" id="wpPopup" hidden>
  <div class="wp-box" role="dialog" aria-modal="true" aria-labelledby="wpTitle">
    <button class="wp-close" type="button" aria-label="팝업 닫기">&times;</button>

    <a class="wp-poster" href="https://dainedu.co.kr/event/1">
      <picture>
        <source media="(max-width:900px)" srcset="/winter-poster-m.jpg"/>
        <img src="/winter-poster.jpg" alt="2027 다인 윈터스쿨 — 2027.01.04(월) 개강 · 선착순 모집"/>
      </picture>
    </a>

    <div class="wp-body">
      <p class="wp-eyebrow">2027 DAIN WINTER SCHOOL</p>
      <h3 class="wp-title" id="wpTitle">윈터스쿨 사전 예약 및 상담 신청</h3>
      <p class="wp-lead">
        수능 직후부터 개강까지, 가장 격차가 벌어지는 7주. 대치·목동·분당·평촌에서 검증된
        강사진의 수업과 4대 밀착 관리로 예비 고1·고2·고3의 겨울을 학기급으로 설계합니다.
      </p>

      <div class="wp-facts">
        <div><b>개강</b><span>2027. 01. 04 (월)</span></div>
        <div><b>기간</b><span>01. 04 ~ 02. 19 · 7주</span></div>
        <div><b>대상</b><span>예비 고1 · 고2 · 고3</span></div>
        <div><b>모집</b><span>선착순 · 상담 후 반 배정</span></div>
      </div>

      <ul class="wp-points">
        <li>학원가가 증명한 강사진의 전 과목 정규 수업</li>
        <li>1인 1지정석 자습 · 담임 밀착 관리 · 데일리 리포트</li>
        <li>1:1 입시전략 컨설팅으로 겨울 계획 설계</li>
      </ul>

      <a class="wp-submit" href="https://dainedu.co.kr/event/1">신청하기</a>

      <div class="wp-foot">
        <button class="wp-today" type="button">오늘 하루 보지 않기</button>
        <a class="wp-more" href="/winter">윈터스쿨 상세 요강 →</a>
      </div>
    </div>
  </div>
</div>
`;
