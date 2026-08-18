// ═══════════════════════════════════════════════════════════
//  공용 헤더 (상단 공지바 + 카테고리 메뉴 + 수능 D-day)
//  모든 세부 페이지에서 <SiteHeader /> 로 불러 씁니다.
//  카테고리를 바꾸려면 이 파일만 수정하면 전체 페이지에 반영됩니다.
// ═══════════════════════════════════════════════════════════
const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

/** current: 로고 옆 과정 토글에서 현재 켜둘 값
 *  "porta"  = 포르타 고등전문관 (/porta)
 *  "clavis" = N수 클라비스     (/clavis)
 */
export default function SiteHeader({ current }: { current?: "porta" | "clavis" }) {
  // 공지사항 / 이벤트·설명회는 현재 보고 있는 관(고등·N수)의 해당 섹션으로 이동합니다.
  const base = current === "clavis" ? "/clavis" : "/porta";

  return (
    <>
      <a className="dn-topbar" href={SEMINAR} aria-label="설명회 사전등록 안내">
        <span className="dn-topbar-mark">※</span>
        <span className="dn-entry-badge">9/19 SAT</span>
        <h3 className="dn-topbar-title">설명회 사전등록</h3>
        <span className="dn-topbar-desc">
          그랜드 오픈 설명회 <b>좌석을 먼저 확보</b>하세요.
        </span>
      </a>

      <nav className="dn-nav" aria-label="주 메뉴">
        <a className="dn-nav-brand" href="/">
          <img src="/dain-icon.png" alt="다인교육" className="dn-nav-icon" />
          <span className="dn-nav-brandtext">
            <b className="dn-nav-name">DAIN EDU</b>
            <span className="dn-nav-line" />
            <span className="dn-nav-clock js-clock">00:00:00</span>
          </span>
        </a>

        {current && (
          <div className="dn-gtoggle" role="tablist" aria-label="과정 전환">
            <a
              className={`dn-gtoggle-btn${current === "clavis" ? " is-on" : ""}`}
              href="/clavis"
              role="tab"
              aria-selected={current === "clavis"}
            >
              N수
            </a>
            <a
              className={`dn-gtoggle-btn${current === "porta" ? " is-on" : ""}`}
              href="/porta"
              role="tab"
              aria-selected={current === "porta"}
            >
              고등
            </a>
          </div>
        )}

        <ul className="dn-gnb">
          <li className="dn-gnb-item">
            <a href="/#about">학원소개</a>
            <div className="dn-gnb-sub">
              <a href="/#about">인사말</a>
              <a href="/space">시설 안내</a>
              <a href="/#about">오시는 길</a>
              <a href="/#system">운영시스템</a>
            </div>
          </li>

          <li className="dn-gnb-item">
            <a href="/teachers">강사진 소개</a>
            {/* 세부 카테고리 숨김 (필요 시 주석 해제)
            <div className="dn-gnb-sub">
              <a href="/teachers">국어</a>
              <a href="/teachers">수학</a>
              <a href="/teachers">영어</a>
              <a href="/teachers">탐구</a>
            </div>
            */}
          </li>

          <li className="dn-gnb-item">
            <a href="/#program">모집안내</a>
            <div className="dn-gnb-sub">
              <a href="/porta">포르타 고등전문관</a>
              <a href="/clavis">N수 클라비스</a>
              <a href="/winter">2027 윈터스쿨</a>
            </div>
          </li>

          <li className="dn-gnb-item">
            <a href="/#contents">콘텐츠</a>
            <div className="dn-gnb-sub">
              <a href="/#contents">영단어 데일리 테스트</a>
              <a href="/#contents">빈칸·순서·삽입 데일리 훈련</a>
              <a href="/#contents">학과 적성 찾기</a>
            </div>
          </li>

          <li className="dn-gnb-item">
            <a href={`${base}#notice`}>학원생활</a>
            <div className="dn-gnb-sub">
              <a href={`${base}#notice`}>공지사항</a>
              <a href={`${base}#event`}>이벤트/설명회</a>
              <a href="/consult">상담문의</a>
            </div>
          </li>
        </ul>

        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>
    </>
  );
}
