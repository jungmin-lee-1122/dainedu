// 다인에듀 랜딩페이지 마크업 (텍스트/문구는 이 파일에서 수정하세요)
import { quickMenuMarkup } from "./quickMenu";
export const landingMarkup = `
<main class="dn-body">
  <div class="dn-topbar" role="note" aria-label="2027 윈터스쿨 사전 예약 안내"><span class="dn-topbar-mark">※</span><span class="dn-entry-badge">사전 예약제</span><h3 class="dn-topbar-title">2027 윈터스쿨 사전 예약</h3><span class="dn-topbar-desc">1월 4일 개강 · 예비 고1·고2·고3 <b>상담 접수 중</b>입니다.</span></div>
  <nav class="dn-nav" aria-label="주 메뉴">
    <a class="dn-nav-brand" href="#top"><img src="/dain-icon2.png" alt="다인에듀" class="dn-nav-icon"/><span class="dn-nav-brandtext"><b class="dn-nav-name">DAIN EDU</b><span class="dn-nav-line"></span><span class="dn-nav-clock js-clock" id="dnClock">00:00:00</span></span></a>
    <ul class="dn-gnb">
      <li class="dn-gnb-item">
        <a href="#about">학원소개</a>
        <div class="dn-gnb-sub">
          <a href="/greeting">인사말</a>
          <a href="/space">시설 안내</a>
          <a href="/shuttle">셔틀버스 안내</a>
          <a href="/about/location">오시는 길</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="/teachers">강사진 소개</a>
        <div class="dn-gnb-sub">
          <a href="/teachers">전체</a>
          <a href="/teachers?subject=국어">국어</a>
          <a href="/teachers?subject=수학">수학</a>
          <a href="/teachers?subject=영어">영어</a>
          <a href="/teachers?subject=사회탐구">사회탐구</a>
          <a href="/teachers?subject=과학탐구">과학탐구</a>
          <a href="/teachers?subject=논술">논술</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="#program">모집안내</a>
        <div class="dn-gnb-sub dn-gnb-sub-grouped">
          <a href="/pre-winter">2027 PRE 윈터스쿨</a>
          <a href="/winter">2027 윈터스쿨</a>
          <!-- 2028 재수종합반 — 페이지가 준비되면 <a href="..."> 로 바꿔주세요 -->
          <span class="dn-gnb-soon">2028 재수종합반</span>
          <span class="dn-gnb-gtitle">고등부 단과</span>
          <a href="/schedule">단과 시간표</a>
        </div>
      </li>
      <li class="dn-gnb-item">
        <a href="/event">설명회 · 입시</a>
        <div class="dn-gnb-sub dn-gnb-sub-grouped">
          <span class="dn-gnb-gtitle">설명회</span>
          <a href="/event">설명회 안내</a>
          <span class="dn-gnb-gtitle">입시</span>
          <a href="/archive">입시자료 · 소식</a>
        </div>
      </li>
      <!-- 콘텐츠 메뉴 숨김: 다시 보이려면 아래 주석만 풀어주세요
      <li class="dn-gnb-item">
        <a href="#contents">콘텐츠</a>
        <div class="dn-gnb-sub">
          <a href="#contents">영단어 데일리 테스트</a>
          <a href="#contents">빈칸·순서·삽입 데일리 훈련</a>
          <a href="#contents">학과 적성 찾기</a>
        </div>
      </li>
      -->
      <li class="dn-gnb-item">
        <a href="/notices">학원생활</a>
        <div class="dn-gnb-sub">
          <a href="/notices">공지사항</a>
          <a href="/consult">상담문의</a>
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
              <div class="dn-slide"><picture><source media="(max-width:900px)" srcset="/slide-open2-m.png"/><img src="/slide-open2.png" alt="다인에듀 2026.10.01 그랜드 오픈 — 고등부·N수 프리미엄 캠퍼스"/></picture></div>
              <div class="dn-slide"><picture><source media="(max-width:900px)" srcset="/slideB-m.png"/><img src="/slideB.png" alt="최고의 강사진이 동탄에서"/></picture></div>
              <div class="dn-slide"><picture><source media="(max-width:900px)" srcset="/slideC-m.png"/><img src="/slideC.png" alt="시작부터 완성까지 한곳에서"/></picture></div>
              <div class="dn-slide"><picture><source media="(max-width:900px)" srcset="/slideD-m.png"/><img src="/slideD.png" alt="새로운 입시의 기준을 세우다"/></picture></div>
            </div>
            <div class="dn-slider-ctrl">
              <button class="dn-slider-btn" type="button" data-dir="prev" aria-label="이전 슬라이드">‹</button>
              <button class="dn-slider-btn" type="button" data-dir="next" aria-label="다음 슬라이드">›</button>
              <span class="dn-slider-count"><b class="dn-cur">01</b><span class="dn-line"><i class="dn-line-fill"></i></span><span class="dn-total">03</span></span>
            </div>
          </div>
          <!-- 포스터 — 설명회 2장이 번갈아 돌아갑니다. 바꾸려면 아래 <a> 두 줄의 주소와 이미지만 고치세요. -->
          <!-- 포스터 — 4장이 번갈아 돌아갑니다.
               바꾸려면 아래 슬라이드의 이미지 경로만 고치세요.
               링크를 걸 때는 <div class="dn-poster-sl"> 를 <a href="..."> 로 바꾸면 됩니다. -->
          <div class="dn-poster dn-poster-roll" id="dnPosterRoll">
            <a class="dn-poster-sl is-on" href="/events/event-mvkq1sai0bkt"><picture><source media="(max-width:900px)" srcset="/poster-sem1-m.jpg"/><img src="/poster-sem1.jpg" alt="고교 선택 전략 &amp; 예비고1 대입 성공 로드맵 설명회 — 다인에듀 동탄점"/></picture></a>
            <a class="dn-poster-sl" href="/events/event-mvkq3sx6rfv1"><picture><source media="(max-width:900px)" srcset="/poster-sem2-m.jpg"/><img src="/poster-sem2.jpg" alt="예비 고2·고3 대입 전략 설명회 — 다인에듀 동탄점"/></picture></a>
            <a class="dn-poster-sl" href="/pre-winter"><picture><source media="(max-width:900px)" srcset="/poster-pre-go1-m.jpg"/><img src="/poster-pre-go1.jpg" alt="예비고1을 위한 PRE WINTER SCHOOL — 다인에듀 동탄점"/></picture></a>
            <a class="dn-poster-sl" href="/pre-winter"><picture><source media="(max-width:900px)" srcset="/poster-pre-go23-m.jpg"/><img src="/poster-pre-go23.jpg" alt="수능실전 딥다이브 수학특강 — 예비 고2·고3"/></picture></a>
            <a class="dn-poster-sl" href="/events/event-mwacxlpxjs77"><picture><source media="(max-width:900px)" srcset="/poster-pre-sem3-m.jpg"/><img src="/poster-pre-sem3.jpg" alt="2027 프리윈터스쿨 &amp; 수학 설명회 — 11월 21일(토) 오후 6시 30분 · 다인에듀 본관 스타프라자 6층 · 예비 고1·고2·고3 학생 및 학부모 대상 · 강연 임종희 부원장"/></picture></a>

            <!-- 리모콘 — 화살표로 넘기고, 점을 눌러 바로 이동합니다 -->
            <div class="dn-poster-ctrl">
              <button class="dn-poster-arrow" type="button" data-dir="prev" aria-label="이전 포스터">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <span class="dn-poster-dots">
                <button class="is-on" type="button" data-go="0" aria-label="1번 포스터"></button>
                <button type="button" data-go="1" aria-label="2번 포스터"></button>
                <button type="button" data-go="2" aria-label="3번 포스터"></button>
                <button type="button" data-go="3" aria-label="4번 포스터"></button>
                <button type="button" data-go="4" aria-label="5번 포스터"></button>
              </span>
              <button class="dn-poster-arrow" type="button" data-dir="next" aria-label="다음 포스터">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- dn-banner 숨김 (복원하려면 이 줄과 아래 닫는 주석만 지우세요) -->
    <!--<section class="dn-banner"><div class="dn-wrap"><a class="dn-banner-link" href="/events/event-muy3rsg1ajvr"><img src="/grand-open.png" alt="다인에듀 그랜드 오픈 입시 히어로, 그들이 왔다" class="dn-banner-img"/></a></div></section>-->
    <section class="dn-halls">
      <div class="dn-wrap">
        <div class="dn-halls-grid">
          <a class="dn-hall-card" href="/porta">
            <div class="dn-hall-text">
              <span class="dn-hall-label">PORTA H<span class="dn-hall-label-sub"> | 합격의 문을 짓는 3년의 설계를 담다</span></span>
              <div class="dn-hall-title-row">
                <h3 class="dn-hall-title">포르타<span class="dn-hall-div" aria-hidden="true"></span>고등전문관</h3>
                <span class="dn-hall-play" aria-hidden="true">›</span>
              </div>
            </div>
            <svg class="dn-hall-books" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="bkF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E4470"/><stop offset="1" stop-color="#16233E"/></linearGradient><linearGradient id="bkT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#55709F"/><stop offset="1" stop-color="#36507E"/></linearGradient><linearGradient id="bkS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2840"/><stop offset="1" stop-color="#0E1728"/></linearGradient><linearGradient id="bkG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F0DCB4"/><stop offset=".5" stop-color="#C0994F"/><stop offset="1" stop-color="#9A7735"/></linearGradient><linearGradient id="bkGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".45"/><stop offset=".42" stop-color="#ffffff" stop-opacity=".07"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient><radialGradient id="bkSh"><stop offset="0" stop-color="#16233E" stop-opacity=".32"/><stop offset="1" stop-color="#16233E" stop-opacity="0"/></radialGradient></defs><ellipse cx="68" cy="108" rx="54" ry="8" fill="url(#bkSh)"/><path d="M14 86 L28 77 L124 77 L110 86 Z" fill="url(#bkT)"/><path d="M110 86 L124 77 L124 93 L110 102 Z" fill="url(#bkS)"/><rect x="14" y="86" width="96" height="16" rx="2.5" fill="url(#bkF)"/><rect x="14" y="86" width="13" height="16" rx="2.5" fill="url(#bkG)"/><rect x="14" y="86" width="96" height="16" rx="2.5" fill="url(#bkGl)"/><path d="M20 68 L34 59 L126 59 L112 68 Z" fill="url(#bkT)"/><path d="M112 68 L126 59 L126 75 L112 84 Z" fill="url(#bkS)"/><rect x="20" y="68" width="92" height="16" rx="2.5" fill="url(#bkF)"/><rect x="20" y="68" width="13" height="16" rx="2.5" fill="url(#bkG)"/><rect x="20" y="68" width="92" height="16" rx="2.5" fill="url(#bkGl)"/><path d="M10 50 L24 41 L118 41 L104 50 Z" fill="url(#bkT)"/><path d="M104 50 L118 41 L118 57 L104 66 Z" fill="url(#bkS)"/><rect x="10" y="50" width="94" height="16" rx="2.5" fill="url(#bkF)"/><rect x="10" y="50" width="13" height="16" rx="2.5" fill="url(#bkG)"/><rect x="10" y="50" width="94" height="16" rx="2.5" fill="url(#bkGl)"/><path d="M86 41 v23 l-6.5 -5.5 -6.5 5.5 v-23 z" fill="url(#bkG)"/><path d="M86 41 v23 l-3 -2.6 v-20.4 z" fill="#ffffff" fill-opacity=".24"/></svg>
          </a>
          <a class="dn-hall-card" href="/clavis">
            <div class="dn-hall-text">
              <span class="dn-hall-label">CLAVIS N<span class="dn-hall-label-sub"> | 합격의 문을 열어낼 단 하나의 열쇠를 쥐다</span></span>
              <div class="dn-hall-title-row">
                <h3 class="dn-hall-title">클라비스<span class="dn-hall-div" aria-hidden="true"></span>N수전문관</h3>
                <span class="dn-hall-play" aria-hidden="true">›</span>
              </div>
            </div>
            <svg class="dn-hall-books" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="trC" x1="0" y1="0" x2="1" y2=".8"><stop offset="0" stop-color="#F6E7C4"/><stop offset=".38" stop-color="#D3AC63"/><stop offset=".72" stop-color="#B38B41"/><stop offset="1" stop-color="#8F6C2C"/></linearGradient><linearGradient id="trH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6CB92"/><stop offset="1" stop-color="#A5813A"/></linearGradient><linearGradient id="trB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E4470"/><stop offset="1" stop-color="#14203A"/></linearGradient><linearGradient id="trBT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A6494"/><stop offset="1" stop-color="#2B4066"/></linearGradient><linearGradient id="trGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient><radialGradient id="trSh"><stop offset="0" stop-color="#16233E" stop-opacity=".32"/><stop offset="1" stop-color="#16233E" stop-opacity="0"/></radialGradient></defs><ellipse cx="70" cy="108" rx="44" ry="7.5" fill="url(#trSh)"/><path d="M46 30 H33 Q24 30 24 41 Q24 55 44 58" fill="none" stroke="url(#trH)" stroke-width="6" stroke-linecap="round"/><path d="M94 30 H107 Q116 30 116 41 Q116 55 96 58" fill="none" stroke="url(#trH)" stroke-width="6" stroke-linecap="round"/><path d="M44 22 H96 V44 Q96 72 70 77 Q44 72 44 44 Z" fill="url(#trC)"/><path d="M44 22 H96 V26 H44 Z" fill="#ffffff" fill-opacity=".3"/><path d="M52 26 Q50 50 60 68 Q52 58 50 40 Q49 32 52 26 Z" fill="#ffffff" fill-opacity=".4"/><path d="M44 22 H96 V44 Q96 72 70 77 Q44 72 44 44 Z" fill="url(#trGl)"/><path d="M70 36 l3 6 6.6 1 -4.8 4.7 1.2 6.6 -6 -3.1 -6 3.1 1.2 -6.6 -4.8 -4.7 6.6 -1 z" fill="#FBF1D8"/><path d="M64 77 h12 v11 h-12 z" fill="url(#trH)"/><path d="M64 77 h4 v11 h-4 z" fill="#ffffff" fill-opacity=".28"/><path d="M52 88 L58 84 L88 84 L82 88 Z" fill="url(#trBT)"/><rect x="52" y="88" width="30" height="6" rx="1.6" fill="url(#trB)"/><path d="M45 95 L51 91 L95 91 L89 95 Z" fill="url(#trBT)"/><rect x="45" y="95" width="44" height="8" rx="2" fill="url(#trB)"/><rect x="45" y="95" width="44" height="8" rx="2" fill="url(#bkGl)" opacity=".5"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
  <footer class="dn-footer">
    <div class="dn-wrap dn-foot">
      <div class="dn-foot-left">
        <div class="dn-foot-brand"><img src="/dain-foot-icon2.png" alt="다인에듀" class="dn-foot-icon"/><span class="dn-foot-brandtext"><b class="dn-foot-name">DAIN EDU</b><span class="dn-foot-brandline"></span><span class="dn-foot-clock js-clock">00:00:00</span></span></div>
        <div class="dn-foot-tel-wrap">
          <button class="dn-foot-tel" id="footTelBtn" type="button" aria-expanded="false" aria-label="대표번호 펼치기">1644-8022<span class="dn-foot-tel-caret" aria-hidden="true">▾</span></button>
          <div class="dn-foot-tel-menu" id="footTelMenu">
            <a href="tel:16448022"><span class="dn-tel-label">대표번호</span><span class="dn-tel-num">1644-8022</span></a>
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
          <p>대표 송지승<span class="dn-foot-sep">|</span>개인정보보호책임자 다인에듀<span class="dn-foot-sep">|</span>대표번호 1644-8022</p>
          <p>경기도 화성시 동탄구 메타폴리스로 53, 스타프라자 6층 (반송동)</p>
          <ul class="dn-foot-biz">
            <li><b>다인아카데미학원</b><span>사업자등록번호 628-85-03457</span><span>학원설립·운영등록번호 제5475호</span><a class="dn-foot-badge" href="#tuition">교습비 안내</a></li>
            <li><b>주식회사 다인교육</b><span>사업자등록번호 139-81-47864</span></li>
            <li><b>다인서점</b><span>사업자등록번호 641-85-03445</span></li>
          </ul>
        </div>
        <p class="dn-foot-copy">Copyright © DAIN EDU. All Rights Reserved.</p>
      </div>
      <div class="dn-foot-sns">
        <!-- 카카오톡 숨김: 채널이 열리면 아래 한 줄의 주석만 풀고 주소를 넣어주세요
        <a href="#" class="dn-sns dn-sns-kakao" aria-label="카카오톡" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/kakaotalk/391B1B" alt="카카오톡"/></a>
        -->
        <a href="https://www.youtube.com/@dain-edu" class="dn-sns dn-sns-youtube" aria-label="유튜브" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/youtube/white" alt="유튜브"/></a>
        <a href="https://blog.naver.com/dainacademy_official" class="dn-sns dn-sns-naver" aria-label="네이버 블로그" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/naver/white" alt="네이버 블로그"/></a>
        <a href="https://www.instagram.com/dainedu_dongtan" class="dn-sns dn-sns-insta" aria-label="인스타그램" target="_blank" rel="noopener noreferrer"><img src="https://cdn.simpleicons.org/instagram/white" alt="인스타그램"/></a>
      </div>
    </div>
  </footer>
  ${quickMenuMarkup}
  <audio id="bgm" src="/bgm-logo.mp3" loop preload="auto"></audio>
  <button class="dn-bgm" id="bgmBtn" type="button" aria-label="배경음악 켜기/끄기"><svg class="dn-bgm-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><svg class="dn-bgm-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 9l6 6M22 9l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
</main>
`;
