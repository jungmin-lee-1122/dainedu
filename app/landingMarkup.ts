// 다인교육 랜딩페이지 마크업 (텍스트/문구는 이 파일에서 수정하세요)
import { quickMenuMarkup } from "./quickMenu";
export const landingMarkup = `
<main class="dn-body">
  <a class="dn-topbar" href="https://dain-edu.higgsfield.app/seminar" aria-label="설명회 사전등록 안내"><span class="dn-topbar-mark">※</span><span class="dn-entry-badge">9/19 SAT</span><h3 class="dn-topbar-title">설명회 사전등록</h3><span class="dn-topbar-desc">그랜드 오픈 설명회 <b>좌석을 먼저 확보</b>하세요.</span></a>
  <nav class="dn-nav" aria-label="주 메뉴">
    <a class="dn-nav-brand" href="#top"><img src="/dain-icon.png" alt="다인교육" class="dn-nav-icon"/><span class="dn-nav-brandtext"><b class="dn-nav-name">DAIN EDU</b><span class="dn-nav-line"></span><span class="dn-nav-clock js-clock" id="dnClock">00:00:00</span></span></a>
    <ul class="dn-gnb">
      <li class="dn-gnb-item">
        <a href="#about">학원소개</a>
        <div class="dn-gnb-sub">
          <a href="#about">인사말</a>
          <a href="#about">시설 안내</a>
          <a href="#about">오시는 길</a>
          <a href="#system">운영시스템</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="#teachers">강사진 소개</a>
        <div class="dn-gnb-sub">
          <a href="#teachers">국어</a>
          <a href="#teachers">수학</a>
          <a href="#teachers">영어</a>
          <a href="#teachers">탐구</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="#program">모집안내</a>
        <div class="dn-gnb-sub">
          <a href="#program">재수종합</a>
          <a href="#program">독학재수</a>
          <a href="#program">고등종합</a>
          <a href="#program">단과</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="#contents">콘텐츠</a>
        <div class="dn-gnb-sub">
          <a href="#contents">영단어 데일리 테스트</a>
          <a href="#contents">빈칸·순서·삽입 데일리 훈련</a>
          <a href="#contents">학과 적성 찾기</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="#life">학원생활</a>
        <div class="dn-gnb-sub">
          <a href="#life">하루 일과</a>
          <a href="#life">급식·편의</a>
          <a href="#life">상담 문의</a>
        </div>
      </li>
    </ul>
    <span class="dn-navcta dn-dday" aria-label="수능 디데이"><span class="cta-label" id="dnDdayCap">수능</span><span class="cta-badge" id="dnDdayNum">D-…</span></span>
  </nav>
  <div class="dn-oneview">
    <section class="dn-rolling" id="top">
      <div class="dn-wrap">
        <div class="dn-rolling-row">
          <div class="dn-slider" id="dnSlider">
            <div class="dn-slides">
              <a class="dn-slide" href="https://dain-edu.higgsfield.app/seminar"><picture><source media="(max-width:900px)" srcset="/slideA-m.png"/><img src="/slideA.png" alt="다인교육 그랜드 오픈"/></picture></a>
              <a class="dn-slide" href="https://dain-edu.higgsfield.app/seminar"><picture><source media="(max-width:900px)" srcset="/slideB-m.png"/><img src="/slideB.png" alt="최고의 강사진이 동탄에서"/></picture></a>
              <a class="dn-slide" href="https://dain-edu.higgsfield.app/seminar"><picture><source media="(max-width:900px)" srcset="/slideC-m.png"/><img src="/slideC.png" alt="시작부터 완성까지 한곳에서"/></picture></a>
              <a class="dn-slide" href="https://dain-edu.higgsfield.app/seminar"><picture><source media="(max-width:900px)" srcset="/slideD-m.png"/><img src="/slideD.png" alt="새로운 입시의 기준을 세우다"/></picture></a>
            </div>
            <div class="dn-slider-ctrl">
              <button class="dn-slider-btn" type="button" data-dir="prev" aria-label="이전 슬라이드">‹</button>
              <button class="dn-slider-btn" type="button" data-dir="next" aria-label="다음 슬라이드">›</button>
              <span class="dn-slider-count"><b class="dn-cur">01</b><span class="dn-line"><i class="dn-line-fill"></i></span><span class="dn-total">03</span></span>
            </div>
          </div>
          <a class="dn-poster" href="https://dain-edu.higgsfield.app/seminar"><img src="/poster-dain2.png" alt="다인교육 그랜드 오픈 설명회 포스터"/></a>
        </div>
      </div>
    </section>
    <!-- dn-banner 숨김 (복원하려면 이 줄과 아래 닫는 주석만 지우세요) -->
    <!--<section class="dn-banner"><div class="dn-wrap"><a class="dn-banner-link" href="https://dain-edu.higgsfield.app/seminar"><img src="/grand-open.png" alt="다인교육 그랜드 오픈 입시 히어로, 그들이 왔다" class="dn-banner-img"/></a></div></section>-->
    <section class="dn-halls">
      <div class="dn-wrap">
        <div class="dn-halls-grid">
          <a class="dn-hall-card" href="/clavis">
            <div class="dn-hall-text">
              <span class="dn-hall-label">CLAVIS HIGH<span class="dn-hall-label-sub"> | 명문대 합격의 열쇠, 핵심 커리큘럼</span></span>
              <div class="dn-hall-title-row">
                <h3 class="dn-hall-title">고등 클라비스</h3>
                <span class="dn-hall-play" aria-hidden="true">›</span>
              </div>
            </div>
            <svg class="dn-hall-books" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="18" y="80" width="106" height="20" rx="4" fill="#24365A"/><rect x="18" y="80" width="14" height="20" rx="4" fill="#C0994F"/><rect x="26" y="57" width="98" height="20" rx="4" fill="#2E4470"/><rect x="26" y="57" width="14" height="20" rx="4" fill="#D9BE8C"/><rect x="12" y="34" width="102" height="20" rx="4" fill="#10192E"/><rect x="12" y="34" width="14" height="20" rx="4" fill="#C0994F"/><path d="M92 34 v24 l-7 -6 -7 6 v-24 z" fill="#C0994F"/></svg>
          </a>
          <a class="dn-hall-card" href="/aurum">
            <div class="dn-hall-text">
              <span class="dn-hall-label">AURUM RE-START<span class="dn-hall-label-sub"> | 빛나는 황금기를 여는 재도전 시스템</span></span>
              <div class="dn-hall-title-row">
                <h3 class="dn-hall-title">N수 아우룸</h3>
                <span class="dn-hall-play" aria-hidden="true">›</span>
              </div>
            </div>
            <svg class="dn-hall-books" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M46 30 H34 Q26 30 26 40 Q26 52 44 55" fill="none" stroke="#C0994F" stroke-width="5" stroke-linecap="round"/><path d="M94 30 H106 Q114 30 114 40 Q114 52 96 55" fill="none" stroke="#C0994F" stroke-width="5" stroke-linecap="round"/><path d="M46 24 H94 V44 Q94 70 70 74 Q46 70 46 44 Z" fill="#C0994F"/><path d="M70 38 l2.8 5.6 6.2 0.9 -4.5 4.4 1.1 6.2 -5.6 -2.9 -5.6 2.9 1.1 -6.2 -4.5 -4.4 6.2 -0.9 z" fill="#F2E3C4"/><rect x="65" y="74" width="10" height="12" fill="#A87F38"/><rect x="52" y="86" width="36" height="7" rx="2" fill="#24365A"/><rect x="45" y="93" width="50" height="9" rx="2" fill="#24365A"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
  <footer class="dn-footer">
    <div class="dn-wrap dn-foot">
      <div class="dn-foot-left">
        <div class="dn-foot-brand"><img src="/dain-foot-icon.png" alt="다인교육" class="dn-foot-icon"/><span class="dn-foot-brandtext"><b class="dn-foot-name">DAIN EDU</b><span class="dn-foot-brandline"></span><span class="dn-foot-clock js-clock">00:00:00</span></span></div>
        <div class="dn-foot-tel-wrap">
          <button class="dn-foot-tel" id="footTelBtn" type="button" aria-expanded="false" aria-label="대표번호 펼치기">031-8003-0221<span class="dn-foot-tel-caret" aria-hidden="true">▾</span></button>
          <div class="dn-foot-tel-menu" id="footTelMenu">
            <a href="tel:03180030221"><span class="dn-tel-label">주식회사 다인교육 (본점)</span><span class="dn-tel-num">031-8003-0221</span></a>
            <a href="tel:03180030222"><span class="dn-tel-label">다인 학습센터</span><span class="dn-tel-num">031-8003-0222</span></a>
            <a href="tel:03180030224"><span class="dn-tel-label">다인 아카데미</span><span class="dn-tel-num">031-8003-0224</span></a>
          </div>
        </div>
        <nav class="dn-foot-links">
          <a href="#about">회사소개</a>
          <a href="#terms">이용약관</a>
          <a href="#privacy">개인정보 처리방침</a>
        </nav>
        <div class="dn-foot-info">
          <p>다인아카데미<span class="dn-foot-sep">|</span>대표 (주)다인교육<span class="dn-foot-sep">|</span>e-mail: help@dain-edu.com</p>
          <p>개인정보보호책임자: 김양현<span class="dn-foot-sep">|</span>대표번호 031-8003-0221<span class="dn-foot-sep">|</span>주소: 경기도 화성시 동탄 메타폴리스로 53, 6층</p>
          <p>사업자등록번호 421-85-03313<span class="dn-foot-sep">|</span>학원설립·운영등록번호: 제0000호 다인아카데미<span class="dn-foot-badge">교습비 안내</span></p>
        </div>
        <p class="dn-foot-copy">Copyright © DAIN EDU. All Rights Reserved.</p>
      </div>
      <div class="dn-foot-sns">
        <a href="#" class="dn-sns dn-sns-kakao" aria-label="카카오톡"><img src="https://cdn.simpleicons.org/kakaotalk/391B1B" alt="카카오톡"/></a>
        <a href="#" class="dn-sns dn-sns-youtube" aria-label="유튜브"><img src="https://cdn.simpleicons.org/youtube/white" alt="유튜브"/></a>
        <a href="#" class="dn-sns dn-sns-naver" aria-label="네이버 블로그"><img src="https://cdn.simpleicons.org/naver/white" alt="네이버 블로그"/></a>
        <a href="#" class="dn-sns dn-sns-insta" aria-label="인스타그램"><img src="https://cdn.simpleicons.org/instagram/white" alt="인스타그램"/></a>
        <a href="#" class="dn-sns dn-sns-facebook" aria-label="페이스북"><img src="https://cdn.simpleicons.org/facebook/white" alt="페이스북"/></a>
      </div>
    </div>
  </footer>
  ${quickMenuMarkup}
  <audio id="bgm" src="/bgm.m4a" loop preload="auto"></audio>
  <button class="dn-bgm" id="bgmBtn" type="button" aria-label="배경음악 켜기/끄기"><svg class="dn-bgm-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><svg class="dn-bgm-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 9l6 6M22 9l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
</main>
`;
