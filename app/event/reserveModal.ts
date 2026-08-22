// ═══════════════════════════════════════════════════════════
//  예약 신청서 마크업 (상세 페이지 우측 칸에 들어갑니다)
//  ※ 입력 항목을 바꾸려면 아래 HTML 과 eventData.ts 의 선택지를 함께 수정하세요.
// ═══════════════════════════════════════════════════════════
import { FORM_GRADES, FORM_TRACKS, FORM_COMPANIONS, FORM_SOURCES } from "./eventData";

const opts = (list: string[]) =>
  list.map((v) => `<option value="${v}">${v}</option>`).join("");

export function reserveModalMarkup(ev: {
  id: string;
  title: string;
  date: string;
  targets: string;
  place: string;
}) {
  return `
<div class="rv" id="reserve">

  <div class="rv-panel" aria-labelledby="rvHeading">
    <div class="rv-head">
      <h2 class="rv-title" id="rvHeading">예약 신청서</h2>
      <span class="rv-head-tag">선착순</span>
    </div>

    <div class="rv-body">
      <!-- 신청하는 설명회 요약 -->
      <div class="rv-target">
        <b class="rv-target-title">${ev.title}</b>
        <ul class="rv-target-meta">
          <li><span>일시</span>${ev.date}</li>
          <li><span>대상</span>${ev.targets}</li>
          <li><span>장소</span>${ev.place}</li>
        </ul>
      </div>

      <ul class="rv-guide">
        <li>예약은 선착순으로 진행되며, 예약 상황에 따라 조기 마감될 수 있습니다.</li>
        <li>등록하신 연락처로 설명회 안내 문자를 보내드리니 정확하게 입력해 주세요.</li>
        <li>예약 취소·변경은 대표번호(031-8003-0221)로 연락해 주세요.</li>
      </ul>

      <form class="rv-form" id="rvForm" novalidate>
        <input type="hidden" name="eventId" value="${ev.id}" />
        <input type="hidden" name="eventTitle" value="${ev.title}" />
        <input type="hidden" name="eventDate" value="${ev.date}" />

        <!-- 예약자 구분 -->
        <div class="rv-field">
          <span class="rv-label">예약자 구분 <i>필수</i></span>
          <div class="rv-radios">
            <label class="rv-radio">
              <input type="radio" name="who" value="학부모" checked />
              <span>학부모</span>
            </label>
            <label class="rv-radio">
              <input type="radio" name="who" value="학생" />
              <span>학생</span>
            </label>
          </div>
        </div>

        <!-- 이름 -->
        <div class="rv-field">
          <label class="rv-label" for="rvName">이름 <i>필수</i></label>
          <input id="rvName" name="name" type="text" maxlength="30" placeholder="이름을 입력해 주세요" autocomplete="name" />
          <p class="rv-err" data-err="name">이름을 입력해 주세요.</p>
        </div>

        <!-- 휴대전화 -->
        <div class="rv-field">
          <label class="rv-label" for="rvPhone">휴대전화번호 <i>필수</i></label>
          <input id="rvPhone" name="phone" type="tel" inputmode="numeric" maxlength="13" placeholder="010-0000-0000" autocomplete="tel" />
          <p class="rv-help">입력하신 번호로 설명회 안내 문자를 보내드립니다.</p>
          <p class="rv-err" data-err="phone">휴대전화번호를 정확히 입력해 주세요.</p>
        </div>

        <!-- 학교명 -->
        <div class="rv-field">
          <label class="rv-label" for="rvSchool">학교명 <i>필수</i></label>
          <input id="rvSchool" name="school" type="text" maxlength="40" placeholder="예) 동탄국제고등학교" />
          <p class="rv-err" data-err="school">학교명을 입력해 주세요.</p>
        </div>

        <!-- 학년 -->
        <div class="rv-field">
          <label class="rv-label" for="rvGrade">학년 <i>필수</i></label>
          <select id="rvGrade" name="grade">
            <option value="">선택해 주세요</option>
            ${opts(FORM_GRADES)}
          </select>
          <p class="rv-err" data-err="grade">학년을 선택해 주세요.</p>
        </div>

        <!-- 계열 -->
        <div class="rv-field">
          <label class="rv-label" for="rvTrack">계열 <i>필수</i></label>
          <select id="rvTrack" name="track">
            <option value="">선택해 주세요</option>
            ${opts(FORM_TRACKS)}
          </select>
          <p class="rv-err" data-err="track">계열을 선택해 주세요.</p>
        </div>

        <!-- 동반인 수 -->
        <div class="rv-field">
          <label class="rv-label" for="rvCompanion">동반인 수 <i>필수</i></label>
          <select id="rvCompanion" name="companion">
            <option value="">선택해 주세요</option>
            ${opts(FORM_COMPANIONS)}
          </select>
          <p class="rv-help">본인을 포함한 인원으로 좌석을 배정합니다.</p>
          <p class="rv-err" data-err="companion">동반인 수를 선택해 주세요.</p>
        </div>

        <!-- 유입경로 -->
        <div class="rv-field">
          <label class="rv-label" for="rvSource">유입경로 <i>필수</i></label>
          <select id="rvSource" name="source">
            <option value="">선택해 주세요</option>
            ${opts(FORM_SOURCES)}
          </select>
          <p class="rv-err" data-err="source">유입경로를 선택해 주세요.</p>
        </div>

        <!-- 개인정보 동의 -->
        <div class="rv-agree-box">
          <h3 class="rv-agree-head">개인정보 수집 및 이용 동의</h3>

          <label class="rv-agree rv-agree-all">
            <input type="checkbox" id="rvAgreeAll" />
            <span><b>전체 동의</b></span>
          </label>

          <div class="rv-agree-item">
            <label class="rv-agree">
              <input type="checkbox" name="agreeRequired" data-agree />
              <span><em>(필수)</em> 개인정보 수집 및 이용 동의</span>
            </label>
            <button class="rv-agree-toggle" type="button" aria-expanded="false" aria-label="약관 펼치기">˅</button>
            <div class="rv-agree-detail" hidden>
              <p><b>수집 목적</b> — 설명회 사전예약 및 예약 확인 문자 발송, 입시정보 제공</p>
              <p><b>수집 항목</b> — 예약자 구분, 이름, 휴대전화번호, 학교명, 학년, 계열, 동반인 수, 유입경로</p>
              <p><b>보유 기간</b> — 설명회 종료 후 1년간 보관 후 파기</p>
              <p class="rv-agree-warn">동의를 거부하실 수 있으나, 거부 시 설명회 예약이 제한됩니다.</p>
            </div>
          </div>

          <div class="rv-agree-item">
            <label class="rv-agree">
              <input type="checkbox" name="agreeMarketing" data-agree />
              <span>(선택) 마케팅 · 광고 활용 동의</span>
            </label>
            <button class="rv-agree-toggle" type="button" aria-expanded="false" aria-label="약관 펼치기">˅</button>
            <div class="rv-agree-detail" hidden>
              <p><b>수집 목적</b> — 신규 강좌·설명회·이벤트 등 광고성 정보 문자 발송</p>
              <p><b>보유 기간</b> — 동의 철회 시까지</p>
              <p class="rv-agree-warn">동의하지 않으셔도 설명회 예약은 정상적으로 진행됩니다.</p>
            </div>
          </div>

          <p class="rv-err" data-err="agreeRequired">필수 항목에 동의해 주세요.</p>
        </div>

        <p class="rv-formmsg" id="rvMsg" hidden></p>

        <button class="rv-submit" type="submit" id="rvSubmit">예약하기</button>
      </form>
    </div>
  </div>

  <!-- 완료 화면 -->
  <div class="rv-panel rv-done" id="rvDone" hidden aria-labelledby="rvDoneHeading">
    <div class="rv-done-in">
      <span class="rv-done-mark" aria-hidden="true">
        <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M15 26.5 l8 8 14 -16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <h2 class="rv-done-title" id="rvDoneHeading">예약이 접수되었습니다</h2>
      <p class="rv-done-desc">
        입력하신 번호로 안내 문자를 보내드립니다.<br />
        설명회 당일, 예약자 성함으로 입장 확인해 주세요.
      </p>
      <div class="rv-done-act">
        <a class="rv-done-btn" href="/event">다른 일정 보기</a>
      </div>
    </div>
  </div>
</div>
`;
}
