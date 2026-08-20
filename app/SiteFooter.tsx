// ═══════════════════════════════════════════════════════════
//  공용 푸터 (로고 · 대표번호 드롭다운 · 회사정보 · SNS)
//  모든 세부 페이지에서 <SiteFooter /> 로 불러 씁니다.
//  회사 정보를 바꾸려면 이 파일만 수정하면 전체 페이지에 반영됩니다.
// ═══════════════════════════════════════════════════════════

/** SNS 주소 — 계정이 바뀌면 여기만 수정하면 됩니다. */
export const SNS = {
  kakao: "#",
  youtube: "https://www.youtube.com/@dain-edu",
  blog: "https://blog.naver.com/dainacademy_official",
  instagram: "https://www.instagram.com/dainedu_dongtan",
};

/** 카카오톡 아이콘 표시 여부 — 채널이 열리면 true 로 바꾸세요. */
export const SHOW_KAKAO = false;

export default function SiteFooter() {
  return (
    <footer className="dn-footer">
      <div className="dn-wrap dn-foot">
        <div className="dn-foot-left">
          <div className="dn-foot-brand">
            <img src="/dain-foot-icon.png" alt="다인교육" className="dn-foot-icon" />
            <span className="dn-foot-brandtext">
              <b className="dn-foot-name">DAIN EDU</b>
              <span className="dn-foot-brandline" />
              <span className="dn-foot-clock js-clock">00:00:00</span>
            </span>
          </div>

          <div className="dn-foot-tel-wrap">
            <button className="dn-foot-tel" type="button" aria-expanded="false" aria-label="대표번호 펼치기">
              031-8003-0221
              <span className="dn-foot-tel-caret" aria-hidden="true">▾</span>
            </button>
            <div className="dn-foot-tel-menu">
              <a href="tel:03180030221">
                <span className="dn-tel-label">주식회사 다인교육 (본점)</span>
                <span className="dn-tel-num">031-8003-0221</span>
              </a>
              <a href="tel:03180030222">
                <span className="dn-tel-label">다인 학습센터</span>
                <span className="dn-tel-num">031-8003-0222</span>
              </a>
              <a href="tel:03180030224">
                <span className="dn-tel-label">다인 아카데미</span>
                <span className="dn-tel-num">031-8003-0224</span>
              </a>
            </div>
          </div>

          <nav className="dn-foot-links">
            <a href="/#about">회사소개</a>
            <a href="#terms">이용약관</a>
            <a href="#privacy">개인정보 처리방침</a>
          </nav>

          <div className="dn-foot-info">
            <p>
              다인아카데미<span className="dn-foot-sep">|</span>대표 (주)다인교육
              <span className="dn-foot-sep">|</span>e-mail: help@dain-edu.com
            </p>
            <p>
              개인정보보호책임자: 김양현<span className="dn-foot-sep">|</span>대표번호 031-8003-0221
              <span className="dn-foot-sep">|</span>주소: 경기도 화성시 동탄 메타폴리스로 53, 6층
            </p>
            <p>
              사업자등록번호 421-85-03313<span className="dn-foot-sep">|</span>
              학원설립·운영등록번호: 제0000호 다인아카데미
              <span className="dn-foot-badge">교습비 안내</span>
            </p>
          </div>

          <p className="dn-foot-copy">Copyright © DAIN EDU. All Rights Reserved.</p>
        </div>

        <div className="dn-foot-sns">
          {/* 카카오톡 숨김 — 채널 주소가 정해지면 아래 SHOW_KAKAO 를 true 로 바꾸세요 */}
          {SHOW_KAKAO && (
            <a href={SNS.kakao} className="dn-sns dn-sns-kakao" aria-label="카카오톡" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.simpleicons.org/kakaotalk/391B1B" alt="카카오톡" />
            </a>
          )}
          <a href={SNS.youtube} className="dn-sns dn-sns-youtube" aria-label="유튜브" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.simpleicons.org/youtube/white" alt="유튜브" />
          </a>
          <a href={SNS.blog} className="dn-sns dn-sns-naver" aria-label="네이버 블로그" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.simpleicons.org/naver/white" alt="네이버 블로그" />
          </a>
          <a href={SNS.instagram} className="dn-sns dn-sns-insta" aria-label="인스타그램" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.simpleicons.org/instagram/white" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}
